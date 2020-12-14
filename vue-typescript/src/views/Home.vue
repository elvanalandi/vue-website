<template>
  <div class="home">
    <UserForm/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserForm from '@/components/UserForm.vue'; // @ is an alias to /src

@Component({
  components: {
    UserForm,
  },
})
export default class Home extends Vue {}
</script>
