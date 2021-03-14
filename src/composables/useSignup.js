import { ref } from "vue"
import { projectAuth } from "../firebase/config"
import  { projectFirestore } from '../firebase/config'

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
        console.log(res.user)

        var userUid = projectAuth.currentUser.uid;

        await projectFirestore.collection('users').doc(userUid).set({
            email,
            password
        });

        error.value = null
        isPending.value = false
        
        return res
    } catch(err) {
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
}

const useSignup = () => {

    return { error, signup, isPending }
}

export default useSignup