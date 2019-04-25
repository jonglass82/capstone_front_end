<template>
  <div class="home">

    <h1>Listings</h1>

    {{user.first_name}}
    {{user.id}}

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
