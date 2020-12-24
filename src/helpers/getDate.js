
const date = new Date();
console.log('date', date)
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const hour = date.getHours();
const minutes = date.getMinutes();

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

let fullDate = day + '.' + formatDate(month) + '.' + year + ' ' + hour + ':' + formatDate(minutes);
let millsec =  Date.parse(date);
export const getDate = {
    fullDate: fullDate,
    millsec: millsec,
}

