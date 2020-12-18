<template>
  <div class="user">
      
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Book from '../entity/Book';
  import LibraryUser from '../entity/LibraryUser';
  import Session from '../common/Session';
  
  @Component
  export default class BookList extends Vue {
    public baseApi: string = "http://202.152.159.164/perpus/books/";

    public entity: new () => Book = Book;

    public get user(): LibraryUser {
        return Session.get();
    }

    public doValidate(book: Book) {
        const keys: Array<keyof Book> = ["name", "description", "isbn", "author", "publisher"];

        return keys.every(prop => book[prop] != "");
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
