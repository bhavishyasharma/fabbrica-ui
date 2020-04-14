<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="22" :sm="18" :lg="12">
      <el-card>
        <el-page-header @back="goBack" content="Machine List" />
        <el-divider />
        <el-row
          :gutter="20"
          type="flex"
          class="row-bg space-below"
          justify="end"
        >
          <router-link :to="{ name: 'AddMachine' }">
            <el-button type="primary" icon="el-icon-plus" size="mini">
              Add Machine
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
        <el-table :data="machines" border style="width: 100%">
          <el-table-column type="index" />
          <el-table-column label="Name" prop="name"></el-table-column>
          <el-table-column label="Make" prop="make"></el-table-column>
          <el-table-column label="model" prop="model"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-row type="flex" justify="end" class="space-below">
                <el-button
                  type="warning"
                  @click="editMachine(props.row.id)"
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
                    <el-form-item label="Make">
                      <el-input v-model="props.row.make" disabled="" />
                    </el-form-item>
                    <el-form-item label="Model">
                      <el-input v-model="props.row.model" disabled="" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12">
                    <el-form-item label="Company">
                      <el-input v-model="props.row.company.name" disabled="" />
                    </el-form-item>
                    <el-form-item label="Clamping Capacity">
                      <el-input
                        v-model="props.row.clampingCapacity"
                        disabled=""
                      >
                        <template slot="append">kN</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="Injection Volume">
                      <el-input v-model="props.row.injectionVolume" disabled="">
                        <template slot="append">CC</template>
                      </el-input>
                    </el-form-item>
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
  name: 'MachineList',
  apollo: {
    machines: gql`
      query {
        machines {
          id
          name
          make
          model
          clampingCapacity
          injectionVolume
          company {
            id
            name
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
      this.$apollo.queries.machines.refetch();
    },
    editMachine(machineId) {
      this.$router.push({
        name: 'EditMachine',
        params: { machineId: machineId }
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
