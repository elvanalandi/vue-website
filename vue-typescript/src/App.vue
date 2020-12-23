<template>
  <div id="app">
    <router-view/>
    <notifications group="userNotification" />
  </div>
</template>

<style lang="scss">
  .content-full {
    min-height: 100vh;
    background: #D3D3D3;
  }
  thead {
    background: #82816D;
    color: #FFFFFF;
  }

  tbody {
    background: #FFFFFF;
  }
</style>
