<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-page-header @back="goBack" content="Visualization List" />
        <el-divider />
        <el-row
          :gutter="20"
          type="flex"
          class="row-bg space-below"
          justify="end"
        >
          <router-link :to="{ name: 'AddVisualization' }">
            <el-button type="primary" icon="el-icon-plus" size="mini">
              Add Visualization
            </el-button>
          </router-link>
          <el-button
            icon="el-icon-refresh"
            @click="onRefresh"
            size="mini"
            style="margin-left: 8px;"
          >
            Refresh
          </el-button>
        </el-row>
        <el-table :data="visualizations" border style="width: 100%">
          <el-table-column type="index" />
          <el-table-column label="Name" prop="name"></el-table-column>
          <el-table-column label="Parent Type" prop="parentType"></el-table-column>
          <el-table-column label="Visualization Type" prop="visualizationType"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-row type="flex" justify="end" class="space-below">
                <el-button
                  type="warning"
                  @click="editVisualization(props.row.id)"
                  size="mini"
                  icon="el-icon-edit"
                  >Edit</el-button
                >
              </el-row>
              <el-row>
                <el-form label-width="100px" size="mini">
                  <el-col :xs="24" :sm="12">
                    <el-form-item label="Name">
                      <el-input v-model="props.row.name" disabled="" />
                    </el-form-item>
                    <el-form-item label="Parent Type" v-if="props.row.parentType">
                      <el-input v-model="props.row.parentType" disabled="" />
                    </el-form-item>
                    <el-form-item label="VisualizationType">
                      <el-input v-model="props.row.visualizationType" disabled="" />
                    </el-form-item>
                    <el-form-item label="Query">
                      <el-input type="textarea" autosize v-model="props.row.query" disabled="" />
                    </el-form-item>
                    <el-form-item label="Width">
                      <el-input v-model="props.row.width" disabled="">
                        <template slot="append">grams</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-table
                      :data="stringListMapper(props.row.parameters)"
                      border
                      class="mini-table right-table"
                    >
                      <el-table-column type="index" />
                      <el-table-column label="Parameter" prop="value" />
                    </el-table>
                  </el-col>
                </el-form>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'VisualizationList',
  apollo: {
    visualizations: gql`
      query {
        visualizations {
          id
          name
          parentType
          visualizationType
          query
          parameters
          width
        }
      }
    `
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onRefresh() {
      this.$apollo.queries.visualizations.refetch();
    },
    editVisualization(visualizationId) {
      this.$router.push({
        name: 'EditVisualization',
        params: { visualizationId: visualizationId }
      });
    },
    stringListMapper(list) {
      return list.map(item => {return {value: item}})
    }
  }
};
</script>

<style lang="scss" scoped>
.el-divider {
  margin-bottom: 8px;
  margin-top: 8px;
}
.pull-right {
  float: right;
  text-align: end;
}
.space-below {
  margin-bottom: 8px;
}
</style>
