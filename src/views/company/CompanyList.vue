<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :span="12">
      <el-card>
        <el-page-header @back="goBack" content="Company List" />
        <el-divider />
        <el-row
          :gutter="20"
          type="flex"
          class="row-bg space-below"
          justify="end"
        >
          <router-link :to="{ name: 'AddCompany' }">
            <el-button type="primary" icon="el-icon-plus" size="mini">Add Company</el-button>
          </router-link>
          <el-button
            icon="el-icon-refresh"
            @click="onRefresh"
            size="mini"
            style="margin-left: 8px;">
            Refresh
          </el-button>
        </el-row>
        <el-table :data="companies" border style="width: 100%">
          <el-table-column type="index" />
          <el-table-column label="Name" prop="name"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <p v-for="user in props.row.users" v-bind:key="user.id">
                {{ user.id }}: {{ user.fullname }} @{{ user.username }}
              </p>
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
  name: 'CompanyList',
  apollo: {
    companies: gql`
      query {
        companies {
          id
          name
          users {
            id
            username
            fullname
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
      this.$apollo.queries.companies.refetch();
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
