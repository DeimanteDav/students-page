import axios from "axios"
import { useEffect, useState } from "react"

export default function useFetchData(url, method = 'get', dependencies = [], params = {}) {
    const [data, setData] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let methodTypes = ['get', 'put', 'patch', 'delete']
        let methodType = method

        if (!methodTypes.includes(method)) {
            methodType = 'get'
        }

        axios[methodType](url, params)
            .then(response => {
                setData(response.data)
                setLoading(false)
            })
            .catch(error => {
                setError(error.message)
                setLoading(false)
            })
    }, [...dependencies])


    return {data, error, loading, setData}
}