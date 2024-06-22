import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import { DeletedList } from "./DeletedList"
import "./styles.css"

export default function App() {

  //setTodos is a function to update the state of newItem
  const [todos, setTodos] = useState(()=> {
    const localValue = localStorage.getItem("ITEMS")
    // const localDeleteValue = localStorage.getItem("DELETEITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })
  const [delList, setDelList] = useState(()=> {
    // const localValue = localStorage.getItem("ITEMS")
    const localDeleteValue = localStorage.getItem("DELETEITEMS")
    if (localDeleteValue == null) return []
    return JSON.parse(localDeleteValue)
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

  function deleteTodo(id) {
    setTodos(currentTodos => {
      // const localDeleteValue = localStorage.getItem("DELETEITEMS")
      // if (localDeleteValue == null) return []
      // JSON.parse(localStorage.getItem("DELETEITEMS"))
      // console.log()
      const retrieveValue = currentTodos.filter(todo => todo.id == id)
      console.log("filter delete: ", retrieveValue)

      localStorage.setItem("DELETEITEMS", retrieveValue)
      addDelete(id)
      return currentTodos.filter(todo => todo.id !== id)

    })
  }

  function permDelete(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  function addDelete(id) {
    setDelList(currentTodos => {
      return [
        ...currentTodos,
        {id},
      ]
    })
  }
  return (
    <>
      {/* onsubmit is the props parameter */}
      <NewTodoForm onSubmit={addTodo} />  
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      <h1 className='header'>Deleted</h1>
      
      <DeletedList todos={delList} toggleTodo={toggleTodo} deleteTodo={permDelete}/>
    </>
  )

}



