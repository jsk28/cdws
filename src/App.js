import logo from './ship.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <p>
          Save the Titanic!
      </p>
        <img src={logo} className="App-logo" alt="logo" />


      <br></br>

        <label for="url-input"></label>
        <input type="text" id="url-input" name="url"></input>

        <br></br>
       
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"

          
        >
          Connect your Github account
        </a>
      </header>
    </div>
  );
}

export default App;
