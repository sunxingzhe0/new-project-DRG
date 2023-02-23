<template>
  <el-dialog
    title="编码情况"
    :visible.sync="visible"
    width="640px"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <el-table :data="diseaseData">
      <el-table-column
        property="index"
        label="序号"
        width="150"
      ></el-table-column>
      <el-table-column
        property="code"
        label="疾病编码"
        width="200"
      ></el-table-column>
      <el-table-column property="codeName" label="诊断名称">
        <template slot-scope="{ row }">
          <el-select v-model="row.code" placeholder="请选择">
            <el-option
              v-for="(item, index) in diagnoseOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="operation">
      <el-table-column
        property="index"
        label="序号"
        width="150"
      ></el-table-column>
      <el-table-column
        property="code"
        label="手术编码"
        width="200"
      ></el-table-column>
      <el-table-column property="codeName" label="手术名称">
        <template slot-scope="{ row }">
          <el-select v-model="row.code" placeholder="请选择">
            <el-option
              v-for="(item, index) in operationOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <div class="right-btn resize-btn" @click="close">重提首页诊断</div>
      <div class="right-btn" @click="close">分 组</div>
      <div class="right-btn" type="primary" @click="submit">保 存</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //疾病编码
      diseaseData: [
        {
          index: "1",
          code: "I84.201",
          codeName: "高血压1级",
        },
        {
          index: "2",
          code: "I84.201",
          codeName: "高血压1级",
        },
        {
          index: "3",
          code: "I84.201",
          codeName: "高血压1级",
        },
        {
          index: "4",
          code: "I84.201",
          codeName: "高血压1级",
        },
      ],
      //手术
      operation: [
        {
          index: "1",
          code: "I84.201",
          codeName: "高血压1级",
        },
        {
          index: "2",
          code: "I84.201",
          codeName: "高血压1级",
        },
        {
          index: "3",
          code: "I84.201",
          codeName: "高血压1级",
        },
        {
          index: "4",
          code: "I84.201",
          codeName: "高血压1级",
        },
      ],
      diagnoseOptions: [
        { label: "高血压1级", value: "I84.201" },
        { label: "高血压2级", value: "I84.202" },
        { label: "高血压3级", value: "I84.203" },
      ],
      operationOptions: [
        { label: "高血压1级", value: "I84.201" },
        { label: "高血压2级", value: "I84.202" },
        { label: "高血压3级", value: "I84.203" },
      ],
    };
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<style lang="scss" scoped>
.right-btn {
  min-width: 80px;
  text-align: center;
  display: inline-block;
  padding: 8px 10px;
  font-size: 12px;
  background-color: rgba(20, 62, 96);
  border: 1px solid #2287c7;
  border-radius: 5px;
  cursor: pointer;
  color: #479fcc;
  margin-left: 10px;
}
.resize-btn {
  min-width: 110px;
}
.right-btn:hover {
  background-color: #2287c5;
  color: #fff;
}
</style>
