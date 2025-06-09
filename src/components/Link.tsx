import { useState } from "react"
import '../Link.css'

type LinkProps = {
  name: string
  url: string
  saved: boolean
  onChange: (field: "name" | "url", value: string) => void
  onSave: (bool:boolean) => void
  onRemove: () => void
  index:number
}

function Link({ name, url, saved, index, onSave, onChange,onRemove }: LinkProps) {
  const [copied, setCopied] = useState(false)

  const saveLink = () => {
     if (name !== "" && url !== ""){
      onSave(true)
      console.log("Saving:", name, url)
    }
    
  }

  const copyLink = (link: string) => {
    writeClipboardText(link)
  }

  const writeClipboardText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error(error)
    }
  }

  const editLink = () => {
    onSave(false)
  }

  return (
    <div>
      {saved &&(
        <div className = "hiddenform">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
          <button onClick={() => copyLink(url)}>Copy</button>
          <button onClick = {editLink}>Edit</button>
          {(index > 0) && <button onClick = {onRemove} className = 'xbutton'>X</button>}
          {copied && <span style={{ marginLeft: "8px" }}>Copied!</span>}
          
        </div>
      )}

      {!saved && (
        <div className = "fullform">
          <form className = "forms">
            <label>Name:</label>
            <input
              value={name}
              onChange={(e) => onChange("name", e.target.value)}
            />
            <label>Link:</label>
            <input
              value={url}
              onChange={(e) => onChange("url", e.target.value)}
            />
          </form>
          {(index > 0) && <button onClick = {onRemove} className = 'xbutton'>X</button>}
          <button onClick={saveLink} className= 'savebutton'>Save</button>
        </div>
      )}
    </div>
  )
}

export default Link