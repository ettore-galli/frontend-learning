


function remindMe(what: string, delay: number, action: (message: string) => void): void {
    const remindMessage = `REMINDER: ${what}`;

    setTimeout(() => { action(remindMessage) }, delay);
}