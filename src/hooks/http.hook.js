import { useCallback } from "react";
import { useState } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async (url, method = 'GET', body = null, headers = { 'Content-type': 'application/json' }) => {
        setLoading(true);
        try {
            const responce = await fetch(url, { method, body, headers })
            if (!responce.ok) {
                throw new Error(`Could not fetch ${url}, status ${responce.status}`)
            }
            const data = await responce.json();
            setLoading(false);
            return data;

        } catch (error) {
            setLoading(false);
            setError(error.message);
            throw error;
        }

    };

    const clearError = useCallback(() => {
        setError(null);
    }, [])

    return { request, loading, error, clearError }
} 