import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
    collection,
    Firestore,
    getDocs,
    getFirestore,
} from 'firebase/firestore'
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

//fetch datas from firestore
const fetchFromFirestore = async () => {
    try {
        const recipeCollection = collection(firestore, 'recipes')
        const recipeSnapshot = await getDocs(recipeCollection)
        const recipeList = recipeSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        console.log('Fetched products from Firestore:', recipeList)
        return recipeList
    } catch (error) {
        console.error('Error fetching products from Firestore:', error)
        return []
    }
}

export { analytics, firestore, auth, provider, storage, fetchFromFirestore }
