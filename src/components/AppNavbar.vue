<template>
    <nav>
      <ul>
        <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/">Home</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/employees">Employees</router-link></li>
        <li class="flex-grow"></li>
        <li v-if="isLoggedIn"><button @click="logout">Logout</button></li>
      </ul>
    </nav>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    name: 'AppNavbar',
    computed: {
      ...mapState(['token']),
      isLoggedIn() {
        return !!this.token;
      },
    },
    methods: {
      ...mapActions(['logout']),
    },
  };
  </script>
  
  <style scoped>
  nav {
    background-color: #333;
    padding: 1rem;
  }
  ul {
    list-style-type: none;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  li {
    color: white;
  }
  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1rem;
  }
  button:hover {
    text-decoration: underline;
  }
  .flex-grow {
    flex-grow: 1;
  }
  </style>
  