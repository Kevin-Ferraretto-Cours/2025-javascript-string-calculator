import {describe, expect, it} from 'vitest';
import {add, extractDelimiterAndNumbers} from "../src/main.js";

describe('extractDelimiterAndNumbers function', () => {
    it('should return default delimiter (,) for input without custom delimiter', () => {
        const result = extractDelimiterAndNumbers("1,2,3");
        expect(result.delimiter).toBe(",");
        expect(result.numbers).toBe("1,2,3");
    });

    it('should return default delimiter (,) for empty string', () => {
        const result = extractDelimiterAndNumbers("");
        expect(result.delimiter).toBe(",");
        expect(result.numbers).toBe("");
    });

    it('should extract custom delimiter correctly', () => {
        const result = extractDelimiterAndNumbers("//;\n1;2;3");
        expect(result.delimiter).toBe(";");
        expect(result.numbers).toBe("1;2;3");
    });

    it('should extract custom delimiter and handle empty numbers string', () => {
        const result = extractDelimiterAndNumbers("//;\n");
        expect(result.delimiter).toBe(";");
        expect(result.numbers).toBe("");
    });

    it('should extract special characters as custom delimiters', () => {
        const result1 = extractDelimiterAndNumbers("//.\n1.2.3");
        expect(result1.delimiter).toBe(".");
        expect(result1.numbers).toBe("1.2.3");

        const result2 = extractDelimiterAndNumbers("//-\n1-2-3");
        expect(result2.delimiter).toBe("-");
        expect(result2.numbers).toBe("1-2-3");

        const result3 = extractDelimiterAndNumbers("//|\n1|2|3");
        expect(result3.delimiter).toBe("|");
        expect(result3.numbers).toBe("1|2|3");
    });

    it('should extract multi-line numbers after custom delimiter definition', () => {
        const result = extractDelimiterAndNumbers("//;\n1;2\n3;4");
        expect(result.delimiter).toBe(";");
        expect(result.numbers).toBe("1;2\n3;4");
    });

    it('should not mistake "//" at the beginning of a normal string as a delimiter definition', () => {
        const result = extractDelimiterAndNumbers("//not a delimiter\n1,2,3");
        expect(result.delimiter).toBe(",");
        expect(result.numbers).toBe("//not a delimiter\n1,2,3");
    });

    it('should require a newline after delimiter definition', () => {
        const result = extractDelimiterAndNumbers("//;1;2;3");
        expect(result.delimiter).toBe(",");
        expect(result.numbers).toBe("//;1;2;3");
    });

    it('should extract multi-character delimiter correctly', () => {
        const result = extractDelimiterAndNumbers("//[***]\n1***2***3");
        expect(result.delimiter).toBe("***");
        expect(result.numbers).toBe("1***2***3");
    });

    it('should extract delimiter with special characters', () => {
        const result = extractDelimiterAndNumbers("//[++]\n1++2++3");
        expect(result.delimiter).toBe("++");
        expect(result.numbers).toBe("1++2++3");
    });

    it('should handle empty numbers string with multi-character delimiter', () => {
        const result = extractDelimiterAndNumbers("//[###]\n");
        expect(result.delimiter).toBe("###");
        expect(result.numbers).toBe("");
    });

    it('should extract delimiter with mixed special characters', () => {
        const result = extractDelimiterAndNumbers("//[*+!]\n1*+!2*+!3");
        expect(result.delimiter).toBe("*+!");
        expect(result.numbers).toBe("1*+!2*+!3");
    });

    it('should require proper format with brackets', () => {
        // Si le format n'est pas correct (pas de crochets), utiliser le délimiteur par défaut
        const result = extractDelimiterAndNumbers("//***\n1***2***3");
        expect(result.delimiter).toBe(",");
        expect(result.numbers).toBe("//***\n1***2***3");
    });

    it('should require closing bracket', () => {
        // Si le crochet fermant est manquant, utiliser le délimiteur par défaut
        const result = extractDelimiterAndNumbers("//[***\n1***2***3");
        expect(result.delimiter).toBe(",");
        expect(result.numbers).toBe("//[***\n1***2***3");
    });
});


