import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { TaskRepository } from "../../src/repositories/task.repository";
import { TaskService } from "../../src/services/task.service";

describe("TaskService Unit Tests",()=>{
    let taskRepo : jest.Mocked<TaskRepository>;
    let taskService:TaskService

    beforeEach(()=>{
        taskRepo={
            create:jest.fn(),
            findById:jest.fn(),
            delete:jest.fn(),
             update: jest.fn(),
            findAll:jest.fn()
        } as unknown as jest.Mocked<TaskRepository>;
        taskService = new TaskService(taskRepo);
    });
    it("DEMO Test",()=>{
        expect(2+4).toBe(6);
    })
    it("should propagate repository errors when fetching tasks", async () => {
        // Arrange
        taskRepo.findAll.mockRejectedValueOnce(
            new Error("Database connection failed")
        );

        // Act & Assert
        await expect(
            taskService.getAllTasks()
        ).rejects.toThrow("Database connection failed");
    });

    it("should return all tasks successfully", async () => {
    // Arrange
        const mockTasks = [
            {
                id: "task-1",
                title: "Learn Jest",
                description: "Practice unit testing",
                completed: false,
                created_at: new Date().toISOString(),
            },
        ];

        taskRepo.findAll.mockResolvedValueOnce(mockTasks);

        // Act
        const result = await taskService.getAllTasks();

        // Assert
        expect(result).toEqual(mockTasks);
        expect(taskRepo.findAll).toHaveBeenCalledTimes(1);
    });


    it("should call repository with the correct task ID", async () => {
        // Arrange
        const taskId = "task-123";

        const mockTask = {
            id: taskId,
            title: "Learn Jest",
            description: "Practice spies",
            completed: false,
            created_at: new Date().toISOString(),
        };

        const spy = jest.spyOn(taskRepo, "findById");

        spy.mockResolvedValueOnce(mockTask);

        // Act
        await taskService.getTaskById(taskId);

        // Assert
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(taskId);
    });

})
describe("TestingService Validations the Task",()=>{
        let taskRepo : jest.Mocked<TaskRepository>;
        let taskService:TaskService
        

        beforeEach(()=>{
            taskRepo={
                create:jest.fn(),
                findById:jest.fn(),
                delete:jest.fn(),
                findAll:jest.fn(),
                 update: jest.fn()
            } as unknown as jest.Mocked<TaskRepository>;
            taskService = new TaskService(taskRepo);
        });
    it("should reject an empty task title", async () => {
    // Arrange
        const taskData = {
            title: "",
            description: "Testing validation",
        };

        // Act & Assert
        await expect(
            taskService.createTask(taskData)
        ).rejects.toThrow("Task title is required");

        // Verify repository was never called
        expect(taskRepo.create).not.toHaveBeenCalled();
    });
    it("should trim the task title before saving", async () => {
        // Arrange
        const taskData = {
            title: "  Learn TypeScript  ",
            description: "Testing title trimming",
        };

        const mockTask = {
            id: "task-123",
            title: "Learn TypeScript",
            description: "Testing title trimming",
            completed: false,
            created_at: new Date().toISOString(),
        };

        taskRepo.create.mockResolvedValueOnce(mockTask);

        // Act
        await taskService.createTask(taskData);

        // Assert
        expect(taskRepo.create).toHaveBeenCalledWith({
            ...taskData,
            title: "Learn TypeScript",
        });
    });

    it("should update a task successfully", async () => {

        const updatedTask = {
            id: "123",
            title: "Learn Advanced TypeScript",
            description: "Practice TypeScript",
            completed: true,
            created_at: new Date().toISOString()
        };

        taskRepo.update.mockResolvedValueOnce(updatedTask);

        const result = await taskService.updateTask("123", {
            title: "Learn Advanced TypeScript"
        });

        expect(result).toEqual(updatedTask);

        expect(taskRepo.update).toHaveBeenCalledWith(
            "123",
            {
                title: "Learn Advanced TypeScript"
            }
        );

        expect(taskRepo.update).toHaveBeenCalledTimes(1);
    });

    
    it("should propagate repository errors when updating a task", async () => {

            // Arrange
            taskRepo.update.mockRejectedValueOnce(
                new Error("Database connection failed")
            );

            // Act & Assert
            await expect(
                taskService.updateTask("123", {
                    title: "Learn Advanced TypeScript"
                })
            ).rejects.toThrow("Database connection failed");

            // Verify repository was called
            expect(taskRepo.update).toHaveBeenCalledTimes(1);

            expect(taskRepo.update).toHaveBeenCalledWith(
                "123",
                {
                    title: "Learn Advanced TypeScript"
                }
            );
    });

})