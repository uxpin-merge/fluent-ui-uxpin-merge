import { UxpColors } from './uxpcolorutils';

/**
 * Function to split a CSV input string into an array of rows of CSV strings
 *
 * @param {string} inputStr - CSV with commas and newlines: "str, str\n str"
 * @example "one, two, three" --> ["one", " two", " three"]
 * @example "icon(Dictionary) abc, link(John Snow|blue)
 *           icon(Checkbox) done" -->
 *           [
 *            ["icon(Dictionary) abc", "link(John Snow|blue)"],
 *            ["icon(Checkbox done"]
 *           ]
 */
export function split(inputStr) {
  // Handle the edge-case of empty input strings
  if (inputStr.trim() === '') {
    return [];
  }

  let currChar; // For looping through characters of the inputStr
  let prevChar = ''; // The previous character we looped around
  let insideQuotes = true; // Are we currently inside quotes?
  let newRow = ['']; // Represents a row in our newArray
  let newArray = [newRow]; // The processed array that we will return
  let i = 0; // Index variable for elements in newRow
  let j = 0; // Index variable for rows in newArray

  // For each character in the inputStr
  for (currChar of inputStr) {
    if (currChar === '"') {
      // Handle the edge-case of quotes inside quotes
      if (currChar === prevChar && insideQuotes) {
        newRow[i] += currChar;
      }
      // If we were in quotes, now we are not, and vice versa
      insideQuotes = !insideQuotes;
    } else if (currChar === ',' && insideQuotes) {
      // This element is finished, start a new element of newRow
      currChar = newRow[++i] = '';
    } else if (currChar === '\n' && insideQuotes) {
      if (prevChar === '\r') {
        // Remove the last element
        newRow[i] = newRow[i].slice(0, -1);
      }
      // This array row is finished, start a new row of newArray
      newRow = newArray[++j] = [(currChar = '')];
      i = 0;
    } else {
      // If it's not a special character, just add it the current element
      newRow[i] += currChar;
    }
    prevChar = currChar;
  }

  return newArray;
}

/**
 *
 * @param inputStr Splits a raw input string by line breaks first. Then, for each row, parses the row for CSV blocks ot fext.
 * @returns An array of arrays of strings. Each row's contents are contained in its own array of strings representing each block.
 */
export function parseMultipleRowsCSV(inputStr) {
  let contents = [];

  //Split rows by new line
  let rows = inputStr.match(/[^\r\n]+/g) || [];

  if (rows && rows.length > 0) {
    for (var i = 0; i < rows.length; i++) {
      let row = parseRowCSV(rows[i]);

      if (row.length) {
        contents.push(row);
      }
    }
  }

  return contents;
}

/**
 *
 * @param inputStr CSV with commas separating distinct blocks. This would be 3 blocks: "str, str str str, str"
 * @returns An array of strings representing each block.
 * @example "one, two, "  three  "" --> ["one", "two", "  three  "]
 * @example "icon(Dictionary) abc, link(John Snow|paypal.com), "$1,235"" -->
 *           ["icon(Dictionary) abc", "link(John Snow|paypal.com)", "$1,235"]
 */
