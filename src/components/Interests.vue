<template>
  <b-row>
      <b-col>
          <p>Interests</p>
          <b-row v-for="(data, index) of post.interests" :key="index" class="mainAddress mx-1 my-1 rowcol">
              <b-col>
                  <p>user: {{data}}</p>
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