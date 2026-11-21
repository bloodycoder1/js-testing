// import {describe, it,expect} from 
import { describe, it, expect } from "@jest/globals";
describe("Basic Jest Test", () => {
    it("should add two numbers correctly", () => {
        const result = 10 + 20;

        expect(result).toBe(30);
    });
});