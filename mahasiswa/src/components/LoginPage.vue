<template>
  <div class="user">
    <h1>Login</h1>
    <input type="number" v-model="idForm" placeholder="NIM/NIP">
    <br>
    <input type="text" v-model="nameForm" placeholder="Username">
    <br>
    <button v-on:click="login()">Login</button>
    <button v-on:click="register()">Register</button>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Mahasiswa from '../entity/Mahasiswa';
  import Admin from '../entity/Admin';
  import router from '../router';

  @Component
  export default class LoginPage extends Vue {
    private nameForm = "";
    private idForm = 0;
    private roleForm = "";

    public login(): void {
      var userArray = [];
      var user;
      var validate = true;
      let userStorageData = localStorage.getItem('userData');
      if(userStorageData != null){
        userArray = JSON.parse(userStorageData);
        let tempUser = userArray;
        for (let i in userArray){
          if(tempUser[i].id == this.idForm){
            if(tempUser[i].nama == this.nameForm){
              localStorage.setItem('currentUser', JSON.stringify(tempUser[i]));
              router.push({name: "Home"});
              this.$notify({
                group: 'userNotification',
                title: 'Login Success!'
              });
              validate = true;
              break;
            }
          }
        }
        if(!validate){
          alert("Your id or username is incorrect!");
        }
      }
    }

    public register(): void {
      router.push({name: "Register"});
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
button {
  margin : 10px;
}
</style>
