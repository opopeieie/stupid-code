interface Task {
    id: number;
    text: string;
}

class TaskList {
    private tasks: Task[] = [];

    addTask(text: string): void {
        if (text) {
            const newTask: Task = { id: Date.now(), text };
            this.tasks.push(newTask);
            this.displayTasks();
        }
    }

    removeTask(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.displayTasks();
    }

    displayTasks(): void {
        console.clear();
        console.log('Task List:');
        this.tasks.forEach(task => {
            console.log(`${task.text} (ID: ${task.id})`);
        });
    }
}

// Example usage
const taskList = new TaskList();
taskList.addTask('Buy groceries');
taskList.addTask('Walk the dog');
taskList.removeTask(1); // Assuming ID 1 exists
