// Get the available categories
import { useState, useEffect } from "react";

import axios from "axios";
axios.defaults.withCredentials = true;

export default function useCategoryList() {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getCategoryList();

        async function getCategoryList() {
            const res = await axios.get(
                "http://localhost:3000/category",
            );
    
            setCategoryList(res.data);
        }
    }, []);
    return categoryList;
}
