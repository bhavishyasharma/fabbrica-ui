<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-form ref="form" :model="user" label-width="150px">
          <el-page-header @back="goBack" content="Edit User" />
          <el-divider />
          <el-row type="flex" class="row-bg" justify="start" align="top">
            <el-col :span="12">
              <el-form-item label="First Name">
                <el-input v-model="user.firstname"></el-input>
              </el-form-item>
              <el-form-item label="Last Name">
                <el-input v-model="user.lastname"></el-input>
              </el-form-item>
              <el-form-item label="username">
                <el-input v-model="user.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Email">
                <el-input v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item label="Roles">
                <el-checkbox-group v-model="user.roles">
                  <el-row
                    v-for="role in roles"
                    class="checkbox-row"
                    v-bind:key="role.id"
                  >
                    <el-checkbox :label="role.id">
                      {{ role.label }}
                    </el-checkbox>
                  </el-row>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-col class="pull-right">
              <el-button
                type="primary"
                icon="el-icon-check"
                @click="updateUser"
              >
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
  name: 'EditUser',
  apollo: {
    roles: gql`
      query {
        roles {
          id
          name
          label
        }
      }
    `
  },
  data: function() {
    return {
      user: {
        roles: []
      },
      userQuery: gql`
        query user($userId: String!) {
          user(userId: $userId) {
            id
            firstname
            lastname
            username
            email
            roles {
              id
              name
              label
            }
          }
        }
      `,
      updateUserMutation: gql`
        mutation updateUser(
          $userId: String!
          $username: String
          $firstname: String
          $lastname: String
          $email: String
          $roles: [String]!
        ) {
          updateUser(
            userId: $userId
            username: $username
            firstname: $firstname
            lastname: $lastname
            email: $email
            roles: $roles
          ) {
            user {
              id
              firstname
              lastname
              fullname
              username
              email
              roles {
                id
                name
                label
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
        query: this.userQuery,
        variables: {
          userId: this.$route.params.userId
        }
      })
      .then(data => {
        if (data.errors) {
          console.log(data.errors);
          alert('Some Error Occured');
        } else {
          this.user = data.data.user;
          this.user.roles = data.data.user.roles.map(role => {
            return role.id;
          });
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
    updateUser() {
      this.$apollo
        .mutate({
          mutation: this.updateUserMutation,
          variables: {
            userId: this.user.id,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            username: this.user.username,
            email: this.user.email,
            roles: this.user.roles
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
.checkbox-row {
  height: 25px;
  line-height: 25px;
}
.el-checkbox {
  line-height: 25px;
}
</style>
