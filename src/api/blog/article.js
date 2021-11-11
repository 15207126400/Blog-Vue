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
export function getArticleList() {
    const url = '/api/blog/getArticleList'

    return axios.get(url).then((res) => {
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
    const categoryId = form

    return axios.get(url, {params: {
        categoryId
    }}).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}