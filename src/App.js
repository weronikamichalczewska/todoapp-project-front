import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import {
  addToDo,
  getAllToDo,
  updateToDo,
  deleteToDo
} from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const filterTasks = (task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "incomplete") {
      return !task.isChecked;
    } else if (filter === "complete") {
      return task.isChecked;
    }
  };

  const handleCheckBoxChange = (_id, isChecked) => {
    const updatedToDo = toDo.map((task) => {
      if (task._id === _id) {
        return { ...task, isChecked: isChecked };
      }
      return task;
    });
    setToDo(updatedToDo);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>📅 ToDo List</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>

          <select
            id="status"
            value={filter}
            className="select"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Completed</option>
          </select>
        </div>

        <div className="list">
          {toDo.filter(filterTasks).map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              date={item.createdAt}
              completed={item.completed}
              isChecked={item.isChecked}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
              handleCheckBoxChange={(isChecked) =>
                handleCheckBoxChange(item._id, isChecked)
              }
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .select {
          border: none;
          border-radius: 4px;
          cursor: pointer;
          outline: none;
          background: linear-gradient(90deg, rgba(93, 12, 255, 1) 0%, rgba(155, 0, 250, 1) 100%);
          font-size: 16px;
          color: #fff;
          text-transform: capitalize;
          text-align: center;
        }
        .select option {
          background: rgba(93, 12, 255, 1); 
}
        .container {
          position: relative;
        }

        .list {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}

export default App;
