import React, { useRef } from "react";
import { connect } from "react-redux";
import { deleteTodo, markComplete, markIncomplete } from "../action/index";
import storeType from "../types/storeType";
import AppPropType from "./AppPropType";
import "../App.css"; 

const App: React.FC<AppPropType> = ({
  complete,
  incomplete,
  deleteTodo,
  markComplete,
  markIncomplete,   
}) => {
  const input = useRef<HTMLInputElement>(null);

  const renderList = (type: "Complete" | "Incomplete") => {
    const looper = type === "Complete" ? complete : incomplete;
    return (
      <ul className={`todo-list ${type}`}>
        <h3>{type}</h3>
        {looper.map((todo, index) => {
          return (
            <li key={index} className="todo-item"> const looper = type === "Complete" ? complete : incomplete;
              <span>{todo}</span>
              <div className="actions">
                <button
                  className={`btn ${type === "Complete" ? "incomplete" : "complete"}`}
                  onClick={() => {
                    type === "Complete"
                      ? markIncomplete(todo)
                      : markComplete(todo);
                  }}
                >
                  {type === "Complete" ? "Incomplete" : "Complete"}
                </button>
                <button className="btn delete" onClick={() => deleteTodo(todo)}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const addTodo = () => {
    if (input.current) {
      const val = input.current.value;
      input.current.value = "";
      markIncomplete(val);
    }
  };

  return (
    <div className="container">
      <div className="input-group">
        <input type="text" placeholder="Todo" ref={input} />
        <button className="btn add" onClick={() => addTodo()}>
          Add
        </button>
      </div>
      {renderList("Incomplete")}
      {renderList("Complete")}
    </div>
  );
};

const mapStateToProps = (state: storeType) => {
  return {
    complete: state.complete,
    incomplete: state.incomplete,
  };
};

export default connect(mapStateToProps, {
  deleteTodo,
  markComplete,
  markIncomplete,
})(App);
