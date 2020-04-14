<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-form ref="form" :model="machine" label-width="150px">
          <el-page-header @back="goBack" content="Add Machine" />
          <el-divider />
          <el-row type="flex" class="row-bg" justify="start" align="top">
            <el-col :span="12">
              <el-form-item label="Machine Name">
                <el-input v-model="machine.name"></el-input>
              </el-form-item>
              <el-form-item label="Machine Make">
                <el-input v-model="machine.make"></el-input>
              </el-form-item>
              <el-form-item label="Machine Model">
                <el-input v-model="machine.model"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Company">
                <el-select v-model="machine.company" placeholder="Select">
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
                  v-model="machine.clampingCapacity"
                  :precision="0"
                  :step="1"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="Injection Volume">
                <el-input-number
                  v-model="machine.injectionVolume"
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
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="updateMachine"
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
  name: 'EditMachine',
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
      machine: {},
      machineQuery: gql`
        query machine($machineId: String!) {
          machine(machineId: $machineId) {
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
      `,
      updateMachineMutation: gql`
        mutation updateMachine(
          $machineId: String!
          $name: String
          $make: String
          $model: String
          $company: String
          $clampingCapacity: Int
          $injectionVolume: Decimal
        ) {
          updateMachine(
            machineId: $machineId
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
  created() {
    this.$apollo
      .query({
        query: this.machineQuery,
        variables: {
          machineId: this.$route.params.machineId
        }
      })
      .then(data => {
        if (data.errors) {
          console.log(data.errors);
          alert('Some Error Occured');
        } else {
          this.machine = data.data.machine;
          this.machine.company = this.machine.company.id;
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
    updateMachine() {
      this.$apollo
        .mutate({
          mutation: this.updateMachineMutation,
          variables: {
            machineId: this.machine.id,
            name: this.machine.name,
            make: this.machine.make,
            model: this.machine.model,
            company: this.machine.company,
            clampingCapacity: this.machine.clampingCapacity,
            injectionVolume: this.machine.injectionVolume
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
