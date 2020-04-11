<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeMenuIndex"
        mode="horizontal"
        active-text-color="#2C2B60"
        :router="true"
      >
        <el-menu-item style="color: red !important;">
          <img src="../assets/fabbrica.png" width="150" />
        </el-menu-item>
        <el-menu-item index="1" :route="{ name: 'Home' }">
          Dashboard
        </el-menu-item>
        <el-menu-item index="2" :route="{ name: 'MouldList' }">
          Moulds
        </el-menu-item>
        <el-menu-item index="3" :route="{ name: 'PartList' }">
          Parts
        </el-menu-item>
        <el-submenu index="4" class="pull-right">
          <template slot="title">
            {{ username }}
            <el-avatar>user</el-avatar>
          </template>
          <el-menu-item class="pull-right" @click="logoutClicked"
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
      activeMenuIndex: '',
      username: this.$store.state.user.username,
      roles: {}
    };
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.activeMenuIndex = to.meta.navIndex;
    }
  },
  mounted: function() {
    this.activeMenuIndex = this.$route.meta.navIndex;
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
.el-container {
  background-color: #f0f0f0;
  height: 100%;
}
.el-header {
  padding: 0px;
}
.pull-right {
  float: right;
}
</style>
