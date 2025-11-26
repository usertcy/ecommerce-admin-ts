<template>
    <section>

        <article class="card">

            <header class="card-header">
                <h3>商品管理</h3>
                <!-- 点击Vue 就会立马运行 openAddModal() 这个函数 -->
                <el-button type="success" @click="openAddModal">添加商品</el-button>
            </header>

            <section class="card-body">
                <!-- 绑定的变量 loading 如果是 true，表格会被一层半透明白膜盖住并在中间转圈，禁止用户操作；如果是 false，遮罩消失，表格恢复正常 
                 element-loading-text设置转圈图标下方显示的具体文字-->
                <el-table :data="products" stripe style="width: 100%" v-loading="loading" element-loading-text="正在处理数据...">
                    <el-table-column prop="id" label="ID" width="80" />
                    <el-table-column prop="name" label="名称" />
                    <el-table-column label="分类">
                        <template #default="scope">
                            {{ getCategoryNameById(scope.row.category) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格">
                        <template #default="scope">
                            ¥{{ scope.row.price }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="stock" label="库存" />
                    <el-table-column label="操作" width="200">
                        <template #default="scope">
                            <el-button type="primary" plain @click="openEditModal(scope.row)">
                                编辑
                            </el-button>
                            <el-button type="danger" plain @click="del(scope.row.id)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </section>
        </article>

        <!-- Element Plus 提供的弹窗组件（也叫模态框），专门用来在当前页面弹出一个悬浮的小窗口
         变量 showModal 为 true 时弹窗显示，为 false 时弹窗关闭 -->
        <el-dialog v-model="showModal" :title="isEdit ? '编辑商品' : '添加商品'" width="500px">
            <div class="form-group">
                <label>名称</label>
                <el-input v-model="form.name" />
            </div>
            <div class="form-group">
                <label>分类</label>
                <!-- placeholder：没选的时候显示的灰色提示字（"选择分类"） -->
                <el-select v-model="form.category" placeholder="选择分类" style="width:100%">
                    <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id" />
                </el-select>
            </div>
            <div class="form-group">
                <label>价格</label>
                <el-input-number v-model="form.price" :min="0" :step="1" style="width:100%" />
            </div>
            <div class="form-group">
                <label>库存</label>
                <el-input-number v-model="form.stock" :min="0" :step="1" style="width:100%" />
            </div>
            <template #footer>
                <el-button @click="showModal = false">取消</el-button>
                <el-button type="success" @click="isEdit ? edit() : add()" :loading="loading">
                    {{ isEdit ? '保存' : '添加' }}
                </el-button>
            </template>
        </el-dialog>

    </section>
</template>



<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMainStore } from '../stores'
import type { Product } from '../types'

const store = useMainStore()

const loading = computed(() => store.isLoading)
const products = computed(() => store.getProducts)
const categories = computed(() => store.categories)
const getCategoryNameById = (id: string) => store.getCategoryName(id)

const showModal = ref(false)
const isEdit = ref(false)

const form = ref({
    id: 0,
    name: '',
    category: '',
    price: 0,
    stock: 0
})

const openAddModal = () => {
    isEdit.value = false
    form.value = { id: 0, name: '', category: '', price: 0, stock: 0 }
    showModal.value = true
}

const add = async () => {
    if (!form.value.name || !form.value.category) {
        return alert('请填写商品名称和选择分类')
    }
    const payload = {
        name: form.value.name,
        category: form.value.category,
        price: Number(form.value.price),
        stock: Number(form.value.stock)
    }
    showModal.value = false
    await store.addProduct(payload)
}

const openEditModal = (product: Product) => {
    isEdit.value = true
    form.value = { ...product }
    showModal.value = true
}

const edit = async () => {
    if (!form.value.name || !form.value.category) {
        return alert('请填写商品名称和选择分类')
    }
    const payload = {
        id: form.value.id,
        product: {
            name: form.value.name,
            category: form.value.category,
            price: Number(form.value.price),
            stock: Number(form.value.stock)
        }
    }
    showModal.value = false
    await store.updateProduct(payload)
}

const del = async (id: number) => {
    if (confirm('确定删除该商品吗？')) {
        await store.deleteProduct(id)
    }
}
</script>