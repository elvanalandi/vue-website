<template>
  <div class="user">
    <h1>Welcome {{ msg }} </h1>
    <br>
    <button v-on:click="logout()">Logout</button>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import router from '../router';
  
  @Component
  export default class HomePage extends Vue {
      private msg: string = JSON.parse(localStorage.getItem('currentUser')).nama;

      public logout(): void{
          localStorage.removeItem('currentUser');
          router.push({name: "Login"});
      }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
