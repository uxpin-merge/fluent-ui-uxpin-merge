export const UxpNumberParser = {
  /**
   * Parses a string that contains an int value.
   *      If the string contains multiple numbers, it'll return the first one found.     *      If the string contains a % mark anywhere, it'll assume the first number found is a percent and adjust it to fit within the 0-100% range (inclusive).
   * @param {string} rawStr A string that may contain an int or int percentage value.
   * @returns {string} Returns a string, such as '15%' or '225'. If nothing could be parsed, the value of undefined is returned.
   * @example '5 6 9 38 50' - Returns the first number: '5'
   * @example '5 6 9% 38 50' - Returns the first number as a percent: '5%'
   * @example '38px' - Returns a number: 38
   * @example '85%' - Returns '85%'
   * @example '-25%' - Returns '-25%'
   * @example "Here's a percent: 33%" - Returns '33%'
   * @example '125%' - Returns '100%'
   * @example '-569' - Returns '-569'
   */
  parsePercentOrInt: function (rawStr) {
    //Is it already a number?
    if (typeof rawStr == 'number') {
      let item = parseInt(rawStr, 10);
      if (!isNaN(item)) {
        return item;
      }
    }

    if (!rawStr || typeof rawStr != 'string') return undefined;

    var isPercent = false;
    if (typeof rawStr == 'string') {
      isPercent = rawStr.includes('%');
    }

    //Find all ints. We stop on the first int, positive or negative.
    let normalizedList = rawStr.replace(/[, ]+/g, '|');
    let tokenizedList = normalizedList.split('|');

    if (tokenizedList && tokenizedList.length > 0) {
      let tlLength = tokenizedList.length;

      var i;
      for (i = 0; i < tlLength; i++) {
        let item = parseInt(tokenizedList[i], 10);

        if (!isNaN(item)) {
          if (isPercent) {
            let pct = item < 0 ? '0%' : item > 100 ? '100%' : item + '%';
            return pct;
          } else {
            return item;
          }
        }
      }
    }

    //If we made it this far, we didn't encounter any numbers.
    return undefined;
  },

  /**
   * Parses a string that contains a positive int percentage value.
   * @param {string} rawStr A string that may contain a positive int percentage value.
   * @returns {string} Returns a string, such as '15%'. If nothing could be parsed, the value of undefined is returned.
   * @example '85%' - Returns '85%'
   * @example 'Here's a percent: 33%' - Returns '33%'
   * @example '125%' - Returns undefined
   * @example '5 6 9 38 50' - Returns undefined
   * @example '38px' - Returns undefined
   */
  parsePercent: function (rawStr) {
    if (!rawStr || typeof rawStr != 'string') return undefined;

    let isPercent = rawStr.includes('%');

    if (isPercent) {
      //Let's let the other method do all the hard work
      return this.parsePercentOrInt(rawStr);
    }

    //If we made it this far, it wasn't parsable
    return undefined;
  },

  /**
   * Parses a string that contains a list of numbers. Accepts comma or space delimited numbers.
   * @param {string} rawList A string that contains a list of ints.
   * @returns {Array} Returns an array of numbers. If nothing could be parsed, it is an empty array.
   * @example '1 3 5 -6 9 38' - Returns an array of numbers: [1,3,5,-6,9,38]
   * @example '38px' - Returns an array of numbers: [38]
   */
  parseInts: function (rawList) {
    //Let's let this other function do all the hard work
    return this.parseIntsAdjusted(rawList, 0);
  },

  /**
   * Parses a string that contains a list of numbers. Accepts comma or space delimited numbers.
   * 		An additional option is available for adjusting the number, for example, to convert a 1-based index to a 0-based index.
   * @param {string} rawList A string that contains a list of ints.
   * @param {number} adjustmentNumber A positive or negative number that will be added to each int found. For example, if the user entered values with a 1-based index, use a -1. Pass in '0' for no adjustment.
   * @returns {Array} Returns an array of numbers. If nothing could be parsed, it is an empty array.
   * @example '1 3 5 -6 9 38' - Returns an array of numbers: [1,3,5,-6,9,38]
   * @example '1 3 5 -6 9 38' - With an adjustmentNumber of '-1', returns an array of numbers: [0,2,4,5,-7,37]
   * @example '38px' - Returns an array of numbers: [38]
   */
  parseIntsAdjusted: function (rawList, adjustmentNumber) {
    //Let's let this other function do all the hard work
    //Pass garbage strings in for the min and max so that they'll be ignored.
    return this.parseIntsWithOptions(rawList, adjustmentNumber, 'foo', 'foo');
  },

  /**
   * Parses a string that contains a list of int numbers. Accepts comma or space delimited list of numbers.
   * 		An additional option is available for adjusting the number, for example, to convert a 1-based index to a 0-based index.
   *      Pass in a min or max value to filter those out, too.
   * @param {string} rawList A string that contains a list of int numbers.
   * @param {number} adjustmentNumber A positive or negative number that will be added to each int found. For example, if the user entered values with a 1-based index, use a -1. Pass in '0' for no adjustment.
   * @param {number} minValue After adjustments, the minimum acceptable value. Pass in a non-numeric string to ignore.
   * @param {number} maxValue After adjustments, the maximum acceptable value. Pass in a non-numeric string to ignore.
   * @returns {Array} Returns an array of numbers. If nothing could be parsed, it is an empty array.
   * @example '1 3 -5 6 -9 38' - Returns an array of numbers: [1,3,-5,6,-9,38]
   * @example '1, 3, 5, 6, 9, -38, 55, 100, 500' - With minValue of 5 and maxValue of 100, returns an array of numbers: [5,6,9,55,100]
   * @example '38px' - Returns an array of numbers: [38]
   */
  parseIntsWithOptions: function (rawList, adjustmentNumber, minValue, maxValue) {
    if (!rawList || typeof rawList != 'string') return [];

    //Find all ints
    let normalizedList = rawList.replace(/[, ]+/g, '|');
    let tokenizedList = normalizedList.split('|');
    let parsedList = [];
    if (tokenizedList && tokenizedList.length > 0) {
      let tlLength = tokenizedList.length;

      let min = parseInt(minValue);
      let max = parseInt(maxValue);

      var i;
      for (i = 0; i < tlLength; i++) {
        var item = parseInt(tokenizedList[i], 10);
        item = item + adjustmentNumber;

        if (isNaN(item) || item < min || item > max) {
          //do nothing
        } else {
          parsedList.push(item);
        }
      }
    }

    return parsedList;
  },
};
