import { useState } from "react"

export function NewTodoForm({ onSubmit }) {
    //onsubmit is props.onsubmit that is destructure to {onSubmit}
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        if (newItem === "") return
        onSubmit(newItem)
        setNewItem("")
      }
    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                {/* personalize this in the future */}
                <label htmlFor="item">Hello, what's your focus for today?</label>
                <input 
                    value={newItem} 
                    onChange={e => setNewItem(e.target.value)}
                    type="text" 
                    id="item"
                />
            </div>
            <button className="btn">Add</button>
        </form>
    )
}