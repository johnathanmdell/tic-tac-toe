<template>
    <div @click="$emit('click')" :class="`material-icons-outlined flex h-32 w-32 cursor-pointer items-center justify-center border border-white text-5xl hover:bg-gray-700 ${value === 'x' ? 'text-pink-500' : 'text-blue-500'}`">
        <span v-if="value !== ''">{{ value }}</span>
    </div>
</template>

<script>
export default {
    props: {
        value: String,
    }
}
</script>
