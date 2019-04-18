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

export default function formatDate_MMMM_DD_YYYY(dateInMilliseconds) {
    const date = new Date(parseInt(dateInMilliseconds));

    const year = date.getFullYear();
    let month = date.getMonth();
    month = MONTH_NAMES[month];
    const day = date.getDate();
    
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
}