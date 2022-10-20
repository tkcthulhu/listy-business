import React from "react"

export function SetList(props) {

    function setLocalStorage(list) {
        localStorage.setItem('LIST', JSON.stringify(list))
    }

    function setToActive(id, list) {
        // let list = [...props.ToDoItem]
        let target = list.filter(item => item.id === id)
        target.status = false
        props.SetToDoItem(list)
        console.log(props.ToDoItem)
        setLocalStorage(list)
    }

    function setToInactive(id, list) {
        // let list = [...props.ToDoItem]
        let target = list.filter(item => item.id === id)
        target.status = true
        props.SetToDoItem(list)
        console.log(props.ToDoItem)
        setLocalStorage(list)
    }

    function deleteItem(id) {
        let remaining = props.ToDoItem.filter(item => item.id !== id)
        props.SetToDoItem(remaining)
        setLocalStorage(remaining)
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
                            <i className="bi bi-arrow-up-circle-fill align-self-end" onClick={() => setToInactive(currentList, i)}></i>
                            <i className="bi bi-x-circle-fill align-self-end" onClick={() => deleteItem(currentList[i].id)}></i>
                        </div>
                    </div>
                )    
            }
        } return inactiveItems
    }

    function buildList() {

        let listName = ''

        let thisList = []

        for (let i = 0; i < activeItems.length; i++) {

            thisList.push(
                <div className="row-10 justify-constent-center" id={activeItems[i].id} key={activeItems[i].id}>
                    <div className="col-6 d-flex">
                        {activeItems[i].input}
                    </div>
                    <div className='col-2'>
                        <i className="bi bi-check-circle-fill align-self-end" onClick={() => setToActive(activeItems, i)}></i>
                        <i className="bi bi-x-circle-fill align-self-end" onClick={() => deleteItem(activeItems[i].id)}></i>
                    </div>
                </div>
            )

            listName = activeItems[0].list

        }
                
        return(
            <>
                <h4>
                    {listName} : {thisList.length}
                </h4>
                {thisList}
            </>
        )
        
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

            userLists.push(
                <>
                    <h4>
                        {listName} : {thisList.length}
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

    let allLists = []

    function filterItems() {

        let allLists = [...props.newList]

        for (let i = 0; i < allLists.length; i++) {
            allLists[i].listItems = activeItems.filter(x => x.list === allLists[i].input)
            // props.setNewList(allLists)    
        }

        return allLists

    }

    filterActive();

    return(
        <>
            <div className="container-fluid">
                {/* {filterItems()} */}
                {/* {buildList(activeItems)} */}
                {buildUserLists(filterItems())}
                <h4>MF DONE: {inactiveItems.length}</h4>
                {filterInactive()}
            </div>
        </>
    )
}