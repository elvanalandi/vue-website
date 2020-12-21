<template>
  <div id="app">
    <router-view/>
    <notifications group="userNotification" />
  </div>
</template>

<style lang="scss">
  .content-full {
    min-height: 100vh;
  }
</style>
