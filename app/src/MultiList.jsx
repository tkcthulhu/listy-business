import React from "react";

export function MultiList(props) {

    const userList = React.useRef(null);

    function addList() {

        const input = userList.current.value;

        props.setNewList([...props.newList, input])

        localStorage.setItem('UserLists', JSON.stringify([...props.newList, input]))

        userList.current.value = null;
    }

    return(
    <div className="col-10">
        <input ref={userList}/>
        <i className="bi bi-plus-square-fill" onClick={() => {addList()}}></i>
    </div>
    )
}