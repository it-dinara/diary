
const data = new Date();
const year = data.getFullYear();
const month = data.getMonth();
const day = data.getDate();
const hour = data.getHours();
const minutes = data.getMinutes();

const formatDate = (num) => {
    const newNum = num + 1;
    let res = '';
    if(newNum.toString().length < 2) {
        res = '0' + newNum
    } else {
        res = newNum
    }
    return res
}

const fullDate = day + '.' + formatDate(month) + '.' + year + ' ' + hour + ':' + formatDate(minutes);
const millsec =  Date.parse(data);
export const getDate = {
    fullDate: fullDate,
    millsec: millsec,
}

