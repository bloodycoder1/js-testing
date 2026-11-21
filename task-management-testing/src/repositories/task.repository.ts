import { supabase } from "../config/supabase";
import { Task, CreateTaskDTO } from "../types/task.types";

export class TaskRepository {

    async create(data: CreateTaskDTO): Promise<Task> {

        const { data: task, error } = await supabase
            .from("tasks")
            .insert(data)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return task as Task;
    }

    async findAll(): Promise<Task[]> {

        const { data, error } = await supabase
            .from("tasks")
            .select("*");

        if (error) {
            throw new Error(error.message);
        }

        return data as Task[];
    }

    async findById(id: string): Promise<Task | null> {

        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("id", id)
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return data as Task | null;
    }

    async delete(id: string): Promise<void> {

        const { error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", id);

        if (error) {
            throw new Error(error.message);
        }
    }
}