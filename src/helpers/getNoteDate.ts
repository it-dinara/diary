const date: Date = new Date();
const year: number = date.getFullYear();
const month: number = date.getMonth();
const day: number = date.getDate();
const hour: number = date.getHours();
const minutes: number = date.getMinutes();

const formatDate = (num: number): string => {
  const newNum: number = num + 1;
  let res: string = "";
  if (newNum.toString().length < 2) {
    res = "0" + newNum;
  } else {
    res = newNum.toString();
  }
  return res;
};

let fullDate: string = `${day}.${formatDate(
  month
)}.${year} ${hour}:${formatDate(minutes)}`;
let millsec: number = Date.parse(date.toString());
const getNoteDate: { fullDate: string; millsec: number } = {
  fullDate,
  millsec,
};

export default getNoteDate;
