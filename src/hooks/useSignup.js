import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [loding, setLoding] = useState(null)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (name, email, password) => {
        setLoding(true)
        setError(null)

        try {
            const user = { name, email, password };
            const response = await fetch("/api/user/signup", {
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

    return { signup, loding, error }

}

