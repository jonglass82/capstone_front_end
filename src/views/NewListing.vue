<template>
    
  <div class="new_listing">
    <h1>Create a new listing</h1>

   <br>
    <br>

    <form v-on:submit.prevent="submit()">

       <div class="container">

       
          <div class="status" v-model="success">{{ success }}</div>
       

    <div class="container">

      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#routeModal">
  Select a date
</button>

<h4>{{myDate}}</h4>

<br>

  <div class="form-group">

   <select v-model="newState">
         <option value="" disabled="disabled" selected="selected" v-model="newState"> Select a state</option>
         <option v-for="state in states">
            {{state}}
         </option>
       </select>

  </div>

      <div class="form-group">
    <input type="text" name="address" placeholder="address" v-model="newAddress"><br>
  </div>

  <div class="form-group">
    <input type="text" name="description" placeholder="description" v-model="newDescription">
  </div>

  <div class="form-group">
    <input type="text" name="City" placeholder="City" v-model="newCity">
</div>

    <div class="form-group">
    <input type="text" name="Zip Code" placeholder="Zip Code" v-model="newZipCode">
</div>

<br>

    <div>
        Image: <input type="file" v-on:change="setFile($event)" ref="fileInput">
      </div>
        

<br>


</div>

<div class="modal fade" id="routeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Select a date:</h5>
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

        <button type="button" class="btn btn-primary" v-model="myDate" data-dismiss="modal" >Select Date</button>

      </div>
    </div>
  </div>
</div>


</div>
        <input type="submit" class="btn btn-primary" value="Create New Listing"/>
      </form>


  </div>

</template>


<style type="text/css">
  
.new_listing{
  text-align: center;
  align-content: center;
}

input{
  width: 80%;
}

</style>



<script>

import axios from "axios";
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

export default {

  data: function () {
    return {
      states: ["AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"],
      newState: "",
      newAddress: "",
      newDescription: "",
      newCity: "",
      newZipCode: "",
      errors: [],
      myDate: ""
    };
  },
      components: {
    Datepicker
  },

  created: function() {

    axios.get("/user/current_user").then(response => {
      this.user = response.data;
    });

  },

  methods: {
  //   submit: function () {
  //     var params = {
  //       address: this.newAddress,
  //       description: this.newDescription,
  //       city: this.newCity,
  //       state: this.newState,
  //       zip_code: this.newZipCode,
  //       user: this.user.id
  //     }

  //     axios.post("/listings",params).then(response => {
  //     this.$router.push("/listingConfirmation");
  //     })
  //     .catch(error => {
  //         this.errors = ["Invalid email or password."];
  //     });

  //   },
  //       setFile: function(event) {
  //     if (event.target.files.length > 0) {
  //       this.image = event.target.files[0];
  //     }
   
   
  // },
  setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    submit: function() {
      var formData = new FormData();
      formData.append("address", this.newAddress);
      formData.append("description", this.newDescription);
      formData.append("city", this.newCity);
      formData.append("state", this.newState);
      formData.append("zip_code", this.newZipCode);
      formData.append("image", this.image);

      axios.post("/listings", formData).then(response => {
        this.address = "";
        this.description = "";
        this.city = "";
        this.state = "";
        this.zip_code = "";
        this.image = "";
        this.$refs.fileInput.value = "";
      });
    
  },

}

};

</script>

 <!-- setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    submit: function() {
      var formData = new FormData();
      formData.append("address", this.newAddress);
      formData.append("description", this.newDescription);
      formData.append("city", this.newCity);
      formData.append("state", this.newState);
      formData.append("zip_code", this.newZipCode);
      formData.append("image", this.image);

      axios.post("/listings", formData).then(response => {
        this.address = "";
        this.description = "";
        this.city = "";
        this.state = "";
        this.zip_code = "";
        this.image = "";
        this.$refs.fileInput.value = "";
      });
    }
  },

 -->
