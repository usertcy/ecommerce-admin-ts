<template>
    <section>

        <article class="card">

            <header class="card-header">
                <h3>用户管理</h3>
                <el-select v-model="roleFilter" placeholder="选择角色" style="width: 200px; margin-left: 10px;">
                    <el-option label="全部角色" value="all" />
                    <el-option label="管理员" value="admin" />
                    <el-option label="VIP用户" value="vip" />
                    <el-option label="普通用户" value="user" />
                </el-select>
            </header>

            <section class="card-body">
                <el-table :data="filteredUsers" stripe style="width: 100%; overflow-x: auto;" max-height="600">
                    <el-table-column prop="id" label="ID" width="80" />
                    <el-table-column prop="name" label="用户名" />
                    <el-table-column prop="email" label="邮箱" />
                    <el-table-column label="角色" min-width="100">
                        <template #default="scope">
                            <el-tag>{{ getUserRoleText(scope.row.role) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="registrationDate" label="注册时间" />
                    <el-table-column prop="orderCount" label="订单数" />
                    <el-table-column label="总消费">
                        <template #default="scope">
                            ¥{{ scope.row.totalSpent }}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态">
                        <template #default="scope">
                            <el-tag :type="scope.row.status === 'active' ? 'success' : 'info'">
                                {{ scope.row.status === 'active' ? '活跃' : '禁用' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="220">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="viewUser(scope.row.id)">详情</el-button>
                            <el-button type="warning" size="small" @click="toggleUserStatus(scope.row.id)"
                                v-if="scope.row.role !== 'admin'">
                                {{ scope.row.status === 'active' ? '禁用' : '启用' }}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
        </article>

        <!-- 用户详情弹窗 -->
        <el-dialog v-model="showDialog" :title="selectedUser ? '用户详情 - ' + selectedUser.name : ''" width="600px">
            <template v-if="selectedUser">
                
                <div class="user-profile" style="display: flex; gap: 20px; align-items: center;">
                    <div class="user-avatar-large">{{ selectedUser.name.charAt(0) }}</div>
                    <div>
                        <h3>{{ selectedUser.name }}</h3>
                        <p style="margin-bottom:5px;">{{ selectedUser.email }}</p>
                        <el-tag>{{ getUserRoleText(selectedUser.role) }}</el-tag>
                    </div>
                </div>

                <div class="user-stats" style="margin-top: 20px;">
                    <el-descriptions :column="2" border>
                        <el-descriptions-item label="总订单数">{{ selectedUser.orderCount }}</el-descriptions-item>
                        <el-descriptions-item label="总消费金额">¥{{ selectedUser.totalSpent }}</el-descriptions-item>
                        <el-descriptions-item label="注册时间">{{ selectedUser.registrationDate }}</el-descriptions-item>
                        <el-descriptions-item label="账户状态">
                            <el-tag :type="selectedUser.status === 'active' ? 'success' : 'info'">
                                {{ selectedUser.status === 'active' ? '活跃' : '禁用' }}
                            </el-tag>
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
            </template>

            <template #footer>
                <el-button type="danger" @click="closeUserModal">关闭</el-button>
            </template>
        </el-dialog>
    </section>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMainStore } from '../stores'
import type { User } from '../types'

const store = useMainStore()

const roleFilter = ref('all')
const showDialog = ref(false)
const selectedUser = ref < User | null > (null)

const users = computed(() => store.users)
const getUserById = (id: number) => store.getUserById(id)

const filteredUsers = computed(() =>
    roleFilter.value === 'all'
        ? users.value
        : users.value.filter(user => user.role === roleFilter.value)
)

const getUserRoleText = (role: string) => {
    const roleMap: Record<string, string> = { admin: '管理员', vip: 'VIP', user: '普通' }
    return roleMap[role] || '未知角色'
}

const viewUser = (userId: number) => {
    const u = getUserById(userId)
    selectedUser.value = u ? { ...u } : null
    showDialog.value = true
}

const toggleUserStatus = (userId: number) => {
    const user = getUserById(userId)
    if (user) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active'
        // ✅ Pinia 写法
        store.updateUserStatus({ userId, status: newStatus })

        // 刷新详情数据
        if (selectedUser.value && selectedUser.value.id === userId) {
            const refreshed = getUserById(userId)
            selectedUser.value = refreshed ? { ...refreshed } : null
        }
    }
}

const closeUserModal = () => {
    showDialog.value = false
    selectedUser.value = null
}
</script>