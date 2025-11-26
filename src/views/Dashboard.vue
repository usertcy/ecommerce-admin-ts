<template>

    <section>
      
        <div class="stats-container">
            <article class="stat-card">
                <div class="stat-icon" style="background-color: #3498db;">💰</div>
                <div class="stat-info">
                    <h3>￥{{ formatNumber(stats.totalRevenue) }}</h3>
                    <p>总收入</p>
                </div>
            </article>

            <article class="stat-card">
                <div class="stat-icon" style="background-color: #2ecc71;">📦</div>
                <div class="stat-info">
                    <h3>{{ stats.totalProducts }}</h3>
                    <p>商品总数</p>
                </div>
            </article>

            <article class="stat-card">
                <div class="stat-icon" style="background-color: #e74c3c;">📋</div>
                <div class="stat-info">
                    <h3>{{ stats.totalOrders }}</h3>
                    <p>订单总数</p>
                </div>
            </article>

            <article class="stat-card">
                <div class="stat-icon" style="background-color: #f39c12;">👥</div>
                <div class="stat-info">
                    <h3>{{ stats.totalUsers }}</h3>
                    <p>用户总数</p>
                </div>
            </article>
        </div>

        <!--把 table+button 换成 Element Plus -->
        <article class="card">

            <header class="card-header">
                <h3>最近订单</h3>
                <!-- <button class="btn btn-primary" @click="$router.push('/orders')">查看全部订单</button> -->
                <el-button type="primary" @click="$router.push('/orders')">
                    查看全部订单
                </el-button>
            </header>

            <section class="card-body">
                <!-- stripe：开启斑马纹效果  -->
                <el-table :data="recentOrders" stripe style="width: 100%">
                    <!--<el-table-column>定义每一列的内容和显示方式  
                        prop是 绑定字段名对应传入的 :data="recentOrders" 数组中的每一项的字段
                        label 是这一列的 表头文字，显示在表格最上面那一行  -->
                    <el-table-column prop="id" label="订单号" width="120" />
                    <el-table-column prop="user" label="用户" />
                    <el-table-column label="金额">
                        <!-- template定义插槽内容  #等价于 v-slot:default
                         scope 是插槽传进来的上下文对象里面有其他配置   -->
                        <template #default="scope">
                            <!-- scope.row：当前这一行的具体数据对象 -->
                            ￥{{ scope.row.amount }}
                        </template>
                        <!-- 非自闭合标签（需要插槽内容)所以必须用成对的标签 -->
                    </el-table-column>
                    
                    <el-table-column label="状态">
                        <template #default="scope">
                            <!--<el-tag> 通常用来标识状态、类型、分类 -->
                            <el-tag :type="getTagType(scope.row.status)">
                                {{ getOrderStatusText(scope.row.status) }}
                            </el-tag>
                        </template>
                    </el-table-column>
                </el-table>

            </section>
        </article>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMainStore } from '../stores' // 引入 Pinia store

const store = useMainStore()

// 直接获取 State，Pinia 会自动保持响应式
const stats = computed(() => store.dashboardStats)
const recentOrders = computed(() => store.recentOrders)

// 调用 Store 里的辅助函数
const getOrderStatusText = (status: string) => store.getOrderStatusText(status)
const formatNumber = (num: number) => store.formatNumber(num)

// 这个函数纯 UI 逻辑，保持不变
const getTagType = (status: string) => {
    const text = getOrderStatusText(status)
    switch (text) {
        case '已送达': return 'success'
        case '已取消': return 'info'
        case '待处理': return 'warning'
        case '已发货': return 'danger'
        default: return ''
    }
}
</script>