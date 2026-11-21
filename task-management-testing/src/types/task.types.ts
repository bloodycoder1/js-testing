export interface Task {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    created_at: string;
}

export interface CreateTaskDTO {
    title: string;
    description?: string;
}