<template>
  <div v-if="book">
    <router-link :to="'/book/'+book.id">
      <div class="book-in-list-card">
        <h2>{{book.title}}</h2>
        <h4 v-for="author in book.authors" :key="author">{{author}}</h4>
        <img v-if="book.thumbnail" :src="book.thumbnail" />
        <p v-if="book.listPrice">Price: {{book.listPrice.amount}}{{currencySign}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "book-preview",

  props: {
    book: Object
  },
  computed: {
    currencySign() {
      const currencyCode = this.book.listPrice.currencyCode;
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
  }
};
</script>