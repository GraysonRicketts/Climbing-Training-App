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

export function formatDate_MMMM_DD_YYYY(dateInMilliseconds) {
    const date = _parseDateInMilliseconds(dateInMilliseconds);

    const year = date.getFullYear();
    let month = date.getMonth();
    month = MONTH_NAMES[month];
    const day = date.getDate();

    if (year === NaN || month === NaN || day === NaN) {
        return null;
    }
    
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
}

export function formatDate_YYYY_MM_DD(dateInMilliseconds) {
    const date = _parseDateInMilliseconds(dateInMilliseconds);

    const year = date.getFullYear();
    const month = MONTH_NUM_STRING[date.getMonth()];
    const day = date.getDate();

    if (!year || !month || !day) {
        return null;
    }
    
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

function _parseDateInMilliseconds(dateInMilliseconds) {
    return new Date(parseInt(dateInMilliseconds));
}