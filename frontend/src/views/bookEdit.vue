<template>
  <div v-if="currBook" class="book-edit">
    <h1>{{(currBook.id)? 'Edit' : 'Add'}} Book</h1>
    <form class="flex direction-column align-center space-around" @submit.prevent="editBook">
      <label>Enter book title:</label>
      <input type="text" v-model="currBook.title" placeholder="enter book name..." />

      <label>Enter subtitle:</label>
      <input type="text" v-model="currBook.subtitle" placeholder="enter book subtitle..." />

      <label>Enter authors:</label>
      <input type="text" @change="addAuthor" placeholder="enter book authors..." />

      <label>Enter published year:</label>
      <input type="number" v-model="currBook.publishedDate" placeholder="enter published year..." />

      <label>Enter description:</label>
      <input type="text" v-model="currBook.description" placeholder="enter description..." />

      <label>Enter number of pages:</label>
      <input type="number" v-model="currBook.pageCount" placeholder="enter number of pages..." />

      <label>Categories:</label>
      <select @change="addCategories" id="type">
        <option value="Computers">Computers</option>
        <option value="Hack">Hack</option>
        <option value="Adult">Adult</option>
      </select>

      <label for="img">Enter book picture:</label>
      <input
        @change="addImage"
        type="file"
        id="book-img"
        name="currBook.thumbnail"
        accept="image/*"
      />

      <label>Book language:</label>
      <select v-model="currBook.language" id="type">
        <option value="en">English</option>
        <option value="HE">Hebrow</option>
        <option value="sp">Spanish</option>
      </select>

      <label>Enter price:</label>
      <input type="number" v-model="currBook.listPrice.amount" />
      <select v-model="currBook.listPrice.currencyCode" id="type">
        <option value="EUR">EUR</option>
        <option value="ILS">ILS</option>
        <option value="USD">USD</option>
      </select>
      On sale?
      <input type="checkbox" id="isOnSale" v-model="currBook.listPrice.isOnSale" />

      <button>{{(currBook.id)? 'Edit' : 'Add'}}</button>
    </form>

    <pre>{{currBook}}</pre>
  </div>
</template>

<script>
import { uploadImg } from "../services/cloudinary.service";

export default {
  name: "bookEdit",
  async created() {
    const bookId = this.$route.params.id;
    if (bookId === "edit") {
      await this.$store.dispatch({ type: "loadBook" });
    } else {
      await this.$store.dispatch({ type: "loadBook", bookId });
    }
  },
  computed: {
    currBook() {
      const currBook = this.$store.getters.currBook;
      const copyBook = JSON.parse(JSON.stringify(currBook));
      return copyBook;
    }
  },
  methods: {
    addImage(ev) {
      uploadImg(ev).then(res => {
        this.currBook.thumbnail = res.url;
      });
    },
    addCategories(ev) {
      this.currBook.categories.push(ev.target.value);
    },
    addAuthor(ev) {
      this.currBook.authors.push(ev.target.value);
    },
    async editBook() {
      await this.$store.dispatch({ type: "saveBook", book: this.currBook });
      this.$router.push("/");
    }
  }
};
</script>