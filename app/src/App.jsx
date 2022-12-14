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
    setNewList([{input:'To Do', listItems:[], id:'OG'}])
  }
  
  return (
    <>
      <div className="container">
        <div className="row-10 justify-content-center">
            <div className="col">
              <h1><strong>Listy Business</strong></h1>
            </div>
        </div>
        <div className="row justify-content-center">
          <UserInput 
            ToDoItem={ToDoItem} 
            SetToDoItem={SetToDoItem} 
            newList={newList} 
            setNewList={setNewList}
            />
          <MultiList 
            ToDoItem={ToDoItem} 
            SetToDoItem={SetToDoItem} 
            newList={newList} 
            setNewList={setNewList}
            />
        </div>
      </div>
      <SetList 
        ToDoItem={ToDoItem} 
        SetToDoItem={SetToDoItem} 
        newList={newList} 
        setNewList={setNewList}
      />
      <CheckAll 
        ToDoItem={ToDoItem} 
        SetToDoItem={SetToDoItem}
      />
    </>
  );
}

export default App;
