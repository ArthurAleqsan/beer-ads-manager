
export const updateInArray = (array, findFn, updateFn) => {
    const index = array.findIndex(findFn);
    const elem = array.find(findFn);
    const newArray = [...array];
    newArray.splice(index, 1, updateFn(elem));
    return newArray;
}

export const getTimeValuefromDuration = value => {
    const h = Math.floor(value / 3600);
    const m = value > 3600 ? value % 3600 : Math.floor(value / 60) == 60 ? 0 : Math.floor(value / 60);
    const s = value > 60 ? value % 60 : value == 60 ? 0 : value;
    const duration = `${h > 9 ? h : '0' + h}:${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}`;
    return duration;
}
export const getDurationSeconds = str => {
    const arr = str.split(':');
    const s = +arr[0] * 3600 + +arr[1] * 60 + +arr[2];
    return s;
}
export const removeFromArray = (array, findFn) => {
    const index = array.findIndex(findFn);
    const newArray = [...array];
    newArray.splice(index, 1);
    return newArray;
}
export const getParam = (str, separator, index) => str.split(separator)[index].split('&')[0];
export const getTypeOfDroppedItem = (item) => {
    let type;
    if (item.image) {
        type = 'image';
    } else {
        type = 'product';
    }
    return type;
}
