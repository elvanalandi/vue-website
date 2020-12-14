<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <notifications group="userNotification" />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}

body {
  background-color: #4caf4c;
}
div .user{
  border: 10px solid whitesmoke;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  width: auto;
  display: inline-block; 
}

table {
  margin: 0 auto;
  border-collapse: collapse;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
}

table thead tr {
  background-color: #4caf4c;
  color: #ffffff;
}

table th,
table td {
    padding: 12px 15px;
}

table tbody tr {
    border-bottom: 1px solid #dddddd;
}

table tbody tr {
    background-color: #f3f3f3;
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
