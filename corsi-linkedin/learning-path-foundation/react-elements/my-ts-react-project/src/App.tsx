import type { Component } from 'react'
import './App.css'

class HeaderProps {
  title: string
  constructor(title: string) {
    this.title = title;
  }
}

class BodyProps {
  text: string
  constructor(text: string) {
    this.text = text;
  }
}

class FooterProps {
  text: string
  constructor(text: string) {
    this.text = text;
  }
}

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

function Header(props: HeaderProps) {
  const { title } = props;
  return <h1>{title}</h1>
}


function Page(props: PageProps) {
  const { lines } = props;
  return lines.map(line => (<p key={line.lineNumber}>{line.text}</p>))

}

function Body(props: BodyProps) {
  const { text } = props;
  return <>
    <p>{text}</p>
    <h2>😎</h2>
  </>

}

function Footer(props: FooterProps) {
  const { text } = props;
  return <p className='small'>{text}</p>

}

function MainPage() {

  return <>
    <Header title='Hello page'></Header>
    <Body text="Hello world"></Body>
    <Page lines={[new TextLine(1, "zjckzcj"), new TextLine(2, "zjasdjkhckzcj")]}></Page>
    <Footer text='copyright'></Footer>
  </>
}


function App() {


  return (
    <MainPage />
  )

}

export default App
