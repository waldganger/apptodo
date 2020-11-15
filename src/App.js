import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Todos from './components/Todos';
import Header from './layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About'
// import {v4 as uuidv4} from 'uuid'
import Axios from 'axios';

class App extends React.Component {
  state = {
    todos: [
      // {
      //   id: uuidv4(),
      //   title: "Sortir les poubelles",
      //   completed: false
      // },
      // {
      //   id: uuidv4(),
      //   title: "Envoyer le formulaire au syndic",
      //   completed: false
      // },
      // {
      //   id: uuidv4(),
      //   title: "Envoyer le CR",
      //   completed: false
      // },      
    ]
  }

  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => {
        console.log(res.data);
        this.setState({todos: res.data})
      }
      )
  }

  // Toggle complete
  markComplete = (id) =>  {
    console.log("salut" + id)
    this.setState({todos: this.state.todos.filter((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })})
    
  }

  // Delete todo
  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)] }))
  }

  addTodo = (title) => {
    Axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data]}))
    // const newTodo = {
    //   id: uuidv4(),
    //   title,
    //   completed: false
    // }
    // console.log("Title submitted :" + title);
    
  }


  render() {
    console.log(this.state.todos);
    
    return(
      <Router>
        <div className="App">
          <div className="container">
            <Header/>
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos 
                todos={this.state.todos} 
                markComplete={this.markComplete} 
                delTodo={this.delTodo}/>
              </React.Fragment>
            )}/>
            <Route path="/about" component={About} />
            
          </div>
        </div>
    </Router>
    )
  }
}

export default App;
