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
  const [githubUser, setGithubUser] = useState("")
  const [repo, setGithubRepo] = useState("")
  const [file_path, setFilePath] = useState("")
  const [file_code, setFileCode] = useState("")
  const [gptData, setGptData] = useState({ message: 'Start' })


  const fetchData = async () => {
    return fetch(`https://api.github.com/repos/${githubUser}/${repo}`)
      .then((response) => response.json())
      .then((data) => setGithubData(data));
  }
  const fetchDataGpt = async (event) => {
    event.preventDefault();
    const { Configuration, OpenAIApi } = require("openai");
    console.log(file_path)
    return fetch(`https://raw.githubusercontent.com/${githubUser}/${repo}/main/${file_path}`)
      .then((response) => response.text())
      .then(async (data) => {
        setFileCode(data);
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
          alert(data)
          alert("before responce");
          if (response2.status !== 200) {
            throw data2.error || new Error(`Request failed with status ${response2.status}`);
          }
          const data2 = JSON.stringify(response2);
          const answer = response2.data.choices[0].text;
          alert(JSON.stringify(response2.data))
          setGptData(answer_parser(answer));

        } catch (error) {
          // Consider implementing your own error handling logic here
          console.error(error);
          alert(error.message);
        }
      })

  }


  //<img src={logo} className="App-logo" alt="logo" />






  return (
    <div className="App">
      <header className="App-header">
        <p>
          Did you know that Github is carbon neutral?
        </p>
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

        {gptData.message == 'Start' ?
          <div>
            <input type="text" placeholder="File Path" onChange={(e) => setFilePath(e.target.value)} className="input_search" />
            <button onClick={fetchDataGpt} className="search_button">Check Complexity</button>
            <p>check your code time complexity! &#128018;</p>
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

function answer_parser(answer) {
  let position = answer.search("\n\nAnswer:");
  //let answerLetter = answer.substring(position+10, position+11);
  //let answerPosition = answer.search("\n\n"+answerLetter+". ");
  let retrunValue = null;
  let answerAsArray = answer.split('\n');
  let answerValue = 0;
  for (let any of answerAsArray) {
    
    if (any.includes("Answer: ")) {
      alert(any)
      answerValue = any.substring(8);
    }
  }
  alert(answerValue)
  let answerValueNumber = answerValue.toLowerCase().charCodeAt(0) - 97 + 1
  if (answerValue != "") {
    let value = answer.indexOf("\n"+answerValue+".")
    let substring = answer.substring(value+3)
    retrunValue = substring.substring(0,substring.indexOf("\n"));
  }
  return retrunValue;

}


export default App;
