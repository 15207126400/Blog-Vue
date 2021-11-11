import axios from 'axios'

export function getCategoryList() {
    const url = '/api/blog/getCategoryList'

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}
