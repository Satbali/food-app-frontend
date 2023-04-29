import { useContext } from "react";
import { FoodContext } from "../context/FoodContext";


export const useFoodContext = () => {
    const context = useContext(FoodContext)

    if (!context) {
        throw Error('useFoodContext must be used inside an foodcontextprovider')
    }

    return context
}