export function parseRowCSV(inputStr) {
  //Source: https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data

  let parsedCSV = [];

  var matches = inputStr.match(/(\s*"[^"]+"\s*|\s*[^,]+|,)(?=,|$)/g);
  matches = matches ? matches : [];
  for (var n = 0; n < matches.length; ++n) {
    if (matches[n]) {
      var txt = matches[n].trim();
      parsedCSV.push(txt);
    }
  }
  return parsedCSV;
}

/**
 * Function to parse an array of CSV values and return an array of objects
 *
 * @param {string} inputStr - array of CSVs: ["one", "two", "three"]
 * @example ["one", " two", " three"] -->
 *  [
 *    { order: 0, type: "text", text: "one", },
 *    { order: 1, type: "text", text: "two", },
 *    { order: 2, type: "text", text: "three", },
 *  ]
 */
export function parse(inputStr) {
  let parsedOutput = [];

  parsedOutput = split(inputStr)
    .flat()
    .map((value, index) => parseRow(value, index));

  return parsedOutput.flat();
}

/**
 * Function to parse one row of a CSV array and return an object
 */
export function parseRow(inputStr, index) {
  inputStr = inputStr.trim();

  // Regex patterns for tokens, and tokens that have specific type (Icon, Link etc.)
  let allTokens = inputStr.split(/\s(?![^(]*\))/g);
  let tokensWithType = inputStr.match(new RegExp(/(\s|)(icon|link)\((.*?)\)(\s|)/gi));

  let parsedOutput = []; // The return value that we will build
  let hasType = tokensWithType !== null; // Icon, Link etc. found; not free text
  let createNewToken = true; // Switch between creating new token or adding to a token
  let semaphore = false; // Switch between creating/adding with compound types, E.g. Text --> Link --> Icon --> Text
  let tokenCounter = 0; // Incremented with each call to makeToken()

  /**
   * This algorithm deals with three broad use-cases:
   *   1. Single token-with-type found:
   *     a. If token is at the start, then anything else is added as "text" at the end
   *     b. Otherwise, fall through to 2. and treat as a compound type
   *   2. Multiple tokens-with-type found (or a single token with text at the start); could include mix of tokens-with-type and free text
   *   3. Free text only
   */
  for (let i = 0; i < allTokens.length; i++) {
    if (hasType && tokensWithType?.length === 1 && allTokens[0].trim() === tokensWithType[0]?.trim()) {
      parsedOutput.push(makeToken(allTokens[i], getType(allTokens[i]), index));
      createNewToken = true;
    } else if (hasType && tokensWithType?.length) {
      if (tokensWithType.map((s) => s.trim()).includes(allTokens[i])) {
        parsedOutput.push(makeToken(allTokens[i], getType(allTokens[i]), i));
        tokenCounter += 1;
        semaphore = true;
      } else {
        // Is this the _start_ of a chain of free text tokens?
        if (tokenCounter === 0 || semaphore === true) {
          parsedOutput.push(makeToken(allTokens[i], 'text', i));
          tokenCounter += 1;
          semaphore = false;
        } else {
          parsedOutput[tokenCounter - 1].text += ` ${allTokens[i]}`;
        }
      }
    } else {
      if (createNewToken) {
        parsedOutput.push(makeToken(allTokens[i], 'text', index));
        createNewToken = false;
      } else {
        parsedOutput[0].text += ` ${allTokens[i]}`;
      }
    }
  }

  // Special return value for use case 2.
  if (parsedOutput?.length > 1) {
    parsedOutput.map((element, index) => (element.order = index));
    return { order: index, type: 'compound', value: parsedOutput };
  }

  // Return value for use case 1. and 3.
  return parsedOutput;
}

/**
 * Function to figure out the token type
 */
function getType(inputStr) {
  // E.g. icon
  return inputStr.slice(0, inputStr.indexOf('('));
}

/**
 * Function to extract the first argument
 */
function getFirstArg(inputStr) {
  // E.g. CircleSuccess
  return inputStr.match(/(?<=\().*?(?=(\)|\|))/g)[0];
}

/**
 * Function to extract further arguments
 */
function getFurtherArgs(inputStr) {
  let args = inputStr.match(/(?<=\|).*?(?=\))/g);

  if (args && args.length > 0) {
    args = args[0].split(',').map((output) => output.trim());

    // E.g. [bar, red-600]
    return args;
  }

  return undefined;
}

/**
 * Function to normalize URIs by trimming the string and adding 'http://', if necessary. If the potential URI string already uses one of these protocols, then no action is taken: http(s), tel, mailto.
 * @param {string} inputStr - A string
 * @returns {string} A normalized URI that starts with one of these supported protocols: http(s), tel, mailto.
 * @example Adds http - '    uxpin.com' -> 'http://uxpin.com'
 * @example No change - 'https://uxpin.com' -> 'https://uxpin.com'
 * @example No change - 'mailto:info@uxpin.com' -> 'mailto:info@uxpin.com'
 * @example No change - 'tel:+16175551212' -> 'tel:+16175551212'
 *
 */
export function normalizeLink(inputStr) {
  if (inputStr == undefined) {
    return inputStr;
  }

  let token = inputStr?.trim();

  if (token?.startsWith('http') || token?.startsWith('tel:') || token?.startsWith('mailto:')) {
    return token;
  } else {
    return `http://${token}`;
  }
}

/**
 * Function to normalize color tokens and turn them into hex values
 */
// eslint-disable-next-line no-unused-vars
function normalizeIcon(inputStr) {
  let acceptableColour = /^#?[0-9|a-f|A-F]{6}$/;

  if (acceptableColour.test(inputStr) && inputStr?.includes('#')) {
    return inputStr;
  } else if (acceptableColour.test(inputStr) && !inputStr?.includes('#')) {
    return `#${inputStr}`;
  } else {
    return undefined;
  }
}

/**
 * Function to build the token object
 */
function makeToken(inputStr, type, order) {
  let token = {};
  let c = '';
  console.log('makeToken, type: ' + type + ', contents: ' + JSON.stringify(inputStr));

  switch (type) {
    case 'icon':
      c = UxpColors.getHexFromHexOrToken(getFurtherArgs(inputStr)?.[0]);
      token = {
        order: order,
        type: type,
        iconName: getFirstArg(inputStr).trim(),
        color: c ? c : '',
        colorToken: getFurtherArgs(inputStr)?.[0]?.trim() === '' ? undefined : getFurtherArgs(inputStr)?.[0]?.trim(),
        text: '',
      };
      break;
    case 'link':
      token = {
        order: order,
        type: type,
        text: getFirstArg(inputStr).trim(),
        href: normalizeLink(getFurtherArgs(inputStr)?.[0])?.trim(),
      };
      break;
    case 'text':
    default:
      token = {
        order: order,
        type: type,
        text: inputStr,
      };
  }

  return token;
}

