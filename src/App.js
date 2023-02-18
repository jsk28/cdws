import logo from './ship.png';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [githubData, setGithubData] = useState({})
  const [githubUser, setGithubUser] = useState("jsk28")
  const [repo, setGithubRepo] = useState("save-titanic")

  
  const fetchData = async () => {
    console.log(githubData.size)
    return fetch(`https://api.github.com/repos/${githubUser}/${repo}`)
    .then((response) => response.json())
    .then((data) => setGithubData(data));
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Save the Titanic!
        </p>
        <img src={logo} className="App-logo" alt="logo" />


        <br></br>

        <input type="text" placeholder="User" onChange={(e) => setGithubUser(e.target.value)} className="input_search" />
        <input type="text" placeholder="Repo" onChange={(e) => setGithubRepo(e.target.value)} className="input_search" />
        <button onClick={fetchData} className="search_button">Search Github</button>
        <br></br>
        <p>{calculator(githubData.size)}</p>

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

function calculator(number) {
    return number + 100;
}
