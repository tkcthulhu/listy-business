export function CheckAll(props) {

    let list = [...props.ToDoItem]

    function SetLocalStorage(list) {
        localStorage.setItem('LIST', JSON.stringify(list))
    }

    function allActive(list) {
        for (let i = 0; i < list.length; i++) {
            list[i].status = false
        }
        props.SetToDoItem(list)
        SetLocalStorage(list)
    }

    function allInactive(list) {
        for (let i = 0; i < list.length; i++) {
            list[i].status = true
        }
        props.SetToDoItem(list)
        SetLocalStorage(list)
    }

    function allGone() {
        props.SetToDoItem([])
        SetLocalStorage([])
    }

    return (
        <div className="container">
            <div className="row justify-content-center buttonRow">
                <div className="col d-flex justify-content-center">
                    <button  onClick={() => {allActive(list)}}>
                        <h3><strong>All Done</strong></h3>
                    </button>
                </div>
                <div className="col d-flex justify-content-center">
                    <button onClick={() => {allInactive(list)}}>
                        <h3><strong>All ...like not done?</strong></h3>
                    </button>
                </div>
                <div className="col d-flex justify-content-center">
                    <button onClick={() => {allGone()}}>
                        <h3><strong>Over it</strong></h3>
                    </button>
                </div>
            </div>
        </div>
    )
}