import { useState,useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import lmLogo from './assets/blankicon.png'
import './App.css'
import Link from './components/Link'
import AddButton from './components/AddButton'

function App() {
  // const [count, setCount] = useState(0)
  
useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get("links", (result) => {
        console.log("Loaded links:", result.links)
        if (result.links) {
          setlinkforms(result.links)
        }
      })
    }
  }, [])

  const [linkforms, setlinkforms] = useState([{name: "", url: "",saved: false}])
  
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set({ links: linkforms })
      console.log("Saving to storage:", linkforms)
    }
  }, [linkforms])

  
  

  const handleInputChange = (index: number, field: "name"|"url", value:string) => {
    const updatedlinks = [...linkforms]
    updatedlinks[index][field] = value
    setlinkforms(updatedlinks)
  }
  const addLinkForm = () => {
    setlinkforms([...linkforms,{name:"",url:"",saved:false}])
  }
  const onSave = (index:number,bool:boolean) =>{
    const updatedlinks = [...linkforms]
    updatedlinks[index]["saved"] = bool
    setlinkforms(updatedlinks)
  }
  const onRemove = (index:number) => {
    const updatedLinks = linkforms.filter((_,i) => i!== index)
    setlinkforms(updatedLinks)
  }

  return (
    <>
      <div className='title-logo'>
        <h1>Link Manager</h1>
        <img src = {lmLogo} width={80} className = 'logo'></img>
      </div>
      
        {linkforms.map((link,index) => 
          (
          (
            <Link
                key= {index}
                name = {link.name}
                url = {link.url}
                saved = {link.saved}
                onChange = {(field,value) => handleInputChange(index,field,value)}
                onSave = {(bool) => onSave(index,bool)}
                onRemove = {() => onRemove(index)}
                index = {index}
            >
            </Link>
          ))
        )}
      <AddButton onAdd = {addLinkForm}/>
    </>
  )
}

export default App
