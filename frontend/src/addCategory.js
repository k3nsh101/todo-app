const addCategory = async function(category, description) {
    const res = await fetch(
        'http://localhost:3000/category/',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: category,
                description
            }),
        }
    );
    return res;
};

export default addCategory;