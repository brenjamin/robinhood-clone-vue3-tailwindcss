<template>
  <form class="px-4 py-2" @submit.prevent="handleAdd">
    <div class="flex items-center">
        <button ref="emojiTrigger" @click="toggleEmojiPicker" class="flex-shrink-0 block border border-border-gray dark:border-neutral-bg-3 rounded h-10 w-10 items-center justify-center" type="button" v-html="`&#${emoji};`"></button>
        <div class="ml-2 dark:bg-neutral-bg-3 border border-transparent rounded  dark:focus-within:bg-transparent">
            <input required placeholder="List Name" type="text" class="focus:outline-none dark:focus:border-light-green focus:border-light-green dark:border-transparent border-border-gray dark:border-neutral-bg-3 h-9 w-full rounded py-1 px-2 border text-base-xs bg-transparent" v-model="newListName">
        </div>
    </div>
    <div class="flex justify-end items-center mt-2">
        <button type="button" class="flex items-center justify-center rounded font-bold text-base-xs w-20 h-9 border-light-green border text-light-green dark:text-light-green hover:bg-lightest-green" @click="hideForm">Cancel</button>
        <button v-if="!isPending" type="submit" class="flex items-center justify-center ml-2 rounded bg-light-green font-bold text-base-xs w-24 h-9 text-white border-light-green border dark:text-black hover:bg-lighter-green">Create List</button>
        <button v-else type="submit" class="flex items-center justify-center ml-2 rounded bg-light-green font-bold text-base-xs w-24 h-9 text-white border-light-green border dark:text-black hover:bg-lighter-green" disabled><img class="w-10" :src="require('@/assets/img/auth/spinner.svg')"></button>
    </div>
    </form>
    <p v-if="error" class="px-5 mt-1 text-base-xs font-bold text-red">{{ error }}</p>
</template>

<script>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import { EmojiButton } from '@joeattardi/emoji-button'
import useCollection from '@/composables/useCollection'
import { timestamp } from '@/firebase/config'
export default {
    name: 'AddListForm',
    emits: ['closeForm'],
    setup(props, context) {
        const newListName = ref('')
        const emoji = ref('9889')
        const emojiTrigger = ref(null)
        const { error, addDoc } = useCollection('lists')
        const isPending = ref(false)
        const store = useStore()

        const hideForm = () => {
            context.emit('closeForm')
        }

        const handleAdd = async () => {
            error.value = ''
            if (newListName.value) {
                isPending.value = true
                const res = await addDoc({
                    title: newListName.value,
                    emoji: emoji.value,
                    userId: store.state.user.uid,
                    stocks: [],
                    createdAt: timestamp()
                })
                isPending.value = false
                if (!error.value) {
                    context.emit('closeForm')
                    newListName.value = ''
                    emoji.value = '9889'
                }
            } else {
                error.value = 'You must enter a title'
            }
        }

        const picker = new EmojiButton({
            styleProperties: {
            '--font': 'Capsule Sans Text',
            '--blue-color': 'rgb(0, 200, 5)'
            },
            position: 'left-start',
            showVariants: false
        })

        
        const toggleEmojiPicker = () => {
            emojiTrigger.value.classList.add('border-light-green')
            emojiTrigger.value.classList.remove('border-border-gray', 'dark:border-neutral-bg-3')
            
            picker.togglePicker(emojiTrigger.value)
        }

        picker.on('emoji', selection => {
            
            emoji.value = selection.emoji.codePointAt(0)
        });

        picker.on('hidden', () => {
            emojiTrigger.value.classList.remove('border-light-green')
            emojiTrigger.value.classList.add('border-border-gray', 'dark:border-neutral-bg-3')
        });

        
        


        return { newListName, hideForm, toggleEmojiPicker, emojiTrigger, emoji, error, handleAdd, isPending }
    }
}
</script>

<style>
.emoji-picker__search-icon {
    @apply top-1.25;
}

.dark .emoji-picker, .dark .emoji-picker__variant-popup {
    @apply bg-black;
}
.dark .emoji-picker input {
    @apply bg-neutral-bg-3;
}
.dark .emoji-picker h2, .dark .emoji-picker input {
    @apply text-white;
}
.dark .emoji-picker__emoji:focus, .dark .emoji-picker__emoji:hover {
    @apply bg-neutral-bg-3;
}
</style>