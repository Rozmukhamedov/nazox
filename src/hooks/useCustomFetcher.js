import { useState } from "react";

export default function useCustomFetcher() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const onFetch = (onLoad, url, options) => {
        setIsLoading(true);

        fetch(url, options)
            .then((res) => {
                res.json().then((data) => {
                    onLoad(data)
                })
                setError(res.status)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error)
                setIsLoading(false)
            })

    }



    return [error, isLoading, onFetch];
};