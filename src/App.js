import React, { Component } from 'react';
import './App.css';
import ReactWebChat from 'botframework-webchat';
import { DirectLine } from 'botframework-directlinejs';
const credentials = require('./secret');

class App extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      token: null
    }

    this.getToken = this.getToken.bind(this);

  }


  componentWillMount() {
    this.getToken();
   
  };


  getToken() {
    fetch('https://webchat.botframework.com/api/tokens', {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'Bearer ' + credentials.secret()
        })
      })
      .then(
        (res) => res.json(),
        (err) => console.error(err)
      )
      .then(
        (json) => {
          this.setState({token: json});
        }

      )
  }


  render() {
    const hasFetched = this.state.token;
    if (hasFetched){
      return (   
      <div className="App">
        <header className="App-header"> 
           <div className="container">
              <ReactWebChat directLine={this.directLine = new DirectLine({ token: this.state.token})} />             
            </div>
          </header>
      </div>)
    }
    return (
      <div className="App">
        <header className="App-header">
        <div>
          <h1>loading..</h1>
        </div>
        </header>
      </div>
    );
  }
}

export default App;
