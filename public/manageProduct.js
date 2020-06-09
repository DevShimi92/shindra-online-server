const deleteButtons = document.querySelectorAll(".deleteBtn");
deleteButtons.forEach((button)=> {
    button.addEventListener('click', async (event) => {
        const productId = event.target.id; 
        await fetch(`/products/delete/${productId}`, {
            method: 'DELETE'
        });
        window.location.reload(true); 
    });
}); 