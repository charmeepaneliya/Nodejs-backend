
const fs = require('fs');

function calculate(a,b){
    let sum = a+b;
    return sum;
}

let result = calculate(10,20);

fs.writeFileSync('result.txt',"sum is: " + result);

console.log("sum: ",result);

