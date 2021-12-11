export const calculateCHONKFromBNB = (value) => {
    if (Number.isNaN(parseFloat(value))){
        return "-"
    } 
    return `${parseFloat(value) * 2}`; 
}
export const calculateUSDTFromBNB = (value) => {
    if (Number.isNaN(parseFloat(value))){
        return "-"
    } 
    return `${parseFloat(value) * 3}`;
}
export const calculateBNBFromCHONK = (value) => {
    if (Number.isNaN(parseFloat(value))){
        return "-"
    } 
    return `${parseFloat(value) * 4}`;
}
export const calculateUSDTFromCHONK = (value) => {
    if (Number.isNaN(parseFloat(value))){
        return "-"
    } 
    return `${parseFloat(value) * 5}`;
}
export const calculatePoolSize = (value) => {
    if (Number.isNaN(parseFloat(value))){
        return "-"
    } 
    return `${parseFloat(value) / 2}`;
}