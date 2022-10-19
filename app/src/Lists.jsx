import React from "react"

export function SetList(props) {

    function setToActive(list, item) {
        list[item].status = false
        props.SetToDoItem(list)
    }

    function setToInactive(list, item) {
        list[item].status = true
        props.SetToDoItem(list)
    }

    function deleteItem(id) {
        let remaining = props.ToDoItem.filter(item => item.id !== id)
        props.SetToDoItem(remaining)
    }

    let activeItems = [];

    let inactiveItems = [];

    React.useEffect(() => {
        props.SetToDoItem(JSON.parse(localStorage.getItem('LIST'))) 
      }, [])

    const currentList = [...props.ToDoItem]

    console.log(currentList)

    function filterActive() {    
        for (let i = 0; i < currentList.length; i++) {
            if (currentList[i].status === true) {
                activeItems.push(
                    <div className="row-10 justify-constent-center" id={currentList[i].list + i} key={currentList[i].list + i}>
                        <div className="col-6 d-flex">
                            {currentList[i].input}
                        </div>
                        <div className='col-2'>
                            <i className="bi bi-check-circle-fill align-self-end" onClick={() => setToActive(currentList, i)}></i>
                            <i className="bi bi-x-circle-fill align-self-end" onClick={() => deleteItem(currentList[i].id)}></i>
                        </div>
                    </div>
                )
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
    
    return(
        <>
            <div className="container-fluid">
                <h4>TO DO: {activeItems.length}</h4>
                {filterActive()}
                <h4>MF DONE: {inactiveItems.length}</h4>
                {filterInactive()}
            </div>
        </>
    )
}