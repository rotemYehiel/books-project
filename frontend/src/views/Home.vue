<template>
  <div class="home">
    <router-link :to="'/edit'">Add new book</router-link>
    <bookList :books="books" />
  </div>
</template>

<script>
// @ is an alias to /src
import bookList from "@/components/bookList.vue";

export default {
  name: "Home",
  components: {
    bookList
  },
  computed: {
    books() {
      return this.$store.getters.books;
    }
  }
};
</script>
