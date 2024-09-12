const getRandomId = () => {
    const getIntRandom = (): number => {
        return Math.floor(1000000 * Math.random());
    }
    return `${String(getIntRandom)}-${String(getIntRandom)}-${String(getIntRandom)}-${String(getIntRandom)}`;
}

export default getRandomId;