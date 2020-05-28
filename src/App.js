import React, {Component} from 'react';
import Header from './Components/Header';
import Notas from './Components/Notas';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Notas />
      </div>
    );
  }
}

export default App;
