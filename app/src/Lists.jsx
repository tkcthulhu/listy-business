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
                    <h2>
                        <i 
                            className="bi bi-check-circle-fill icon checkButton" 
                            onClick={() => setToInactive(id, currentList)}
                        />
                    </h2>
                )

            } else {

                return(
                    <h2>
                        <i 
                            className="bi bi-arrow-up-circle-fill icon redoButton" 
                            onClick={() => setToActive(id, currentList)}
                        />
                    </h2>
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
                }

                thisList.push(
                    <div 
                        className={'row ' + strikeThrough(items[i].status)} 
                        id={items[i].id} 
                        key={items[i].id}
                    >
                        <div className="col-11">
                            <h2>{items[i].input}</h2>
                        </div>
                        <div className="col-1">   
                            <div className="row">
                                <div className="col"> 
                                    {statusButtons(items[i].id, items[i].status)}
                                </div>
                                <div className="col">
                                    <h2>    
                                        <i 
                                            className="bi bi-x-circle-fill icon deleteButton" 
                                            onClick={() => deleteItem(items[i].id)}
                                        />
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            }

            function deleteButton() {
                if (!(lists[i].id === 'OG')) {
                    return(
                    <i 
                        className="bi bi-x-circle-fill icon deleteButton" 
                        onClick={() => deleteList(lists[i].id, lists[i])}
                    />
                    )
                }
            }

            userLists.push(
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button 
                            class="accordion-button row-10 d-flex" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target={"#collapse" + i} 
                            aria-expanded="true" 
                            aria-controls={"collapse" + i}
                        >    
                            <div className="col-11 listTitle">
                                <h1><strong>{listName} : {incomplete.length}</strong></h1>
                            </div>
                            <div className="col-1">
                                <h1>{deleteButton()}</h1>
                            </div>    
                        </button>
                    </h2>
                    <div   
                        id={"collapse" + i} 
                        class="accordion-collapse collapse" 
                        aria-labelledby="headingOne" 
                        data-bs-parent="#accordionExample"
                    >
                        <div class="accordion-body">
                            {thisList}
                        </div>
                    </div>
                </div>
                )
        }

        return(
            <div 
                class="accordion" 
                id="accordionExample"
            >
            {userLists}
            </div>
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
                <div className="row justify-content-center">
                    {buildUserLists(filterItems())}
                    {removeGarbage()}
                </div>
            </div>
        </>
    )
}