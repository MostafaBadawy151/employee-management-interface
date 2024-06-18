<template>
  <div class="register-form-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="username" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" />
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <select v-model="role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit">Register</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      password: '',
      role: 'user', // Default role is 'user'
      errorMessage: '', // Initialize error message state
    };
  },
  methods: {
    ...mapActions(['register']), 

    async handleRegister() {
      try {
        await this.register({
          username: this.username,
          password: this.password,
          role: this.role,
        });
        
        // Clear error message if registration is successful
        this.errorMessage = '';

        // Optionally redirect to login after successful registration
        // this.$router.push('/login');
      } catch (error) {
        console.error('Error registering user:', error);
        this.errorMessage = error.message || 'Failed to register user.';
      }
    },
  },
};
</script>

<style scoped>
.register-form-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-align: left;
}

.form-group input, .form-group select {
  width: calc(100% - 20px);
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  margin: 0 auto;
  display: block;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #218838;
}

.error-message {
  color: #dc3545;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
</style>
