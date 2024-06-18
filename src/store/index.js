import { createStore } from 'vuex';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import router from '../router';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('userToken') || null,
    employees: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setEmployees(state, employees) {
      state.employees = employees;
    },
    clearUserState(state) {
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await axios.post('https://localhost:7259/api/auth/register', userData);
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
        localStorage.setItem('userToken', response.data.token);
        router.push('/');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const { errors } = error.response.data;
      
          let errorMessage = '';
          if (errors.Username && errors.Username.length > 0) {
            errorMessage = errors.Username[0];
          } else if (errors.Password && errors.Password.length > 0) {
            errorMessage = errors.Password[0];
          } else {
            errorMessage = 'Email already exist';
          }
    
          throw new Error(errorMessage);
        } else {
          throw new Error('Email already exist');
        }
      }
    },
    async loginUser({ commit }, userData) {
      try {
        const response = await axios.post('https://localhost:7259/api/Auth/login', userData);
        const token = response.data;
        commit('setToken', token);
        localStorage.setItem('userToken', token);

        const decodedToken = jwtDecode(token);
        const user = {
          id: decodedToken.id,
          email: decodedToken.username,
          role: decodedToken.role,
        };
        commit('setUser', user);

        router.push('/');
      } catch (error) {
        throw new Error('Invalid username or password');
      }
    },
    async fetchEmployees({ commit }) {
      const response = await axios.get('https://localhost:7259/api/Employee');
      commit('setEmployees', response.data);
    },
    async createEmployee({ dispatch }, employeeData) {
      await axios.post('https://localhost:7259/api/Employee', employeeData);
      dispatch('fetchEmployees');
    },
    async updateEmployee({ state, dispatch }, employeeData) {
      if (!state.user || state.user.role !== 'admin') {
        throw new Error('Unauthorized: Only admins can update employees.');
      }
      await axios.put(`https://localhost:7259/api/Employee/${employeeData.id}`, employeeData);
      dispatch('fetchEmployees');
    },
    async deleteEmployee({ state, dispatch }, { id }) {
      if (!state.user || state.user.role !== 'admin') {
        throw new Error('Unauthorized: Only admins can delete employees.');
      }
      await axios.delete(`https://localhost:7259/api/Employee/${id}`);
      dispatch('fetchEmployees');
    },
    logout({ commit }) {
      commit('clearUserState');
      localStorage.removeItem('userToken');
      router.push('/login');
    },
  },
});
