<template>
  <div class="dashboard">

    <div class="container">
    <h2>Hello {{user.first_name}}!</h2>
  </div>

  <br>

    <div class="container">


      <div id="myRoutes" class="container">
      <h2>My Routes:</h2>

      <div v-for="route in user.routes">

        <div id="eachRoute">
        {{route.date}}

       </div>
      </div>

    </div>

  </div>

<br>
<br>

<div class="container">
    <div id="myListings" class="container">
      <h2>Listings I have created:</h2>

      <div v-for="listing in user.listings">

        <div id="eachListing">
    
         {{listing.date}} {{listing.address}} {{listing.city}} {{listing.state}} {{listing.zip_code}}

       </div>
      </div>

    </div>
</div>


  </div>
</template>



<style type="text/css">
  

#eachListing{
  padding: 10px;
    border-top-width: 1pt;
  border-top-style: solid;
  border-top-color: grey;
}

#eachRoute{
  padding: 10px;
    border-top-width: 1pt;
  border-top-style: solid;
  border-top-color: grey;
}



</style>



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