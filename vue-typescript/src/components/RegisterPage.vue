<template>
  <div class="user">
    <h1>Register</h1>
    <input type="number" v-model="idForm" placeholder="NIM/NIP">
    <br>
    <input type="text" v-model="nameForm" placeholder="Name">
    <br>
    <input type="radio" v-model="roleForm" name="roleForm" value="0"> Admin
    <input type="radio" v-model="roleForm" name="roleForm" value="1"> Mahasiswa
    <br>
    <button v-on:click="showToConsole()">Register</button>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Mahasiswa from './../entity/Mahasiswa';
  import Admin from './../entity/Admin';
  import router from '../router';

  @Component
  export default class UserForm extends Vue {
    private nameForm = "";
    private idForm = 0;
    private roleForm = "";

    public showToConsole(): void {
      if (this.roleForm == "0"){
        const admin: Admin = new Admin();
        admin.id = this.idForm;
        admin.nama = this.nameForm;
        admin.nip = this.idForm;
        this.setData(admin);
        router.push({name: "Login"});
        this.$notify({
            group: 'userNotification',
            title: 'Register Success!'
        });
        console.log("Admin",admin);
      }else if(this.roleForm == "1"){
        const mahasiswa: Mahasiswa = new Mahasiswa();
        mahasiswa.id = this.idForm;
        mahasiswa.nama = this.nameForm;
        mahasiswa.nim = this.idForm;
        this.setData(mahasiswa);
        router.push({name: "Login"});
        this.$notify({
            group: 'userNotification',
            title: 'Register Success!'
        });
        console.log("Mahasiswa",mahasiswa);
      }else{
        alert("Choose Role!");
      }
    }

    public setData(user: Object): void{
      let userStorageData = localStorage.getItem('userData');
      var userArray = [];
      if(userStorageData != null){
        userArray = JSON.parse(userStorageData);
      }
      localStorage.removeItem('userData');
      userArray.push(user);
      localStorage.setItem('userData', JSON.stringify(userArray));

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
