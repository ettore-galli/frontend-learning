// Various global examples 
// 


console.log(process.argv);

const arg = (idx) => process.argv[idx + 1];

console.log(`Arg 1: ${arg(1)}`);
console.log(`Arg 2: ${arg(2)}`);