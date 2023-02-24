<template>
  <div class="main-page">
    <span class="show-filter" @click="toggleFilter">
      <!-- {{ isShowFilter ? "收起" : "展开" }} -->
      <i
        style="font-size: 16px"
        :class="isShowFilter ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      ></i>
    </span>
    <div
      class="mini-bg-box filter-box"
      :class="isShowFilter ? '' : 'none-height'"
    >
      <TableFilter
        :data="filter"
        v-model="query"
        @change="search"
      ></TableFilter>
    </div>
    <div class="pgae-content">
      <div class="doc-info ">
        <div :span="4" class="top-item" v-for="item in itemList" :key="item.id">
          <div class="top-item-content">
            <div class="title">{{ item.label }}</div>
            <div class="value">
              <span v-if="!item.value.length">暂无</span>
              <template v-else
                ><span v-for="(v, i) in item.value" :key="i">
                  {{ v + "床"
                  }}{{
                    item.value.length === 1 || i === item.value.length - 1
                      ? ""
                      : "、"
                  }}
                </span></template
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="sickbed-list"
        :class="isShowFilter ? 'sickbed-list-paddingadd' : ''"
      >
        <div
          class="sickbed-item mini-bg-box"
          v-for="(item, index) in sickbedList"
          :key="index"
        >
          <div class="title">
            <span>
              <span class="index-num">{{ item.index }}</span>
              床
              <span class="title-group">入组：{{ item.groupCode }}</span>
            </span>

            <span>
              <i v-if="item.isSelf" class="el-icon-place"></i>
              <span v-if="item.isNew" class="is-new">新</span>
            </span>
          </div>
          <div class="patient-info">
            <div class="patient-info-content">
              <span class="info-item">
                <span class="label">姓名：</span>
                <span class="value">{{ item.name }}</span>
              </span>

              <span class="info-item">
                <span class="label">性别：</span>
                <span class="value">{{ item.sex ? "男" : "女" }}</span>
              </span>
              <span class="info-item">
                <span class="label">年龄：</span>
                <span class="value">{{ item.age }}岁</span>
              </span>
              <div class="in-time">
                <span class="info-item">
                  <span class="label">病历号：</span>
                  <span class="value">{{ item.cNo }}</span>
                </span>
                <span class="label">入院时间：</span>
                <span class="value">{{ item.inTime }}</span>
              </div>
            </div>
          </div>
          <div class="consume">
            <div class="progress">
              <span>费用进度：</span
              ><el-progress
                :class="item.schedule > 100 ? 'out-num' : ''"
                :text-inside="true"
                :stroke-width="20"
                :percentage="item.schedule"
                :color="item.schedule > 100 ? '#f56c6c' : '#0285c1'"
                text-color="#fff"
                define-back-color="#102450"
              ></el-progress>
            </div>
            <div class="consume-info">
              <el-row>
                <el-col :span="8"
                  >药品：<span
                    :style="{
                      color:
                        item.drugNum[0] > item.drugNum[1] ? '#ff8b86' : '#fff',
                    }"
                    >{{ item.drugNum[0] }}</span
                  >/{{ item.drugNum[1] }}</el-col
                >
                <el-col :span="8"
                  >检验：<span
                    :style="{
                      color:
                        item.checkoutNum[0] > item.checkoutNum[1]
                          ? '#ff8b86'
                          : '#fff',
                    }"
                    >{{ item.checkoutNum[0] }}</span
                  >/{{ item.checkoutNum[1] }}</el-col
                >
                <el-col :span="8"
                  >检查：<span
                    :style="{
                      color:
                        item.checkUpNum[0] > item.checkUpNum[1]
                          ? '#ff8b86'
                          : '#fff',
                    }"
                    >{{ item.checkUpNum[0] }}</span
                  >/{{ item.checkUpNum[1] }}</el-col
                >
                <el-col :span="8"
                  >治疗：<span
                    :style="{
                      color:
                        item.treatNum[0] > item.treatNum[1]
                          ? '#ff8b86'
                          : '#fff',
                    }"
                    >{{ item.treatNum[0] }}</span
                  >/{{ item.treatNum[1] }}</el-col
                >
                <el-col :span="8"
                  >手术：<span
                    :style="{
                      color:
                        item.surgicalNum[0] > item.surgicalNum[1]
                          ? '#ff8b86'
                          : '#fff',
                    }"
                    >{{ item.surgicalNum[0] }}</span
                  >/{{ item.surgicalNum[1] }}</el-col
                >
                <el-col :span="8"
                  >耗材：<span
                    :style="{
                      color:
                        item.consumablesNum[0] > item.consumablesNum[1]
                          ? '#ff8b86'
                          : '#fff',
                    }"
                    >{{ item.consumablesNum[0] }}</span
                  >/{{ item.consumablesNum[1] }}</el-col
                >
                <el-col :span="8"
                  >并发症：<span
                    :style="{
                      color:
                        item.complicationNum[0] > item.complicationNum[1]
                          ? '#ff8b86'
                          : '#fff',
                    }"
                    >{{ item.complicationNum[0] }}</span
                  >/{{ item.complicationNum[1] }}</el-col
                >
              </el-row>
              <div class="consume-info-btns">
                <div class="consume-info-btn">
                  评价详情
                </div>
                <div class="consume-info-btn" @click="openGroup(item)">
                  调整预分组
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GroupDialog
      :visible="groupVisible"
      :rowData="rowData"
      @close="closeGroup"
      @submit="submitGroup"
    />
  </div>
