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
        <>
            <div className="row justify-content-center">
                <div className="col d-flex justify-content-center">
                    <button  onClick={() => {allActive(list)}}>
                        All Done
                    </button>
                </div>
                <div className="col d-flex justify-content-center">
                    <button onClick={() => {allInactive(list)}}>
                        All ...like not done?
                    </button>
                </div>
                <div className="col d-flex justify-content-center">
                    <button onClick={() => {allGone()}}>
                        Over it
                    </button>
                </div>
            </div>
        </>
    )
}