<template>
  <section v-if="books" class="book-list-sec">
    <h1>Books list</h1>
    <ul class="book-list flex direction-row">
      <li v-for="book in books" :key="book._id">
        <bookPreview :book="book" />
      </li>
    </ul>
  </section>
</template>

<script>
import bookPreview from "./bookPreview.vue";

export default {
  name: "book-list",

  props: {
    books: Array
  },
  components: {
    bookPreview
  }
};
</script>