<template>
  <div class="user">
    <div v-if="currentUserData != null">
      <br>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in jsonData" :key="data.id">
            <td>{{ data.id }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.username }}</td>
            <td>{{ data.email }}</td>
            <td>{{ data.phone }}</td>
            <td>{{ data.website }}</td>
            <td>{{ data.address.city }}</td>
          </tr>
        </tbody>
      </table>
      <br>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import router from '../router';
  import Axios from 'axios';
  import Session from '../common/Session';
  
  @Component
  export default class HomePage extends Vue {
    private currentUserData = Session.get();
    private jsonData: any = [];
    
    constructor(){
      super();
      this.getUser();
    }

    async getUser() {
      try {
        const response = await Axios.get('https://jsonplaceholder.typicode.com/users');
        this.jsonData = response.data;
      } catch (e){
        console.error(e);
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
