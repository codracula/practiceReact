import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import { DeletedList } from "./DeletedList"
import "./styles.css"

export default function App() {

  //setTodos is a function to update the state of newItem
  const [todos, setTodos] = useState(()=> {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  const [delList, setDelList] = useState(()=> {
    const localDeleteValue = localStorage.getItem("DELETEITEMS")
    if (localDeleteValue == null) return []
    try {
      return JSON.parse(localDeleteValue);
    } catch (e) {
      console.log("Error parsing JSON: ", e);
      return [];
    }
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("DELETEITEMS", JSON.stringify(delList))
  }, [delList])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false},
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  function addDelete(id) {
    setDelList(currentTodos => {
      return currentTodos.map(todo => { todo.id == id})
    })
  }

  const addToDelList = (item) => {
    const itemExists = delList.some(unit => unit.id == item.id);
    if (itemExists) {
      return;
    }
    delList.push(item)
    // setDelList(currentDelList => [... currentDelList, item]);

  }
  function deleteTodo(id) {
    setTodos(currentTodos => {
      const temp = localStorage.getItem("ITEMS")
      const item = JSON.parse(temp).find(tempItem => tempItem.id == id)
      addToDelList(item)
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  function permDelete(id) {
    setDelList(currentTodos => {
      return currentTodos.filter(delList => delList.id !== id)
    })
  }

  //refactoring the deleteitem localstorage
  const getDeleteItems = () => {
    const localDeleteValue = localStorage.getItem("DELETEITEMS")
    if (localDeleteValue == null) return []
    try {
      return JSON.parse(localDeleteValue);
    } catch (e) {
      console.log("Error parsing JSON: ", e);
      return [];
    }
  }

  const setDeleteItems = (items) =>  {
    localStorage.setItem("DELETEITEMS", JSON.stringify(items))
  };

  return (
    <>
      {/* onsubmit is the props parameter */}
      <NewTodoForm onSubmit={addTodo} />  
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      <h1 className='header'>Archived</h1>
      
      <DeletedList todos={delList} toggleTodo={toggleTodo} deleteTodo={permDelete}/>
    </>
  )

}



