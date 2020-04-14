<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-form ref="form" :model="form" label-width="120px">
          <el-page-header @back="goBack" content="Add Visualization">
          </el-page-header>
          <el-divider />
          <el-row type="flex" class="row-bg" justify="start" align="top">
            <el-col :span="12">
              <el-form-item label="Visualization Name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="Parent Type">
                <el-select v-model="form.parentType" placeholder="Select">
                  <el-option label="User" value="User"></el-option>
                  <el-option label="Machine" value="Machine"></el-option>
                  <el-option label="Mould" value="Mould"></el-option>
                  <el-option label="Part" value="Part"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Visualization Type">
                <el-select v-model="form.visualizationType" placeholder="Select">
                  <el-option label="Time Series Line Chart" value="Time Series Line Chart"></el-option>
                  <el-option label="Pie Chart" value="Pie Chart"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Query">
                <el-input v-model="form.query" autosize type="textarea" :rows="5"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Paramater">
                <el-input v-model="form.parameterInput">
                <el-button slot="append" icon="el-icon-plus" @click="addParameter"></el-button>
                </el-input>
              </el-form-item>
              <el-table
                :data="stringListMapper(form.parameters)"
                border
                class="mini-table right-table"
              >
                <el-table-column type="index" />
                <el-table-column label="Parameter" prop="value" />
                <el-table-column label="Action">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="removeParameter(scope.$index)"
                  >
                    Remove
                  </el-button>
                </template>
              </el-table-column>
              </el-table>
              <el-form-item label="Width">
                <el-input-number
                  v-model="form.width"
                  :precision="0"
                  :min="1" :max="24"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-col class="pull-right">
              <el-button type="primary" icon="el-icon-plus" @click="addVisualization">
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
  name: 'AddVisualization',
  data: function() {
    return {
      form: {
        name: '',
        parentType : '',
        visualizationType: '',
        query: '',
        parameterInput: '',
        parameters: [],
        width: 12
      },
      addVisualizationMutation: gql`
        mutation addVisualization(
          $name: String!
          $parentType: String!
          $visualizationType: String!
          $query: String!
          $parameters: [String]!
          $width: Int!
        ) {
          addVisualization(
            name: $name
            parentType: $parentType
            visualizationType: $visualizationType
            query: $query
            parameters: $parameters
            width: $width
          ) {
            visualization {
              id
              name
              parentType
              visualizationType
              query
              parameters
              width
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
    stringListMapper(list) {
      return list.map(item => {return {value: item}})
    },
    addParameter() {
      this.form.parameters.push(this.form.parameterInput);
      this.form.parameterInput = '';
    },
    removeParameter(index) {
      this.form.parameters.splice(index, 1);
    },
    addVisualization() {
      this.$apollo
        .mutate({
          mutation: this.addVisualizationMutation,
          variables: {
            name: this.form.name,
            parentType: this.form.parentType,
            visualizationType: this.form.visualizationType,
            query: this.form.query,
            parameters: this.form.parameters,
            width: this.form.width
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
