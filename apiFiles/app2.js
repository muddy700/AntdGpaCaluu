import './index.css'
import  PersonsList  from './components/personsList'
import  PersonsPost  from './components/personPost'
import  PersonDelete  from './components/personDelete'
  const  App = () => {

     return (
       <div>
            <PersonsList />
            <PersonsPost />  <br />   <br />
            <PersonDelete />
       </div>
      );
}

export default App;



// Contrl - Gyakie