import { TodoItem } from "./TodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo }) {
    return (
        <ul className="list">
            {/* //return todo array */}
            {todos.length === 0 && "Nothing to do. :("}
            {todos.map(todo => {
                return (
                    <TodoItem 
                        {...todo} 
                        key={todo.id} 
                        toggleTodo={toggleTodo} 
                        deleteTodo={deleteTodo}
                    />
                )
            })} 
        </ul>
    )
}
