<template>
    <b-row>
        <b-col>
            <p><router-link :to="{name: 'category', params: {category: category.category}}">{{category.category}}</router-link></p>
            <p>counts: {{category.count}} | hits: {{category.hit}}</p>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'Category',
    props: ['category']
}
</script>

<style>

</style>