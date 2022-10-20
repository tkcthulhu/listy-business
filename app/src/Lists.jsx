import React from "react"

export function SetList(props) {

    function SetLocalStorage(list) {
        localStorage.setItem('LIST', JSON.stringify(list))
    }

    function setToActive(list, item) {
        list[item].status = false
        props.SetToDoItem(list)
        SetLocalStorage(list)
    }

    function setToInactive(list, item) {
        list[item].status = true
        props.SetToDoItem(list)
        SetLocalStorage(list)
    }

    function deleteItem(id) {
        let remaining = props.ToDoItem.filter(item => item.id !== id)
        props.SetToDoItem(remaining)
        SetLocalStorage(remaining)
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

    function buildList(items) {

        let listName = ''

        let thisList = []

        for (let i = 0; i < items.length; i++) {

            thisList.push(
                <div className="row-10 justify-constent-center" id={items[i].list + i} key={items[i].list + i}>
                    <div className="col-6 d-flex">
                        {items[i].input}
                    </div>
                    <div className='col-2'>
                        <i className="bi bi-check-circle-fill align-self-end" onClick={() => setToActive(items, i)}></i>
                        <i className="bi bi-x-circle-fill align-self-end" onClick={() => deleteItem(items[i].id)}></i>
                    </div>
                </div>
            )

            listName = items[0].list
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
    
    return(
        <>
            <div className="container-fluid">
                {buildList(filterActive())}
                <h4>MF DONE: {inactiveItems.length}</h4>
                {filterInactive()}
            </div>
        </>
    )
}