import React from "react";

function UserInput(props) {

    const userInput = React.useRef(null);
    const priority = React.useRef(null);
    const list = React.useRef(null);

    function addItem() {

        const input = userInput.current.value;
        const priority = priority.current.value;
        const list = list.current.value;
        const status = true;

        props.SetToDoItem([...props.ToDoItem, {input, priority, list, status}])

        userInput.current.value = null;

        console.log(props.ToDoItem)
    }

    return (
        <div className="col-10">
        <input ref={userInput}/>
        <select name="priority" ref={priority}>
            <option value="High">High</option>
            <option value="Med">Medium</option>
            <option value="Low">Low</option>
        </select>
        <select name="list" ref={list}>
            <option value="default">To Do</option>
        </select>
        <i className="bi bi-plus-square-fill" onClick={() => {addItem()}}></i>
      </div>
    )
}

export default UserInput;