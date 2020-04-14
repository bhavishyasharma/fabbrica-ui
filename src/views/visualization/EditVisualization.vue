<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-form ref="form" :model="visualization" label-width="120px">
          <el-page-header @back="goBack" content="Edit Visualization">
          </el-page-header>
          <el-divider />
          <el-row type="flex" class="row-bg" justify="start" align="top">
            <el-col :span="12">
              <el-form-item label="Visualization Name">
                <el-input v-model="visualization.name"></el-input>
              </el-form-item>
              <el-form-item label="Parent Type">
                <el-select v-model="visualization.parentType" placeholder="Select">
                  <el-option label="User" value="User"></el-option>
                  <el-option label="Machine" value="Machine"></el-option>
                  <el-option label="Mould" value="Mould"></el-option>
                  <el-option label="Part" value="Part"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Visualization Type">
                <el-select v-model="visualization.visualizationType" placeholder="Select">
                  <el-option label="Time Series Line Chart" value="Time Series Line Chart"></el-option>
                  <el-option label="Pie Chart" value="Pie Chart"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Query">
                <el-input v-model="visualization.query" autosize type="textarea" :rows="5"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Paramater">
                <el-input v-model="parameterInput">
                <el-button slot="append" icon="el-icon-plus" @click="addParameter"></el-button>
                </el-input>
              </el-form-item>
              <el-table
                :data="stringListMapper(visualization.parameters)"
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
                  v-model="visualization.width"
                  :precision="0"
                  :min="1" :max="24"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="end">
            <el-col class="pull-right">
              <el-button type="primary" icon="el-icon-check" @click="updateVisualization">
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
  name: 'EditVisualization',
  data: function() {
    return {
      visualization: {
        parameters: []
      },
      parameterInput: '',
      visualizationQuery: gql`
        query visualization($visualizationId: String!) {
          visualization(visualizationId: $visualizationId) {
            id
            name
            parentType
            visualizationType
            query
            parameters
            width
          }
        }
      `,
      updateVisualizationMutation: gql`
        mutation updateVisualization(
          $visualizationId: String!
          $name: String!
          $parentType: String!
          $visualizationType: String!
          $query: String!
          $parameters: [String]!
          $width: Int!
        ) {
          updateVisualization(
            visualizationId: $visualizationId
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
  created() {
    this.$apollo
      .query({
        query: this.visualizationQuery,
        variables: {
          visualizationId: this.$route.params.visualizationId
        }
      })
      .then(data => {
        if (data.errors) {
          console.log(data.errors);
          alert('Some Error Occured');
        } else {
          this.visualization = data.data.visualization;
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
    stringListMapper(list) {
      return list.map(item => {return {value: item}})
    },
    addParameter() {
      this.visualization.parameters.push(this.parameterInput);
      this.parameterInput = '';
    },
    removeParameter(index) {
      this.visualization.parameters.splice(index, 1);
    },
    updateVisualization() {
      this.$apollo
        .mutate({
          mutation: this.updateVisualizationMutation,
          variables: {
            visualizationId: this.visualization.id,
            name: this.visualization.name,
            parentType: this.visualization.parentType,
            visualizationType: this.visualization.visualizationType,
            query: this.visualization.query,
            parameters: this.visualization.parameters,
            width: this.visualization.width
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
