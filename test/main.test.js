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
});