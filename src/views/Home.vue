<template>
  <div class="home">

    <div id="welcome"><h5>Welcome back {{user.first_name}}!</h5></div>

    <h1>Listings</h1>


<div class="container" id="main">

  <div v-for="listing in listings">

    <div class="container" id="listingContainer">
    <h5>{{listing.address}}</h5>
    <p>{{listing.description}}</p>
  </div>
  </div>
</div>

</div>
</template>


<style type="text/css">

#main{
  width: 90%;
  text-align: left;
  overflow: scroll;
  height: 500px;
}

#welcome{
  text-align: right;
  margin-right: 10%;
}

#main div:nth-of-type(2n){
    background-color: aliceblue;
}

#listingContainer{
  padding: 20px;

}

</style>


<script>

import axios from "axios";
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

export default {

  data: function () {
    return {
      listings: [],
      user: []
    };
  },

    components: {

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
