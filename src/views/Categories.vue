<template>
    <b-container>
        <b-row><b-col><p>Results: <b-button @click="limit = 10" class="mx-1">10</b-button><b-button @click="limit = 25" class="mx-1">25</b-button><b-button @click="limit = 50" class="mx-1">50</b-button><b-button @click="limit = 75" class="mx-1">75</b-button><b-button @click="limit = 100" class="mx-1">100</b-button></p></b-col></b-row>
        <b-row>
            <b-col v-if="categories.popular && categories.popular.docs.length">
                <p>Popular</p>
                <Category v-for="category of categories.popular.docs" :key="category._id" :category="category"/>
                <b-pagination v-model="popularPage" :total-rows="categories.popular.total" :per-page="limit" align="fill"></b-pagination>
            </b-col>
            <b-col v-else><p>no categories yet</p></b-col>
            <b-col v-if="categories.new && categories.new.docs.length">
                <p>New</p>
                <Category v-for="category of categories.new.docs" :key="category._id" :category="category"/>
                <b-pagination v-model="newPage" :total-rows="categories.new.total" :per-page="limit" align="fill"></b-pagination>
            </b-col>
            <b-col v-else><p>no categories yet</p></b-col>
            <b-col v-if="categories.updated && categories.updated.docs.length">
                <p>Updated</p>
                <Category v-for="category of categories.updated.docs" :key="category._id" :category="category"/>
                <b-pagination v-model="updatedPage" :total-rows="categories.updated.total" :per-page="limit" align="fill"></b-pagination>
            </b-col>
            <b-col v-else><p>no categories yet</p></b-col>
        </b-row>
    </b-container>
</template>

<script>
import Category from '../components/Category.vue'
import axios from 'axios'
export default {
    name: 'categories',
    components: {
        Category
    },
    data(){
        return {
      categories: {new: null, updated: null, popular: null},
      newPage: 1,
      updatedPage: 1,
      popularPage: 1,
      // tog: false,
      limit: 25
      }
    },
    watch: {
        newPage(){
            this.getNewCategories();
        },
        updatedPage(){
            this.getUpdatedCategories();
        },
        popularPage(){
            this.getPopularCategories();
        },
        limit(){
            this.getCategories();
        }
    },
    methods: {
        getCategories(){
            this.getNewCategories();
            this.getUpdatedCategories();
            this.getPopularCategories();
        },
        getPopularCategories(){
            axios.get(this.$store.getters.randomServer + '/data/categories/popular/' + this.popularPage + '/' + this.limit).then(res => {console.log(res);this.categories.popular = res.data;}).catch(error => {console.log(error);});
        },
        getUpdatedCategories(){
            axios.get(this.$store.getters.randomServer + '/data/categories/updated/' + this.updatedPage + '/' + this.limit).then(res => {console.log(res);this.categories.updated = res.data;}).catch(error => {console.log(error);});
        },
        getNewCategories(){
            axios.get(this.$store.getters.randomServer + '/data/categories/new/' + this.newPage + '/' + this.limit).then(res => {console.log(res);this.categories.new = res.data;}).catch(error => {console.log(error);});
        }
    },
    created(){
        this.getCategories();
    }
}
</script>