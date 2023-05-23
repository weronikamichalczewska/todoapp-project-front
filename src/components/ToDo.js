import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FaRegCheckSquare } from "react-icons/fa";
import { useState } from "react";

const ToDo = ({
  date,
  text,
  completed,
  isChecked,
  updateMode,
  deleteToDo,
  handleCheckBoxChange,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handleCheckBox = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    handleCheckBoxChange(newChecked); // Dodaj przekazywanie aktualnego stanu checked
  };

  return (
    <div className="todo">
      <div className="checkbox-container">
        <FaRegCheckSquare
          className="icon"
          onClick={handleCheckBox}
          style={{ color: checked ? "green" : "white" }}
        />
      </div>
      <div
        className="text-container"
        style={{
          textDecoration: isChecked ? "line-through" : "none",
          color: isChecked ? "gray" : "black",
        }}
      >
        <div className="text">{text}</div>
        <div className="date" style={{ fontSize: "12px" }}>
          {date}
        </div>
      </div>

      <div className="icons">
        <BiEdit className="icon" onClick={updateMode} />
        <AiFillDelete className="icon" onClick={deleteToDo} />
      </div>

      <style jsx>{`
        .todo {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        .checkbox-container {
          display: flex;
          align-items: center;
          height: 100%;
          margin-right: 20px;
        }
        .text-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          height: 100%;
          flex-grow: 1;
        }
        .text {
          margin-bottom: 4px;
        }
        .icon {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ToDo;
