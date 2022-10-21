import React from "react";

function UserInput(props) {

    const userInput = React.useRef(null);
    const listSelect = React.useRef(null);

    function addItem() {

        const input = userInput.current.value;;
        const list = listSelect.current.value;
        const status = true;
        const id = Date.now()
 
        props.SetToDoItem([...props.ToDoItem, {input, list, status, id}])

        localStorage.setItem('LIST', JSON.stringify([...props.ToDoItem, {input, list, status, id}]))

        userInput.current.value = null;

    }

    function userListsBuild() {

        let userLists = [...props.newList]

        let newLists = []

        for (let i = 0; i < userLists.length; i++) {
            newLists.push(
                <>
                    <option value= {userLists[i].input}>
                        <h2>{userLists[i].input}</h2>
                    </option>
                </>
            )
        }

        return newLists
        
    }

    return (
    <div className="col">
        <div className="row inputRow">
            <div className="col">
                <input 
                    ref={userInput}
                    className='inputItem'
                />
                <select 
                    name="list" 
                    id="listSelect"
                    className='inputItem'
                    ref={listSelect}
                >
                    {userListsBuild()}
                </select>
            </div>
            <div className="col">
                <h1>
                    <i 
                        className="bi bi-plus-square-fill" 
                        onClick={() => {addItem()}}
                    />
                </h1>
            </div>
        </div>
    </div>
    )
}

export default UserInput;