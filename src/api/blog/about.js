import axios from 'axios'

export function getHistoryList() {
    const url = '/api/blog/getHistoryList'

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}
