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
              <el-row type="flex" justify="end" class="space-below">
                <el-button
                  type="warning"
                  @click="editUser(props.row.id)"
                  size="mini"
                  icon="el-icon-edit"
                  >Edit</el-button
                >
              </el-row>
              <el-row>
                <el-form label-width="100px" size="mini">
                  <el-col :xs="24" :sm="12">
                    <el-form-item label="First Name">
                      <el-input v-model="props.row.firstname" disabled="" />
                    </el-form-item>
                    <el-form-item label="Last Name">
                      <el-input v-model="props.row.lastname" disabled="" />
                    </el-form-item>
                    <el-form-item label="username">
                      <el-input v-model="props.row.username" disabled="" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item label="Email">
                      <el-input v-model="props.row.email" disabled="" />
                    </el-form-item>
                    <el-table
                      :data="props.row.roles"
                      border
                      style="width: 100%"
                      class="mini-table right-table"
                    >
                      <el-table-column type="index" />
                      <el-table-column label="Roles" prop="label" />
                    </el-table>
                    <el-table
                      :data="props.row.companies"
                      border
                      style="width: 100%"
                      class="mini-table right-table"
                    >
                      <el-table-column type="index" />
                      <el-table-column label="Companies" prop="name" />
                    </el-table>
                  </el-col>
                </el-form>
              </el-row>
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
          firstname
          lastname
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
    },
    editUser(userId) {
      this.$router.push({ name: 'EditUser', params: { userId: userId } });
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
