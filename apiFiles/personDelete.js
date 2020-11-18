import React from 'react';
import axios from 'axios';
import API from './api'

class PersonDelete extends React.Component {
  state = {
    id: '',
    // persons: []

  }

//   callthem() {
//       axios.get(`https://jsonplaceholder.typicode.com/users`)
//           .then(res => {
//               const persons = res.data;
//               this.setState({
//                   persons
//               });
//           })
//   }
//   componentDidMount() {
//       axios.get(`https://jsonplaceholder.typicode.com/users`)
//           .then(res => {
//               const persons = res.data;
//               this.setState({
//                   persons
//               });
//           })
//   }

  handleChange = event => {
    this.setState({ id: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

        // const response = await API.delete(`users/${this.state.id}`);

    axios.delete(`https://jsonplaceholder.typicode.com/users/${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person ID:
            <input type="text" name="id" onChange={this.handleChange} />
          </label>
          <button type="submit">Delete</button>
        </form>
        {/* <br /> 
               <input type="button" value="Show"  onClick={this.callthem} /> 

         <br />
        
      <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
      </ul> */}
      </div>
    )
  }
}

export default PersonDelete