import React from "react";
import { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [task, setTask] = useState([]);
  const [editTask, setEditedTask] = useState("");
  const [editIndex, setEditedIndex] = useState(null);

  const submitHnadler = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Please Enter a Task!");
      return;
    }
    const copyTask = [...task];
    copyTask.push({ 
      id: Date.now(), // unique id
      title, 
      completed: false
    });
    setTask(copyTask);
    setTitle("");
  };

  const toggleComplete = (id) => {
    const copyTask = task.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTask(copyTask);
  };

  const deleteTask = (id) => {
    const copyTask = task.filter((t) => t.id !== id);
    setTask(copyTask);
  };

  return (
    <>
      <div className="items-center flex flex-col justify-center">
    <div className="flex flex-col justify-center items-start md:items-center py-5 px-4 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-semibold text-purple-500 relative mt-5 items-center mb-5">TODO APP</h1>
      <div className="w-full md:w-[800px] border-2 border-purple-300 p-5 sm:p-10 rounded bg-white">
        {/* heading */}
        <div className="flex flex-col sm:flex-row gap-2 border-2 border-pink-400 p-2 rounded mb-5">
          <h2>HI</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus:outline-none focus:border-transparent font-semibold flex-1 px-2 py-1 rounded"
          />
        </div>

        <div className="flex justify-between px-2 sm:px-10 mt-4 font-semibold text-pink-500 text-sm sm:text-base">
          <h3>TODO LIST</h3>
          <h3>ADD A TASK</h3>
        </div>

        <form
          onSubmit={submitHnadler}
          className="mt-5 flex flex-col sm:flex-row gap-4 items-center"
        >
          <input
            type="text"
            placeholder="Enter your cookie"
            className="flex-1 border-2 border-pink-400 rounded p-2 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="w-full sm:w-[150px] border-2 rounded bg-pink-400 text-white font-semibold p-2 mt-2 sm:mt-0">
            Add Task
          </button>
        </form>

        {/* list */}
        <h1 className="font-semibold mt-5 mb-3 text-center sm:text-left text-2xl text-pink-600">
          Your Tasks
        </h1>
        <div className="flex flex-col gap-2">
          {[...task].sort((a, b) => a.completed - b.completed).map((elem) => (
            <div
              key={elem.id}
              className="flex flex-col sm:flex-row justify-between border-2 border-purple-300 py-3 px-3 sm:px-5 rounded items-start sm:items-center bg-gray-50"
            >
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="checkbox"
                  className="rounded-full w-[20px] h-[20px]"
                  checked={elem.completed}
                  onChange={() => toggleComplete(elem.id)}
                />
                {editIndex === elem.id ? (
                  <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    className="border p-1 rounded flex-1"
                  />
                ) : (
                  <p
                    className={`flex-1 ${
                      elem.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {elem.title}
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-2 sm:mt-0 flex-wrap">
                <button className="w-[70px] sm:w-[80px] rounded p-2 bg-green-400 cursor-pointer text-xs sm:text-sm font-semibold">
                  {elem.completed ? "Done" : "ToDo"}
                </button>

                {editIndex === elem.id && (
                  <button
                    className="w-[70px] sm:w-[80px] rounded p-2 bg-green-500 cursor-pointer text-xs sm:text-sm font-semibold"
                    onClick={() => {
                      const copyTask = task.map((t) =>
                        t.id === editIndex ? { ...t, title: editTask } : t
                      );
                      setTask(copyTask);
                      setEditedIndex(null);
                      setEditedTask("");
                    }}
                  >
                    Save
                  </button>
                )}

                {editIndex !== elem.id && (
                  <button
                    className="w-[70px] sm:w-[80px] rounded p-2 bg-pink-300 cursor-pointer text-xs sm:text-sm font-semibold"
                    onClick={() => {
                      setEditedIndex(elem.id);
                      setEditedTask(elem.title);
                    }}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="w-[70px] sm:w-[80px] rounded p-2 bg-orange-400 cursor-pointer text-xs sm:text-sm font-semibold"
                  onClick={() => deleteTask(elem.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default App;
