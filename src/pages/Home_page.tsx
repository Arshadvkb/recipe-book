import { fetchFromFirestore } from '../components/firebase/firebase'
import Navbar from '../components/Navbar/Navbar'

const Home_page = () => {
    fetchFromFirestore()
    return (
        <div>
            <Navbar />
            <h1>Home_page</h1>
        </div>
    )
}

export default Home_page
