<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-form ref="form" :model="company" label-width="150px">
          <el-page-header @back="goBack" content="Edit Company" />
          <el-divider />
          <el-row type="flex" class="row-bg" justify="start" align="top">
            <el-col :span="12">
              <el-form-item label="Company Name">
                <el-input v-model="company.name"></el-input>
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
                <el-button @click="addUser" type="primary" size="mini">
                  Add User
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg space-below" justify="end">
            <el-table :data="company.users" border style="width: 100%">
              <el-table-column type="index" />
              <el-table-column label="Name" prop="fullname"></el-table-column>
              <el-table-column
                label="Username"
                prop="username"
              ></el-table-column>
              <el-table-column label="Action">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="removeUser(scope.$index)"
                  >
                    Remove
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-col class="pull-right">
              <el-button
                type="primary"
                icon="el-icon-check"
                @click="updateCompany"
              >
                Update
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
      company: {
        users: []
      },
      companyQuery: gql`
        query company($companyId: String!) {
          company(companyId: $companyId) {
            id
            name
            users {
              id
              username
              fullname
            }
          }
        }
      `,
      selectedUser: '',
      editCompanyMutation: gql`
        mutation updateCompany(
          $companyId: String!
          $name: String
          $users: [String]
        ) {
          updateCompany(companyId: $companyId, name: $name, users: $users) {
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
  created() {
    this.$apollo
      .query({
        query: this.companyQuery,
        variables: {
          companyId: this.$route.params.companyId
        }
      })
      .then(data => {
        if (data.errors) {
          console.log(data.errors);
          alert('Some Error Occured');
        } else {
          this.company = data.data.company;
        }
        return data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addUser() {
      if (this.selectedUser && this.selectedUser !== '') {
        this.company.users = this._.unionWith(
          this.company.users,
          [this.users.find(user => user.id == this.selectedUser)],
          this._.isEqual
        );
        this.selectedUser = '';
      }
    },
    removeUser(index) {
      this.company.users.splice(index, 1);
    },
    updateCompany() {
      this.$apollo
        .mutate({
          mutation: this.editCompanyMutation,
          variables: {
            companyId: this.company.id,
            name: this.company.name,
            users: this.company.users.map(user => user.id)
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
