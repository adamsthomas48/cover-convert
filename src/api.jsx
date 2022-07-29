export const splitArray = (array) => {
    const half = Math.ceil(array.length / 2);
    return [array.slice(0, half), array.slice(half)];

}