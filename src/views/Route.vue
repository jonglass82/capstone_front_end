<template>
  <div class="home">

<div id="map"></div>

    <div class="container" id="toolbar">

<!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#routeModal">
  Begin a new route
</button>

 <h4>{{myDate}}</h4>

<h2>~ OR ~ </h2> -->

<div id="routeText">
      
      {{route_id}}

         <select v-model="route_id">
         <option value="" disabled="disabled" selected="selected"> Select a date for an exisintg route:</option>
         <option v-for="user_route in user_routes" v-bind:value="user_route.id">
            {{user_route.date}}
         </option>
       </select>

       <div v-if="selectedRoute">
         <ul>
           <li v-for="listing in selectedRoute.listings">{{ listing.address }}</li>
         </ul>
         <p v-if="selectedRoute.listings.length === 0">No listings</p>
       </div>

       <br>
       <br>

  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#makeRoute" v-on:click="viewRoute(1)">
  Finish Route
</button>



</div>
</div>

<div class="modal fade" id="makeRoute" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Review your route for: {{route_id}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        {{showRoute.listings}}
    
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" v-on:click="startRoute(showRoute.listings)">Start Route!</button>
      </div>
    </div>
  </div>
</div>




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

      <div class="listingLeft">
    
    <h5>{{listing.address}}</h5>
         <h5>{{listing.city + "," + " " + listing.state + " " + listing.zip_code}}</h5>
    <p>{{listing.description}}</p>
    <button class="listingBtn" v-on:click="addToRoute(listing.id, route_id)">Add to route</button>

  </div>


<div class="listing-right">
 
      <br>
      <br>
<button type="button" data-toggle="modal" data-target="#exampleModalCenter" v-on:click="viewListing(listing.id)">
  View Listing
</button>

</div>

  </div>
 
  </div>
</div>

</div>
</template>

<style type="text/css">

#main{
  width: 90%;
  overflow: scroll;
  height: 500px;
}

#listingContainer{
  border-top-width: 1pt;
  border-top-style: solid;
  border-top-color: grey;
}

#listingContainer{
  padding: 15px;
}
#routeText{
  padding: 10px;
}

.listingRight{
  text-align: right;
}

.listingLeft{
  text-align: left;
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
      showListing: [],
      showRoute: [],
      map: null,
      mapboxClient: null,
      steps: []
    };
  },
  computed: {
    selectedRoute: function() {
      // Get the user route that matches the one selected from the dropdown
      var route = this.user_routes.filter(user_route => user_route.id === this.route_id)[0];
      // Geocode each route listing address and plot on map
      if (route) {

        var monument = [-87.623177, 41.881832];
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11', 
          center: monument,
          zoom: 2
        });

        route.listings.forEach(listing => {
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
               var marker = new mapboxgl.Marker()
               marker.setLngLat(feature.center).addTo(this.map);
               listing.center = feature.center;
            }
          })
         });        
      }
      return route;
    }
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

  mounted: function() {
    mapboxgl.accessToken = process.env.VUE_APP_MY_API_KEY;

    var monument = [-87.623177, 41.881832];

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: monument,
      zoom: 11
    });

    var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    this.mapboxClient = mapboxClient;
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
    },




    startRoute: function (routeListings) {
      // console.log("startRoute", routeListings, routeListings.length);
    
      //  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uZ2xhc3M4MiIsImEiOiJjanVkYmN3b2EwZjlmM3l0Y25kYmtua2VoIn0.7ND4G8md1orasleFIAAyRA';

      // var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      // this.mapboxClient = mapboxClient;

      var latlngs = [];
      this.selectedRoute.listings.forEach(listing => {
        latlngs.push(`${listing.center}`)
      })
      // routeListings.forEach(routeListing => {
      //   this.mapboxClient.geocoding
      //     .forwardGeocode({
      //       query: routeListing.address,
      //       autocomplete: false
      //     })
      //     .send()
      //     .then(response => {
      //      if (response && response.body && response.body.features && response.body.features.length) {

      //        var feature = response.body.features[0];
      //        console.log(feature);

      //       latlngs.push(`${routeListing.center}`);
      //   }
      // })

      // });
      // console.log("WTF", routeListings, latlngs.join(";"));


      axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${latlngs.join(
            ";"
          )}?geometries=geojson&steps=true&access_token=process.env.VUE_APP_MY_API_KEY`
        )
        .then(response => {
          console.log("directions response", response.data);
          // this.getRoute(latlngs);
          var data = response.data.routes[0];
          var route = data.geometry.coordinates;
          var geojson = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route
            }
          };
          // if the route already exists on the map, reset it using setData
          if (this.map.getSource("route")) {
            console.log("reset route", geojson);
            this.map.getSource("route").setData(geojson);
          } else {
            // otherwise, make a new request
            console.log("make new request?", geojson);
            this.map.addLayer({
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: data.geometry.coordinates
                  }
                }
              },
              layout: {
                "line-join": "round",
                "line-cap": "round"
              },
              paint: {
                "line-color": "#3887be",
                "line-width": 5,
                "line-opacity": 0.75
              }
            });
            console.log("first coordinates", data.geometry.coordinates[0]);
            this.map.addLayer({
              id: "point",
              type: "circle",
              source: {
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      properties: {},
                      geometry: {
                        type: "Point",
                        coordinates: data.geometry.coordinates[0]
                      }
                    }
                  ]
                }
              },
              paint: {
                "circle-radius": 10,
                "circle-color": "#3887be"
              }
            });
            console.log("the route is set?", this.map.getSource("route"));
          }
          response.data.routes[0].legs.forEach(leg =>
            leg.steps.forEach(step => this.steps.push(step.maneuver.instruction))
          );
          this.distance = response.data.routes[0].distance;
          console.log("COMPLETED", this.distance, this.steps);
          // loop through response.data.routes[0].legs.forEach(leg => { ... })
          // do a second loop through leg.steps.forEach(step => { ... step.maneuver.instruction ... })
          // var instructions = document.getElementById("instructions");
          // var steps = this.data.legs[0].steps;
          // var tripInstructions = [];
          // for (var i = 0; i < steps.length; i++) {
          //   tripInstructions.push("<br><li>" + steps[i].maneuver.instruction) + "</li>";
          //   instructions.innerHTML =
          //     '<br><span class="duration">Trip duration: ' +
          //     Math.floor(this.data.duration / 60) +
          //     " min 🚴 </span>" +
          //     tripInstructions;
          //   console.log("trip instructions", this.tripInstructions);
          // }
          // get the sidebar and add the instructions
        });

    },




    viewRoute: function (id) {
  
      axios.get("/routes/"+id).then(response => {
      this.showRoute = response.data;
      console.log(this.showRoute);
    });
    }
}

};

</script>