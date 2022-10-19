import React from "react";

function UserInput(props) {

    const userInput = React.useRef(null);
    const priority = React.useRef(null);

    function AddItem() {

        const INPUT = userInput.current.value;
        let STATUS = true;
        const PRIORITY = priority.current.value;

        props.SetToDoItem([...props.ToDoItem, {INPUT, STATUS, PRIORITY}])

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
        <i className="bi bi-plus-square-fill" onClick={() => {AddItem()}}></i>
      </div>
    )
}

export default UserInput;