// 封装登录请求

import request from '@/utils/request'

//获取登录 token
export const login = (data) => {
    //返回promise对象
    return request({
        method: 'post',
        url: '/sys/login',
        data
    })
}

//获取用户信息
export const getUserInfo = () => {
    //返回promise对象
    return request({
        method: 'post',
        url: '/sys/profile',
    })
}


//获取角色列表
export const getRoleList = (params) => {
    //返回promise对象
    return request({
        url: '/sys/role',
        params
    })
}

//新增角色
export const addRole = (data) => {
    //返回promise对象
    return request({
        method: 'post',
        url: '/sys/role',
        data
    })
}

// 获取角色详情
export const getRoledetail = (id) => {
    //返回promise对象
    return request({
        method: 'get',
        url: `/sys/role/${id}`,
    })
}

// 更新角色信息
export const updateRole = (data) => {
    //返回promise对象
    return request({
        method: 'put',
        url: `/sys/role/${data.id}`,
        data
    })
}

// 删除角色信息
export const deltelRole = (id) => {
    //返回promise对象
    return request({
        method: 'delete',
        url: `/sys/role/${id}`,
    })
}