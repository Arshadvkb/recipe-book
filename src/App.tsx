import { Route, Routes } from 'react-router-dom'
import Home_page from './pages/Home_page'
import Register from './pages/Register'
import Login from './pages/Login'
import Add_recipe from './pages/Add_recipe'

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home_page />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add" element={<Add_recipe />} />
            </Routes>
        </div>
    )
}

export default App
