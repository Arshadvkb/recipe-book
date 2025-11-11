import { Route, Routes } from 'react-router-dom'
import Home_page from './pages/Home_page'
import Register from './pages/Register'
import Login from './pages/Login'
import Add_recipe from './pages/Add_recipe'
import { ToastContainer } from 'react-toastify'

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/home" element={<Home_page />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/add" element={<Add_recipe />} />
            </Routes>
            <ToastContainer
        position="top-right"
        autoClose={500000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        </div>
    )
}

export default App
