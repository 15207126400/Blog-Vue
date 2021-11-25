import axios from 'axios'

export function blogIndex() {
    const url = '/api/blog/blogIndex'

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}
export function getArticle(form) {
    const url = '/api/blog/getArticle'
    const id = form

    return axios.get(url, {params: {
        id
    }}).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}
export function getArticleList(form) {
    const url = '/api/blog/getArticleList'
    const size = form.size
    const current = form.current

    return axios.get(url, {params: {
        size, current
    }}).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}
export function getListByRand() {
    const url = '/api/blog/getListByRand'

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}
export function getArticleListByCategory(form) {
    const url = '/api/blog/getArticleListByCategory'
    const categoryId = form.categoryId
    const size = form.size
    const current = form.current 

    return axios.get(url, {params: {
        categoryId, size, current 
    }}).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}