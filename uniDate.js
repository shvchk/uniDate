/*!
 * uniDate sorting DataTables plugin v1.0
 * https://github.com/shvchk/uniDate
 * 
 * Copyright 2011, Andrei Shevchuk
 * Released under the MIT, BSD, and GPL Licenses.
 */

function uniDate(date) {
	// split date by any non-digit character
	var inputDate = date.split(/\D+/g);

	/**
	 * Configure this to suit your needs!
	 *
	 * Your input date has its elements in particular order, and here
	 * you should describe it.
	 *
	 * E.g., if you have date like '2011.11', i.e. no days, no hours,
	 * nothing but year and month, you should set year's position to 1,
	 * month's position to 2, and all other's positions to whatever you
	 * like (I suggest 0 or 9).
	 *
	 * By default we assume your date to be in the following order:
	 * 'day.month.year hour:minute:second', but don't forget that any
	 * non-digit can be used as separator, so even 'day/month.year
	 * hour%minute::second' is ok :)
	 *
	 * So let's assume we have something like 24.12.2012 17:47:39.
	 *
	 * 24 . 12 .2012  17 :  47  :  39
	 *  ^    ^     ^   ^     ^      ^
	 * day.month.year hour:minute:second
	 *  ^    ^     ^   ^     ^      ^
	 *  1    2     3   4     5      6
	 *
	 * Here is how its description looks like:
	 */
	var universalDate = {
		'year': 	3,
		'month': 	2,
		'day': 	1,
		'hour': 	4,
		'minute': 	5,
		'second': 	6
	};
	
	/**
	 * That's it, no more configuration required.
	 *
	 * Don't change anything after this line,
	 * unless you know what you are doing.
	 */

	$.each(universalDate, function(key, value) {
		if (inputDate[value - 1]) {
			universalDate[key] = inputDate[value - 1].toString();
			if (universalDate[key].length == 1) {
				universalDate[key] = 0 + universalDate[key];
			}
		} else {
			universalDate[key] = 0;
		}
	});

	return (universalDate.year + universalDate.month + universalDate.day + universalDate.hour + universalDate.minute + universalDate.second) * 1;
}

jQuery.fn.dataTableExt.oSort['uniDate-asc'] = function(a, b) {
	x = uniDate(a);
	y = uniDate(b);

	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};

jQuery.fn.dataTableExt.oSort['uniDate-desc'] = function(a, b) {
	x = uniDate(a);
	y = uniDate(b);

	return ((x < y) ? 1 : ((x > y) ? -1 : 0));
};