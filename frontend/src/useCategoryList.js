// Get the available categories
import { useState, useEffect } from "react";

export default function useCategoryList() {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getCategoryList();

        async function getCategoryList() {
            const res = await fetch(
                "http://localhost:3000/category",
            );
            
            const categories = await res.json();
    
            setCategoryList(categories);
        }
    }, []);
    return categoryList;
}
