<template>
  <div class="register">
    <RegisterPage/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RegisterPage from '../components/RegisterPage.vue'; // @ is an alias to /src

@Component({
  components: {
    RegisterPage,
  },
})
export default class Home extends Vue {}
</script>