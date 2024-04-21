import axios from 'axios';
axios.defaults.withCredentials = true;

const addCategory = async function(category, description) {
    const res =  await axios.post(
        "http://localhost:3000/category/",
        {
            title: category,
            description
        }
    )

    return res;
};

export default addCategory;