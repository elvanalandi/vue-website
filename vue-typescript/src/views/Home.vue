<template>
  <div class="home">
    <HomePage/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomePage from '../components/HomePage.vue'; // @ is an alias to /src
import BookList from '../components/BookList.vue';
import LoanList from '../components/LoanList.vue';

@Component({
  components: {
    HomePage,
    BookList,
    LoanList
  }
})

export default class Home extends Vue {}
</script>
