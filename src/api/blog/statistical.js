import axios from 'axios'

export function getStatistical() {
    const url = '/api/blog/getStatistical'

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}
