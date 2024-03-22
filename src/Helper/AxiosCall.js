import axios from "axios";
import { toast } from 'react-toastify';


export const axiosPost = ({ data, endPoint, errorMessage, successMessage }) => {

    return new Promise(async (resolve, reject) => {
        try {

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const res = await axios.post(`/${endPoint}`, data, { headers: config })
            toast(`${successMessage}`)
            resolve({ data: res.data })

        } catch (error) {

            console.log(error);
            toast(`${errorMessage}`)
            reject({ data: null })

        }

    });

}



export function axiosGetAll(endPoint) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.get(`/${endPoint}/all`)
            resolve({ data })
        } catch (error) {
            reject({ data: null })
        }
    });

}

export function axiosGetById({ endPoint, query, id }) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.get(`/${endPoint}?${query}=${id}`)
            resolve({ data })
        } catch (error) {
            reject({ data: null })
        }
    });
}



export function axiosUpdateById({ data, endPoint,query, id, errorMessage, successMessage }) {
    return new Promise(async (resolve, reject) => {

        try {
            const response = await axios.patch(`/${endPoint}?${query}=${id}`, data)
            toast(`${successMessage}`)
            resolve({ data: response.data })
        } catch (error) {
            toast(`${errorMessage}`)
            reject({ data: null })
        }

    });
}

export function axiosDeleteById({endPoint,query, id, errorMessage, successMessage }) {
    return new Promise(async (resolve, reject) => {

        try {
            const response = await axios.delete(`/${endPoint}?${query}=${id}`)
            toast(`${successMessage}`)
            resolve({ data: response.data })
        } catch (error) {
            toast(`${errorMessage}`)
            reject({ data: null })
        }

    });
}


export const loginUser = ({ data, endPoint, errorMessage, successMessage }) => {

    return new Promise(async (resolve, reject) => {
        try {

            const res = await axios.post(`/${endPoint}`, data)
            toast(`${successMessage}`)
            resolve({ data: res.data })

        } catch (error) {

            toast(`${errorMessage}`)
            reject({ data: null })

        }

    });

}


/* SEARCH FUNCTIONALITY USER,JOBS ETC... */
export function axiosSearch({ endPoint, query}) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.get(`/${endPoint}?${query}`)
            resolve({ data })
        } catch (error) {
            reject({ data: null })
        }
    });
}


export function axiosAddRemoveLikeComment({ endPoint, query}) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.post(`/${endPoint}?${query.query}`)
            resolve({ data })
        } catch (error) {
            reject({ data: null })
        }
    });
}