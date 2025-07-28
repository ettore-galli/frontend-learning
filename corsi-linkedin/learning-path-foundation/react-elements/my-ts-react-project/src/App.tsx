import type { Component } from 'react'
import './App.css'

class HeaderProps {
  title: string
  constructor(title: string) {
    this.title = title
  }
}

class BodyProps {
  text: string
  constructor(text: string) {
    this.text = text
  }
}

class FooterProps {
  text: string
  constructor(text: string) {
    this.text = text
  }
}

function Header(props: HeaderProps) {
  const { title } = props;
  return <h1>{title}</h1>
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
    <Footer text='copyright'></Footer>
  </>
}


function App() {


  return (
    <MainPage />
  )

}

export default App
