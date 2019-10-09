<template>
    <b-row v-if="data">
        <b-col>
            <b-row v-for="category of data.docs" :key="category._id">
                <b-col>
                    <p><router-link :to="{name: 'category', params: {category: category.category}}">{{category.category}}</router-link></p>
                    <p>counts: {{category.count}} | hits: {{category.hit}}</p>
                </b-col>
            </b-row>
            <b-pagination v-model="page" :total-rows="data.length" :per-page="limit" align="fill"></b-pagination>
        </b-col>
    </b-row>
</template>

<script>
import axios from 'axios'
export default {
    name: 'categories',
    data(){
        return {
            data: null,
            page: 1,
            limit: 10
        }
    },
    methods: {
        getCategories(){
            axios.get(this.$store.getters.randomServer + '/data/categories/' + this.page + '/' + this.limit).then(res => {console.log(res);this.data = res.data;}).catch(error => {console.log(error);});
        }
    },
    created(){
        this.getCategories();
    }
}
</script>