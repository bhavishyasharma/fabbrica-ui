<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-form ref="form" :model="form" label-width="80px">
          <el-page-header @back="goBack" content="Add Part">
            <el-button type="primary">Login</el-button>
          </el-page-header>
          <el-divider />
          <el-row type="flex" class="row-bg" justify="start" align="top">
            <el-col :span="12">
              <el-form-item label="Part Name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="Material">
                <el-select v-model="form.material" placeholder="Select">
                  <el-option label="ABS" value="ABS"></el-option>
                  <el-option label="PET" value="PET"></el-option>
                  <el-option label="PP" value="PP"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Color">
                <el-input v-model="form.color"></el-input>
              </el-form-item>
              <el-form-item label="Weight">
                <el-input-number v-model="form.weight" :precision="2" :step="0.01"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-col class="pull-right">
              <el-button type="primary" icon="el-icon-plus" @click="addPart">Save</el-button>
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
  name: 'AddPart',
  data: function() {
    return {
      form: {
        name: '',
        material: '',
        color: '',
        weight: 0.0
      },
      addPartMutation: gql`
        mutation addPart(
          $name: String!
          $material: String!
          $weight: Decimal!
          $color: String
        ) {
          addPart(
            name: $name
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addPart() {
      this.$apollo
        .mutate({
          mutation: this.addPartMutation,
          variables: {
            name: this.form.name,
            material: this.form.material,
            weight: this.form.weight,
            color: this.form.color
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
