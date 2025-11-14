import { create } from 'zustand'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { auth, firestore } from '../lib/firebase/firebase'
import { toast } from 'react-toastify'


export interface Recipe {
    id: string
    title: string
    instructions: string
    ingredients: string[]
    userId: string
}

interface FirebaseStoreState {
    recipeList: Recipe[] | null
}

interface FirebaseStoreActions {
    getData: () => Promise<void>
    deleteItem: (id: string, userId:string) => Promise<void>
}

type FirebaseStore = FirebaseStoreState & FirebaseStoreActions


let db 
try {

    const {firestore: firestoreDb } = await import('../lib/firebase/firebase')
    db = firestoreDb
    console.log('Firebase DB loaded successfully:', !!db) 
} catch (importError) {
    console.error('Firebase config import failed:', importError)
    db = null
}

const recipedeleted=()=>toast("recipe deleted")
const failed=()=>toast("recipe deleted")


export const useFirebaseStore = create<FirebaseStore>((set) => ({
    recipeList: null,

    getData: async () => {
        console.log('=== getData STARTED ===')

        if (!db) {
            console.error('DB not available - cannot fetch')
            set({ recipeList: [] })
            return
        }

        try {
            console.log('About to call getDocs...')

            const querySnapshot = await getDocs(collection(db, 'recipes'))
            console.log(
                'getDocs resolved. Docs count:',
                querySnapshot.docs.length
            )

            const data: Recipe[] = querySnapshot.docs.map((doc) => {
                const docData = doc.data()
                console.log('Mapping doc:', doc.id, docData)
                return {
                    id: doc.id,
                    title: docData.title || '',
                    instructions: docData.instructions || '',
                    ingredients: docData.ingredients || [],
                    userId: docData.userId || '',
                }
            })

            console.log('Mapped data (full array):', data)

            set((state) => {
                console.log(
                    'About to set state. Current state:',
                    state.recipeList
                )
                const newState = { recipeList: data }
                console.log('New state to set:', newState)
                return newState
            })

            console.log('set() called successfully')
        } catch (error) {
            console.error('Inner try-catch error:', error)
            set({ recipeList: [] })
        }

        console.log('=== getData ENDED ===')
    },
    deleteItem:async (id,userId)=>{
        try {
           const CurrentUser=auth.currentUser?.uid
           console.log("cur user",CurrentUser)
           console.log("user",userId);

           if(userId===CurrentUser){
           await deleteDoc(doc(firestore, 'recipes', id)).then(()=>{
              recipedeleted();
           }).catch(()=>{
            failed()
           })
          

           }
           
           
            
        } catch (error) {
            failed()
              console.error('Inner try-catch error:', error)
        }
        
    }
}))
