import { useState } from 'react'
import { auth } from '../lib/firebase/firebase'
import { createUserWithEmailAndPassword, type User } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
   const successregister=()=> toast("Signed up in successfuly")
   const failedregister=()=> toast("SignUp failed")


    const hanndlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(email, '  ', password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user: User = userCredential.user
                successregister()
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode)
                console.log(errorMessage)
                failedregister()
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
                            Register
                        </button>
                        <p>Already have an account ?{" "}<span  className='underline text-blue-800' onClick={()=> navigate('/', { replace: true })}>Login</span></p>

                    </div>
                </div>
            </form>
        </>
    )
}

export default Register
