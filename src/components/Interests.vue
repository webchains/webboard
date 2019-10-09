<template>
  <b-row>
      <b-col>
          <b-row v-for="(data, index) of post.interests" :key="index">
              <b-col>
                  <p class="mainAddress">user: {{data}}</p>
              </b-col>
          </b-row>
      </b-col>
  </b-row>
</template>

<script>
export default {
    name: 'interests',
    props: ['post']
}
</script>

<style>

</style>