export function CheckAll(props) {

    let list = [...props.ToDoItem]

    function SetLocalStorage(list) {
        localStorage.setItem('LIST', JSON.stringify(list))
    }

    function allActive(list) {
        for (let i = 0; i < list.length; i++) {
            list[i].status = false
            console.log(list[i].id)
            let target = document.getElementById(`${list[i].id}`)
            target.classList.add('done')
        }
        props.SetToDoItem(list)
        SetLocalStorage(list)
    }

    function allInactive(list) {
        for (let i = 0; i < list.length; i++) {
            list[i].status = true
            console.log(list[i].id)
            let target = document.getElementById(`${list[i].id}`)
            target.classList.remove('done')
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
            <div className="row justify-content-end">
                <div className="col">
                    <button  onClick={() => {allActive(list)}}>
                        All Done
                    </button>
                </div>
                <div className="col">
                    <button onClick={() => {allInactive(list)}}>
                        All ...like not done?
                    </button>
                </div>
                <div className="col">
                    <button onClick={() => {allGone()}}>
                        Over it
                    </button>
                </div>
            </div>
        </>
    )
}