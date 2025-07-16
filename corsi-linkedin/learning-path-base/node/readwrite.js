const questions = ["Perché?", "Dov'è", "Eh?"];

const chiedi = (i) => {
    process.stdout.write(`\n\n${questions[i]}\n >`);
}

const acquireInput = (raw) => String(raw).trim();

const risposta = (r) => {
    const response = acquireInput(r);

    process.stdout.write(`\n${response}`);
    
    if (response == "Y") {
        process.stdout.write("Y triggered");
        process.yey()
    }
}

process.stdin.on("data", risposta);

process.on("yey", () => {
    process.stdout.write("YEYEYEYEYEYEYEYEY");
})

chiedi(0);