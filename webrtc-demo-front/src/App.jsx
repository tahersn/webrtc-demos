import { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Main from './views/Main'
import WebRTCComponent from './views/WebRTCComponent'
import { WebRTCSimple } from './views/WebRTCSimple'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}>
            <Route path='' element={<WebRTCComponent />} />
            <Route path='/simple' element={<WebRTCSimple />} />
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
