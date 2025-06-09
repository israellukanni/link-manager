// import Link from "../components/Link"
import "../AddButton.css"

type AddButtonProps = {
    onAdd: () => void
}

function AddButton({onAdd}: AddButtonProps) {
    
    return (
        <div>
            <button onClick={onAdd} className = 'addbutton'>Add</button>
        </div>
    )
}

export default AddButton;
