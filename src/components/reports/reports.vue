<template>
  <el-card class="box-card">
    <my-bread level1="数据统计" level2="数据报表" slot="header"></my-bread>
    <div id="main" style="width: 600px; height: 400px"></div>
  </el-card>
</template>

<script>
var myEchart = require("echarts")
export default {
  name: 'reports',
  mounted () {
    this.useEchart()
  },
  methods: {
    async useEchart () {
      // init
      var myChart = myEchart.init(document.getElementById("main"))
      // 获取表格数据 option
      const res = await this.$http.get(`reports/type/1`)
      let option1 = res.data.data
      console.log(option1)
      let option2 = {
        // title: {
        //   text: 'Stacked Area Chart'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      }
      let option = {...option1, ...option2}
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
</style>
