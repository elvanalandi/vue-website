<template>
  <div class="user">
    <h1>User Form</h1>
    <input type="number" v-model="idForm" placeholder="NIM/NIP">
    <br>
    <input type="text" v-model="nameForm" placeholder="Name">
    <br>
    <input type="radio" v-model="roleForm" name="roleForm" value="0"> Admin
    <input type="radio" v-model="roleForm" name="roleForm" value="1"> Mahasiswa
    <br>
    <button v-on:click="showToConsole()">Submit</button>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  interface User {
    id: number;
    nama: string;
    role: Role;
  }
  enum Role{
      ADMIN = "ADMIN",
      MAHASISWA = "MAHASISWA"
  }

  abstract class BaseUser implements User{
      public nama = "";
      public abstract role: Role;
  }

  class Mahasiswa extends BaseUser{
      public nim = 0;
      public role: Role = Role.MAHASISWA;
  }

  class Admin extends BaseUser{
      public nip = 0;
      public role: Role = Role.ADMIN;
  }

  @Component
  export default class UserForm extends Vue {
    private nameForm = "";
    private idForm = "";
    private roleForm = "";
    public showToConsole(): void {
      if (this.roleForm == "0"){
        const admin: Admin = new Admin();
        admin.nama = this.nameForm;
        admin.nip = this.idForm;
        admin.role = Role.ADMIN;
        console.log("Admin",admin);
      }else if(this.roleForm == "1"){
        const mahasiswa: Mahasiswa = new Mahasiswa();
        mahasiswa.nama = this.nameForm;
        mahasiswa.nim = this.idForm;
        mahasiswa.role = Role.MAHASISWA;
        console.log("Mahasiswa",mahasiswa);
      }else{
        alert("Choose Role!");
      }
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
