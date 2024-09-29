/* eslint-disable no-unused-vars */
// import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { toast } from 'react-toastify'
import { AuthFail } from 'src/store/Auth/reducer'
import { userRefreshToken } from 'src/store/actions'
// import store from '../store/store';

// const dispatch =
//
const API_URL = `${process.env.REACT_APP_APIURL}/api/v1`

const axiosApi = axios.create({
    baseURL: API_URL
})

axiosApi.interceptors.request.use(async (config) => {
    const store = await import('../store/store').then(async (res) => await res?.default)

    store.dispatch(showLoading())

    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
})

axiosApi.interceptors.response.use(
    async (response) => {
        const store = await import('src/store/store').then(async (res) => await res?.default)
        store.dispatch(hideLoading())
        return response
    },
    async (error) => {
        const store = await import('src/store/store').then(async (res) => await res?.default)

        if (!window.navigator.onLine) {
            toast.error(
                'You are currently offline. Please connect to the internet and try again!',
                {
                    toastId: 'offline-1'
                }
            )
        }
        const originalRequest = error.config

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true

            const rToken = localStorage.getItem('refreshToken')
            const data = {
                token: rToken
            }

            store.dispatch(userRefreshToken(data))
        }
        if (error.response?.status === 511) {


            store.dispatch(AuthFail())
            // localStorage.removeItem('accessToken')
            // localStorage.removeItem('refreshToken')
            // localStorage.removeItem('authUser')
        }
        store.dispatch(hideLoading())
        return Promise.reject(error)
    }
)

export async function get(url, params, config = {}) {
    return await axiosApi.get(url, { params, ...config }).then((response) => response.data)
}

export async function post(url, data, config = {}) {
    return axiosApi.post(url, data, { ...config }).then((response) => response.data)
}

export async function put(url, data, config = {}) {
    return axiosApi.put(url, { ...data }, { ...config }).then((response) => response.data)
}
export async function patch(url, data, config = {}) {
    return axiosApi.patch(url, data, { ...config }).then((response) => response.data)
}

export async function del(url, config = {}) {
    return await axiosApi.delete(url, { ...config }).then((response) => response.data)
}

// export const loadingShow = createAsyncThunk('loading/show', async (data, { dispatch }) => {
//     console.log('🚀 ~ file: api_helper.js:49 ~ loadingShow ~ dispatch:', dispatch)
//     dispatch(showLoading())
// })
