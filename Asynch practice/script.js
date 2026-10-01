async function loadData() {

    // Get elements from the HTML
    const status = document.querySelector("#status");
    const productsContainer = document.querySelector("#products");
    const usersContainer = document.querySelector("#users");

    // Show loading message
    status.textContent = "Loading...";

    try {

        // Fetch products from API 1
        const productResponse = await fetch(
            "https://fakestoreapi.com/products"
        );

        // Convert response to JSON
        const products = await productResponse.json();


        // Fetch users from API 2
        const userResponse = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        // Convert response to JSON
        const users = await userResponse.json();


        // Display products on the webpage
        productsContainer.innerHTML = products
            .map(product => `
                <p>
                    <strong>${product.title}</strong>
                    - $${product.price}
                </p>
            `)
            .join("");


        // Display users on the webpage
        usersContainer.innerHTML = users
            .map(user => `
                <p>
                    <strong>${user.name}</strong>
                    - ${user.email}
                </p>
            `)
            .join("");


        // Show success message
        status.textContent = "Data loaded successfully!";

    } catch (error) {

        // Show error in the console
        console.error("Error:", error);

        // Show error message on the webpage
        status.textContent =
            "Sorry, something went wrong while loading the data.";

    }
}


// Run the function
loadData();