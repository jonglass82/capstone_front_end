<template>
    
  <div class="login">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label><h3>Email:</h3></label>
          <input type="email" class="form-control" v-model="email" />
        </div>
        <div class="form-group">
          <label><h3>Password:</h3></label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </div>
  </div>

</template>

<style type="text/css">
  
.login{
  text-align: left;
}

</style>


<script>
import axios from "axios";
export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$emit("changeJwt");
          this.$router.push("/");
          console.log(user.id)
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>


