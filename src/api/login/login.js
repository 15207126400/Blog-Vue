import axios from 'axios'

export function getToken(form) {
    const url = '/api/blog/getToken'
    const code = form

    return axios.get(url,{params: {
        code
    }}).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}