// Esta función calcula el promedio de todos los valores en una matriz
export const avg = array => {
  let totalItems = 0;
  const sum = array.reduce((acc, r) => {
    return acc + r.reduce((acc, v) => {
      totalItems++;
      return acc + v;
    }, 0)
  }, 0);
  return sum/totalItems;
}
// Esta función calcula la varianza
export const varianza = array => {
  let totalItems = 0;
  const avgVal = avg(array);
  const sum = array.reduce((acc, r) => {
    return acc + r.reduce((acc, v) => {
      totalItems++;
      return acc + (Math.pow((v - avgVal), 2));
    }, 0)
  }, 0);
  return (1 / (totalItems - 1)) * sum;
}
// Esta función calcula cuántos valores de una matriz están dentro de un rango
export const countRange = (array, minVal, maxVal) => {
  return array.reduce((acc, r) => {
    return acc + r.reduce((acc, v) => {
      if(v > minVal && v < maxVal) {
        return acc + 1;
      }
      return acc;
    }, 0)
  }, 0);
}
// Esta función devuelve un vector ordenado a partir de una matriz
export const mat2arrSort = (array, minVal, maxVal) => {
  const arr = [];
  array.map(r => r.map(v => arr.push(v)));
  arr.sort();
  return arr;
}
