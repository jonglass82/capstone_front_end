<template>
  <div class="home">

    <div id="welcome"><h5>Welcome back {{user.first_name}}!</h5></div>

    <div id='map'></div>

<div class="container" id="toolbar">
    <h1>Listings</h1>
    {{listings.count}}
  </div>


<div class="container" id="main">

  <div v-for="listing in listings">

    <div class="container" id="listingContainer">

    <h5>{{listing.address}}</h5>
    <p>{{listing.description}}</p>
    <h5>{{listing.date}}</h5>


    <div class="listing-right">
      {{listing.city}} {{listing.state}} {{listing.zip_code}}
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

         <img :src="showListing.image_url">
        
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
background-color: white;
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

#toolbar{
  text-align: center;
  padding: 20px;
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

#map { 
  height: 250px;
  width: 100%;
/*  margin: auto;*/
}

</style>


<script>

import axios from "axios";

export default {

  data: function () {
    return {
      listings: [],
      user: [],
      showListing: [],
      monuments: [],
      map: null,
      jwt: null,
      mapboxClient: null
    };
  },

  mounted: function(){

    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uZ2xhc3M4MiIsImEiOiJjanVkYmN3b2EwZjlmM3l0Y25kYmtua2VoIn0.7ND4G8md1orasleFIAAyRA';

    var monument = [-87.623177, 41.881832];

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: monument,
      zoom: 11
    });


    var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    this.mapboxClient = mapboxClient;

    axios.get("/listings").then(response => {
      this.listings = response.data.listings;
      this.listings.forEach(listing => {

        this.mapboxClient.geocoding
          .forwardGeocode({
            query: listing.address,
            autocomplete: false
          })
          .send()
          .then(response => {
           if (response && response.body && response.body.features && response.body.features.length) {

             var feature = response.body.features[0];
             console.log(feature);
             new mapboxgl.Marker().setLngLat(feature.center).addTo(this.map);
             listing.center = feature.center;
          }
        })

       });
    })

  },

  created: function() {


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
