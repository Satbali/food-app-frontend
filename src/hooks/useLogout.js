import { useAuthContext } from "./useAuthContext";
import { useFoodContext } from './useFoodContext'

export const useLogOut = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: foodDispatch } = useFoodContext()

    const logOut = () => {
        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' })
        foodDispatch({ type: 'SET_FOOD', payload: null })
    }

    return { logOut }
}