describe('add function', () => {
    it('should return 0 for empty string', () => {
        expect(add("")).toBe(0);
    });

    it('should return the number itself when only one number is provided', () => {
        expect(add("1")).toBe(1);
        expect(add("5")).toBe(5);
        expect(add("42")).toBe(42);
    });

    it('should return the sum of all numbers when multiple numbers are provided', () => {
        expect(add("1,2")).toBe(3);
        expect(add("1,2,3")).toBe(6);
        expect(add("5,10,15,20")).toBe(50);
    });

    it('should handle large number of inputs', () => {
        expect(add("1,2,3,4,5,6,7,8,9,10")).toBe(55);
    });

    it('should handle zero values', () => {
        expect(add("0")).toBe(0);
        expect(add("0,0,0")).toBe(0);
        expect(add("1,0,2,0,3")).toBe(6);
    });

    it('should handle newline as delimiter', () => {
        expect(add("1\n2,3")).toBe(6);
        expect(add("1\n2\n3")).toBe(6);
        expect(add("5\n10,15\n20")).toBe(50);
    });

    it('should handle mixed delimiters', () => {
        expect(add("1,2\n3,4\n5")).toBe(15);
    });

    it('should handle custom delimiter defined with //[delimiter]\\n format', () => {
        expect(add("//;\n1;2")).toBe(3);
        expect(add("//;\n1;2;3")).toBe(6);
        expect(add("//:\n5:10:15:20")).toBe(50);
    });

    it('should handle special characters as custom delimiters', () => {
        expect(add("//.\n1.2.3")).toBe(6);
        expect(add("//-\n5-10-15")).toBe(30);
        expect(add("//|\n1|2|3")).toBe(6);
    });

    it('should handle custom delimiter and still support newlines within numbers', () => {
        expect(add("//;\n1;2\n3")).toBe(6);
    });

    it('should throw an error when a single negative number is provided', () => {
        expect(() => add("-1")).toThrow("Negatives not allowed. [-1]");
    });

    it('should throw an error when multiple negative numbers are provided', () => {
        expect(() => add("-1,2,-3,4")).toThrow("Negatives not allowed. [-1, -3]");
    });

    it('should throw an error with negative numbers with custom delimiter', () => {
        expect(() => add("//;\n-1;2;-3")).toThrow("Negatives not allowed. [-1, -3]");
    });

    it('should throw an error with negative numbers and newlines', () => {
        expect(() => add("1\n-2\n3,-4")).toThrow("Negatives not allowed. [-2, -4]");
    });

    it('should ignore numbers greater than 1000', () => {
        expect(add("1,2,1001")).toBe(3);
        expect(add("2,1000,1001")).toBe(1002); // 1000 est inclus, mais pas 1001
    });

    it('should handle the example case "1\\n2,1002" == 3', () => {
        expect(add("1\n2,1002")).toBe(3);
    });

    it('should work with mixed valid and invalid numbers', () => {
        expect(add("5,1001,10,2000,15")).toBe(30);
    });

    it('should work with custom delimiters and numbers > 1000', () => {
        expect(add("//;\n1;2;1001;3")).toBe(6);
    });

    it('should work with exact boundary number 1000', () => {
        expect(add("1000")).toBe(1000);
        expect(add("1000,1001")).toBe(1000);
    });

    it('should handle multi-character delimiters', () => {
        expect(add("//[***]\n1***2***3")).toBe(6);
        expect(add("//[++]\n5++10++15")).toBe(30);
        expect(add("//[::]\n1::2::3::4")).toBe(10);
    });

    it('should handle longer multi-character delimiters', () => {
        expect(add("//[delimiter]\n1delimiter2delimiter3")).toBe(6);
        expect(add("//[sep]\n5sep10sep15sep20")).toBe(50);
    });

    it('should handle multi-character delimiter with special chars', () => {
        expect(add("//[*+!]\n1*+!2*+!3")).toBe(6);
        expect(add("//[.;,]\n5.;,10.;,15")).toBe(30);
    });

    it('should handle multi-character delimiter and support newlines within numbers', () => {
        expect(add("//[***]\n1***2\n3***4")).toBe(10);
    });

    it('should throw an error when negative numbers are provided with multi-character delimiter', () => {
        expect(() => add("//[***]\n1***-2***3")).toThrow("Negatives not allowed. [-2]");
        expect(() => add("//[++]\n-5++10++-15")).toThrow("Negatives not allowed. [-5, -15]");
    });

    it('should ignore numbers greater than 1000 with multi-character delimiter', () => {
        expect(add("//[***]\n1***2***1001")).toBe(3);
        expect(add("//[***]\n1000***1001***2")).toBe(1002);
    });

    it('should handle empty input with multi-character delimiter definition', () => {
        expect(add("//[***]\n")).toBe(0);
    });
});