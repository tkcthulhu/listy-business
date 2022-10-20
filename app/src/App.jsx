import React from 'react';
import UserInput from './UserInput';
import { SetList } from './Lists';
import { CheckAll } from './CheckAll'
import { MultiList } from './MultiList'

function App() {

  const [ ToDoItem, SetToDoItem] = React.useState([]);

  const [ newList, setNewList] = React.useState([]);

  React.useEffect(() => {
    SetToDoItem(JSON.parse(localStorage.getItem('LIST')))
    setNewList(JSON.parse(localStorage.getItem('UserLists'))) 
  }, [])

  if (!ToDoItem) {
    SetToDoItem([])
  }

  if (!newList) {
    setNewList([])
  }
  
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-10">
          <h1>Listy Business</h1>
        </div>
        <UserInput ToDoItem={ToDoItem} SetToDoItem={SetToDoItem} newList={newList} setNewList={setNewList}/>
        <MultiList ToDoItem={ToDoItem} SetToDoItem={SetToDoItem} newList={newList} setNewList={setNewList}/>
      </div>
      <SetList ToDoItem={ToDoItem} SetToDoItem={SetToDoItem} newList={newList} setNewList={setNewList}/>
      <CheckAll ToDoItem={ToDoItem} SetToDoItem={SetToDoItem}/>
    </>
  );
}

export default App;
