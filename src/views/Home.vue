<template>
  <div class="home">

    <div id="welcome"><h5>Welcome back {{user.first_name}}!</h5></div>

    <h1>Listings</h1>


<div class="container" id="main">

  <div v-for="listing in listings">

    <div class="container" id="listingContainer">
    <h5>{{listing.address}}</h5>
    <p>{{listing.description}}</p>




    <div class="listing-right">
<button type="button" data-toggle="modal" data-target="#exampleModalCenter" v-on:click="viewListing(listing.id)">
  View Listing
</button>


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
  /*  background-color: aliceblue;*/
}

#listingContainer{
  padding: 20px;

}

.listing-right{
  text-align: right;
}

.modal-body{
  background-color: white;
}

</style>


<script>

import axios from "axios";

export default {

  data: function () {
    return {
      listings: [],
      user: [],
      showListing: []
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

  methods: {
 
    viewListing: function (id) {
  
      axios.get("/listings/"+id).then(response => {
      this.showListing = response.data;
      console.log(this.showListing);
    });
    }

  }

};
</script>
