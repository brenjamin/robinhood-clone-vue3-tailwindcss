<template>
  <button type="button" class="flex items-center w-full my-4" @click="checked = !checked">
    <div class="text-light-green">
        <div :aria-checked="checked" aria-disabled="false" :aria-labelledby="list.id" role="checkbox">
            <svg v-show="checked" class="fill-current" height="24" role="img" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M21 3H3V21H21V3ZM10.5001 16.9142L18.2072 9.20711L16.793 7.79289L10.5001 14.0858L7.70718 11.2929L6.29297 12.7071L10.5001 16.9142Z" fill-rule="evenodd"></path></svg>
            <svg v-show="!checked" class="fill-current" height="24" role="img" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M19 5H5V19H19V5ZM3 3V21H21V3H3Z" fill-rule="evenodd"></path></svg>
        </div>
        
    </div>
    <p class="h-16 w-12 flex items-center justify-center rounded bg-light-gray dark:bg-neutral-bg-3 flex-shrink-0 text-2xl ml-4" v-html="`&#${list.emoji};`"></p>
    <label :id="list.id" class="block text-base-xs font-medium ml-3 truncate text-left leading-normal pointer-events-none">
        <p class="text-base-sm">{{ list.title }}</p>
        <p class="text-base-xs text-neutral-fg-2">{{ list.stocks.length }} item{{ list.length === 1 ? '' : 's'}}</p>
    </label>
</button>
</template>

<script>
import { ref, watch } from 'vue'
export default {
    name: 'SingleListModal',
    props: ['stock', 'list', 'checked', 'ready'],
    emits: ['changed', 'unchanged', 'updateMe'],
    setup(props, context) {
        const originalCheckedValue = ref(props.checked)
        const checked = ref(props.checked)
        const list = props.list

        watch(checked, () => {
            if (checked.value !== originalCheckedValue.value) {
                context.emit('changed')
            } else {
                context.emit('unchanged')
            }
        })

        watch(() => props.ready, (first, second) => {
            if (checked.value !== originalCheckedValue.value && props.ready === true) {
                context.emit('updateMe', list, checked)
            }
        })

        return { checked}
    }
}
</script>

<style>

</style>