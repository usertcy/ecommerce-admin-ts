import { defineStore } from 'pinia'
import type { Product, Order, User, DashboardStats } from '../types'

// 1. 定义一个叫 MainState 的模具(定义 State 接口)规定了数据仓库（Store）里必须有哪些字段，而且每个字段必须是什么类型
interface MainState {
    dashboardStats: DashboardStats;
    recentOrders: Order[];
    products: Product[];
    categories: { id: string; name: string }[];
    orders: Order[];
    users: User[];
    // 用来控制页面“转圈圈”
    isLoading: boolean;
}

// main这是这个仓库的唯一标识符
export const useMainStore = defineStore('main', {
    // 2. State 数据
    state: (): MainState => ({
        isLoading: false,

        dashboardStats: {
            totalRevenue: 128500,
            totalProducts: 6,
            totalOrders: 6,
            totalUsers: 7
        },
        recentOrders: [
            {
                id: 'ORD-001',
                user: '张飞',
                amount: 1497,
                status: 'pending',
                createTime: '2025-01-15',
                address: '北京市海淀区桃园结义路 88 号',
                items: [
                    { productId: 1, name: '智能手表', price: 499, quantity: 3 }
                ]
            },
            {
                id: 'ORD-002',
                user: '关羽',
                amount: 199,
                status: 'delivered',
                createTime: '2025-01-14',
                address: '成都市武侯区过五关小区 2 栋',
                items: [
                    { productId: 2, name: '无线耳机', price: 199, quantity: 1 }
                ]
            },
            {
                id: 'ORD-003',
                user: '刘备',
                amount: 890,
                status: 'shipped',
                createTime: '2025-01-13',
                address: '荆州市三顾茅庐别墅区 A 座',
                items: [
                    { productId: 3, name: 'JS高级编程', price: 89, quantity: 10 }
                ]
            },
            {
                id: 'ORD-004',
                user: '诸葛亮',
                amount: 1499,
                status: 'delivered',
                createTime: '2025-01-12',
                address: '南阳市卧龙岗草庐 1 号',
                items: [
                    { productId: 4, name: '游戏外挂', price: 1499, quantity: 1 }
                ]
            },
            {
                id: 'ORD-005',
                user: '曹操',
                amount: 599,
                status: 'pending',
                createTime: '2025-01-11',
                address: '许昌市魏王宫大酒店 888 房',
                items: [
                    { productId: 5, name: '咖啡机', price: 1899, quantity: 1 }
                ]
            },
            {
                id: 'ORD-006',
                user: '孙权',
                amount: 2999,
                status: 'cancelled',
                createTime: '2025-01-10',
                address: '建业市江东大桥收费站旁',
                items: [
                    { productId: 6, name: '智能手机', price: 2999, quantity: 1 }
                ]
            }
        ],
        products: [
            { id: 1, name: '智能手表', category: 'electronics', price: 499, stock: 500 },
            { id: 2, name: '无线耳机', category: 'electronics', price: 199, stock: 1000 },
            { id: 3, name: 'JS高级编程', category: 'books', price: 89, stock: 78 },
            { id: 4, name: '游戏外挂', category: 'game-skills', price: 1499, stock: 10 },
            { id: 5, name: '咖啡机', category: 'home_appliances', price: 1899, stock: 30 },
            { id: 6, name: '智能手机', category: 'electronics', price: 2999, stock: 200 }
        ],
        categories: [
            { id: 'electronics', name: '电子产品' },
            { id: 'game-skills', name: '游戏技能' },
            { id: 'home_appliances', name: '家用电器' },
            { id: 'books', name: '图书' }
        ],
        orders: [],
        users: [
            { id: 1, name: '张飞', email: 'zhang@ee.com', role: 'user', status: 'active', orderCount: 3, totalSpent: 1497, registrationDate: '2024-05-10' },
            { id: 2, name: '关羽', email: 'guan@ee.com', role: 'vip', status: 'active', orderCount: 5, totalSpent: 1990, registrationDate: '2024-04-22' },
            { id: 3, name: '刘备', email: 'liu@ee.com', role: 'user', status: 'inactive', orderCount: 10, totalSpent: 890, registrationDate: '2024-03-18' },
            { id: 4, name: '诸葛亮', email: 'wolong@ee.com', role: 'vip', status: 'active', orderCount: 12, totalSpent: 14990, registrationDate: '2024-02-05' },
            { id: 5, name: '曹操', email: 'caocao@ee.com', role: 'user', status: 'active', orderCount: 1, totalSpent: 1899, registrationDate: '2024-01-25' },
            { id: 6, name: '孙权', email: 'sun@ee.com', role: 'vip', status: 'inactive', orderCount: 2, totalSpent: 5998, registrationDate: '2023-12-30' },
            { id: 7, name: '管理员', email: 'admin@ee.com', role: 'admin', status: 'active', orderCount: 0, totalSpent: 0, registrationDate: '2022-01-01' }
        ]
    }),

    getters: {
        getRecentOrders: (state) => state.recentOrders,
        getProducts: (state) => [...state.products].sort((a, b) => a.id - b.id),
        getUsers: (state) => state.users,
        getOrders: (state) => state.orders.length > 0 ? state.orders : state.recentOrders,

        getOrderStatusText: () => (status: string) => {
            const map: Record<string, string> = { pending: '待处理', shipped: '已发货', delivered: '已送达', cancelled: '已取消' }
            return map[status] || status
        },
        getCategoryName: (state) => (id: string) => {
            const c = state.categories.find(c => c.id === id)
            return c ? c.name : id
        },
        // 这是浏览器内置的方法 会自动检测当前环境 按照当地人的习惯把数字变好看
        formatNumber: () => (num: number) => num ? num.toLocaleString() : '0',
        getProductById: (state) => (id: number) => state.products.find(p => p.id === id),
        getUserById: (state) => (id: number) => state.users.find(u => u.id === id),
        getOrderById: (state) => (id: string) => state.recentOrders.find(o => o.id === id)
    },

    actions: {
        // 假装自己在请求服务器 (延迟 600ms)声明 simulateRequest 是一个异步任务，里面可以使用 await 命令
        async simulateRequest() {
            this.isLoading = true
            // 代码运行到这一行，暂停等 600 毫秒 Promise 兑现承诺为止
            await new Promise(resolve => setTimeout(resolve, 600))
            this.isLoading = false
        },

        // 初始化数据
        async initData() {
            // 先从缓存里把数据读出来存到变量里！(防止被覆盖)
            const saved = localStorage.getItem('shop-data-ts')
            // 假装有个加载过程
            await this.simulateRequest()

            if (saved) {
                const parsed = JSON.parse(saved)
                // 合并数据，并确保 loading 状态为 false
                this.$state = { ...this.$state, ...parsed, isLoading: false }
            }
        },

        // 添加商品 Omit<Product, 'id'>把 Product 类型里的 id 字段给‘剔除’
        async addProduct(product: Omit<Product, 'id'>) {
            await this.simulateRequest()

            const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1
            this.products.unshift({ ...product, id: newId })
            this.dashboardStats.totalProducts++
        },

        // 更新商品 id必填  Partial<Product>表示 product 里的字段都是可选的
        async updateProduct(payload: { id: number; product: Partial<Product> }) {
            await this.simulateRequest()

            const index = this.products.findIndex(p => p.id === payload.id)
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...payload.product }
            }
        },

        // 删除商品
        async deleteProduct(id: number) {
            await this.simulateRequest()

            this.products = this.products.filter(p => p.id !== id)
            this.dashboardStats.totalProducts--
        },

        // 更新订单状态
        async updateOrderStatus(payload: { orderId: string; status: any }) {
            await this.simulateRequest()

            const order = this.recentOrders.find(o => o.id === payload.orderId)
            if (order) order.status = payload.status
        },

        // 更新用户状态
        async updateUserStatus(payload: { userId: number; status: any }) {
            await this.simulateRequest()

            const user = this.users.find(u => u.id === payload.userId)
            if (user) user.status = payload.status
        }
    }
})