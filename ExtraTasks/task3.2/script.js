function prise(array){
  console.log(array);
  let money = 0;
  let max = Math.max(...array); 
  let min = Math.min(...array); 
  console.log(max, min);
  let arrUp = array.slice().sort(function(a,b){ 
    return a - b
  });
  let arrDown = array.slice().sort(function(a,b){ 
    return b - a
  });
  if(JSON.stringify(arrUp)===JSON.stringify(array)){
    let last = array.length;
    money = array[--last] - array[0];
    console.log('Максимальная прибыль: ', money);
  }
  if(JSON.stringify(arrDown)===JSON.stringify(array)){
    console.log('Выгода равна нулю. Ничего не покупаем и не продаем.');
  }

  console.log(array);
  console.log(arrUp);
  console.log(arrDown);
}

// let array =[1,3,4,7];
let array =[10,9,3,1];
// let array=[253, 81, 73, 410];
prise(array);
