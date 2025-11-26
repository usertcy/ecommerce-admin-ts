import { createApp } from 'vue';//从 Vue 导入创建应用的方法
import App from './App.vue';// 导入根组件
import router from './router';// 导入路由配置
import { createPinia } from 'pinia' // 1. 引入 Pinia
import '../public/admin.css'  // 直接导入 CSS
// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App);// 创建 Vue 应用实例
// 2. 创建 Pinia 实例
const pinia = createPinia()

// 3. 添加一个简单的插件：监听所有 Store 的变化，自动保存到 localStorage这样刷新页面数据就不会丢了
pinia.use(({ store }) => {
    store.$subscribe((mutation, state) => {
        // 用 'shop-data-ts' 这个 key 来存数据
        localStorage.setItem('shop-data-ts', JSON.stringify(state))
    })
})


app.use(pinia) // 4. 注册 Pinia
app.use(router);// 注册路由
app.use(ElementPlus);// 注册 Element Plus 组件库
app.mount('#app');//将 Vue 应用挂载到 HTML 中 id 为 "app" 的 DOM 元素上
