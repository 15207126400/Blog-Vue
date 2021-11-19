import axios from 'axios'

export function getToken(form) {
    const url = '/api/blog/getToken'
    const code = form

    return axios.get(url, {
        params: {
            code
        }
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function (response) {
        console.log(response)
    })
}
export function registerOrUpdateAccount(form) {
    const url = '/api/blog/registerOrUpdateAccount'
    console.log(form)
    const id = form.id
    const username = form.username
    const password = form.password
    const nickname = form.nickname
    const avatar = form.avatar

    return axios.get(url, {
        params: {
            id, username, password, nickname, avatar
        }
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function (response) {
        console.log(response)
    })
}
export function loginForUsername(form) {
    const url = '/api/blog/login'
    console.log(form)
    const username = form.username
    const password = form.password

    return axios.get(url, {
        params: {
            username, password
        }
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function (response) {
        console.log(response)
    })
}