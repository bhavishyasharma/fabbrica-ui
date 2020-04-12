<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="10" :md="8" :lg="6">
      <el-card>
        <img src="../assets/fabbrica.png" width="180" />
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="Username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Login</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import gql from 'graphql-tag';
import { onLogin } from '../vue-apollo';

export default {
  name: 'Login',
  data: function() {
    return {
      form: {
        username: '',
        password: ''
      },
      loginQuery: gql`
        query login($loginData: LoginInput!) {
          login(loginData: $loginData) {
            user {
              username
              firstname
              lastname
              fullname
              roles {
                name
              }
            }
            accessToken
            refreshToken
          }
        }
      `
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      this.$apollo
        .query({
          query: this.loginQuery,
          variables: {
            loginData: {
              username: this.form.username,
              password: this.form.password
            }
          },
          loginData: {
            username: this.form.username,
            password: this.form.password
          }
        })
        .then(data => {
          onLogin(this.$apollo, data.data.login.accessToken).then(() => {
            this.$store
              .dispatch('login', data.data.login)
              .then(() => {
                console.log('dispatch then');
                this.$router.replace('/');
              })
              .catch(err => console.log(err));
          });
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
.el-row {
  height: 100%;
}
.el-form {
  text-align: start;
}
</style>
