<template>
  <div class="route">
    <h1>Create a route</h1>


  <h3>Listings</h3>

  <div v-for="listing in listings">
    <h2>{{listing.address}}</h2>
    <h3>{{listing.description}}</h3>

    <input type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox">{{ checked }}</label>
  </div>

</div>

</template>


<script>

import axios from "axios";

export default {
  data: function () {
    return {
      listings: []
    };
  },
  created: function() {
    axios.get("/listings").then(response => {
      this.listings = response.data.listings;
      console.log(this.listings);
    })
    $('.modal-backdrop').remove();
  },
  methods: {}
};
</script>