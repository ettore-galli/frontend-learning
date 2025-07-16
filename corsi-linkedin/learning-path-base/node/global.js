// Various global examples 
// 

let who = "world";
const path = require('path');

console.log(`Hello ${who}!`, __filename, __dirname);
console.log(path.basename(__filename));


for (key in global){
    console.log(key);
}