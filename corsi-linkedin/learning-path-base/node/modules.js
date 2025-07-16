const v8 = require("v8");
const rl = require("readline");
console.log(
    v8.getHeapStatistics()
)

const readline=rl.createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question("khcajkshc k?", answer=>answer);