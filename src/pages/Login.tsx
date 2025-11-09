import { signInWithEmailAndPassword, type User } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../lib/firebase/firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const hanndlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(email, '  ', password)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user: User = userCredential.user
                console.log(user)
                if (user) {
                    navigate('/home', { replace: true })
                }
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message

                console.log(errorCode)
                console.log(errorMessage)
            })
    }

    return (
        <>
            <form onSubmit={hanndlesubmit}>
                <div className="bg-primary min-h-screen min-w-screen flex items-center justify-center">
                    <div className="h-auto w-70  bg-light rounded-2xl flex flex-col gap-3 p-5">
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            placeholder="email"
                            className="bg-accent rounded-4xl mb-5 pl-5 h-10"
                            type="text"
                        />
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            placeholder="password"
                            className="bg-accent rounded-4xl mb-5 pl-5 h-10"
                            type="password"
                        />
                        <button className="bg-accent rounded-4xl mb-5 h-10">
                            Login
                        </button>
                       <p>No account?{" "}<span  className='underline text-blue-800' onClick={()=> navigate('/register', { replace: true })}>register</span></p>
                    </div>
                </div>
              
            </form>
           
        </>
    )
}

export default Login
