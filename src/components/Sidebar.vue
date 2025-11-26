<template>
    <aside class="sidebar">

        <header class="sidebar-header">
            <h1>电商管理系统</h1>
        </header>

        <nav class="sidebar-menu">

            <!-- active 是CSS类名  当前路由名是 'dashboard' 时，添加 active 类 -->
            <!-- 当点击这个div时，执行：this.$router.push('/')路由跳转 -->
            <div class="menu-item" :class="{ active: route.name === 'dashboard' }" @click="navigateTo('/')">
                <i>📊</i> <span>数据概览</span>
            </div>

            <div class="menu-item" :class="{ active: route.name === 'products' }" @click="navigateTo('/products')">
                <i>📦</i> <span>商品管理</span>
            </div>

            <div class="menu-item" :class="{ active: route.name === 'orders' }" @click="navigateTo('/orders')">
                <i>📋</i> <span>订单管理</span>
            </div>

            <div class="menu-item" :class="{ active: route.name === 'users' }" @click="navigateTo('/users')">
                <i>👥</i> <span>用户管理</span>
            </div>

            <div class="menu-item" :class="{ active: route.name === 'analytics' }" @click="navigateTo('/analytics')">
                <i>📈</i> <span>数据分析</span>
            </div>

            <div class="menu-item" :class="{ active: route.name === 'settings' }" @click="navigateTo('/settings')">
                <i>⚙️</i> <span>系统设置</span>
            </div>
        </nav>
    </aside>

</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 跳转函数
const navigateTo = (path: string) => {
    router.push(path)
}
</script>
