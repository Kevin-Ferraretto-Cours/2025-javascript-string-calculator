export function add(numbers) {
    // Si la chaîne est vide, retourner 0
    if (numbers === "") {
        return 0;
    }

    // Split la chaîne par les virgules pour obtenir un tableau de nombres
    const numberArray = numbers.split(",");

    // Convertie chaque élément en nombre et les additionne
    return numberArray.reduce((sum, currentValue) => {
        return sum + parseInt(currentValue);
    }, 0);
}