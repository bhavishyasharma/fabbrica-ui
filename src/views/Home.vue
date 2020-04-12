<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeMenuIndex"
        mode="horizontal"
        active-text-color="compactMenu ? #000 : #2C2B60"
        :router="true"
      >
        <el-menu-item style="color: red !important;">
          <img src="../assets/fabbrica.png" width="150" />
        </el-menu-item>
        <template v-if="!compactMenu">
          <el-menu-item index="1" :route="{ name: 'Home' }">
            Dashboard
          </el-menu-item>
          <el-menu-item index="2" :route="{ name: 'MachineList' }">
            Machines
          </el-menu-item>
          <el-menu-item index="3" :route="{ name: 'MouldList' }">
            Moulds
          </el-menu-item>
          <el-menu-item index="4" :route="{ name: 'PartList' }">
            Parts
          </el-menu-item>
          <el-menu-item index="5" :route="{ name: 'CompanyList' }">
            Companies
          </el-menu-item>
          <el-menu-item index="6" :route="{ name: 'UserList' }">
            Users
          </el-menu-item>
          <el-submenu index="7" class="pull-right">
            <template slot="title">
              {{ username }}
              <el-avatar>user</el-avatar>
            </template>
            <el-menu-item class="pull-right" @click="logoutClicked"
              >Logout</el-menu-item
            >
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item class="pull-right" @click="menuToggled">
            <i v-if="!toggleMenu" class="el-icon-s-fold big-icon"></i>
            <i v-else class="el-icon-s-unfold big-icon"></i>
          </el-menu-item>
          <el-drawer
            :visible.sync="toggleMenu"
            direction="rtl"
            append-to-body
            :show-close="false"
            :with-header="false"
          >
            <el-menu-item
              index="1"
              :route="{ name: 'Home' }"
              class="drawer-menu"
            >
              Dashboard
            </el-menu-item>
            <el-menu-item index="2" :route="{ name: 'MachineList' }">
              Machines
            </el-menu-item>
            <el-menu-item index="3" :route="{ name: 'MouldList' }">
              Moulds
            </el-menu-item>
            <el-menu-item index="4" :route="{ name: 'PartList' }">
              Parts
            </el-menu-item>
            <el-menu-item index="5" :route="{ name: 'CompanyList' }">
              Companies
            </el-menu-item>
            <el-menu-item index="6" :route="{ name: 'UserList' }">
              Users
            </el-menu-item>
            <el-submenu index="7">
              <template slot="title">
                My Profile
              </template>
              <el-menu-item class="pull-right" @click="logoutClicked"
                >Logout</el-menu-item
              >
            </el-submenu>
          </el-drawer>
        </template>
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
      activeMenuIndex: '10',
      toggleMenu: false,
      compactMenu: window.innerWidth < 950,
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
  created() {
    window.addEventListener('resize', this.onResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    logoutClicked() {
      onLogout(this.$apollo).then(() => {
        this.$store
          .dispatch('logout')
          .then(() => this.$router.replace({ name: 'Login' }))
          .catch(err => console.log(err));
      });
    },
    menuToggled() {
      this.toggleMenu = !this.toggleMenu;
    },
    onResize() {
      console.log('Resize');
      this.compactMenu = window.innerWidth < 950;
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
  z-index: 2017;
}
.pull-right {
  float: right;
}
.big-icon {
  font-size: 2rem;
}
.el-drawer__wrapper {
  top: 60px;
}
.el-drawer__body {
  overflow: auto;
}
.drawer-menu {
  width: 200px;
}
</style>
