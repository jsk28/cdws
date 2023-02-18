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
//assume the input is in kilo byte
function calculator_kilowhatPerhour(fileSize) {
  const kiloWhatperHourperGigabyte = 0.01;
  let gigaByte = fileSize/1024*1024;
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
  const treeperKiloByte = 0.0026;
  
  let treeCost = treeperKiloByte * fileSize;
  return treeCost;
}

export default App;
