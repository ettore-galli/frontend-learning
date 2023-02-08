const getJsonFile = async (jsonFileName) => {
    const response = await fetch(jsonFileName);
    return await response.json();
}

export { getJsonFile }