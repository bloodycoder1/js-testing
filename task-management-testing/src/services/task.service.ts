import { TaskRepository } from "../repositories/task.repository";
import { CreateTaskDTO, Task } from "../types/task.types";
import { UpdateTaskDTO } from './../types/task.types';

export class TaskService {

    constructor(
        private taskRepository: TaskRepository
    ) {}

    async createTask(data: CreateTaskDTO): Promise<Task> {

        if (!data.title || !data.title.trim()) {
            throw new Error("Task title is required");
        }

        return await this.taskRepository.create({
            ...data,
            title: data.title.trim()
        });
    }

    async getAllTasks(): Promise<Task[]> {

        return await this.taskRepository.findAll();
    }

    async getTaskById(id: string): Promise<Task> {

        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new Error("Task not found");
        }

        return task;
    }

    async deleteTask(id: string): Promise<void> {

        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new Error("Task not found");
        }

        await this.taskRepository.delete(id);
    }
    
    async updateTask(
        id: string,
        data: UpdateTaskDTO
    ): Promise<Task> {
        return await this.taskRepository.update(id, data);
    }

}