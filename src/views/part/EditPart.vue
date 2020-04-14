<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-form ref="form" :model="part" label-width="80px">
          <el-page-header @back="goBack" content="Edit Part" />
          <el-divider />
          <el-row type="flex" class="row-bg" justify="start" align="top">
            <el-col :span="12">
              <el-form-item label="Part Name">
                <el-input v-model="part.name"></el-input>
              </el-form-item>
              <el-form-item label="Company">
                <el-select v-model="part.company" placeholder="Select">
                  <el-option
                    v-for="company in companies"
                    v-bind:key="company.id"
                    :value="company.id"
                    :label="company.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Material">
                <el-select v-model="part.material" placeholder="Select">
                  <el-option label="ABS" value="ABS"></el-option>
                  <el-option label="PET" value="PET"></el-option>
                  <el-option label="PP" value="PP"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Color">
                <el-input v-model="part.color"></el-input>
              </el-form-item>
              <el-form-item label="Weight">
                <el-input-number
                  v-model="part.weight"
                  :precision="2"
                  :step="0.01"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-col class="pull-right">
              <el-button
                type="primary"
                icon="el-icon-check"
                @click="updatePart"
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
  name: 'EditPart',
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
      part: {},
      partQuery: gql`
        query part($partId: String!) {
          part(partId: $partId) {
            id
            name
            company {
              id
              name
            }
            material
            color
            weight
          }
        }
      `,
      updatePartMutation: gql`
        mutation updatePart(
          $partId: String!
          $name: String
          $company: String
          $material: String
          $weight: Decimal
          $color: String
        ) {
          updatePart(
            partId: $partId
            name: $name
            company: $company
            material: $material
            weight: $weight
            color: $color
          ) {
            part {
              id
              name
              material
              color
              weight
            }
          }
        }
      `
    };
  },
  created() {
    this.$apollo
      .query({
        query: this.partQuery,
        variables: {
          partId: this.$route.params.partId
        }
      })
      .then(data => {
        if (data.errors) {
          console.log(data.errors);
          alert('Some Error Occured');
        } else {
          this.part = data.data.part;
          if(this.part.company) {
            this.part.company = this.part.company.id
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
    updatePart() {
      this.$apollo
        .mutate({
          mutation: this.updatePartMutation,
          variables: {
            partId: this.part.id,
            name: this.part.name,
            company: this.part.company,
            material: this.part.material,
            weight: this.part.weight,
            color: this.part.color
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
