export function SetList(props) {

    return(
        <>
            <div className="container-fluid">
                {props.ToDoItem.map(((item, i) => 
                                            <div className="row-10 justify-constent-center" id={item.list + i} key={item.list + i}>
                                                <div className="col-6 d-flex">
                                                    {item.input}
                                                </div>
                                                <div className='col-2'>
                                                    <i className="bi bi-check-circle-fill align-self-end"></i>
                                                    <i className="bi bi-x-circle-fill align-self-end"></i>
                                                </div>
                                            </div>
                    ))
                }
            </div>
        </>
    )
}