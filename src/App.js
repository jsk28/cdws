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

  const [githubData, setGithubData] = useState({ message: 'Start'})
  const [githubUser, setGithubUser] = useState("")
  const [repo, setGithubRepo] = useState("")


  const fetchData = async () => {
    console.log(repo)
    console.log(githubData.message)
    return fetch(`https://api.github.com/repos/${githubUser}/${repo}`)
      .then((response) => response.json())
      .then((data) => setGithubData(data));
  }
  const fetchDataGpt = async (event) => {
    event.preventDefault();
    const { Configuration, OpenAIApi } = require("openai");
    try {
      
      const configuration = new Configuration({
        apiKey: "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",
        });
        const openai = new OpenAIApi(configuration);
  
  
        const response = await openai.createCompletion({
          model: "code-davinci-002",
          prompt: "what is the time complexity of the following code 'int i = 0; while (i < 5) { System.out.println(i); i++;}'",
          temperature: 0,
          max_tokens: 64,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
          stop: ["\"\"\""],
        });
  
  
      const data = JSON.stringify(response);
      const answer = response.data.choices[0].text;
      setGptData(answer_parser(answer));
      
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
    
  
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  //<img src={logo} className="App-logo" alt="logo" />

  const [gptData, setGptData] = useState({ message: 'Start'} )




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
        <button onClick={fetchDataGpt} className="search_button">check Complexity</button>
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
function calculator_finacialCost(fileSize) {
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

function answer_parser(answer){
  let position = answer.search("\n\nAnswer:");
  //let answerLetter = answer.substring(position+10, position+11);
  //let answerPosition = answer.search("\n\n"+answerLetter+". ");
  let retrunValue = null;
  let answerAsArray = answer.split('\n\n');
  let answerValue = 0;
  for (let any of answerAsArray ){
      if (any.includes("Answer: ")){
        answerValue = any.substring(8);
      }
  }
  let answerValueNumber = answerValue.toLowerCase().charCodeAt(0) - 97 + 1
  alert(answerValueNumber);
  if (answerValueNumber != 0){
    retrunValue = answerAsArray[answerValueNumber].substring(2);
  }
  return retrunValue;

}


export default App;
