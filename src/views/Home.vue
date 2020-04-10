<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeMenuIndex"
        mode="horizontal"
        active-text-color="#2C2B60"
      >
        <el-menu-item style="color: red !important;">
          <img src="../assets/fabbrica.png" width="150" />
        </el-menu-item>
        <el-menu-item index="1">Dashboard</el-menu-item>
        <el-submenu index="2" class="pull-right">
          <template slot="title">
            {{ username }}
            <el-avatar>user</el-avatar>
          </template>
          <el-menu-item index="2-1" class="pull-right" @click="logoutClicked"
            >Logout</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main>
      <div class="home">
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import gql from 'graphql-tag';
import { onLogout } from '../vue-apollo';

export default {
  name: 'Home',
  apollo: {
    roles: {
      query: gql`
        query {
          roles {
            id
            name
            label
          }
        }
      `
    }
  },
  data() {
    return {
      activeMenuIndex: '1',
      username: this.$store.state.user.username,
      roles: {}
    };
  },
  methods: {
    logoutClicked() {
      onLogout(this.$apollo).then(() => {
        this.$store
          .dispatch('logout')
          .then(() => this.$router.replace({ name: 'Login' }))
          .catch(err => console.log(err));
      });
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  padding-top: 10px;
}
.el-header {
  padding: 0px;
}
.pull-right {
  float: right;
}
</style>
