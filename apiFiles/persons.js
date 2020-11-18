import React , { useState } from 'react'
import axios from 'axios';
import './index.css'
  const  App = () => {

    const [ persons , setPersons ] = useState([])

 const showData = () => {

    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        setPersons(persons)
      })

  }

     return (
       <div>
       <input type="button" value="Show"  onClick={showData} /> 

      <ul>
        { persons.map(person => <li>{person.name}</li>)}
      </ul>
      
       </div>
      );
}

export default App;
