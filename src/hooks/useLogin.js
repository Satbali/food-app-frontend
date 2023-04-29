import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [loding, setLoding] = useState(null)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setLoding(true)
        setError(null)

        try {
            const user = { email, password };
            const response = await fetch("/api/user/login", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            if (!response.ok) {
                setError(json.error)
                setLoding(false)
            }
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json))
                dispatch({ type: 'LOGIN', payload: json })
                setLoding(false)
            }
            console.log(json, "Submit Clicked");
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }

    }

    return { login, loding, error }

}

