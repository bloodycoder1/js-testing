import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import { add, getuser, subtract } from "../src/app/script"

describe("We are Testing the add and Sub",()=>{
    it("should add two numbers correctly",()=>{

        // Arrange
        const a = 10;
        const b = 20;

        // Act
        const result = add(a, b);

        // Assert
        expect(result).toBe(30);
    });
     it('should subtract two numbers correctly', () => {

        // Arrange
        const a = 20;
        const b = 10;

        // Act
        const result = subtract(a, b);

        // Assert
        expect(result).toBe(10);

    });
    it("The Id 101 expeacted",()=>{
        let result = getuser();
        expect(result.id).toBe(101)
    })
    it("Veryfing the name Alex",()=>{
        let result = getuser();
        expect(result.name).toBe("Alex")
    })
    it("Veryfing Typescript in the Skills array",()=>{
        let result = getuser();
        expect(result.skills).toContain("TypeScript")
    })
    it("Veryfing length of the Skill  array",()=>{
        let result = getuser();
        expect(result.skills).toHaveLength(3);
    })
    it("Veryfing user is active",()=>{
        let result = getuser();
        expect(result.isActive).toBeTruthy();
    })

})


describe("User Tests", () => {
  let user: { id: number; name: string } | null;

  beforeEach(() => {
    user = {
      id: 101,
      name: "Alex",
    };
  });

  afterEach(() => {
    user = null;
  });

  it("should verify user ID", () => {
    expect(user?.id).toBe(101);
  });

  it("should verify user name", () => {
    expect(user?.name).toBe("Alex");
  });
});



describe("Application Tests", () => {
  let appReady = false;

  beforeAll(() => {
    appReady = true;
  });

  it("should verify application setup", () => {
    expect(appReady).toBe(true);
  });

  afterAll(() => {
    appReady = false;
    console.log("Cleaning up test environment");
  });
});