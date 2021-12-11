const countDownDate = new Date(Date.UTC(2022, 0, 17, 22, 0)); // monat ist als index zu behandeln, sprich 0 für januar
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;

export const isCountdownDone = () => {
    return countDownDate < new Date();
}

export const getTimeRemaining = () => {
    const milliseconds = countDownDate.getTime() - new Date().getTime();
    const seconds = Math.floor(milliseconds % minute / second);
    const minutes = Math.floor(milliseconds % hour / minute);
    const hours = Math.floor(milliseconds % day / hour);
    const days = Math.floor(milliseconds % week / day);
    const weeks = Math.floor(milliseconds / week);
    return `${weeks}w ${days}d ${hours}h ${minutes}m ${seconds}s`;
}