export function SetList(props) {

    function setToDone(list, item) {
        list[item].status = false
    }

    function deleteItem(list, item) {
        list.splice(item, 1)
        props.SetToDoItem(list)
    }

    let items = [];

    const currentList = [...props.ToDoItem]

    console.log(currentList)

    for (let i = 0; i < currentList.length; i++) {
        items.push(
            <div className="row-10 justify-constent-center" id={currentList[i].list + i} key={currentList[i].list + i}>
                <div className="col-6 d-flex">
                    {currentList[i].input}
                </div>
                <div className='col-2'>
                    <i className="bi bi-check-circle-fill align-self-end" onClick={() => setToDone(currentList, i)}></i>
                    <i className="bi bi-x-circle-fill align-self-end" onClick={() => deleteItem(currentList, i)}></i>
                </div>
            </div>
        )
    }

    return(
        <>
            <div className="container-fluid">
                {items}
            </div>
        </>
    )
}