<template>
    <section>
        <article class="card">
            <header class="card-header">
                <h3>系统设置</h3>
            </header>

            <section class="card-body">
                <!-- 基本设置 -->
                <div class="settings-section">
                    <h4>基本设置</h4>

                    <div class="settings-item">
                        <div class="settings-label">
                            <h4>网站名称</h4>
                            <p>显示在浏览器标签页和网站顶部的名称</p>
                        </div>
                        <el-input v-model="settings.siteName" placeholder="请输入网站名称" style="width: 200px;" />
                    </div>

                    <div class="settings-item">
                        <div class="settings-label">
                            <h4>系统语言</h4>
                            <p>选择系统显示的语言</p>
                        </div>
                        <el-select v-model="settings.language" placeholder="选择语言" style="width: 200px;">
                            <el-option label="简体中文" value="zh" />
                            <el-option label="English" value="en" />
                        </el-select>
                    </div>
                </div>

                <!-- 通知设置 -->
                <div class="settings-section">
                    <h4>通知设置</h4>

                    <div class="settings-item">
                        <div class="settings-label">
                            <h4>新订单通知</h4>
                            <p>当有新订单时发送通知</p>
                        </div>
                        <el-switch v-model="settings.notifyNewOrder" />
                    </div>

                    <div class="settings-item">
                        <div class="settings-label">
                            <h4>库存预警</h4>
                            <p>当商品库存低于阈值时发送通知</p>
                        </div>
                        <el-switch v-model="settings.notifyLowStock" />
                    </div>
                </div>

                <!-- 数据管理 -->
                <div class="settings-section">
                    <h4>数据管理</h4>

                    <div class="settings-item">
                        <div class="settings-label">
                            <h4>数据备份</h4>
                            <p>备份系统数据到本地</p>
                        </div>
                        <el-button type="primary" @click="backupData">立即备份</el-button>
                    </div>

                    <div class="settings-item">
                        <div class="settings-label">
                            <h4>缓存清理</h4>
                            <p>清理系统缓存文件</p>
                        </div>
                        <el-button type="warning" @click="clearCache">清理缓存</el-button>
                    </div>
                </div>

                <!-- 保存按钮 -->
                <div class="settings-section" style="text-align: right; margin-top: 20px;">
                    <el-button type="success" @click="saveSettings">保存设置</el-button>
                </div>
            </section>
        </article>
    </section>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

interface SystemSettings {
    siteName: string;
    language: string;
    notifyNewOrder: boolean;
    notifyLowStock: boolean;
}

const settings = ref < SystemSettings > ({
    siteName: '电商管理系统',
    language: 'zh',
    notifyNewOrder: true,
    notifyLowStock: true
})

const saveSettings = () => {
    // 模拟保存
    ElMessage.success('设置已保存：\n' + JSON.stringify(settings.value, null, 2))

    localStorage.setItem('site-settings', JSON.stringify(settings.value))
}

const backupData = () => {
    ElMessage.success('✅ 数据备份完成（模拟操作）')
}

const clearCache = () => {
    localStorage.removeItem('shop-data-ts')
    ElMessage.success('🧹 系统缓存已清理，刷新页面可重置数据')
    setTimeout(() => location.reload(), 1000)
}
</script>