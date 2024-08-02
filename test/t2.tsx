import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

interface AppProps {}
interface Task {
    id: number;
    text: string;
}

const App: React.FC<AppProps> = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskText, setTaskText] = useState('');

    const addTask = () => {
        if (taskText) {
            const newTask = { id: Date.now(), text: taskText };
            setTasks([...tasks, newTask]);
            setTaskText('');
        }
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="app">
            <h1>Task List</h1>
            <input 
                type="text" 
                value={taskText} 
                onChange={(e) => setTaskText(e.target.value)} 
                placeholder="Add a new task" 
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.text} 
                        <button onClick={() => removeTask(task.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
