<template>
  <div class="home">
<h1>Listings</h1>

<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#routeModal">
  Create a route
</button>

<div class="modal fade" id="routeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">

        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

        <button type="button" class="btn btn-primary">Choose listings</button>

      </div>
    </div>
  </div>
</div>

  <div v-for="listing in listings">
    <h1>{{listing.address}}</h1>
    <h3>{{listing.description}}</h3>
  </div>

</div>
</template>



<script>

import axios from "axios";

export default {
  data: function () {
    return {
      listings: []
    };
  },
  created: function() {
    axios.get("/listings").then(response => {
      this.listings = response.data.listings;
      console.log(this.listings);
    })
  },
  methods: {}
};
</script>
