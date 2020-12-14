<template>
  <div class="user">
    <div v-if="currentUserData == null">
      <h1>Login first!</h1>
      <br>
      <button v-on:click="login()">Login</button>
    </div>
    <div v-if="currentUserData != null">
      <h1>Welcome {{ msg }} </h1>
      <br>
      <button v-on:click="logout()">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import router from '../router';
  
  @Component
  export default class HomePage extends Vue {
    private currentUserData = localStorage.getItem('currentUser');
    private msg = this.currentUserData !== null ? JSON.parse(this.currentUserData).nama : "";
    public logout(): void{
      localStorage.removeItem('currentUser');
      router.push({name: "Login"});
    }
    public login(): void{
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
