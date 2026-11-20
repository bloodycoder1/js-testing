import { describe, it,expect, vi } from "vitest";
import { notifyUser } from "../src/mocking/notification.service";
import { sendNotification } from "../src/mocking/notification";

// Mocking the Notification Function 
vi.mock("../src/mocking/notification",()=>({sendNotification:vi.fn()}))
describe("notify User",()=>{
    it("Should Create a message and Send the Notification",()=>{
        // ACT
        const resukt = notifyUser("Rahul");

        //Asert
        expect(resukt).toBe("Hello Rahul");
       
        expect(sendNotification).toHaveBeenCalled();

        expect(sendNotification).toHaveBeenCalledTimes(1);

        expect(sendNotification).toHaveBeenCalledWith("Hello Rahul");
    })
})