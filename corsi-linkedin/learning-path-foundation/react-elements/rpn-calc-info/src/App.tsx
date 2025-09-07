
import './App.css'
import Keyboard from './components/keyboard/keyboard'
import Display from './components/display/display'

function App() {

  return (
    <div>
      <Display lines={[3.1415, 2.71, 9.81]}></Display>
      <Keyboard ></Keyboard>
    </div>
  )
}

export default App
