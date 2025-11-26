// 配置了电商管理系统的前端路由，定义了不同 URL 路径对应的页面组件。
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Products from '../views/Products.vue';
import Orders from '../views/Orders.vue';
import Users from '../views/Users.vue';
import Settings from '../views/Settings.vue';
import Analytics from '../views/Analytics.vue';

// 路由配置数组
const routes = [
    {
        path: '/',
        // 给路由起个唯一的名字，便于编程式导航
        name: 'dashboard',
        component: Dashboard,
        meta: { title: '数据概览' }
    },
    {
        path: '/products',
        name: 'products',
        component: Products,
        meta: { title: '商品管理' }
    },
    {
        path: '/orders',
        name: 'orders',
        component: Orders,
        meta: { title: '订单管理' }
    },
    {
        path: '/users',
        name: 'users',
        component: Users,
        meta: { title: '用户管理' }
    },
    {
        path: '/analytics',
        name: 'analytics',
        component: Analytics,
        meta: { title: '数据分析' }
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta: { title: '系统设置' }
    }
]

// 路由实例创建
const router = createRouter({
    history: createWebHistory(),
    // routes: 传入上面定义的路由配置
    routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    document.title = to.meta.title ?`${ to.meta.title } - 电商管理系统` : '电商管理系统';
    next();
});

// 将这个路由实例作为默认导出
export default router;