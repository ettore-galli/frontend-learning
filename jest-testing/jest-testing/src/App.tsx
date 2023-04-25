
import { useState } from 'react';
import './App.css';
import { Selector } from './components/selector/selector';
import { remindMe } from './lib/reminder';

function App() {

  const [reminderInput, setReminderInput] = useState("");
  const [reminderMessage, setReminderMessage] = useState("");
  const [reminderVisible, setReminderVisible] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test examples</h1>
      </header>
      <body className="App-body">
        <div className='grid-container'>
          <div className="testCaseContainer">
            <Selector title={"Selettore"}></Selector>
          </div>
          <div className="testCaseContainer">

            <input value={reminderInput} onChange={e => { setReminderInput(e.target.value) }}></input>

            {
              <button onClick={() => {
                remindMe(reminderInput, 5000, message => {
                  setReminderMessage(message);
                  setReminderVisible(true);
                })
              }}>REMIND ME</button>
            }

            {
              !!reminderVisible && <div onClick={_ => setReminderVisible(false)}>{reminderMessage}</div>
            }

          </div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>
          <div className="testCaseContainer">&nbsp;</div>

        </div>
      </body>
    </div>
  );
}

export default App;
