
export const UxpDateTimeUtils = {

	months: [
		'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
	],

	monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

	daysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

	timeAM: 'am',
	timePM: 'pm',


	/**
	* Tests a string to see if it can be converted into a valid Date object. 
	* Can be either a JS Date object or a string, such as 'Feb 8 2020' or '2/8/20'.
	* @param {string} dateStr A JavaScript Date object or a string representation of a date.
	* @example A representation of a valid Date object, such as 'new Date()'.
	* @example 'Feb 8 2020' where the date is February 8, 2020. 
	* @example '2/8/20' where the date is February 8, 2020.
	* returns {boolean} True if the string entered can make a valid JavaScript Date object. False otherwise. 
	*/
	isValidDate: function (dateStr) {
		//If we have an empty date string, return false.
		if (!dateStr || dateStr === null)
			return false;

		//Test what was entered
		let timestamp = Date.parse(dateStr);
		if (!isNaN(timestamp)) {
			return true;
		}

		//Else, there was some other issue
		return false;
	},

	parseDate: function (dateStr) {
		if (this.isValidDate(dateStr)) {
			return new Date(dateStr);
		}

		return undefined;
	},

	//Local time in Epoch seconds
	getEpochSeconds: function (dateStr) {
		if (!this.isValidDate(dateStr)) {
			return undefined;
		}

		let date = new Date(dateStr);

		return Math.round(date.getTime() / 1000);
	},

	//Full local date/time in UTC
	getUtcString: function (dateStr) {
		if (!this.isValidDate(dateStr)) {
			return undefined;
		}

		let date = new Date(dateStr);

		return date.toUTCString();
	},

	getNowFormattedDate: function () {
		return this.getFormattedDate(new Date());
	},

	getNowFormattedTime: function () {
		return this.getFormattedTime(new Date());
	},

	getNowFormattedDateTime: function () {
		return this.getFormattedDateTime(new Date());
	},

	getFormattedDate: function (dateStr) {

		if (!this.isValidDate(dateStr)) {
			return undefined;
		}

		//Get the parts
		let dt = new Date(dateStr);

		let year = dt.getFullYear();
		let date = dt.getDate();
		let i = dt.getMonth() //0-based

		//Assemble the preferred format like: 'Feb 8, 2020'
		let month = this.monthsShort[i];
		return month + " " + date + ", " + year;
	},

	getFormattedTime: function (dateStr) {
		return this.getFormattedTimeAdvanced(dateStr, true, false);
	},


	getFormattedDateTime: function (dateStr) {

		let dt = this.getFormattedDate(dateStr);
		let time = this.getFormattedTime(dateStr);

		if (dt && time) {
			return dt + ", " + time;
		}
	},

	getFormattedDateTimeAdvanced: function (dateStr, in12HrFormat, withSeconds) {

		let dt = this.getFormattedDate(dateStr);
		let time = this.getFormattedTimeAdvanced(dateStr, in12HrFormat, withSeconds);

		if (dt && time) {
			return dt + ", " + time;
		}
	},

	getFormattedTimeAdvanced: function (dateStr, in12HrFormat, withSeconds) {
		if (!this.isValidDate(dateStr)) {
			return undefined;
		}

		//Get the parts	
		let dt = new Date(dateStr);
		let hour = dt.getHours(); //0-23
		let min = dt.getMinutes(); //0-59

		var hourAdjusted = hour;
		var minAdjusted = min;

		if (in12HrFormat) {
			hourAdjusted = ((hour > 12) ? hour - 12 : hour);
		}

		//Add the leading 0
		if (min < 10) {
			minAdjusted = "0" + minAdjusted;
		}

		//Assemble the time component
		var time = hourAdjusted + ":" + minAdjusted;

		//Add seconds?
		if (withSeconds) {
			var seconds = dt.getSeconds();

			//Add the leading 0
			if (seconds < 10) {
				seconds = "0" + seconds;
			}

			time = time + ":" + seconds;
		}

		//Add am/pm?
		if (in12HrFormat) {
			var suffix = this.timeAM;

			if (hour > 11) {
				suffix = this.timePM;
			}

			time = time + " " + suffix;
		}

		return time;
	},

	getFullDate: function (dateStr) {

		if (!this.isValidDate(dateStr)) {
			return undefined;
		}

		//Get the parts
		let dt = new Date(dateStr);

		let year = dt.getFullYear();
		let date = dt.getDate();
		let i = dt.getMonth() //0-based

		//Assemble the preferred format like: 'February 8, 2020'
		let month = this.months[i];
		return month + " " + date + ", " + year;
	},

	getFullDateTime: function (dateStr) {

		let dt = this.getFullDate(dateStr);
		let time = this.getFormattedTime(dateStr);

		if (dt && time) {
			return dt + ", " + time;
		}
	},

	getFullDateTimeAdvanced: function (dateStr, in12HrFormat, withSeconds) {

		let dt = this.getFullDate(dateStr);
		let time = this.getFormattedTimeAdvanced(dateStr, in12HrFormat, withSeconds);

		if (dt && time) {
			return dt + ", " + time;
		}
	},

}