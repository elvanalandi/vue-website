<template>
  <div id="app">
    <UserForm/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserForm from './components/UserForm.vue';

@Component({
  components: {
    UserForm,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: #4caf4c;
}
div .user{
  border: 10px solid whitesmoke;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  width: 30%;
  background-color: white;
}        
input {
  padding: 15px 32px;
  margin-bottom: 10px;
  border-radius: 10px;
}

button {
  background-color: #4caf4c;
  border: none;
  border-radius: 10px;
  margin: 0 auto;
  color: white;
  font-size: 16px;
  text-align: center;
  padding: 15px 32px;
}
</style>
