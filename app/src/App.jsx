import React from 'react';
import UserInput from './UserInput';
import { SetList } from './Lists';
import { CheckAll } from './CheckAll'

function App() {
  
  const [ page, setPage ] = React.useState('Home');

  const [ ToDoItem, SetToDoItem] = React.useState([]);

  const [ newList, setNewList] = React.useState([]);

  React.useEffect(() => {
    SetToDoItem(JSON.parse(localStorage.getItem('LIST'))) 
  }, [])
  
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-10">
          <h1>Listy Business</h1>
        </div>
        <UserInput ToDoItem={ToDoItem} SetToDoItem={SetToDoItem}/>
      </div>
      <SetList ToDoItem={ToDoItem} SetToDoItem={SetToDoItem} page={page} setPage={setPage}/>
      <CheckAll ToDoItem={ToDoItem} SetToDoItem={SetToDoItem}/>
    </>
  );
}

export default App;
