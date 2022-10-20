import React from "react";

export function MultiList(props) {

    const userList = React.useRef(null);

    function addList() {

        const input = userList.current.value;

        const listItems = []

        props.setNewList([...props.newList, {input, listItems}])

        localStorage.setItem('UserLists', JSON.stringify([...props.newList, {input, listItems}]))

        userList.current.value = null;
    }

    return(
    <div className="col-10">
        <input ref={userList}/>
        <i className="bi bi-plus-square-fill" onClick={() => {addList()}}></i>
    </div>
    )
}