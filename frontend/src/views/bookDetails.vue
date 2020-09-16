<template>
  <div v-if="currBook" class="book-details">
    <h1>{{currBook.title}}</h1>
    <h4>{{currBook.authors[0]}}</h4>
    <img v-if="currBook.thumbnail" :src="currBook.thumbnail" />
    <p>Price: {{currBook.listPrice.amount}}{{currencySign}}</p>
    <router-link :to="'/edit/'+currBook.id">Edit book</router-link>
    <button @click="removeBook">Remove book</button>
  </div>
</template>
<script>
export default {
  name: "book-list",
  async created() {
    const bookId = this.$route.params.id;
    await this.$store.dispatch({ type: "loadBook", bookId });
  },
  computed: {
    currBook() {
      return this.$store.getters.currBook;
    },
    currencySign() {
      const currencyCode = this.currBook.listPrice.currencyCode;
      let sign = "";
      switch (currencyCode) {
        case "EUR":
          sign = "€";
          break;
        case "ILS":
          sign = "₪";
          break;
        case "USD":
          sign = "$";
      }
      return sign;
    }
  },
  methods: {
    async removeBook() {
      await this.$store.dispatch({
        type: "removeBook",
        bookId: this.currBook.id
      });
      this.$router.push("/");
    }
  }
};
</script>
