import {describe, expect, it} from 'vitest';
import {add} from "../src/main.js";

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
});