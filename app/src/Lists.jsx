import React from "react"

export function SetList(props) {

    function setLocalStorage(list) {
        localStorage.setItem('LIST', JSON.stringify(list))
    }

    function setToActive(id, list) {

        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                console.log('This one officer')
                list[i].status = false;
            }
        }
        props.SetToDoItem(list)
        setLocalStorage(list)
    }

    function setToInactive(id, list) {

        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                console.log('Take it back')
                list[i].status = true;
            }
        }
        props.SetToDoItem(list)
        setLocalStorage(list)
    }

    function deleteItem(id) {
        console.log('here')
        let remaining = props.ToDoItem.filter(item => item.id !== id)
        props.SetToDoItem(remaining)
        setLocalStorage(remaining)
    }

    function deleteList(id, userList) {

        let userListItems = [...userList.listItems]

        for (let i = 0; i < userListItems.length; i++) {
            userListItems[i].status = ''
        }

        let remaining = props.newList.filter(item => item.id !== id)
        props.setNewList(remaining)
        localStorage.setItem('UserLists', JSON.stringify(remaining))
    }

    let activeItems = [];

    let inactiveItems = [];

    const currentList = [...props.ToDoItem]

    function filterActive() {    
        for (let i = 0; i < currentList.length; i++) {
            if (currentList[i].status === true) {
                activeItems.push(currentList[i])
            }    
        } return activeItems
    }

    function filterInactive() {
        for (let i = 0; i < currentList.length; i++) {
            if (currentList[i].status === false) {
                inactiveItems.push(
                    <div className="row-10 justify-constent-center" id={currentList[i].id} key={currentList[i].id}>
                        <div className="col-6 d-flex done">
                            {currentList[i].input}
                        </div>
                        <div className='col-2'>
                            <i className="bi bi-arrow-up-circle-fill align-self-end" onClick={() => setToInactive(currentList[i].id, currentList)}></i>
                            <i className="bi bi-x-circle-fill align-self-end" onClick={() => deleteItem(currentList[i].id)}></i>
                        </div>
                    </div>
                )    
            }
        } return inactiveItems
    }

    function buildUserLists(lists) {

        let userLists = []

        for (let i = 0; i < lists.length; i++) {

            let listName = ''

            let thisList = []

            let items = lists[i].listItems

            listName = lists[i].input

            for (let i = 0; i < items.length; i++) {

                thisList.push(
                    <div className="row-10 justify-constent-center" id={items[i].id} key={items[i].id}>
                        <div className="col-6 d-flex">
                            {items[i].input}
                        </div>
                        <div className='col-2'>
                            <i className="bi bi-check-circle-fill align-self-end" onClick={() => setToActive(items[i].id, currentList)}></i>
                            <i className="bi bi-x-circle-fill align-self-end" onClick={() => deleteItem(items[i].id)}></i>
                        </div>
                    </div>
                )

            }

            function deleteButton() {
                if (!(lists[i].id === 'OG')) {
                    return(
                    <i className="bi bi-x-circle-fill align-self-end" onClick={() => deleteList(lists[i].id, lists[i])}></i>
                    )
                }
            }

            userLists.push(
                <>
                    <h4>
                        {listName} : {thisList.length} {deleteButton()}
                    </h4>
                    {thisList}
                </>
                )
        }

        return(
            <>
            {userLists}
            </>
        )
    }    

    function filterItems() {

        let allLists = [...props.newList]

        for (let i = 0; i < allLists.length; i++) {
            allLists[i].listItems = activeItems.filter(x => x.list === allLists[i].input)   
        }

        return allLists

    }

    function removeGarbage() {
        for (let i = 0; i < currentList.length; i++) {
            if (!currentList[i].list) {
                deleteItem(currentList[i].id)
            }
        }
    }    

    filterActive();

    return(
        <>
            <div className="container-fluid">
                {buildUserLists(filterItems())}
                <h4>MF DONE: {inactiveItems.length}</h4>
                {filterInactive()}
                {removeGarbage()}
            </div>
        </>
    )
}