import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
    // get returns promise object representing HTTP request
    const request = axios.get(baseUrl)
    /* When promise object is resolved we use our
    *  accessor "then" which allows us to modify the content 
    *  within our promise to return only the data portion
    *  as a new promise
    */
    return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update}