<template>
  <div class="home">
<h1>Listings</h1>

<div id="routeText">

<h3>{{myDate}}</h3>

</div>

<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#routeModal">
  Pick a date
</button>

<div class="modal fade" id="routeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Pick a date for your route:</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      <datepicker :inline="true" v-model="myDate"></datepicker>

        <h4>{{myDate}}</h4>
  
      </div>
      <div class="modal-footer">

        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

        <button type="button" class="btn btn-primary" v-model="myDate" data-dismiss="modal">Choose listings</button>

   

      </div>
    </div>
  </div>
</div>

<div id="main" class="container">
  <div v-for="listing in listings" v-bind:key="listing.id">

    <div class="container" id="listingContainer">
    
    <h5>{{listing.address}}</h5>
    <p>{{listing.description}}</p>
   <!--  <h4>{{listing.id}}</h4> -->
    <button class="listingBtn" v-on:click="addToRoute()">Add to route</button>

  </div>
 
  </div>
</div>

</div>
</template>

<style type="text/css">

#main{
  width: 90%;
  text-align: left;
}
#main div:nth-of-type(2n){
    background-color: aliceblue;
}

#listingContainer{
  padding: 20px;
}
#routeText{
  padding: 10px;
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
      route: [],
      listing_id: "",
      myDate: ""
    };
  },

    components: {
    Datepicker
  },

  created: function() {
    axios.get("/listings").then(response => {
      this.listings = response.data.listings;
      console.log(this.listings);
    })
  },

  methods: {
    createRoute: function () {
      var params = {
        date: this.myDate,
      }
      axios.post("/routes",params).then(response => {
      this.route = response.data.route;
    });

    },
    addToRoute: function () {

      var params = {
        listing_id: this.listing.id
      }
       console.log(params);

      axios.post("/listings_routes",params).then(response => {
      this.listing = response.data.listing;

       

    });

    },
    
  }

};
</script>