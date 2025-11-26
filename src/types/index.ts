// 自定义类型的首字母必须大写

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    description?: string; // ? 表示这个字段可选
}

export interface OrderItem {
    productId: number;
    name: string;
    quantity: number;
    price: number;
}


export interface Order {
    id: string;
    user: string;
    amount: number;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    createTime: string;
    items: OrderItem[];
    address?: string;
    contact?: string;
}


export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'vip' | 'user';
    status: 'active' | 'inactive';
    orderCount: number;
    totalSpent: number;
    registrationDate: string;
}

export interface DashboardStats {
    totalRevenue: number;
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
}