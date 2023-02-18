import logo from './ship.png';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [githubData, setGithubData] = useState({ message: 'Start' })
  const [githubUser, setGithubUser] = useState("")
  const [repo, setGithubRepo] = useState("")


  const fetchData = async () => {
    console.log(repo)
    console.log(githubData.message)
    return fetch(`https://api.github.com/repos/${githubUser}/${repo}`)
      .then((response) => response.json())
      .then((data) => setGithubData(data));
  }


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
        {githubData.message == 'Start' ?
          <div>
            <p>Enter ur github username and repository name! &#128018;</p>
          </div> : githubData.message == 'Not Found' ?
            <p>Ups... couldn't find it. Try again! &#129431;</p> :
            <div>
              <p>Ur code takes {githubData.size} kB on GitHub servers! &#128560;</p>
              <p>Github had to plant {calculator_treePlant(githubData.size).toFixed(2)} trees this year for you to stay carbon-neutral! &#129382;</p>
            </div>
        }
      </header>
    </div>
  );
}
//assume the input is in kilo byte
function calculator_kilowhatPerhour(fileSize) {
  const kiloWhatperHourperGigabyte = 0.01;
  let gigaByte = fileSize/(1024*1024);
  let kiloWhatperHour = gigaByte * kiloWhatperHourperGigabyte;
  return kiloWhatperHour;
}
//assume the input is in kilo byte
function calculator_carbonEmision(fileSize) {
  const CarbonPerKiloWhatPerHour = 0.309;
  let CarbonperEmission = calculator_kilowhatPerhour(fileSize) * CarbonPerKiloWhatPerHour; 
  return CarbonperEmission;
}
//assume the input is in kilo byte
function calculator_finacialCost(fileSize){
const pricePerKiloWhat = 0.32;
let finacialCost = calculator_kilowhatPerhour(fileSize) * pricePerKiloWhat;
return finacialCost
}
//assume the input is in kilo byte
function calculator_treePlant(fileSize){
  const treeperKiloWhatperHour = 64.333;
  let treeCost = calculator_kilowhatPerhour(fileSize) * treeperKiloWhatperHour;
  return treeCost;
}

export default App;
