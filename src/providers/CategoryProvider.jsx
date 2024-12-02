import { useContext, createContext, useState, useEffect } from "react";
import { useAuthProvider } from "./AuthProvider.jsx";

export const CategoryData = createContext();
export function useCategoryProvider() {
  return useContext(CategoryData);
}

export default function CategoryProvider ({children}) {
    const {API, axios} = useAuthProvider()

    const [categoryObj, setCategoryObj] = useState({})

    useEffect(() => {
        axios.get(`${API}/categories`).then(({data}) => setCategoryObj(data)).catch(err => console.log("Category retrieval error", err))
    },[])

    return (
        <CategoryData.Provider value={{categoryObj}}>
            {children}
        </CategoryData.Provider>
    )


}