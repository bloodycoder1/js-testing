
import { afterAll, describe, expect, it } from '@jest/globals';
import { TaskService } from '../src/services/task.service';
import { TaskRepository } from './../src/repositories/task.repository';
const taskrepo = new TaskRepository();
const taskService = new TaskService(taskrepo);

const createdTaskId:string[]=[];

describe("Task Integration Tests",()=>{
    afterAll(async()=>{
        // Clean Up Test records
        for(const id of createdTaskId){
            await taskrepo.delete(id)
        }
    });
    it("Should create a Task Sucessfully",async()=>{
        // Arrange
        const taskData = {
            title: "Learn Integration Testing",
            description: "Testing with real Supabase"
        };  // Act
        const createdTask = await taskService.createTask(taskData);

        createdTaskId.push(createdTask.id);

        // Assert
        expect(createdTask).toBeDefined();
        expect(createdTask.id).toBeDefined();
        expect(createdTask.title).toBe(taskData.title);
        expect(createdTask.completed).toBe(false);
        
    });
    it("should retrieve the created task from Supabase", async () => {

        // Arrange
        const taskData = {
            title: "Verify Database Integration",
            description: "Checking actual database records"
        };

        const createdTask = await taskService.createTask(taskData);

        createdTaskId.push(createdTask.id);

        // Act
        const retrievedTask = await taskService.getTaskById(createdTask.id);

        // Assert
        expect(retrievedTask).not.toBeNull();
        expect(retrievedTask.id).toBe(createdTask.id);
        expect(retrievedTask.title).toBe(taskData.title);
    });

})