import { useState } from 'react'
import { auth } from '../components/firebase/firebase'
import { createUserWithEmailAndPassword, type User } from 'firebase/auth'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const hanndlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(email, '  ', password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user: User = userCredential.user
                console.log(user)
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
                            className="bg-accent rounded-4xl mb-5 pl-5"
                            type="text"
                        />
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            placeholder="password"
                            className="bg-accent rounded-4xl mb-5 pl-5"
                            type="password"
                        />
                        <button className="bg-accent rounded-4xl mb-5">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Register
