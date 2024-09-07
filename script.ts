interface Product {
  name: string;
  quantity: number;
  price: number;
}

const products: Product[] = [
  { name: "Laptop", quantity: 10, price: 70000 },
  { name: "Smartphone", quantity: 20, price: 50000 },
  { name: "Headphones", quantity: 50, price: 3000 },
];

function displayProducts() {
  const tableBody = document.querySelector("tbody") as HTMLTableSectionElement;

  products.forEach((product) => {
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

    tableBody.appendChild(row);
  });
}

displayProducts();

function addProduct() {
  const productNameInput = document.getElementById(
    "productName"
  ) as HTMLInputElement;
  const productQuantityInput = document.getElementById(
    "productQuantity"
  ) as HTMLInputElement;
  const productPriceInput = document.getElementById(
    "productPrice"
  ) as HTMLInputElement;

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
    products.push(newProduct);
  }

  const tableBody = document.querySelector("tbody") as HTMLTableSectionElement;
  tableBody.innerHTML = "";
  displayProducts();

  productNameInput.value = "";
  productQuantityInput.value = "";
  productPriceInput.value = "";
}

const addProductButton = document.getElementById(
  "addProductButton"
) as HTMLButtonElement;
addProductButton.addEventListener("click", addProduct);
