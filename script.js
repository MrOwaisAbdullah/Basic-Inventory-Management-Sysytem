var products = [
    { name: "Laptop", quantity: 10, price: 70000 },
    { name: "Smartphone", quantity: 20, price: 50000 },
    { name: "Headphones", quantity: 50, price: 3000 },
];
var currentEditIndex = null;
function displayProducts() {
    var tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    products.forEach(function (product, index) {
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
        var editIcon = document.createElement("i");
        editIcon.className = "fas fa-edit edit-icon";
        editIcon.style.cursor = "pointer";
        editIcon.onclick = function () { return editProduct(index); };
        var editCell = document.createElement("td");
        editCell.appendChild(editIcon);
        row.appendChild(editCell);
        var deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-trash delete-icon";
        deleteIcon.style.cursor = "pointer";
        deleteIcon.onclick = function () { return deleteProduct(index); };
        var deleteCell = document.createElement("td");
        deleteCell.appendChild(deleteIcon);
        row.appendChild(deleteCell);
        tableBody.appendChild(row);
    });
}
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
        if (currentEditIndex === null) {
            products.push(newProduct);
        }
        else {
            products[currentEditIndex] = newProduct;
            currentEditIndex = null;
        }
        saveToLocalStorage();
        displayProducts();
        productNameInput.value = "";
        productQuantityInput.value = "";
        productPriceInput.value = "";
        document.getElementById("addProductButton").textContent = "Add Product";
    }
}
function editProduct(index) {
    var product = products[index];
    document.getElementById("productName").value = product.name;
    document.getElementById("productQuantity").value = product.quantity.toString();
    document.getElementById("productPrice").value = product.price.toString();
    currentEditIndex = index;
    document.getElementById("addProductButton").textContent = "Update Product";
}
function deleteProduct(index) {
    products.splice(index, 1);
    saveToLocalStorage();
    displayProducts();
}
function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}
function loadFromLocalStorage() {
    var storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    }
}
window.onload = function () {
    loadFromLocalStorage();
    displayProducts();
};
var addProductButton = document.getElementById("addProductButton");
addProductButton.addEventListener("click", addProduct);
