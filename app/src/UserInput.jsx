import React from "react";

function UserInput(props) {

    const userInput = React.useRef(null);
    const prioritySelect = React.useRef(null);
    const listSelect = React.useRef(null);

    function addItem() {

        const input = userInput.current.value;
        const priority = prioritySelect.current.value;
        const list = listSelect.current.value;
        const status = true;
        const id = Date.now()
 
        props.SetToDoItem([...props.ToDoItem, {input, priority, list, status, id}])

        localStorage.setItem('LIST', JSON.stringify([...props.ToDoItem, {input, priority, list, status, id}]))

        userInput.current.value = null;

        console.log(props.ToDoItem + 'userInput')
    }

    function userListsBuild() {

        let userLists = [...props.newList]

        let newLists = []

        for (let i = 0; i < userLists.length; i++) {
            newLists.push(
                <>
                    <option value= {userLists[i].input}>
                        {userLists[i].input}
                    </option>
                </>
            )
        }

        return newLists
        
    }

    return (
    <div className="col-10">
        <input ref={userInput}/>
        <select name="priority" ref={prioritySelect}>
            <option value="High">High</option>
            <option value="Med">Medium</option>
            <option value="Low">Low</option>
        </select>
        <select name="list" ref={listSelect}>
            <option value="To Do">To Do</option>
            {userListsBuild()}
        </select>
        <i className="bi bi-plus-square-fill" onClick={() => {addItem()}}></i>
    </div>
    )
}

export default UserInput;