
"use strict";

// Shortcut for selecting HTML elements.
const getElement = selector => document.querySelector(selector);

// Find a product using the image ID.
const getSelectedProduct = src => {
    const images = document.querySelectorAll("#menu-list img");

    for (const image of images) {
        if (image.id === src) {
            return {
                name: image.alt,
                price: Number(image.dataset.price)
            };
        }
    }

    return null;
};

document.addEventListener("DOMContentLoaded", () => {

    const menu = getElement("#menu-list");
    const order = getElement("#order");
    const total = getElement("#total");

    const placeOrder = getElement("#place_order");
    const clearOrder = getElement("#clear_order");

    let orderTotal = 0;

    // Add prices to the order list.
    const updateTotal = () => {
        orderTotal = 0;

        for (let i = 0; i < order.options.length; i++) {
            orderTotal += Number(order.options[i].dataset.price);
        }

        total.textContent = "Order Total: $" + orderTotal.toFixed(2);
    };

    // Add an item when its image is clicked.
    menu.addEventListener("click", event => {

        if (event.target.tagName !== "IMG") {
            return;
        }

        event.preventDefault();

        const product = getSelectedProduct(event.target.id);

        if (product === null) {
            return;
        }

        if (!Number.isFinite(product.price)) {
            alert("Please check the product price.");
            return;
        }

        const option = document.createElement("option");

        option.textContent =
            product.name + " - $" + product.price.toFixed(2);

        option.dataset.price = product.price;

        order.appendChild(option);

        updateTotal();
    });

    // Change images when the mouse hovers over them.
    const images = menu.querySelectorAll("img");

    images.forEach(image => {

        image.dataset.original = image.getAttribute("src");

        image.addEventListener("mouseover", () => {
            image.src = image.id;
        });

        image.addEventListener("mouseout", () => {
            image.src = image.dataset.original;
        });

    });

    // Clear the order.
    clearOrder.addEventListener("click", () => {

        order.innerHTML = "";

        orderTotal = 0;

        total.textContent = "Order Total: $0.00";

    });

    // Navigate to checkout.
    placeOrder.addEventListener("click", () => {
    if (order.options.length === 0) {
        alert("Please select an item before placing your order.");
        return;
    }

    localStorage.setItem("tuxedoOrderTotal", orderTotal.toFixed(2));

    window.location.href = "checkout.html";
});

    // Display the starting total.
    updateTotal();

});
