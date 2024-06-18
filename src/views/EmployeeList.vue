<template>
  <div class="employee-list-container">
    <h1>Employees</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.phoneNumber }}</td>
          <td>
            <button @click="checkAdminRole(() => editEmployee(employee.id))" class="btn-edit">Edit</button>
            <button @click="checkAdminRole(() => removeEmployee(employee.id))" class="btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="navigateToAddEmployee" class="btn-add">Add Employee</button>
    <AppPopup :message="popupMessage" :visible="popupVisible" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppPopup from './AppPopup.vue';

export default {
  name: 'EmployeeList',
  components: {
    AppPopup
  },
  data() {
    return {
      popupMessage: '',
      popupVisible: false
    };
  },
  computed: {
    ...mapState(['employees', 'user']),
  },
  methods: {
    ...mapActions(['fetchEmployees', 'deleteEmployee']),
    editEmployee(id) {
      this.$router.push(`/employees/edit/${id}`);
    },
    async removeEmployee(id) {
      await this.deleteEmployee({ id });
      this.fetchEmployees();
    },
    checkAdminRole(action) {
      if (this.user && this.user.role === 'admin') {
        action();
      } else {
        this.showPopup('Only admins are allowed to edit and delete employees.');
      }
    },
    navigateToAddEmployee() {
      this.$router.push('/employees/new');
    },
    showPopup(message) {
      this.popupMessage = message;
      this.popupVisible = true;
      setTimeout(() => {
        this.popupVisible = false;
      }, 5000); // Hide the popup after 5 seconds
    }
  },
  mounted() {
    this.fetchEmployees();
  },
};
</script>

<style scoped>
/* Your existing styles */
.employee-list-container {
  max-width: 800px;
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 0.5rem;
}

.btn-edit {
  background-color: #007bff;
  color: white;
}

.btn-edit:hover {
  background-color: #0056b3;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-add {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
}

.btn-add:hover {
  background-color: #218838;
}
</style>
