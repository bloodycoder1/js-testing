
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
    it("it should delete the task sucessfullt",async()=>{
        const taskData={
            title:"Task we want to delete",
            description:"Checking if we can insert and delete the Data from DB"
        }
        const createdTask = await taskService.createTask(taskData);
         createdTaskId.push(createdTask.id);

        const retriveTask = await taskService.getTaskById(createdTask.id);
        // console.log(retriveTask);
        const deleteTaskRes = await taskService.deleteTask(createdTask.id);
        await expect(taskService.getTaskById(createdTask.id)).rejects.toThrow("Task not found")
        
    })
    it("To get all the Tasks",async()=>{
        const task1=await taskService.createTask({
            title:"task1",
            description:"task1 to get working"
        })
        const task2=await taskService.createTask({
            title:"task2",
            description:"task2 to get working"
        });
        createdTaskId.push(task1.id,task2.id)
        const tasks = await taskService.getAllTasks();

        expect(tasks).toBeDefined();
        expect(Array.isArray(tasks)).toBe(true)

        expect(tasks.some(task=>task1.id==task.id)).toBe(true)
        expect(tasks.some(task=>task2.id==task.id)).toBe(true)

        
    })


    it("should reject a task title exceeding 255 characters", async () => {
        // Arrange
        const taskData = {
            title: "A".repeat(256),
            description: "Testing database constraints",
        };

        // Act & Assert
        await expect(
            taskrepo.create(taskData)
        ).rejects.toThrow();
    });

    

})