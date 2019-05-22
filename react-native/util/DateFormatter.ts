const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const MONTH_NUM_STRING = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

/**
 * @description Determine if a date is a string
 * @param dateInMilliseconds - Number of milliseconds since the epoch.
 * @returns If the parameter passed in is a string.
 */
function dateIsString(dateInMilliseconds: string | number): dateInMilliseconds is string {
    return typeof dateInMilliseconds === 'string';
}

/**
 * @description Take a date in ms and turn it into a Date object
 * @param dateInMilliseconds - Number of milliseconds since the epoch.
 */
function parseDateParameter(dateInMilliseconds: string | number): Date {
    let dateInMS = dateInMilliseconds;
    if (dateIsString(dateInMilliseconds)) {
        dateInMS = parseInt(dateInMilliseconds, 10);
    }

    const date = new Date(dateInMS);

    return date;
}

/**
 * @description Turn a date in ms since epoch into a human-readable string
 * @param dateInMilliseconds - Number of milliseconds since the epoch.
 */
function formatDateMMMMDDYYYY(dateInMilliseconds: string | number): string {
    const date = parseDateParameter(dateInMilliseconds);

    const year = date.getFullYear();
    const monthNum = date.getMonth();
    const monthName = MONTH_NAMES[monthNum];
    const day = date.getDate();

    const formattedDate = `${monthName} ${day}, ${year}`;
    return formattedDate;
}

/**
 * @description Turn a date in ms since epoch into a human-readable string
 * @param dateInMilliseconds - Number of milliseconds since the epoch.
 */
function formatDateYYYYMMDD(dateInMilliseconds: string | number): string {
    const date = parseDateParameter(dateInMilliseconds);

    const year = date.getFullYear();
    const month = MONTH_NUM_STRING[date.getMonth()];
    const day = date.getDate();

    // Add '0' if less than 10
    const formattedDay = day < 10 ? `0${day}` : day;

    const formattedDate = `${year}-${month}-${formattedDay}`;
    return formattedDate;
}

export { formatDateMMMMDDYYYY, formatDateYYYYMMDD };
