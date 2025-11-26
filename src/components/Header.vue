<template>
    <header class="header">

        <h2>{{ route.meta.title || '电商管理系统' }}</h2>

        <section class="user-info">
            <!-- figure表示独立的内容，比如图片、图表、代码块等 -->
            <figure class="user-avator">
                <span>{{ currentUser.name.charAt(0) }}</span>
            </figure>
            <span>{{ currentUser.name }}</span>
        </section>

    </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '../stores'

const route = useRoute()
const store = useMainStore()

const currentUser = computed(() => {
    return store.users.find(u => u.role === 'admin') || { name: '管理员' }
})
</script>