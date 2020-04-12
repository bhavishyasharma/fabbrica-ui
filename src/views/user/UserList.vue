<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-page-header @back="goBack" content="User List" />
        <el-divider />
        <el-row
          :gutter="20"
          type="flex"
          class="row-bg space-below"
          justify="end"
        >
          <router-link :to="{ name: 'AddUser' }">
            <el-button type="primary" icon="el-icon-plus" size="mini">
              Add User
            </el-button>
          </router-link>
          <el-button
            icon="el-icon-refresh"
            @click="onRefresh"
            size="mini"
            style="margin-left: 8px;"
          >
            Refresh
          </el-button>
        </el-row>
        <el-table :data="users" border style="width: 100%">
          <el-table-column type="index" />
          <el-table-column label="Name" prop="fullname"></el-table-column>
          <el-table-column label="Username" prop="username"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <p>Id: {{ props.row.id }}</p>
              <p>Email: {{ props.row.email }}</p>
              <p>Role: {{ props.row.roles }}</p>
              <p>Companies: {{ props.row.companies }}</p>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'UserList',
  apollo: {
    users: gql`
      query {
        users {
          id
          fullname
          username
          companies {
            id
            name
          }
          email
          roles {
            id
            name
            label
          }
        }
      }
    `
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onRefresh() {
      this.$apollo.queries.users.refetch();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-divider {
  margin-bottom: 8px;
  margin-top: 8px;
}
.pull-right {
  float: right;
  text-align: end;
}
.space-below {
  margin-bottom: 8px;
}
</style>
