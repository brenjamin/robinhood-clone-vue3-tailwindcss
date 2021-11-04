import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'

const useDocument = (collection) => {
    const error = ref(null)

    

    const deleteDoc = async (id) => {
        let docRef = projectFirestore.collection(collection).doc(id)
        error.value = null

        
        try {
            const res = await docRef.delete()
            return res
        } catch(err) {
            error.value = "Could not delete the document"
        }
    }

    const updateDoc = async (id, updates) => {
        let docRef = projectFirestore.collection(collection).doc(id)
        error.value = null

        
        try {
            const res = await docRef.update(updates)
            return res
        } catch(err) {
            error.value = "Could not update the document"
        }
    }

    return { error, deleteDoc, updateDoc }
}

export default useDocument