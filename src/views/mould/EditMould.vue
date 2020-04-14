<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-form ref="form" :model="mould" label-width="120px">
          <el-page-header @back="goBack" content="Edit Mould" />
          <el-divider />
          <el-row type="flex" class="row-bg" justify="start" align="top">
            <el-col :span="12">
              <el-form-item label="Mould Name">
                <el-input v-model="mould.name"></el-input>
              </el-form-item>
              <el-form-item label="Company">
                <el-select v-model="mould.company" placeholder="Select">
                  <el-option
                    v-for="company in companies"
                    v-bind:key="company.id"
                    :value="company.id"
                    :label="company.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Part">
                <el-select v-model="mould.part" placeholder="Select">
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
                  v-model="mould.cavity"
                  :precision="0"
                  :step="1"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="Runer Weight">
                <el-input-number
                  v-model="mould.runnerWeight"
                  :precision="2"
                  :step="0.01"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-col class="pull-right">
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="updateMould"
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
  name: 'AddMould',
  apollo: {
    parts: gql`
      query {
        parts {
          id
          name
        }
      },
    `,
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
      mould: {
        part: {}
      },
      mouldQuery: gql`
        query mould($mouldId: String!) {
          mould(mouldId: $mouldId) {
            id
            name
            company {
              id
              name
            }
            part {
              id
              name
            }
            cavity
            runnerWeight
          }
        }
      `,
      updateMouldMutation: gql`
        mutation updateMould(
          $mouldId: String!
          $name: String
          $company: String
          $part: String
          $cavity: Int
          $runnerWeight: Decimal
        ) {
          updateMould(
            mouldId: $mouldId
            name: $name
            company: $company
            part: $part
            cavity: $cavity
            runnerWeight: $runnerWeight
          ) {
            mould {
              id
              name
              company {
                id
                name
              }
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
  created() {
    this.$apollo
      .query({
        query: this.mouldQuery,
        variables: {
          mouldId: this.$route.params.mouldId
        }
      })
      .then(data => {
        if (data.errors) {
          console.log(data.errors);
          alert('Some Error Occured');
        } else {
          this.mould = data.data.mould;
          this.mould.part = this.mould.part.id;
          if(this.mould.company) {
            this.mould.company = this.mould.company.id
          }
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
    updateMould() {
      this.$apollo
        .mutate({
          mutation: this.updateMouldMutation,
          variables: {
            mouldId: this.mould.id,
            name: this.mould.name,
            company: this.mould.company,
            part: this.mould.part,
            cavity: this.mould.cavity,
            runnerWeight: this.mould.runnerWeight
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
