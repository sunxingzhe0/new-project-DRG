<template>
  <el-dialog
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    title="编码情况"
    :visible.sync="visible"
    width="740px"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div class="group-info">
      <span class="group-code">LC19</span>
      <span class="group-item"
        >分组名称： <span class="value">肾、输尿管、膀胱其他手术</span></span
      >
      <span class="group-item">权重：<span class="value">1.0000</span></span>
    </div>
    <el-table :data="diseaseData">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column
        property="code"
        label="疾病编码"
        width="150"
      ></el-table-column>
      <el-table-column property="codeName" label="诊断名称" min-width="160">
        <template slot-scope="{ row }">
          <el-select v-model="row.code" placeholder="请选择" filterable>
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
      <el-table-column
        label="状态"
        property="status"
        width="60"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row, $index }">
          <i
            class="el-icon-plus mini-icon"
            @click="addTableItem(row, $index, 0)"
          ></i>
          <i
            class="el-icon-sort-up mini-icon"
            @click="upTableItem(row, $index, 0)"
          ></i>
          <i
            class="el-icon-sort-down mini-icon"
            @click="downTableItem(row, $index, 0)"
          ></i>
          <i
            class="el-icon-delete mini-icon"
            @click="delTableItem(row, $index, 0)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="operation">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column
        property="code"
        label="手术编码"
        width="150"
      ></el-table-column>
      <el-table-column property="codeName" label="手术名称" min-width="160">
        <template slot-scope="{ row }">
          <el-select v-model="row.code" placeholder="请选择" filterable>
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
      <!-- <el-table-column
        label="状态"
        property="status"
        width="60"
      ></el-table-column> -->

      <el-table-column label="操作">
        <template slot-scope="{ row, $index }">
          <i
            class="el-icon-plus mini-icon"
            @click="addTableItem(row, $index, 1)"
          ></i>
          <i
            class="el-icon-sort-up mini-icon"
            @click="upTableItem(row, $index, 1)"
          ></i>
          <i
            class="el-icon-sort-down mini-icon"
            @click="downTableItem(row, $index, 1)"
          ></i>
          <i
            class="el-icon-delete mini-icon"
            @click="delTableItem(row, $index, 1)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <div class="right-btn resize-btn" @click="updateData">重提首页诊断</div>
      <div class="right-btn" @click="saveGroup">分 组</div>
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
      loading: false,
      //疾病编码
      diseaseData: [
        {
          status: "",
          code: "N20.100",
          codeName: "输尿管结石",
        },
        {
          status: "CC",
          code: "E11.900",
          codeName: "2型糖尿病",
        },
        {
          status: "",
          code: "N13.201",
          codeName: "肾积水伴肾结石",
        },
        {
          status: "",
          code: "Z46.600x002",
          codeName: "取出输尿管支架管",
        },
        {
          status: "",
          code: "I10.x00x031",
          codeName: "高血压病3级（高危）",
        },
      ],
      //手术
      operation: [
        {
          code: "56.0x00x005",
          codeName: "经尿道输尿管镜输尿管激光碎石术",
        },
        {
          code: "59.8x03",
          codeName: "经尿道输尿管支架置入术",
        },
        {
          code: "56.3100",
          codeName: "输尿管镜检查",
        },
      ],
      diagnoseOptions: [
        { label: "输尿管结石", value: "N20.100" },
        { label: "2型糖尿病", value: "E11.900" },
        { label: "肾积水伴肾结石", value: "N13.201" },
        { label: "取出输尿管支架管", value: "Z46.600x002" },
        { label: "高血压病3级（高危）", value: "I10.x00x031" },
      ],
      operationOptions: [
        { label: "经尿道输尿管镜输尿管激光碎石术", value: "56.0x00x005" },
        { label: "经尿道输尿管支架置入术", value: "59.8x03" },
        { label: "输尿管镜检查", value: "56.3100" },
      ],
    };
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    updateData() {
      console.log("刷新");
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    saveGroup() {
      this.$message.success("分组成功");
    },
    submit() {
      this.$message.success("保存成功");
    },
    addTableItem(row, index, type) {
      //type 0 诊断 1手术
      if (!type) {
        return this.diseaseData.push({
          code: "",
          codeName: "",
        });
      }
      this.operation.push({
        code: "",
        codeName: "",
      });
    },
    delTableItem(row, index, type) {
      //type 0 诊断 1手术
      !type && this.diseaseData.splice(index, 1);
      type && this.operation.splice(index, 1);
    },
    //上移
    upTableItem(row, index, type) {
      if (index === 0) return;
      if (!type) {
        this.diseaseData.splice(index, 1);
        this.diseaseData.splice(index - 1, 0, row);
        return;
      }
      this.operation.splice(index, 1);
      this.operation.splice(index - 1, 0, row);
    },
    //下移
    downTableItem(row, index, type) {
      if (!type) {
        if (index === this.diseaseData.length - 1) return;
        this.diseaseData.splice(index + 2, 0, row);
        this.diseaseData.splice(index, 1);
        return;
      }
      if (index === this.operation.length - 1) return;
      this.operation.splice(index + 2, 0, row);
      this.operation.splice(index, 1);
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
.el-select {
  ::v-deep .el-input__inner {
    border: none !important;
  }
}
::v-deep .el-table .el-table__cell {
  padding: 5px 0 !important;
}
::v-deep .el-dialog__body {
  padding-top: 10px !important;
}
.group-info {
  background: rgba($color: #fff, $alpha: 0.1);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  .group-code {
    color: #60f1fc;
    font-size: 20px;
  }
  .group-item {
    margin-left: 20px;
    color: #60f1fc;
    .value {
      color: #b9ecf7;
    }
  }
}
.mini-icon {
  margin: 0 5px;
  color: #60f1fc;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
}
</style>
