<template>
  <div class="home">

<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#routeModal">
  Begin a new route
</button>

<h2>~ OR ~ </h2>

<div id="routeText">
      
      {{route_id}}

</div>


   <select v-model="route_id">
         <option value="" disabled="disabled" selected="selected"> Select a date for an exisintg route:</option>
         <option v-for="user_route in user_routes">
            {{user_route.date}}
         </option>
       </select>


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

<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <h5 class="modal-title" id="exampleModalLongTitle"></h5> -->
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
        <p>{{showListing.description}}</p>
        <h5>{{showListing.address}}</h5>
        <h5>{{showListing.city}},{{showListing.state}} {{showListing.zip_code}}</h5>
  
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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

    <button type="button" data-toggle="modal" data-target="#exampleModalCenter" v-on:click="viewListing(listing.id)">
  View Listing
</button>

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
   /* background-color: aliceblue;*/
}

#listingContainer{
  border-top-width: 1pt;
  border-top-style: solid;
  border-top-color: grey;
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
      user_routes: [],
      listing_route: "",
      route_id: "",
      listing_id: "",
      myDate: "",
      showListing: []
    };
  },

    components: {
    Datepicker
  },

  created: function() {

    axios.get("/listings").then(response => {
      this.listings = response.data.listings;
    });

    axios.get("/user/current_user").then(response => {
      this.user = response.data;
    });

    axios.get("/routes").then(response => {
      this.user_routes = response.data;
    });

  },

  methods: {
    createRoute: function (date,user) {
      var params = {
        date: this.myDate,
        user: this.user.id
      }

      axios.post("/routes",params).then(response => {
      this.route = response.data.route;
      this.$router.push("/route");
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

    },
    viewListing: function (id) {
  
      axios.get("/listings/"+id).then(response => {
      this.showListing = response.data;
      console.log(this.showListing);
    });
    }
}

};

</script>