import React from "react";

export function MultiList(props) {

    const userList = React.useRef(null);

    function addList() {

        const input = userList.current.value;

        const listItems = []

        const id = Date.now()

        props.setNewList([...props.newList, {input, listItems, id}])

        localStorage.setItem('UserLists', JSON.stringify([...props.newList, {input, listItems, id}]))

        userList.current.value = null;
    }

    return(
    <div className="col">
        <div className="row inputRow">
            <div className="col">
                <h2>Add New List</h2>
            </div>
            <div className="col">
                <input 
                    ref={userList}
                    className='inputItem'
                />
            </div>
            <div className="col">
                <h1>
                    <i 
                        className="bi bi-plus-square-fill icon" 
                        onClick={() => {addList()}}
                    />
                </h1>
            </div>
        </div>
    </div>
    )
}