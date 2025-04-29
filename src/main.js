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

    // Tableau pour stocker les nombres négatifs trouvés
    const negativeNumbers = [];

    // Convertie chaque élément en nombre et les additionne
    let sum = 0;
    for (const element of numberArray) {
        const value = element.trim();
        if (value !== "") {
            const number = parseInt(value);

            // Vérifier si le nombre est négatif
            if (number < 0) {
                negativeNumbers.push(number);
            }

            sum += number;
        }
    }

    // Si des nombres négatifs sont trouvés, lever une exception
    if (negativeNumbers.length > 0) {
        throw new Error(`Negatives not allowed. [${negativeNumbers.join(", ")}]`);
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

    // Vérifie si l'entrée commence par "//"
    if (input.startsWith("//") && input.length >= 4) {
        // Le délimiteur est le troisième caractère (indice 2)
        const potentialDelimiter = input.charAt(2);

        // Vérifie si le quatrième caractère est un saut de ligne
        if (input.charAt(3) === '\n') {
            // Met à jour le délimiteur avec celui spécifié
            result.delimiter = potentialDelimiter;

            // Obtient la sous-chaîne à partir de l'indice 4 (après le délimiteur et le saut de ligne)
            result.numbers = input.substring(4);
        }
    }

    return result;
}