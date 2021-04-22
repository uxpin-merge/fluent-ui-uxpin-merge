/**
 * This file contains a few useful helper utilities. 
 * Feel free to utilize them if they prove useful, or to contribute updates.
 * USE AT YOUR OWN RISK!!
 * Anthony Hand, TPX UX team
 */


/**
 * TPX UX Number Parser
 * This is a convenience utility for parsing a string for a number or percentage within it, or for a list of numbers within it.  
 * Support for this utility class may be terminated at any time without notice. 
 * Added by: Anthony Hand  
 */
export const TpxUxNumberParser = {

    /**
     * Parses a string that contains a positive int value. 
     *      If the string contains a % mark, it'll also validate that it's between 0-100%. 
     *      If the string contains multiple numbers, it'll focus on the first one found.
     * @param {string} rawStr A string that may contain a positive int percentage value.
     * @returns {string} Returns a string, such as '15%' or '225'. If nothing could be parsed, the value of undefined is returned.
     * @example '5 6 9 38 50' - Returns the first number: '5'
     * @example '5 6 9% 38 50' - Returns the first number as a percent: '5%'
     * @example '38px' - Returns a number: 38
     * @example '85%' - Returns '85%'
     * @example '-25%' - Returns '25%'
     * @example 'Here's a percent: 33%' - Returns '33%'
     * @example '125%' - Returns undefined
     * @example '-569' - Returns '569'
     */
    parsePercentOrInt : function (rawStr) {
        
        var num = undefined;
        var isPercent = false;

        if (typeof(rawStr) == 'number') {
            num = Number(rawStr);
        }
        
        if (typeof(rawStr) == 'string') {
            isPercent = rawStr.includes('%');

            let regex = /\d+/g;
            let result = rawStr.match(regex);

            if (result && result.length) {
                num = Number(result[0]);
            } 
        }

        if (num && typeof(num) == 'number') {

            if (isPercent) {
                //Validate it's between 0-100%
                if (num > -1 && num < 101 ) {
                    return num + '%';
                }
            } 
            else {
                //We'll return the number as-is 
                return num;
            }
        }

        //If we made it this far, it wasn't parsable
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
	parsePercent : function (rawStr) {
        if (!rawStr || typeof(rawStr) != 'string')
            return undefined;	
            
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
     * @param {string} rawList A string that contains a list of positive ints.
     * @returns {Array} Returns an array of numbers. If nothing could be parsed, it is an empty array.
     * @example '1 3 5 6 9 38' - Returns an array of numbers: [1,3,5,6,9,38]
     * @example '38px' - Returns an array of numbers: [38]
     */
    parseInts : function (rawList) {
        //Let's let this other function do all the hard work
    	return this.parseIntsAdjusted(rawList, 0);
    },
    
    /**
     * Parses a string that contains a list of numbers. Accepts comma or space delimited numbers. 
     * 		An additional option is available for adjusting the number, for example, to convert a 1-based index to a 0-based index.
     * @param {string} rawList A string that contains a list of positive ints.
     * @param {number} adjustmentNumber A positive or negative number that will be added to each int found. For example, if the user entered values with a 1-based index, use a -1. Pass in '0' for no adjustment.
     * @returns {Array} Returns an array of numbers. If nothing could be parsed, it is an empty array.
     * @example '1 3 5 6 9 38' - Returns an array of numbers: [1,3,5,6,9,38]
     * @example '1 3 5 6 9 38' - With an adjustmentNumber of '-1', returns an array of numbers: [0,2,4,5,8,37]
     * @example '38px' - Returns an array of numbers: [38]
      */
    parseIntsAdjusted : function (rawList, adjustmentNumber) {
        //Let's let this other function do all the hard work
        //Pass garbage strings in for the min and max so that they'll be ignored. 
    	return this.parseIntsWithOptions(rawList, adjustmentNumber, "foo", "foo");
    },

    /**
     * Parses a string that contains a list of positive int numbers. Accepts comma or space delimited numbers. 
     * 		An additional option is available for adjusting the number, for example, to convert a 1-based index to a 0-based index.
     *      Pass in a min or max value to filter those out, too. 
     * @param {string} rawList A string that contains a list of positive int numbers.
     * @param {number} adjustmentNumber A positive or negative number that will be added to each int found. For example, if the user entered values with a 1-based index, use a -1. Pass in '0' for no adjustment.
     * @param {number} minValue After adjustments, the minimum acceptable value. Pass in a non-numeric string to ignore.
     * @param {number} maxValue After adjustments, the maximum acceptable value. Pass in a non-numeric string to ignore.
     * @returns {Array} Returns an array of numbers. If nothing could be parsed, it is an empty array.
     * @example '1 3 5 6 9 38' - Returns an array of numbers: [1,3,5,6,9,38]
     * @example '1, 3, 5, 6, 9, 38, 55, 100, 500' - With minValue of 5 and maxValue of 100, returns an array of numbers: [5,6,9,38,55,100]
     * @example '38px' - Returns an array of numbers: [38]
     */
    parseIntsWithOptions : function (rawList, adjustmentNumber, minValue, maxValue) {
        if (!rawList || typeof(rawList) != 'string')
            return [];

        //Find positive Ints only
        let regex = /\d+/g;
        let result = rawList.match(regex);

        var indexList = [];
        
        //Now we have to go through, validate the numbers, and adjust them, if necessary
        if (result && result.length) {
        
        	let min = Number(minValue);
            let max = Number(maxValue);
        	
        	var adjNum = parseInt(adjustmentNumber);
    		if (isNaN(adjNum)) {
    			adjNum = 0;
            }
            
            var i;
            for (i = 0; i < result.length; i++) {
            	var num = result[i];
                num = parseInt(num, 10);
            	
            	if (!isNaN(num)) {
                    num = num + adjNum;
            		
					if (!isNaN(min) && num < min) {
						//Do nothing with this value. Too low or minValue is not defined.
					} 
					else if (!isNaN(max) && num > max) {
						//Do nothing with this value. Too high or maxValue is not defined.
					} 
					else {
						indexList.push(num);
					}
            	} //Num validation
            } //for loop
        } //if results

        return indexList;
    },
};
