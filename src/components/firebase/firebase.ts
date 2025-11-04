// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { Firestore, getFirestore } from 'firebase/firestore'
import {
    getAuth,
    type Auth,
    GoogleAuthProvider,
    type AuthProvider,
} from 'firebase/auth'

import { getStorage, type FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyA0iOHaZSyDm9ZYh4kfBjr0ozr4n1VtNW8',
    authDomain: 'personal-recipe-book-5e81f.firebaseapp.com',
    projectId: 'personal-recipe-book-5e81f',
    storageBucket: 'personal-recipe-book-5e81f.firebasestorage.app',
    messagingSenderId: '808119394737',
    appId: '1:808119394737:web:71abafcf5f07c6c18d1d90',
    measurementId: 'G-H4D6YDE76V',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const firestore: Firestore = getFirestore(app)
const auth: Auth = getAuth(app)
const provider: AuthProvider = new GoogleAuthProvider()
const storage: FirebaseStorage = getStorage(app)

export { analytics, firestore, auth, provider, storage }
