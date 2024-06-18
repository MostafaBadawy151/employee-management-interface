<template>
  <div class="employee-form-container">
    <h1>{{ isEdit ? 'Edit' : 'Add' }} Employee</h1>
    <form @submit.prevent="saveEmployee">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" v-model="employee.name" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="employee.email" />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="text" v-model="employee.phoneNumber" />
      </div>
      <div class="form-group">
        <label for="type">Type</label>
        <select v-model="employee.educationLevel">
          <option value="grad">Graduate</option>
          <option value="undergrad">Undergraduate</option>
        </select>
      </div>
      <div class="form-group">
        <label for="createdBy">Created By</label>
        <input type="text" v-model="employee.createdBy" />
      </div>
      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'EmployeeForm',
  data() {
    return {
      employee: {
        id: null,
        name: '',
        email: '',
        phoneNumber: '',
        educationLevel: 'grad',
        createdBy: '',
        imagePath: 'test'
      },
    };
  },
  computed: {
    ...mapState(['employees']),
    isEdit() {
      return this.$route.params.id !== undefined;
    },
  },
  methods: {
    ...mapActions(['createEmployee', 'updateEmployee']),
    async saveEmployee() {
      const formData = {
        name: this.employee.name,
        email: this.employee.email,
        phoneNumber: this.employee.phoneNumber,
        educationLevel: this.employee.educationLevel,
        createdBy: this.employee.createdBy,
        imagePath: this.employee.imagePath,
      };

      if (this.isEdit) {
        await this.updateEmployee({ ...formData, id: this.$route.params.id });
      } else {
        await this.createEmployee(formData);
      }

      this.$router.push('/employees');
    },
    loadEmployeeData() {
      if (this.isEdit) {
        const employee = this.employees.find(e => e.id == this.$route.params.id); // Use == to compare string and number
        if (employee) {
          this.employee = { ...employee };
        }
      }
    }
  },
  mounted() {
    this.loadEmployeeData();
  },
  watch: {
    '$route.params.id': function() {
      this.loadEmployeeData();
    }
  }
};
</script>

<style scoped>
.employee-form-container {
  max-width: 600px;
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

.form-group input,
.form-group select {
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
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #0056b3;
}
</style>
