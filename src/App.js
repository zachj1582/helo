import React from 'react';
import './App.css';
import Nav from './components/Nav.js'
import routes from './routes'

function App() {
  return (
    <div className="App">
      <Nav/>
      {routes}
    </div>
  );
}

export default App;
