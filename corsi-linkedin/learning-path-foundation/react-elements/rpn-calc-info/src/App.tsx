
import './App.css'
import Keyboard from './components/keyboard/keyboard'
import Display from './components/display/display'
import { useCalculator } from "./logic/CalculatorReducer"
import { CalcStateContext, CalcDispatchContext } from './logic/CalculatorContext';

function App() {

  const { state, dispatch } = useCalculator();
  return (
    <CalcStateContext value={state}>
      <CalcDispatchContext value={dispatch}>
        <div>
          <Display lines={state.stack.map(value => (typeof value !== "undefined") ? value : "")}></Display>
          <Keyboard ></Keyboard>
        </div>
      </CalcDispatchContext>
    </CalcStateContext>
  )
}

export default App
