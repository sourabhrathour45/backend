
import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [todos, setTodos] = useState([])



  useEffect(()=>{
    function parsedResponse(data){
       console.log(data);
       setTodos(data)
    }

    function callback(response) {
      response.json().then(parsedResponse)
    }

    fetch("http://localhost:3001/todos",{
      method:"GET"
    }).then(callback)
  },[])


  return (
    <>
      <div>

        
        <h1>Todos</h1>
       {todos.map((todo)=>(
        <div key="todo.id">
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <br></br>
        </div>
       ))}
      </div>
    
    </>
  )
}

export default App
