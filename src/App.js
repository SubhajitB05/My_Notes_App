import React, {useEffect, useState} from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import './App.css';

// To get the messages from local storage
const getLocalItems = ()=>{
  let list = localStorage.getItem('lists');
  if(list){
    return JSON.parse(list);
  }
  else{
    return [];
  }
}

const App = () => {

  const [chats, setChats] = useState(''); // For each New Messeges
  const [items, setItems] = useState(getLocalItems()); // For all written messages (list)

  // For storing items in the local storage
  useEffect(()=>{
    localStorage.setItem('lists', JSON.stringify(items));
  }, [items]);

  // Adding new mssg box in the list
  function addMssgBox(){
    if(chats){
      const allInputData = {id: new Date().getTime().toString(), name:chats, status: false, readMode: true};
      setItems([allInputData, ...items]);
      setChats('');
    }
    
  // Deleteing a mssg box from the list
  }
  function deleteMssg(id){
    const newItems = items.filter((elem)=>{
      return id !== elem.id;
    })
    setItems(newItems);
  }

 // Change the edit button to save and vice versa on click
  function toggleEdit(id) {
    const updatedItems = [...items];
    const index = updatedItems.findIndex((elem)=>{
      return id === elem.id;
    })
    updatedItems[index].status = !updatedItems[index].status;
    updatedItems[index].readMode = !updatedItems[index].readMode; 
    setItems(updatedItems);

  }

   // Edit a mssg from a mssg box
  function editMssg(id, newText) {
    const updatedItems = [...items];
    const index = updatedItems.findIndex((elem) => id === elem.id);
    updatedItems[index].name = newText;
    setItems(updatedItems);
  }

  return (
    <div>
      <h1 className='heading'>My Notes App</h1>
      <div className='input-parent'>
        <input type='text' placeholder='Write Something...' className='input-box'
          value={chats} onChange={(e)=>{setChats(e.target.value)}}
        />
        <IoMdAdd className='add-icon' onClick={addMssgBox}/>
      </div>
      {
        items.map((elem)=>{
          return <div className='conatiner' key={elem.id}>
          <textarea rows='4' cols='10' value={elem.name} className='text-box' readOnly={elem.readMode} onChange={(e) => editMssg(elem.id, e.target.value)}
          ></textarea>
          {
            elem.status ? <IoCheckmarkDoneSharp className='save-btn' onClick={()=>toggleEdit(elem.id)}/> : <FaEdit className='icon1' onClick={()=>toggleEdit(elem.id)}/>
          }
          
          <MdDeleteSweep className='icon2' onClick={()=>{deleteMssg(elem.id)}}/>
        </div>
        })
      }
      
    </div>
  )
}

export default App;