</template>

<script>
import TableFilter from "@/components/App/Table/TableFilter";
import { datasourceList } from "@/api/baseConfig";
import GroupDialog from "./components/groupDialog.vue";
export default {
  meta: {
    title: "数据配置源",
    activeMenu: "/baseConfig",
  },
  components: {
    TableFilter,
    GroupDialog,
  },

  data() {
    return {
      isShowFilter: false,
      groupVisible: false,
      rowData: {},
      query: {
        size: 10,
        current: 1,
      },
      itemList: [
        { label: "违反核心治疗", value: [], id: 1 },
        { label: "并发症消耗过大", value: ["01"], id: 2 },
        { label: "药品（耗材）占比过高", value: ["01", "03", "05"], id: 3 },
        { label: "违规项目较多", value: ["01", "04", "07"], id: 4 },
        { label: "治疗费占比过高", value: ["01", "02"], id: 5 },
        { label: "检验（检查）占比过高", value: ["01", "06", "07"], id: 6 },
      ],
      sickbedList: [
        {
          index: "01",
          name: "张峰",
          groupCode: "FV29",
          age: 59,
          isSelf: true,
          isNew: true,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: 135,
          drugNum: [678, 222],
          checkoutNum: [123, 66],
          checkUpNum: [577, 30],
          treatNum: [678, 333],
          surgicalNum: [345, 55],
          consumablesNum: [1689, 666],
          complicationNum: [254, 97],
        },
        {
          index: "02",
          name: "张峰",
          groupCode: "BR23",

          age: 59,
          sex: 1,

          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: 30,
          drugNum: [187, 222],
          checkoutNum: [44, 66],
          checkUpNum: [14, 30],
          treatNum: [1375, 333],
          surgicalNum: [25, 55],
          consumablesNum: [457, 666],
          complicationNum: [45, 97],
        },
        {
          index: "03",
          groupCode: "ES21",
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: 32,
          drugNum: [1478, 555],
          checkoutNum: [44, 66],
          checkUpNum: [22, 30],
          treatNum: [111, 333],
          surgicalNum: [447, 455],
          consumablesNum: [857, 666],
          complicationNum: [45, 97],
        },
        {
          index: "04",
          groupCode: "ET25",
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: 22,
          drugNum: [222, 777],
          checkoutNum: [44, 66],
          checkUpNum: [22, 30],
          treatNum: [111, 333],
          surgicalNum: [24, 55],
          consumablesNum: [457, 666],
          complicationNum: [45, 97],
        },
        {
          index: "05",
          groupCode: "FU11",
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,

          inTime: "2022-08-12 23:00:12",
          schedule: 66,
          drugNum: [1245, 444],
          checkoutNum: [44, 66],
          checkUpNum: [24, 30],
          treatNum: [111, 333],
          surgicalNum: [46, 55],
          consumablesNum: [1645, 666],
          complicationNum: [45, 97],
        },
        {
          index: "06",
          groupCode: "BR25",
          name: "张峰",
          age: 59,
          sex: 1,
          isNew: true,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: 75,
          drugNum: [45, 787],
          checkoutNum: [105, 66],
          checkUpNum: [78, 30],
          treatNum: [111, 333],
          surgicalNum: [47, 454],
          consumablesNum: [457, 666],
          complicationNum: [45, 97],
        },
        {
          index: "07",
          groupCode: "ZZ13",
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: 30,
          drugNum: [123123, 222],
          checkoutNum: [1212, 66],
          checkUpNum: [55, 30],
          treatNum: [454, 333],
          surgicalNum: [447, 55],
          consumablesNum: [457, 666],
          complicationNum: [123, 97],
        },
        {
          index: "08",
          groupCode: "IH19",
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          isSelf: true,
          inTime: "2022-08-12 23:00:12",
          schedule: 35,
          drugNum: [212, 222],
          checkoutNum: [44, 66],
          checkUpNum: [22, 30],
          treatNum: [111, 333],
          surgicalNum: [17, 55],
          consumablesNum: [457, 666],
          complicationNum: [45, 97],
        },
        {
          index: "09",
          groupCode: "CA60",
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: 78,
          drugNum: [321, 742],
          checkoutNum: [44, 66],
          checkUpNum: [21, 30],
          treatNum: [111, 333],
          surgicalNum: [12, 55],
          consumablesNum: [457, 666],
          complicationNum: [45, 97],
        },
      ],
      filter: {
        inline: [
          {
            props: {
              label: "类型",
              is: "el-select",
              options: [
                {
                  label: "全部",
                  value: "",
                },
                {
                  label: "我的病人",
                  value: "1",
                },
                {
                  label: "科室病人",
                  value: "2",
                },
                {
                  label: "关注病人",
                  value: "3",
                },
              ],
            },

            keys: "datasource",
          },
          {
            props: {
              label: "关键字搜索",
              is: "el-input",
              attrs: {
                placeholder: "名称/备注",
              },
            },
            keys: "keywords",
          },
        ],
      },
    };
  },
  methods: {
    search(e) {
      console.log(e);
    },
    toggleFilter() {
      this.isShowFilter = !this.isShowFilter;
    },
    openGroup(item) {
      console.log(item, "item");
      this.rowData = item;
      this.groupVisible = true;
    },
    closeGroup() {
      this.groupVisible = false;
    },
    submitGroup() {
      this.groupVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  padding: 20px;
  box-sizing: border-box;
  /* background: #fff; */
  color: #fff;
  position: relative;
  font-size: 14px;
}
.el-select {
  width: 100%;
}

.flex-between {
  display: flex;
  justify-content: space-between;
}
.show-filter {
  text-align: right;
  cursor: pointer;
  position: absolute;
  top: -10px;
  left: 0;
}
.mini-bg-box {
  background-color: rgba($color: #000, $alpha: 0.2);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
}
.pgae-content {
  overflow: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
}
.doc-info {
  display: flex;
  justify-content: space-between;
  .top-item {
    background-image: url("~@/assets/img/right-bottom-border.png");
    background-size: cover;

    width: 248px;
    height: 80px;
    position: relative;
    .top-item-content {
      padding: 20px;
      position: absolute;
      top: -12px;
      left: 40px;
      font-style: italic;
      .title {
        color: #eaeaea;
      }
      .value {
        color: #ffd53d;
        margin-top: 5px;
      }
    }
  }
}
.sickbed-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  height: 900px;
  overflow-y: scroll;
  padding-bottom: 200px;

  .sickbed-item {
    width: 21%;
    height: 300px;
    padding: 0;
    .title {
      width: 100%;
      height: 30px;
      padding: 5px 10px;
      box-sizing: border-box;
      background-image: linear-gradient(
        90deg,
        rgba(1, 150, 212, 1),
        rgba(1, 150, 212, 0)
      );
      display: flex;
      justify-content: space-between;
      .is-new {
        display: inline-block;
        width: 24px;
        height: 24px;
        border: 1px solid #ffd53d;
        border-radius: 50%;
        text-align: center;
        line-height: 21px;
        color: #ffd53d;
        font-size: 12px;
      }
    }
    .patient-info {
      width: 100%;
      padding: 10px;
      .patient-info-content {
        width: 100%;
        height: 80px;
        padding: 10px;
        border-radius: 10px;
        background: rgba(35, 104, 153, 0.5);
        border: 1px solid #274e76;
        color: #3cc0de;
        .info-item {
          margin-right: 10px;
        }
        .in-time {
          margin-top: 10px;
        }
      }
    }
    .consume {
      padding: 10px 20px;
      .progress {
        margin-bottom: 10px;
        display: flex;
        .el-progress {
          flex: 1;
        }
        ::v-deep .el-progress-bar__outer {
          background: #102450;
          border: 0.1px solid #1d3c7f;
        }
      }
      .consume-info {
        font-size: 12px;
        .el-row {
          .el-col {
            margin-bottom: 10px;
          }
        }
        .consume-info-btns {
          display: flex;
          justify-content: flex-end;
          .consume-info-btn {
            border: 1px solid #67b6ef;
            border-radius: 5px;
            padding: 5px 10px;
            font-size: 12px;
            cursor: pointer;
            /* background-image: linear-gradient(0deg, #23a7ce, #1780b5); */
            background-image: linear-gradient(
              0deg,
              rgba(28, 120, 197, 1),
              rgba(28, 120, 197, 0)
            );
            margin-left: 10px;
          }
          .consume-info-btn:hover {
            background-image: linear-gradient(0deg, #23a7ce, #1780b5);
          }
        }
      }
    }
  }
}
.sickbed-list-paddingadd {
  padding-bottom: 260px;
}
.index-num {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 1px solid #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 21px;
  color: #fff;
  font-size: 12px;
}
.title-group {
  color: #68ebff;
  margin-left: 10px;
}
.el-icon-place {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  color: #ffd53d;
}
.out-num {
  ::v-deep .el-progress-bar__inner {
    width: 100% !important;
  }
}
.filter-box {
  transition: all 0.3s linear 0s;
}
.none-height {
  height: 0;
  padding: 0;
  opacity: 0;
}
</style>
