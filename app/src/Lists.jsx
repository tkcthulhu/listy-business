import React from "react"

export function SetList(props) {

    function setLocalStorage(list) {
        localStorage.setItem('LIST', JSON.stringify(list))
    }

    function setToActive(list, item) {
        let target = props.ToDoItem.filter(item => item.id === id)
        target.status = false
        setLocalStorage(list)
    }

    function setToInactive(id) {
        let target = props.ToDoItem.filter(item => item.id === id)
        target.status = true
        props.SetToDoItem(list)
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

    function buildUserLists() {

        let lists = [...props.newList]

        let userLists = []

        for (let i = 0; i < lists.length; i++) {

            let listName = ''

            let thisList = []

            let items = lists[i].listItems

            console.log(items)

            listName = lists[i].input

            for (let i = 0; i < items.length; i++) {

                thisList.push(
                    <div className="row-10 justify-constent-center" id={items[i].id} key={items[i].id}>
                        <div className="col-6 d-flex">
                            {items[i].input}
                        </div>
                        <div className='col-2'>
                            <i className="bi bi-check-circle-fill align-self-end" onClick={() => setToActive(items[i].id)}></i>
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

    function filterItems() {

        let lists = [...props.newList]

        for (let i = 0; i < lists.length; i++) {
            lists[i].listItems = activeItems.filter(x => x.list === lists[i].input)
            props.setNewList(lists)    
        }

    }

    filterActive();

    return(
        <>
            <div className="container-fluid">
                <button onClick={() => {filterItems()}}>Filter</button>
                {/* {buildList(activeItems)} */}
                {buildUserLists()}
                <h4>MF DONE: {inactiveItems.length}</h4>
                {filterInactive()}
            </div>
        </>
    )
}