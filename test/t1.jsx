import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    const addTask = () => {
        if (task) {
            setTasks([...tasks, task]);
            setTask('');
        }
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="app">
            <h1>Task List</h1>
            <input 
                type="text" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                placeholder="Add a new task" 
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task} 
                        <button onClick={() => removeTask(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
