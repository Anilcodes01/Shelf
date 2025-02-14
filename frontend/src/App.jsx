import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import { Books } from './pages/Books'
import BookDetail from './pages/BookDetail'

function App() {
  

  return (
   <Router>
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      <Route path='/books' element={<Books />} />
      <Route path='/books/:id' element={<BookDetail />} />
      {/* <Route path='/profile' element={<Profile />} /> */}
    </Routes>
   </Router>
  )
}

export default App
