import { TodoItem } from "./TodoItem"

export function DeletedList({ todos, toggleTodo, deleteTodo }) {
    return (
        <ul className="list">
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