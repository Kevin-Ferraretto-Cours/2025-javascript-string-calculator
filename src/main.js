export function add(numbers) {
    // Si la chaîne est vide, retourner 0
    if (numbers === "") {
        return 0;
    }

    // Extraction du délimiteur et de la chaîne de nombres
    const { delimiter, numbers: inputString } = extractDelimiterAndNumbers(numbers);

    // Remplacer les retours à la ligne par le délimiteur personnalisé
    let normalizedInput = inputString;
    while (normalizedInput.includes('\n')) {
        normalizedInput = normalizedInput.replace('\n', delimiter);
    }

    // Split la chaîne par les virgules pour obtenir un tableau de nombres
    const numberArray = normalizedInput.split(delimiter);

    // Convertie chaque élément en nombre et les additionne
    let sum = 0;
    for (const element of numberArray) {
        const value = element.trim();
        if (value !== "") {
            sum += parseInt(value);
        }
    }

    return sum;
}

/**
 * Extrait le délimiteur personnalisé et la chaîne de nombres d'une entrée
 * @param {string} input - La chaîne d'entrée à analyser
 * @returns {Object} Un objet contenant le délimiteur et la chaîne de nombres
 */
export function extractDelimiterAndNumbers(input) {
    const result = {
        delimiter: ",", // valeur par défaut
        numbers: input
    };

    // Vérifie s'il y a un délimiteur personnalisé défini
    const customDelimiterPattern = /^\/\/(.)\n([\s\S]*)/;
    const customDelimiterMatch = input.match(customDelimiterPattern);

    if (customDelimiterMatch) {
        // Mise à jour avec le délimiteur personnalisé et la chaîne de nombres
        result.delimiter = customDelimiterMatch[1];
        result.numbers = customDelimiterMatch[2];
    }

    return result;
}