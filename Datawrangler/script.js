fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {

        // QUESTION 1:
        // What are the names of all products?

        const productNames = products.map(product => product.title);

        console.log('Product names:');
        console.log(productNames);


        // QUESTION 2:
        // Which products cost more than $50?

        const expensiveProducts = products.filter(
            product => product.price > 50
        );

        console.log('Products costing more than $50:');
        console.log(expensiveProducts);


        // QUESTION 3:
        // What is the total price of all products?

        const totalPrice = products.reduce(
            (total, product) => total + product.price,
            0
        );

        console.log('Total price:');
        console.log(totalPrice);

    })
    .catch(error => {
        console.error('Something went wrong:', error);
    });