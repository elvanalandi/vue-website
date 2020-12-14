<template>
  <div class="login">
    <LoginPage/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginPage from '@/components/LoginPage.vue'; // @ is an alias to /src

@Component({
  components: {
    LoginPage,
  },
})
export default class Home extends Vue {}
</script>