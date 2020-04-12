<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-form ref="form" :model="form" label-width="150px">
          <el-page-header @back="goBack" content="Add User" />
          <el-divider />
          <el-row type="flex" class="row-bg" justify="start" align="top">
            <el-col :span="12">
              <el-form-item label="First Name">
                <el-input v-model="form.firstname"></el-input>
              </el-form-item>
              <el-form-item label="Last Name">
                <el-input v-model="form.lastname"></el-input>
              </el-form-item>
              <el-form-item label="username">
                <el-input v-model="form.model"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="Password">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item label="Confirm Password">
                <el-input v-model="form.confirmPassword"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-col class="pull-right">
              <el-button type="primary" icon="el-icon-plus" @click="addUser">
                Save
              </el-button>
              <el-button @click="goBack">Cancel</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'AddUser',
  data: function() {
    return {
      form: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      registerUserMutation: gql`
        mutation registerUser($userData: UserInput!) {
          registerUser(userData: $userData) {
            user {
              id
              firstname
              lastname
              fullname
              username
              email
            }
          }
        }
      `
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addUser() {
      this.$apollo
        .mutate({
          mutation: this.registerUserMutation,
          variables: {
            userData: {
              firstname: this.form.firstname,
              lastname: this.form.lastname,
              username: this.form.username,
              email: this.form.email,
              password: this.form.password
            }
          }
        })
        .then(data => {
          if (data.errors) {
            console.log(data.errors);
            alert('Some Error Occured');
          } else {
            this.$router.go(-1);
          }
          return data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  text-align: start;
}
.el-select {
  width: 100%;
}
.el-input-number {
  width: 100%;
}
.pull-right {
  float: right;
  text-align: end;
}
</style>
