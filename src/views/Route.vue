<template>
  <div class="home">

<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#routeModal">
  Select date
</button>

<div id="routeText">

     <h3>Creating route for:</h3>
      

</div>

<input type="text" name="routeId" v-model="route_id"><br>

{{user.routes}}



<h1>Listings</h1>

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

        <button type="button" class="btn btn-primary" v-model="myDate" data-dismiss="modal" v-on:click="createRoute(myDate, user)">Choose listings and create route</button>

      </div>
    </div>
  </div>
</div>

<div id="main" class="container">
  <div v-for="listing in listings">

    <div class="container" id="listingContainer">
    
    <h5>{{listing.address}}</h5>
    <p>{{listing.description}}</p>
    <button class="listingBtn" v-on:click="addToRoute(listing.id, route_id)">Add to route</button>

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
      user: [],
      listing_route: "",
      route_id: "",
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
    }),

    axios.get("/user/current_user").then(response => {
      console.log("created", response.data);
      this.user = response.data;
    });
  },

  methods: {
    createRoute: function (date,user) {
      var params = {
        date: this.myDate,
        user: this.user.id
      }

      console.log(params);

      axios.post("/routes",params).then(response => {
      this.route = response.data.route;
      });

    },

    addToRoute: function (listingId) {

    
      var params = {
        listing_id: listingId,
        route_id: this.route_id
      }

    
      axios.post("/listings_routes",params).then(response => {
      this.listing_route = response.data.listing_route;
      });

    }
}

};

</script>