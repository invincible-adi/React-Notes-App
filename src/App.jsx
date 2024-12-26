import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Notes from './Components/Notes'
import Navbaar from './Components/Navbaar'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbaar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/notes' element={<Notes/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
