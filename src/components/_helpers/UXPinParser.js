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

  let currChar;             // For looping through characters of the inputStr
  let prevChar = '';        // The previous character we looped around
  let insideQuotes = true;  // Are we currently inside quotes?
  let newRow = [''];        // Represents a row in our newArray
  let newArray = [newRow];  // The processed array that we will return
  let i = 0;                // Index variable for elements in newRow
  let j = 0;                // Index variable for rows in newArray

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
       newRow = newArray[++j] = [currChar = ''];
       i = 0;
    } else {
      // If it's not a special character, just add it the current element
      newRow[i] += currChar;
    }
    prevChar = currChar;
  }

  return newArray;
};

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
    .map((value, index) => (
      parseRow(value, index)
    ));

  return parsedOutput.flat();
}

/**
 * Function to parse one row of a CSV array and return an object
 */
export function parseRow(inputStr, index) {
  inputStr = inputStr.trim()
  let parsedOutput = [];
  let allTokens = inputStr.split(/\s(?![^\(]*\))/g);
  let tokensWithType = inputStr.match(new RegExp(/(\s|)(icon|link)\((.*?)\)(\s|)/gi));

  let hasType = tokensWithType !== null;    // Icon, Link etc. found
  let firstTime = true;                     // After first time, treat as text

  for (let i = 0; i < allTokens.length; i++) {
    if (hasType) {
      if (firstTime) {
        parsedOutput.push(makeToken(allTokens[i], getType(allTokens[i]), index));
        firstTime = false;
      }
      else {
        // i = 0: type; i = 1: text; i >= 2: more text (we need to add space)
        (i < 2) ? parsedOutput[0].text += `${allTokens[i]}` : parsedOutput[0].text += ` ${allTokens[i]}`;
      }
    } else {
      if (firstTime) {
        parsedOutput.push(makeToken(allTokens[i], "text", index));
        firstTime = false;
      } else {
        parsedOutput[0].text += ` ${allTokens[i]}`;
      }
    }
  }

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
    args = args[0].split(',').map(output => output.trim());
  }

  // E.g. [bar, red-600]
  return args;
}

/**
 * Function to build the token object
 */
function makeToken(inputStr, type, order) {
  let token = {};

  switch (type) {
    case "icon":
      token = {
        order: order,
        type: type,
        iconName: getFirstArg(inputStr),
        color: getFurtherArgs(inputStr)?.[0],
        // colorToken: getFurtherArgs(inputStr)?.[0],
        colorToken: undefined,
        text: "",
      };
      break;
    case "link":
      token ={
        order: order,
        type: type,
        text: getFirstArg(inputStr),
        href: getFurtherArgs(inputStr)?.[0],
      };
      break;
    case "text":
    default:
      token = {
        order: order,
        type: type,
        text: inputStr,
      };
  }

  return token;
}
