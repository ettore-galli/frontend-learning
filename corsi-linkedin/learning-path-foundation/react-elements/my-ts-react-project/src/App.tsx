import { useState, useReducer, type ActionDispatch, useId } from 'react'
import './App.css'


class HeaderProps {
  title: string
  constructor(title: string) {
    this.title = title;
  }
}

function Header(props: HeaderProps) {
  const { title } = props;
  return <h1>{title}</h1>
}

// --- --- --- 
class TextLine {
  lineNumber: number
  text: string
  constructor(lineNumber: number, text: string) {
    this.lineNumber = lineNumber;
    this.text = text;
  }
}
class PageProps {
  lines: TextLine[]
  constructor(lines: TextLine[]) {
    this.lines = lines;
  }
}

function Page(props: PageProps) {
  const { lines } = props;
  return lines.map(line => (<p key={line.lineNumber}>{line.text}</p>))

}

// --- --- --- 

class BodyProps {
  text: string
  constructor(text: string) {
    this.text = text;
  }
}

function Body(props: BodyProps) {
  const { text } = props;
  return <>
    <p>{text}</p>
    <h2>😎</h2>
  </>

}

// --- --- --- 

class FooterProps {
  text: string
  constructor(text: string) {
    this.text = text;
  }
}

function Footer(props: FooterProps) {
  const { text } = props;
  return <p className='small'>{text}</p>

}

// --- --- --- 

class ValueProps {
  label: string
  value: string
  setValueHook: (v: string) => void

  constructor(label: string, value: string, setValueHook: (v: string) => void) {
    this.label = label
    this.value = value;
    this.setValueHook = setValueHook
  }
}
function Value(props: ValueProps) {
  const { label, value, setValueHook } = props;

  const keyUpHandler = (e: React.ChangeEvent<HTMLInputElement>) => { setValueHook((e.target as HTMLInputElement).value) }

  return <div>
    <p>{label}</p><input value={value} onChange={keyUpHandler}></input>
  </div>

}
// --- --- --- 
class SquareState {
  value: number
  squared: number
  constructor(value: number,
    squared: number) {
    this.value = value,
      this.squared = squared
  }
}

class SquareProps {

  squareState: SquareState
  squareDispatch: ActionDispatch<[newValue: number]>

  constructor(squareState: SquareState,
    squareDispatch: ActionDispatch<[newValue: number]>) {
    this.squareState = squareState
    this.squareDispatch = squareDispatch
  }
}

function Square(props: SquareProps) {

  const { squareState, squareDispatch } = props;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => { squareDispatch(parseFloat((e.target as HTMLInputElement).value)) }

  const valueId = useId();
  return <div>
    <label htmlFor={valueId}>Calcola quadrato˚</label>
    <input type={"number"} id={valueId} value={squareState.value} onChange={changeHandler}></input>
    <p>{squareState.squared}</p>
  </div>

}
// --- --- --- 
class MainPageProps {
  value: string
  setValueHook: (v: string) => void
  squareState: SquareState
  squareDispatch: ActionDispatch<[newValue: number]>

  constructor(value: string, setValueHook: (v: string) => void,
    squareState: SquareState,
    squareDispatch: ActionDispatch<[newValue: number]>) {
    this.value = value;
    this.setValueHook = setValueHook
    this.squareState = squareState
    this.squareDispatch = squareDispatch
  }
}

function MainPage(props: MainPageProps) {
  const { value, setValueHook, squareState, squareDispatch } = props;


  return <>
    <Header title='Hello page'></Header>
    <Value
      label={"Value"}
      value={value}
      setValueHook={setValueHook}
    ></Value>
    <Square
      squareState={squareState}
      squareDispatch={squareDispatch}
    ></Square>
    <Body text="Hello world"></Body>
    <Page lines={[new TextLine(1, "zjckzcj"), new TextLine(2, "zjasdjkhckzcj")]}></Page>
    <Footer text='copyright'></Footer>
  </>
}



function App() {
  const [value, setValue] = useState("17");

  const squareReducer: (_: SquareState, newValue: number) => SquareState = (_: SquareState, newValue: number) => {
    const squared: number = (newValue === undefined || isNaN(newValue)) ? 0 : newValue ** 2
    return new SquareState(newValue, squared)

  };
  const squareInitialState: SquareState = new SquareState(1, 1);
  const [squareState, squareDispatch] = useReducer(
    squareReducer, squareInitialState
  )

  return (
    <MainPage
      value={value}
      setValueHook={setValue}
      squareState={squareState}
      squareDispatch={squareDispatch}

    />
  )

}

export default App
