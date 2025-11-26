<template>
    <section>

        <article class="card">

            <header class="card-header">
                <h3>订单管理</h3>
                <el-select v-model="statusFilter" placeholder="选择订单状态" style="width: 200px; margin-left: 10px;">
                    <el-option label="全部状态" value="" />
                    <el-option label="待处理" value="pending" />
                    <el-option label="已发货" value="shipped" />
                    <el-option label="已送达" value="delivered" />
                    <el-option label="已取消" value="cancelled" />
                </el-select>
            </header>

            <section class="card-body">
                <el-table :data="filteredOrders" stripe style="width: 100%">
                    <el-table-column prop="id" label="订单号" width="120" />
                    <el-table-column prop="user" label="用户" />
                    <el-table-column label="金额">
                        <template #default="scope">
                            ￥{{ scope.row.amount }}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态">
                        <template #default="scope">
                            <el-tag :type="getTagType(scope.row.status)">{{ getOrderStatusText(scope.row.status)}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="下单时间" />
                    <el-table-column label="操作" width="220">
                        <template #default="scope">
                            <el-button type="primary" plain size="small" @click="viewOrder(scope.row)">详情</el-button>
                            <el-button type="warning" plain size="small" @click="updateStatus(scope.row.id, 'shipped')"
                                v-if="scope.row.status === 'pending'">发货</el-button>
                            <el-button type="success" plain size="small"
                                @click="updateStatus(scope.row.id, 'delivered')"
                                v-if="scope.row.status === 'shipped'">送达</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
        </article>

        <!-- 订单详情弹窗 -->
        <el-dialog v-model="selectedOrder" :title="selectedOrder ? '订单详情 - ' + selectedOrder.id : ''" width="600px">
            <template v-if="selectedOrder">
                <div class="form-group">
                    <label class="form-label">用户信息</label>
                    <p style="font-size: 1rem; font-weight: 700;">{{ selectedOrder.user }}</p>
                </div>

                <div class="form-group">
                    <label class="form-label">配送地址</label>
                    <p style="font-size: 1rem; font-weight: 700;">{{ selectedOrder.address }}</p>
                </div>

                <div class="form-group">
                    <label class="form-label">订单状态</label>
                    <el-tag>{{ getOrderStatusText(selectedOrder.status) }}</el-tag>
                </div>

                <div class="order-items">
                    <label class="form-label">商品列表</label>
                    <el-table :data="selectedOrder.items" style="width: 100%" border>
                        <el-table-column prop="name" label="商品名称" />
                        <el-table-column label="价格 x 数量">
                            <template #default="scope">
                                ￥{{ scope.row.price }} x {{ scope.row.quantity }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="order-total" style="margin-top: 10px;">
                    <strong>总金额：￥{{ selectedOrder.amount }}</strong>
                </div>
            </template>

            <template #footer>
                <el-button type="danger" @click="closeOrderModal">关闭</el-button>
            </template>
        </el-dialog>
    </section>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMainStore } from '../stores'
import type { Order } from '../types' 

const store = useMainStore()

const statusFilter = ref('')
const selectedOrder = ref<Order | null>(null)

const orders = computed(() => store.orders.length > 0 ? store.orders : store.recentOrders)

const getOrderStatusText = (status: string) => store.getOrderStatusText(status)
const getOrderById = (id: string) => store.getOrderById(id)

const filteredOrders = computed(() =>
    statusFilter.value ? orders.value.filter(order => order.status === statusFilter.value) : orders.value
)

const updateStatus = (orderId: string, status: string) => {
    store.updateOrderStatus({ orderId, status })

    // 如果弹窗开着，也同步更新一下弹窗里的数据
    if (selectedOrder.value && selectedOrder.value.id === orderId) {
        const refreshed = getOrderById(orderId)
        selectedOrder.value = refreshed ? { ...refreshed } : null
    }
}

const viewOrder = (order: Order) => {
    const o = getOrderById(order.id)
    selectedOrder.value = o ? { ...o } : null
}

const closeOrderModal = () => {
    selectedOrder.value = null
}

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