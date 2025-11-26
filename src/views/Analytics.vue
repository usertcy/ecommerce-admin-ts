<template>
  <section>
    <article class="card">
      <header class="card-header">
        <h3>销售数据分析</h3>
      </header>

      <section class="card-body">

        <div class="chart-container">
          <h4 class="chart-title">月度销售趋势</h4>
          <div ref="trendChart" style="width: 100%; height: 350px;"></div>
        </div>

        <div class="chart-container" style="margin-top: 30px;">
          <h4 class="chart-title">商品类别分布</h4>
          <div ref="categoryChart" style="width: 100%; height: 350px;"></div>
        </div>

        <div class="stats-container" style="margin-top: 30px;">
          <article class="stat-card">
            <div class="stat-icon" style="background-color: #9b59b6;">📅</div>
            <div class="stat-info">
              <h3>¥45,800</h3>
              <p>本月销售额</p>
            </div>
          </article>

          <article class="stat-card">
            <div class="stat-icon" style="background-color: #e67e22;">🛒</div>
            <div class="stat-info">
              <h3>268</h3>
              <p>本月订单数</p>
            </div>
          </article>

          <article class="stat-card">
            <div class="stat-icon" style="background-color: #27ae60;">👥</div>
            <div class="stat-info">
              <h3>89</h3>
              <p>新增用户数</p>
            </div>
          </article>

          <article class="stat-card">
            <div class="stat-icon" style="background-color: #e74c3c;">📦</div>
            <div class="stat-info">
              <h3>1,245</h3>
              <p>商品浏览量</p>
            </div>
          </article>
        </div>
      </section>
    </article>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const trendChart = ref(null)
const categoryChart = ref(null)

let myTrendChart = null
let myCategoryChart = null

onMounted(() => {
  initTrendChart()
  initCategoryChart()

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  // 页面销毁前，清理图表实例和监听器，防止内存泄漏
  window.removeEventListener('resize', handleResize)
  if (myTrendChart) myTrendChart.dispose()
  if (myCategoryChart) myCategoryChart.dispose()
})

const handleResize = () => {
  myTrendChart && myTrendChart.resize()
  myCategoryChart && myCategoryChart.resize()
}


const initTrendChart = () => {
  myTrendChart = echarts.init(trendChart.value)

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['销售额', '订单数']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销售额',
        type: 'line',
        smooth: true,
        data: [12000, 13200, 10100, 13400, 9000, 23000, 21000],
        itemStyle: { color: '#3498db' },
        areaStyle: { opacity: 0.2 } 
      },
      {
        name: '订单数',
        type: 'line',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310],
        itemStyle: { color: '#2ecc71' }
      }
    ]
  }

  myTrendChart.setOption(option)
}

const initCategoryChart = () => {
  myCategoryChart = echarts.init(categoryChart.value)

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: '商品分布',
        type: 'pie',
        radius: ['40%', '70%'], 
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        data: [
          { value: 1048, name: '电子产品' },
          { value: 735, name: '图书' },
          { value: 580, name: '家用电器' },
          { value: 484, name: '游戏技能' },
          { value: 300, name: '其他' }
        ]
      }
    ]
  }

  myCategoryChart.setOption(option)
}
</script>

<style scoped>
.chart-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #eee;
}

.chart-title {
  margin-bottom: 15px;
  color: #2c3e50;
  border-left: 4px solid #3498db;
  padding-left: 10px;
}
</style>