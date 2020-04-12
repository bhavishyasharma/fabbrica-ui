<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-form ref="form" :model="form" label-width="150px">
          <el-page-header @back="goBack" content="Add Machine" />
          <el-divider />
          <el-row type="flex" class="row-bg" justify="start" align="top">
            <el-col :span="12">
              <el-form-item label="Machine Name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="Machine Make">
                <el-input v-model="form.make"></el-input>
              </el-form-item>
              <el-form-item label="Machine Model">
                <el-input v-model="form.model"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Company">
                <el-select v-model="form.company" placeholder="Select">
                  <el-option
                    v-for="company in companies"
                    v-bind:key="company.id"
                    :value="company.id"
                    :label="company.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Clamping Capacity">
                <el-input-number
                  v-model="form.clampingCapacity"
                  :precision="0"
                  :step="1"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="Injection Volume">
                <el-input-number
                  v-model="form.injectionVolume"
                  :precision="2"
                  :step="0.01"
                >
                  <template slot="append">cc</template>
                </el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-col class="pull-right">
              <el-button type="primary" icon="el-icon-plus" @click="addMachine">
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
  name: 'AddMachine',
  apollo: {
    companies: gql`
      query {
        companies {
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
        make: '',
        model: '',
        company: '',
        clampingCapacity: 0,
        injectionVolume: 0.0
      },
      addMachineMutation: gql`
        mutation addMachine(
          $name: String!
          $make: String!
          $model: String!
          $company: String!
          $clampingCapacity: Int!
          $injectionVolume: Decimal!
        ) {
          addMachine(
            name: $name
            make: $make
            model: $model
            company: $company
            clampingCapacity: $clampingCapacity
            injectionVolume: $injectionVolume
          ) {
            machine {
              id
              name
              make
              model
              company {
                id
                name
              }
              clampingCapacity
              injectionVolume
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
    addMachine() {
      this.$apollo
        .mutate({
          mutation: this.addMachineMutation,
          variables: {
            name: this.form.name,
            make: this.form.make,
            model: this.form.model,
            company: this.form.company,
            clampingCapacity: this.form.clampingCapacity,
            injectionVolume: this.form.injectionVolume
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
