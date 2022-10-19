export function SetList(props) {

    // let items = [];
    
    // if(props.page === 'Home') {
        
    //     console.log('deez')

    //     for (let i = 0; i < props.ToDoItem; i++) {
    //         items.push(
    //             <li>
    //                 <p>{props.ToDoItem[i].INPUT}</p>
    //             </li>
    //         )
    //     }
    // }

    return(
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    {props.ToDoItem.map((item => <li>{item.input}</li>))}
                </div>
            </div>
        </>
    )
}