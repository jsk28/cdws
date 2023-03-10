import logo from './ship.png';
import './App.css';
import { useEffect, useState } from 'react';

import { Canvas } from "@react-three/fiber";
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import Model from './Titanic';
import { Configuration, OpenAIApi } from "openai";
import { any } from 'prop-types';

function App() {

  const [githubData, setGithubData] = useState({ message: 'Start' })
  const [langData, setLangData] = useState({})
  const [githubUser, setGithubUser] = useState("")
  const [repo, setGithubRepo] = useState("")
  const [file_path, setFilePath] = useState("")
  const [gptData, setGptData] = useState({ message: 'Start' })
  const [spinner, setSpinner] = useState(false);


  const fetchData = async () => {
    return fetch(`https://api.github.com/repos/${githubUser}/${repo}`)
      .then((response) => response.json())
      .then((data) => {
        setGithubData(data);
        return fetch(data.languages_url)
          .then((response) => response.json())
          .then((data) => { console.log(data); setLangData(data) });
      })
      ;
  }
  const fetchDataGpt = async (event) => {
    setSpinner(true);
    event.preventDefault();
    const { Configuration, OpenAIApi } = require("openai");
    console.log(file_path)
    return fetch(`https://raw.githubusercontent.com/${githubUser}/${repo}/main/${file_path}`)
      .then((response) => response.text())
      .then(async (data) => {
        console.log(data)
        try {

          const configuration = new Configuration({
            apiKey: "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",
          });
          const openai = new OpenAIApi(configuration);

          const response2 = await openai.createCompletion({
            model: "code-davinci-002",
            prompt: "what is the time complexity of the following code '" + data + "'",
            temperature: 0.0,
            max_tokens: 640,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\"\"\""],
          });
          const data2 = JSON.stringify(response2);
          if (response2.status !== 200) {
            setGptData({ message: 'Not Found' });
            setSpinner(false);
            throw data2.error || new Error(`Request failed with status ${response2.status}`);
          } else {
            const answer = response2.data.choices[0].text;
            setGptData(answer_parser(answer));
            setSpinner(false);
          }

        } catch (error) {
          // Consider implementing your own error handling logic here
          console.error(error);
          alert(error.message);
          setSpinner(false);
        }
      })

  }


  //<img src={logo} className="App-logo" alt="logo" />






  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Did you know that Github is carbon neutral? &#128029;
        </h2>

        <div style={{ position: "relative", width: '100%', height: 500 }}>
          <Canvas height='500'>
            <ambientLight intensity={0.25} />
            <ambientLight intensity={0.1} />
            <directionalLight intensity={0.2} />
            <Suspense fallback={null}>
              <Model />
            </Suspense>
            <OrbitControls />
          </Canvas>
        </div>
        <br></br>

        <input type="text" placeholder="User" onChange={(e) => setGithubUser(e.target.value)} />
        <input type="text" placeholder="Repo" onChange={(e) => setGithubRepo(e.target.value)} />
        <button onClick={fetchData} >Click Me &#129470;</button>
        <br></br>
        {githubData.message == 'Start' ?
          <div>
            <p>Enter ur github username and repository name! &#128018;</p>
          </div> : githubData.message == 'Not Found' ?
            <p>Ups... couldn't find it. Try again! &#129431;</p> :
            <div>
              <p>Ur code takes {githubData.size} kB on GitHub servers! &#128560;</p>
              <p>Github had to plant {calculator_treePlant(githubData.size).toFixed(6)} trees this year for you to stay carbon-neutral! &#129382;</p>
              <p>You could boil {calculator_kettles(githubData.size).toFixed(6)} kettles of water with the energy used to host your code for a year! &#9749;</p>
            </div>
        }


        {spinner ?
          <img src={logo} className="App-logo" alt="logo" /> : null
        }
        {gptData.message == 'Start' ?
          <div>
            <input type="text" placeholder="File Path" onChange={(e) => setFilePath(e.target.value)} />
            <button onClick={fetchDataGpt} >Check Complexity</button>
            <p>check your code time complexity! &#128047;</p>
          </div> : gptData.message == 'Not Found' ?
            <p>Ups... couldn't find it. Try again! &#129431;</p> :
            <div>
              <p>Ur code has time complexity {gptData}! &#128560;</p>
            </div>
        }
      </header>
    </div>
  );
}

//assume the input is in kilo byte
function calculator_kilowhatPerhour(fileSize) {
  const kiloWhatperHourperGigabyte = 0.01;
  let gigaByte = fileSize / (1024 * 1024);
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
function calculator_finacialCost(fileSize) {
  const pricePerKiloWhat = 0.32;
  let finacialCost = calculator_kilowhatPerhour(fileSize) * pricePerKiloWhat;
  return finacialCost
}
//assume the input is in kilo byte
function calculator_treePlant(fileSize) {
  const treeperKiloWhatperHour = 64.333;
  let treeCost = calculator_kilowhatPerhour(fileSize) * treeperKiloWhatperHour;
  return treeCost;
}

function calculator_kettles(fileSize) {
  const kettle_factor = 0.08;
  let treeCost = (calculator_kilowhatPerhour(fileSize) * 24 * 365) / kettle_factor;
  return treeCost;
}

function calculator_fart(fileSize) {
  const fart_factor = 0.285;
  let treeCost = (calculator_kilowhatPerhour(fileSize) * 24 * 365) / fart_factor;
  return treeCost;
}

function answer_parser(answer) {
  let position = answer.search("\n\nAnswer:");
  //let answerLetter = answer.substring(position+10, position+11);
  //let answerPosition = answer.search("\n\n"+answerLetter+". ");
  let retrunValue = null;
  let answerAsArray = answer.split('\n');
  let answerValue = 0;
  for (let any of answerAsArray) {

    if (any.includes("Answer: ")) {
      answerValue = any.substring(8);
    }
  }
  let answerValueNumber = answerValue.toLowerCase().charCodeAt(0) - 97 + 1
  if (answerValue != "") {
    let value = answer.indexOf("\n" + answerValue + ".")
    let substring = answer.substring(value + 3)
    retrunValue = substring.substring(0, substring.indexOf("\n"));
  }
  return retrunValue;

}


export default App;
