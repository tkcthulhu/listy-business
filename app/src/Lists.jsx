import React from "react"

export function SetList(props) {

    function setLocalStorage(list) {
        localStorage.setItem('LIST', JSON.stringify(list))
    }

    function setToActive(id, list) {

        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i].status = true;
            }
        }
        props.SetToDoItem(list)
        setLocalStorage(list)
    }

    function setToInactive(id, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i].status = false;
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
            userListItems[i].list = ''
        }

        let remaining = props.newList.filter(item => item.id !== id)
        props.setNewList(remaining)
        localStorage.setItem('UserLists', JSON.stringify(remaining))
    }

    const currentList = [...props.ToDoItem]

    function strikeThrough(status) {
        if (status) {
            return(
                "row-10 justify-constent-center"
            )
        } else {
            return(
                "row-10 justify-constent-center done"
            )
        }
    }

    function statusButtons(id, status) {

            if (status) {

                return(
                    <i className="bi bi-check-circle-fill align-self-end icon" onClick={() => setToInactive(id, currentList)}></i>
                )
            } else {

                return(
                    <i className="bi bi-arrow-up-circle-fill align-self-end icon" onClick={() => setToActive(id, currentList)}></i>
                )
            } 

    }

    function buildUserLists(lists) {

        let userLists = []

        for (let i = 0; i < lists.length; i++) {

            let listName = ''

            let thisList = []

            let incomplete = []

            let items = lists[i].listItems

            listName = lists[i].input

            for (let i = 0; i < items.length; i++) {

                if (items[i].status) {
                    incomplete.push('$')
                    console.log('bloop')
                }

                thisList.push(
                    <div className={strikeThrough(items[i].status)} id={items[i].id} key={items[i].id}>
                        <div className="col-6 d-flex">
                            {items[i].input}
                        </div>
                        <div className='col-2'>
                            {statusButtons(items[i].id, items[i].status)}
                            <i className="bi bi-x-circle-fill align-self-end icon" onClick={() => deleteItem(items[i].id)}></i>
                        </div>
                    </div>
                )

            }

            function deleteButton() {
                if (!(lists[i].id === 'OG')) {
                    return(
                    <i className="bi bi-x-circle-fill align-self-end icon" onClick={() => deleteList(lists[i].id, lists[i])}></i>
                    )
                }
            }

            userLists.push(
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + i} aria-expanded="true" aria-controls={"collapse" + i}>
                        {listName} : {incomplete.length} {deleteButton()}
                      </button>
                    </h2>
                    <div id={"collapse" + i} class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        {thisList}
                      </div>
                    </div>
                </div>
                )
        }

        return(
            <>
            <div class="accordion" id="accordionExample">
            {userLists}
            </div>
            </>
        )
    }    

    function filterItems() {

        let allLists = [...props.newList]

        for (let i = 0; i < allLists.length; i++) {
            allLists[i].listItems = currentList.filter(x => x.list === allLists[i].input)   
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

    return(
        <>
            <div className="container-fluid">
                {buildUserLists(filterItems())}
                {removeGarbage()}
            </div>
        </>
    )
}