function getString(){
  let str = prompt("Введите ряд чисел (числа через запятую):");
  let validArr = /^(\-?[0-9]{1,}(\,){0,1}){1,}$/;
  while (validArr.test(str) === false){
		str = prompt('Некорректные данные!\nВведите числa через запятую без пробела.');
  }
  return str;
}

function getArray(str){
  const arr = str.split(',');
  for(let i=0; i<arr.length; i++){
    arr[i] = +arr[i];
  }
  return arr;
}

function MaxSum(arr) {
  let maxSum = 0;
  for (let i = 0; i < arr.length; i++) {
    let sumStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumStart += arr[j];
      maxSum = Math.max(maxSum, sumStart);
    }
  }
  return maxSum;
}

function print(arr){
  document.write(`Массив: ${arr}<br/> Максимальная подсумма: ${MaxSum(arr)}<br/><br/>
`)
}
//ввод массива пользователем
let arr = getString();
arr = getArray(arr);
print(arr);
console.log(arr);
console.log(MaxSum(arr));
//массивы
let arr1 = [-2, -3, -3, -9];
print(arr1);
console.log(arr1);
console.log(MaxSum(arr1));

let arr2 = [140, -90, 34, 63];
print(arr2);
console.log(arr2);
console.log(MaxSum(arr2));

let arr3 = [12, -7, 5, -9];
print(arr3);
console.log(arr3);
console.log(MaxSum(arr3));
