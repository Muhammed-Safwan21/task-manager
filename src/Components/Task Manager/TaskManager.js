import React from "react";
import { useState } from "react";
import "./TaskManager.css";

function TaskManager() {
  const [task, setTask] = useState([]);
  const [inputValue, setInputValue] = useState("");
  function addTask() {
    if (inputValue.length === 0) return;
    setTask([
      ...task,
      //inputValue
      {
        content: inputValue,
        isComplete: false,
        isEditing: false,
      },
    ]);
    setInputValue("");
  }
  function deleteTask(taskIndex) {
    task.splice(taskIndex, 1);
    setTask([...task]);
  }
  function markComplete(taskIndex) {
    task[taskIndex].isComplete = !task[taskIndex].isComplete;
    setTask([...task]);
  }
  function editTask(taskIndex) {
    task[taskIndex].isEditing = true;
    setTask([...task]);
  }
  function updateValue(taskIndex, value) {
    task[taskIndex].content = value;
    setTask([...task]);
  }
  function saveTask(taskIndex) {
    task[taskIndex].isEditing = false;
    setTask([...task]);
  }
  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <div className="tasks">
        {task
          .sort((a) => (a.isComplete ? 1 : -1))
          .map((task, index) => (
            <div
              key={index}
              className={
                "task " + (task.isComplete ? "completed" : "incomplete")
              }
            >
              <input
                type="checkbox"
                checked={task.isComplete}
                onChange={() => markComplete(index)}
                name=""
                id=""
              />
              {task.isEditing ? (
                <input
                  type="text"
                  value={task.content}
                  onChange={(event) => updateValue(index, event.target.value)}
                  className="editInput"
                />
              ) : (
                <span className="content">
                  {
                    //task.content
                    task.isComplete ? <del>{task.content}</del> : task.content
                  }
                </span>
              )}
              {task.isEditing ? (
                <button onClick={() => saveTask(index)} className="save">
                  Save
                </button>
              ) : (
                <button onClick={() => editTask(index)} className="edit">
                  Edit
                </button>
              )}

              <button onClick={() => deleteTask(index)} className="delete">
                Delete
              </button>
            </div>
          ))}
      </div>

      <div className="add-task-container">
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
}

export default TaskManager;
