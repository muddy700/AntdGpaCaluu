import React from 'react';
import API from './api'

class PersonList extends React.Component {
  state = {
    persons: ''
  }

  componentDidMount() {
      
    API.get(`users/8`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
        <div>
      {/* <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
      </ul> */}
        {this.state.persons.name} <br />
        </div>
    )
  }
}

export default PersonList


