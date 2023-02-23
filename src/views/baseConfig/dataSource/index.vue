<template>
  <div class="main-page">
    <span class="show-filter" @click="toggleFilter">
      {{ isShowFilter ? "收起" : "展开" }}
    </span>
    <div class="mini-bg-box" v-if="isShowFilter">
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
                  【{{ v }}】
                </span></template
              >
            </div>
          </div>
        </div>
      </div>
      <div class="sickbed-list">
        <div
          class="sickbed-item mini-bg-box"
          v-for="(item, index) in sickbedList"
          :key="index"
        >
          <div class="title">
            <span>{{ item.index + "床" }}</span>
          </div>
          <div class="patient-info">
            <div class="patient-info-content">
              <span class="info-item">
                <span class="label">姓名：</span>
                <span class="value">{{ item.name }}</span>
              </span>
              <span class="info-item">
                <span class="label">年龄：</span>
                <span class="value">{{ item.age }}</span>
              </span>
              <span class="info-item">
                <span class="label">性别：</span>
                <span class="value">{{ item.sex ? "男" : "女" }}</span>
              </span>
              <span class="info-item">
                <span class="label">病历号：</span>
                <span class="value">{{ item.cNo }}</span>
              </span>
              <div class="in-time">
                <span class="label">入院时间：</span>
                <span class="value">{{ item.inTime }}</span>
              </div>
            </div>
          </div>
          <div class="consume">
            <div class="progress">
              <span>费用进度：</span
              ><el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="50"
                color="#0285c1"
                define-back-color="#102450"
              ></el-progress>
            </div>
            <div class="consume-info">
              <el-row>
                <el-col :span="8">药品：999/666</el-col>
                <el-col :span="8">检验：999/20</el-col>
                <el-col :span="8">检查：888/60</el-col>
                <el-col :span="8">治疗：123/40</el-col>
                <el-col :span="8">手术：88/80</el-col>
                <el-col :span="8">耗材：1119/55</el-col>
                <el-col :span="8">并发症：888/111</el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableFilter from "@/components/App/Table/TableFilter";
import { datasourceList } from "@/api/baseConfig";
export default {
  meta: {
    title: "数据配置源",
    activeMenu: "/baseConfig"
  },
  components: {
    TableFilter
  },

  data() {
    return {
      isShowFilter: false,
      query: {
        size: 10,
        current: 1
      },
      itemList: [
        { label: "违反核心治疗", value: [], id: 1 },
        { label: "并发症消耗过大", value: [23], id: 2 },
        { label: "药品（耗材）占比过高", value: [15, 62], id: 3 },
        { label: "违规项目较多", value: [10, 32], id: 4 },
        { label: "治疗费占比过高", value: [15, 25], id: 5 },
        { label: "检验（检查）占比过高", value: [11, 22], id: 6 }
      ],
      sickbedList: [
        {
          index: 1,
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: "36%",
          drugNum: "999/666",
          checkoutNum: "999/666",
          checkUpNum: "999/666",
          treatNum: "999/666",
          surgicalNum: "999/666",
          consumablesNum: "999/666",
          complicationNum: "999/666"
        },
        {
          index: 2,
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: "36%",
          drugNum: "999/666",
          checkoutNum: "999/666",
          checkUpNum: "999/666",
          treatNum: "999/666",
          surgicalNum: "999/666",
          consumablesNum: "999/666",
          complicationNum: "999/666"
        },
        {
          index: 3,
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: "36%",
          drugNum: "999/666",
          checkoutNum: "999/666",
          checkUpNum: "999/666",
          treatNum: "999/666",
          surgicalNum: "999/666",
          consumablesNum: "999/666",
          complicationNum: "999/666"
        },
        {
          index: 4,
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: "36%",
          drugNum: "999/666",
          checkoutNum: "999/666",
          checkUpNum: "999/666",
          treatNum: "999/666",
          surgicalNum: "999/666",
          consumablesNum: "999/666",
          complicationNum: "999/666"
        },
        {
          index: 4,
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: "36%",
          drugNum: "999/666",
          checkoutNum: "999/666",
          checkUpNum: "999/666",
          treatNum: "999/666",
          surgicalNum: "999/666",
          consumablesNum: "999/666",
          complicationNum: "999/666"
        },
        {
          index: 4,
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: "36%",
          drugNum: "999/666",
          checkoutNum: "999/666",
          checkUpNum: "999/666",
          treatNum: "999/666",
          surgicalNum: "999/666",
          consumablesNum: "999/666",
          complicationNum: "999/666"
        },
        {
          index: 4,
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: "36%",
          drugNum: "999/666",
          checkoutNum: "999/666",
          checkUpNum: "999/666",
          treatNum: "999/666",
          surgicalNum: "999/666",
          consumablesNum: "999/666",
          complicationNum: "999/666"
        },
        {
          index: 4,
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: "36%",
          drugNum: "999/666",
          checkoutNum: "999/666",
          checkUpNum: "999/666",
          treatNum: "999/666",
          surgicalNum: "999/666",
          consumablesNum: "999/666",
          complicationNum: "999/666"
        },
        {
          index: 4,
          name: "张峰",
          age: 59,
          sex: 1,
          cNo: 456574,
          inTime: "2022-08-12 23:00:12",
          schedule: "36%",
          drugNum: "999/666",
          checkoutNum: "999/666",
          checkUpNum: "999/666",
          treatNum: "999/666",
          surgicalNum: "999/666",
          consumablesNum: "999/666",
          complicationNum: "999/666"
        }
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
                  value: ""
                },
                {
                  label: "我的病人",
                  value: "1"
                },
                {
                  label: "科室病人",
                  value: "2"
                },
                {
                  label: "关注病人",
                  value: "3"
                }
              ]
            },

            keys: "datasource"
          },
          {
            props: {
              label: "关键字搜索",
              is: "el-input",
              attrs: {
                placeholder: "名称/备注"
              }
            },
            keys: "keywords"
          }
        ]
      }
    };
  },
  methods: {
    search(e) {
      console.log(e);
    },
    toggleFilter() {
      this.isShowFilter = !this.isShowFilter;
    }
  }
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
  right: 0;
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
    }
    .patient-info {
      width: 100%;
      padding: 10px;
      .patient-info-content {
        width: 100%;
        height: 80px;
        padding: 10px;
        border-radius: 10px;
        background: rgba(29, 65, 149, 0.1);
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
        .el-row {
          .el-col {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
