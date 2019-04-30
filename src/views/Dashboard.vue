<template>
  <div class="dashboard">
    <h1>Hello {{user.first_name}}!</h1>

  <div id="myRoutes">
    <h2>My routes:</h2>
    {{user.routes}}
  </div>

    <div id="myListings:">
    <h2>My listings:</h2>
    {{user.listings}}
  </div>

  </div>
</template>



<script>

import axios from "axios";

export default {

  data: function () {
    return {
      listings: [],
      route: [],
      user: [],
      listing_route: "",
      route_id: "",
      listing_id: "",
      myDate: ""
    };
  },

  created: function() {
    axios.get("/listings").then(response => {
      this.listings = response.data.listings;
    }),

    axios.get("/user/current_user").then(response => {
      console.log("created", response.data);
      this.user = response.data;
    });
  },

  methods: {}

};

</script>