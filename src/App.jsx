import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login'
import Signup from './components/Signup';
import Support from "./components/Support";
import Subscription from "./components/Subscription";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/support' element={<Support/>}/>
        <Route path='/subscription' element={<Subscription/>}/>

      </Routes>
    </Router>
  );
}

export default App;
