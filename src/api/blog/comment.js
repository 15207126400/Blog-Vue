import axios from 'axios'

export function postComment(form) {
    const url = '/api/blog/postComment'
    
    const name = form.name
    const avatarUrl = form.avatarUrl
    const email = form.email
    const content = form.content
    const articleId = form.articleId
    const parentId = form.parentId

    return axios.get(url,{params: {
        name,avatarUrl,email,content,articleId,parentId
    }}).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}
export function getCommentList(form) {
    const url = '/api/blog/getCommentList'
    
    const articleId = form.id
    const current = form.current
    const size = form.size

    return axios.get(url,{params: {
        articleId,current,size
    }}).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}
export function getCommentListPage(form) {
    const url = '/api/blog/getCommentList'
    
    const articleId = form.id
    const current = form.current
    const size = form.size

    return axios.get(url,{params: {
        articleId,current,size
    }}).then((res2) => {
        return Promise.resolve(res2.data)
    }).catch(function(response2) {
        console.log(response2)
    })
}
