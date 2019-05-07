/**
 * Format dates
 */

const MONTH_NAMES = [
    "January",
     "February",
     "March",
     "April",
     "May",
     "June",
     "July",
     "August",
     "September",
     "October",
    "November",
    "December",
 ]

 const MONTH_NUM_STRING = [
     '01',
     '02',
     '03',
     '04',
     '05',
     '06',
     '07',
     '08',
     '09',
     '10',
     '11',
     '12',
]

/**
 * Turn a date in ms since epoch into a human-readable string
 * 
 * @param dateInMilliseconds 
 */
function formatDate_MMMM_DD_YYYY(dateInMilliseconds: string | number): string {
    const date = _parseDateParameter(dateInMilliseconds);

    const year = date.getFullYear();
    const monthNum = date.getMonth();
    const monthName = MONTH_NAMES[monthNum];
    const day = date.getDate();
    
    const formattedDate = `${monthName} ${day}, ${year}`;
    return formattedDate;
}

/**
 * Turn a date in ms since epoch into a human-readable string
 * 
 * @param dateInMilliseconds 
 */
function formatDate_YYYY_MM_DD(dateInMilliseconds: string | number): string {
    const date = _parseDateParameter(dateInMilliseconds);

    const year = date.getFullYear();
    const month = MONTH_NUM_STRING[date.getMonth()];
    const day = date.getDate();

    // Add '0' if less than 10
    const formattedDay = day < 10 ? `0${day}` : day;
    
    const formattedDate = `${year}-${month}-${formattedDay}`;
    return formattedDate;
}

/** Determine if a date is a string */
function _dateIsString(dateInMilliseconds: string | number) : dateInMilliseconds is string {
    return typeof dateInMilliseconds === 'string'; 
}

/** Take a date in ms and turn it into a Date object */
function _parseDateParameter(dateInMilliseconds: string | number): Date {
    let dateInMS = dateInMilliseconds;
    if (_dateIsString(dateInMilliseconds)) {
        dateInMS = parseInt(dateInMilliseconds);
    } 

    const date = new Date(dateInMS);
    
    return date;
}

export { formatDate_MMMM_DD_YYYY };
export { formatDate_YYYY_MM_DD };