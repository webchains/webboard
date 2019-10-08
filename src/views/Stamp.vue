<template>
    <p>{{stamp}}</p>
</template>

<script>
export default {
    name: 'Stamp',
    data(){
        return {
            stamp: this.$store.getters.stamp
        }
    }
}
</script>
