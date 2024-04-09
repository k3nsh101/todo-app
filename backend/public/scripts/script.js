async function deleteItem(id) {
    try {
        const response = await fetch(`/tasks/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log(`${id} deleted successfully`);
            location.reload();
        }
        else {
            console.error(`Failed to delete ${id}`)
        }
    }
    catch (e) {
        console.error(`Error: ${e}`)
    }
}