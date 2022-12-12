// format date like this January 01, 2022. 01:09pm

const dateFormatter = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hour >= 12 ? 'pm' : 'am';
    const formattedDate = `${month} ${day}, ${year}. ${hour}:${minutes}${ampm}`;
    return formattedDate;
}

export default dateFormatter;