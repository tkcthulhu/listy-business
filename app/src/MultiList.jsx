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
    <div className="col-10">
        <input ref={userList}/>
        <i className="bi bi-plus-square-fill" onClick={() => {addList()}}></i>
    </div>
    )
}