<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-form ref="form" :model="form" label-width="150px">
          <el-page-header @back="goBack" content="Add Company" />
          <el-divider />
          <el-row type="flex" class="row-bg" justify="start" align="top">
            <el-col :span="12">
              <el-form-item label="Company Name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Add User">
                <el-select v-model="selectedUser" placeholder="Select">
                  <el-option
                    v-for="user in users"
                    v-bind:key="user.id"
                    :value="user.id"
                    :label="user.fullname"
                  ></el-option>
                </el-select>
                <el-button @click="addUser" type="primary" size="mini">Add User</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-table :data="form.users" border style="width: 100%">
              <el-table-column type="index" />
              <el-table-column label="Name" prop="fullname"></el-table-column>
              <el-table-column
                label="Username"
                prop="username"
              ></el-table-column>
            </el-table>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-col class="pull-right">
              <el-button type="primary" icon="el-icon-plus" @click="addCompany">
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
  name: 'AddCompany',
  apollo: {
    users: gql`
      query {
        users {
          id
          fullname
          username
        }
      }
    `
  },
  data: function() {
    return {
      form: {
        name: '',
        users: []
      },
      selectedUser: '',
      addCompanyMutation: gql`
        mutation addCompany($name: String!, $users: [String]!) {
          addCompany(name: $name, users: $users) {
            company {
              id
              name
              users {
                id
                fullname
                username
              }
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
      if (this.selectedUser && this.selectedUser !== '') {
        this.form.users = this._.unionWith(
          this.form.users,
          [this.users.find(user => user.id == this.selectedUser)],
          this._.isEqual
        );
        this.selectedUser = '';
      }
    },
    addCompany() {
      this.$apollo
        .mutate({
          mutation: this.addCompanyMutation,
          variables: {
            name: this.form.name,
            users: this.form.users.map(user => user.id)
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
