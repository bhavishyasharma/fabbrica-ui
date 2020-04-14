<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-page-header @back="goBack" content="Part List" />
        <el-divider />
        <el-row
          :gutter="20"
          type="flex"
          class="row-bg space-below"
          justify="end"
        >
          <router-link :to="{ name: 'AddPart' }">
            <el-button type="primary" icon="el-icon-plus" size="mini">
              Add Part
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
        <el-table :data="parts" border style="width: 100%">
          <el-table-column type="index" />
          <el-table-column label="Name" prop="name"></el-table-column>
          <el-table-column label="Material" prop="material"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-row type="flex" justify="end" class="space-below">
                <el-button
                  type="warning"
                  @click="editPart(props.row.id)"
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
                    <el-form-item label="Company" v-if="props.row.company">
                      <el-input v-model="props.row.company.name" disabled="" />
                    </el-form-item>
                    <el-form-item label="Material">
                      <el-input v-model="props.row.material" disabled="" />
                    </el-form-item>
                    <el-form-item label="Color">
                      <el-input v-model="props.row.color" disabled="" />
                    </el-form-item>
                    <el-form-item label="Weight">
                      <el-input v-model="props.row.weight" disabled="">
                        <template slot="append">grams</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-table
                      :data="props.row.moulds"
                      border
                      class="mini-table right-table"
                    >
                      <el-table-column label="Moulds">
                        <el-table-column type="index" />
                        <el-table-column label="Name" prop="name" />
                        <el-table-column label="Cavity" prop="cavity" />
                      </el-table-column>
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
  name: 'PartList',
  apollo: {
    parts: gql`
      query {
        parts {
          id
          name
          company {
            id
            name
          }
          material
          color
          weight
          moulds {
            id
            name
            cavity
          }
        }
      }
    `
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onRefresh() {
      this.$apollo.queries.parts.refetch();
    },
    editPart(partId) {
      this.$router.push({
        name: 'EditPart',
        params: { partId: partId }
      });
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
