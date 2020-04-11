<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :span="12">
      <el-card>
        <el-form ref="form" :model="form" label-width="120px">
          <el-page-header @back="goBack" content="Add Mould" />
          <el-divider />
          <el-row type="flex" class="row-bg" justify="start" align="top">
            <el-col :span="12">
              <el-form-item label="Mould Name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="Part">
                <el-select v-model="form.part" placeholder="Select">
                  <el-option
                    v-for="part in parts"
                    v-bind:key="part.id"
                    :value="part.id"
                    :label="part.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Cavity">
                <el-input-number
                  v-model="form.cavity"
                  :precision="0"
                  :step="1"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="Runer Weight">
                <el-input-number
                  v-model="form.runnerWeight"
                  :precision="2"
                  :step="0.01"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-col class="pull-right">
              <el-button type="primary" icon="el-icon-plus" @click="addMould">
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
  name: 'AddMould',
  apollo: {
    parts: gql`
      query {
        parts {
          id
          name
        }
      }
    `
  },
  data: function() {
    return {
      form: {
        name: '',
        part: '',
        cavity: '',
        runnerWeight: 0.0
      },
      addMouldMutation: gql`
        mutation addMould(
          $name: String!
          $part: String!
          $cavity: Int!
          $runnerWeight: Decimal!
        ) {
          addMould(
            name: $name
            part: $part
            cavity: $cavity
            runnerWeight: $runnerWeight
          ) {
            mould {
              id
              name
              part {
                id
                name
              }
              cavity
              runnerWeight
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
    addMould() {
      this.$apollo
        .mutate({
          mutation: this.addMouldMutation,
          variables: {
            name: this.form.name,
            part: this.form.part,
            cavity: this.form.cavity,
            runnerWeight: this.form.runnerWeight
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
