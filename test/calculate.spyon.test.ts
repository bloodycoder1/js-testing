import { describe, it,vi, expect } from "vitest";
import { calculator } from "../src/spyOn/calculate";

describe("Spy Testing",()=>{
    it("Should Spy on Added Method",()=>{
        const spy = vi.spyOn(calculator,"add");
        const result =calculator.add(10,20);
        expect(result).toBe(30);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(10,20);
        expect(spy).toHaveBeenCalledOnce();
    })
})