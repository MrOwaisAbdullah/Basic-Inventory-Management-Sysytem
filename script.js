var products = [
    { name: "Laptop", quantity: 10, price: 70000 },
    { name: "Smartphone", quantity: 20, price: 50000 },
    { name: "Headphones", quantity: 50, price: 3000 },
];
function displayProducts() {
    var tableBody = document.querySelector("tbody");
    products.forEach(function (product) {
        var row = document.createElement("tr");
        var nameCell = document.createElement("td");
        nameCell.textContent = product.name;
        row.appendChild(nameCell);
        var quantityCell = document.createElement("td");
        quantityCell.textContent = product.quantity.toString();
        row.appendChild(quantityCell);
        var priceCell = document.createElement("td");
        priceCell.textContent = "PKR ".concat(product.price.toFixed(2));
        row.appendChild(priceCell);
        tableBody.appendChild(row);
    });
}
displayProducts();
function addProduct() {
    var productNameInput = document.getElementById("productName");
    var productQuantityInput = document.getElementById("productQuantity");
    var productPriceInput = document.getElementById("productPrice");
    var name = productNameInput.value;
    var quantity = parseInt(productQuantityInput.value);
    var price = parseFloat(productPriceInput.value);
    if (!name || !quantity || !price) {
        if (!name) {
            alert("Product name cannot be empty!");
            return;
        }
        if (isNaN(quantity) || quantity <= 0) {
            alert("Quantity must be a valid, positive number!");
            return;
        }
        if (isNaN(price) || price <= 0) {
            alert("Price must be a valid, positive number!");
            return;
        }
    }
    else if (name && quantity && price) {
        var newProduct = { name: name, quantity: quantity, price: price };
        products.push(newProduct);
    }
    var tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    displayProducts();
    productNameInput.value = "";
    productQuantityInput.value = "";
    productPriceInput.value = "";
}
var addProductButton = document.getElementById("addProductButton");
addProductButton.addEventListener("click", addProduct);
