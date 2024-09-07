interface Product {
  name: string;
  quantity: number;
  price: number;
}

let products: Product[] = [
  { name: "Laptop", quantity: 10, price: 70000 },
  { name: "Smartphone", quantity: 20, price: 50000 },
  { name: "Headphones", quantity: 50, price: 3000 },
];

let currentEditIndex: number | null = null;

function displayProducts() {
  const tableBody = document.querySelector("tbody") as HTMLTableSectionElement;
  tableBody.innerHTML = "";

  products.forEach((product, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;
    row.appendChild(nameCell);

    const quantityCell = document.createElement("td");
    quantityCell.textContent = product.quantity.toString();
    row.appendChild(quantityCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = `PKR ${product.price.toFixed(2)}`;
    row.appendChild(priceCell);

    const editIcon = document.createElement("i");
    editIcon.className = "fas fa-edit edit-icon";
    editIcon.style.cursor = "pointer";
    editIcon.onclick = () => editProduct(index);

    const editCell = document.createElement("td");
    editCell.appendChild(editIcon);
    row.appendChild(editCell);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash delete-icon"; 
    deleteIcon.style.cursor = "pointer"; 
    deleteIcon.onclick = () => deleteProduct(index);

    const deleteCell = document.createElement("td");
    deleteCell.appendChild(deleteIcon);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  });
}

function addProduct() {
  const productNameInput = document.getElementById("productName") as HTMLInputElement;
  const productQuantityInput = document.getElementById("productQuantity") as HTMLInputElement;
  const productPriceInput = document.getElementById("productPrice") as HTMLInputElement;

  const name = productNameInput.value;
  const quantity = parseInt(productQuantityInput.value);
  const price = parseFloat(productPriceInput.value);

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
  } else if (name && quantity && price) {
    const newProduct: Product = { name, quantity, price };

    if (currentEditIndex === null) {
      products.push(newProduct);
    } else {
      products[currentEditIndex] = newProduct;
      currentEditIndex = null;
    }

    saveToLocalStorage();
    displayProducts();

    productNameInput.value = "";
    productQuantityInput.value = "";
    productPriceInput.value = "";
    (document.getElementById("addProductButton") as HTMLButtonElement).textContent = "Add Product";
  }
}

function editProduct(index: number) {
  const product = products[index];
  (document.getElementById("productName") as HTMLInputElement).value = product.name;
  (document.getElementById("productQuantity") as HTMLInputElement).value = product.quantity.toString();
  (document.getElementById("productPrice") as HTMLInputElement).value = product.price.toString();

  currentEditIndex = index;
  (document.getElementById("addProductButton") as HTMLButtonElement).textContent = "Update Product";
}

function deleteProduct(index: number) {
  products.splice(index, 1);
  saveToLocalStorage();
  displayProducts();
}

function saveToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

function loadFromLocalStorage() {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    products = JSON.parse(storedProducts);
  }
}

window.onload = function() {
  loadFromLocalStorage();
  displayProducts();
};

const addProductButton = document.getElementById("addProductButton") as HTMLButtonElement;
addProductButton.addEventListener("click", addProduct);
