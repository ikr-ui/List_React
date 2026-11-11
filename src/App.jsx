
import { useState, useEffect } from 'react';

function App() {
  const [taskInput, setTaskInput] = useState('');

  // Load saved tasks when the application starts
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Save tasks whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const displayTask = () => {
    if (taskInput.trim() === '') {
      alert('Please enter a task!');
      return;
    }

    setTasks([...tasks, taskInput]);
    setTaskInput('');
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter(
      (task, i) => i !== index
    );

    setTasks(updatedTasks);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Add a task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />

        <button onClick={displayTask}>Add</button>

        <div>
          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>Task</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task}</td>
                  <td>
                    <button onClick={() => deleteTask(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