/**
 * A rewrite of the single line parser, suitable for Nav, Pivot, and Dropdown.
 * @param {string} inputStr
 * @param {boolean} includeEmptyRows
 * @returns
 */
export function parseSimpleTokens(inputStr, includeEmptyRows) {
  let contents = [];

  //Split rows by new line
  let rows = inputStr.match(/[^\r\n]+/g) || [];

  if (rows && rows.length) {
    for (var i = 0; i < rows.length; i++) {
      let row = parseSimpleTokensRow(rows[i]);

      if (row) {
        if (row.length || includeEmptyRows) {
          contents.push(row);
        }
      }
    }
  }

  return contents;
}

/**
 * For parsing one line, such as one line in a list of Tab or Nav items.
 * @param {string} inputStr
 * @returns
 */
export function parseSimpleTokensRow(inputStr) {
  if (!inputStr) return undefined;

  if (inputStr.trim().length < 1) {
    return '';
  }

  let tokens = [];
  let hasMoreTokens = true;
  let remainder = inputStr;
  let i = 0;

  do {
    hasMoreTokens = false;

    let results = extractNextToken(remainder);

    console.log('parseSimpleTokensRow. raw token: ' + results.rawToken + '  >>> remainder: ' + results.remainder);

    //found a token?
    if (results?.token !== 'none') {
      let t = makeSimpleToken(i, results.type, results.rawToken);
      if (t) {
        tokens.push(t);
      }
      i++;
    }

    if (results?.remainder && results.remainder.length) {
      remainder = results.remainder;
      hasMoreTokens = true;
    }
  } while (hasMoreTokens && i < 5); //do

  return tokens;
}

function extractNextToken(inputStr) {
  if (!inputStr) return undefined;

  if (inputStr.trim().length < 1) {
    return undefined;
  }

  inputStr = inputStr.trim();

  let type = 'none';
  let rawToken = '';
  let remainder = undefined;
  let rightParensIndex = inputStr.indexOf(')');
  let iconIndex = inputStr.indexOf('icon(');
  let linkIndex = inputStr.indexOf('link(');

  //Is first token Text WITH Icon or Link??
  if (iconIndex > 0 || linkIndex > 0) {
    //First, determin if link or icon is first
    let endIndex = inputStr.length;

    if (iconIndex > 0 && linkIndex > 0) endIndex = iconIndex < linkIndex ? iconIndex : linkIndex;
    else if (iconIndex > 0) endIndex = iconIndex;
    else if (linkIndex > 0) endIndex = linkIndex;

    type = 'text';
    rawToken = inputStr.slice(0, endIndex);
    remainder = inputStr.slice(endIndex);
  } else if (iconIndex === 0 || linkIndex === 0) {
    rawToken = inputStr.slice(0, rightParensIndex);
    if (inputStr.length > rightParensIndex) {
      remainder = inputStr.slice(rightParensIndex + 1);
    }

    if (iconIndex === 0) {
      type = 'icon';
      rawToken = rawToken.replace('icon(', '');
    } else if (linkIndex === 0) {
      type = 'link';
      rawToken = rawToken.replace('link(', '');
    }
  } else {
    //Else the whole length is a Text token
    type = 'text';
    rawToken = inputStr;
    remainder = '';
  }

  return {
    type: type,
    rawToken: rawToken,
    remainder: remainder,
  };
}

function makeSimpleToken(index, type, inputStr) {
  let token = {};
  let splits = [];
  let c = '';
  let href = '';

  if (type === 'icon' || type === 'link') {
    let rawSplits = splitOnPipe(inputStr);
    if (rawSplits && rawSplits.length) {
      splits = rawSplits;
    }
  }

  switch (type) {
    case 'icon':
      c = splits.length > 1 ? UxpColors.getHexFromHexOrToken(splits[1]) : '';
      token = {
        order: index,
        type: type,
        iconName: splits[0]?.trim(),
        color: c ? c : '',
        colorToken: c ? c : '',
        text: '',
      };
      break;
    case 'link':
      href = splits.length > 1 ? normalizeLink(splits[1]) : '';
      token = {
        order: index,
        type: type,
        text: splits[0]?.trim(),
        href: href ? href : '',
      };
      break;
    case 'text':
    default:
      token = {
        order: index,
        type: type,
        text: inputStr?.trim(),
      };
      break;
  }

  return token;
}

function splitOnPipe(inputStr) {
  let splits = [];

  if (inputStr && inputStr.length) {
    if (inputStr.includes('|')) {
      splits = inputStr.split('|');
    } else {
      //We'll return the input string as the first item
      splits.push(inputStr);
    }
  }

  return splits;
}
