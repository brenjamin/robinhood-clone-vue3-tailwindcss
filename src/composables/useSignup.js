import { ref } from "vue"
import { projectAuth } from "../firebase/config"
import  { projectFirestore } from '../firebase/config'
import { timestamp } from '@/firebase/config'


const error = ref(null)
const isPending = ref(false)

const signup = async (email, password) => {
    error.value = null
    isPending.value = true

    try {   
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if (!res) {
            throw new Error('Could not complete the signup')
        }

        var userUid = projectAuth.currentUser.uid;

        const startingList = {
            title: 'FAANG',
            emoji: '128406',
            userId: userUid,
            stocks: ['FB', 'AAPL', 'AMZN', 'NFLX', 'GOOGL'],
            createdAt: timestamp()
        }
        
        await projectFirestore.collection('lists').add(startingList)
        

        error.value = null
        isPending.value = false
        
        return res
    } catch(err) {
        error.value = err.message
        isPending.value = false
    }
}

const useSignup = () => {

    return { error, signup, isPending }
}

export default useSignup