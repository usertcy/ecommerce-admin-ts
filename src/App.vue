<template>
    <div id="app">

        <Sidebar />

        <main class="main-content">
            <Header />

            <section class="content">
                <router-view></router-view>
            </section>
        </main>

    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMainStore } from './stores' // 引入 Pinia Store
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'

// 获取 Store 实例
const store = useMainStore()

onMounted(() => {
    // 应用启动时，立刻去读取 LocalStorage 里的缓存
    store.initData()
})
</script>
