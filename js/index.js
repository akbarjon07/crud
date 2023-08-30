const addBtn = document.querySelector(".hero-section__add-btn");
const elForm = document.querySelector(".form");
const elFormUpd = document.querySelector("#form-edit");
const main = document.querySelector(".main");

// INPUTS
const imgInput = document.querySelector(".image-input");
const titleInput = document.querySelector(".title-input");
const descriptionInput = document.querySelector(".desc-input");
const priceInput = document.querySelector(".price-input");

const imgInputUpd = document.querySelector(".image-input-update");
const titleInputUpd = document.querySelector(".title-input-update");
const descriptionInputUpd = document.querySelector(".desc-input-update");
const priceInputUpd = document.querySelector(".price-input-update");

const localData = JSON.parse(localStorage.getItem("data"));

let products = localData || [];

addBtn.addEventListener("click", () => {
    elForm.style.display = "block";
    main.style.filter = "blur(2px)";
});

function renderProduct(product, index) {
    const productItem = document.createElement("li");
    productItem.classList.add("hero-section__product-item");
    productItem.innerHTML = `
        <img class="hero-section__product-img" src="${product.image}" alt="img" width="100" height="200">
        <div class="hero-section__product-info mt-2">
            <h3 class="hero-section__product-title">${product.title}</h3>
            <p class="hero-section__product-desc">${product.desc}</p>
            <p class="hero-section__product-price">${product.price}</p>
        </div>
        <div class="d-flex align-items-center">
            <button class="btn btn-danger w-50" onClick="removeProduct(${index})">Delete</button>
            <button class="btn btn-primary w-50 ms-3" onclick="editProduct(${index})">Edit</button>
        </div>
    `;
    return productItem;
}

function showData() {
    const elList = document.querySelector(".hero-section__product-list");
    elList.innerHTML = "";
    products.forEach((product, index) => {
        const productItem = renderProduct(product, index);
        elList.appendChild(productItem);
    });
}

showData();

function addProduct() {
    const newProduct = {title: titleInput.value, desc: descriptionInput.value, price: priceInput.value, image: imgInput.value};
    products.push(newProduct);
    console.log(products);
    localStorage.setItem("data", JSON.stringify(products));
    showData();
}

function removeProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(products));
    showData();
}

elForm.addEventListener("submit", e => {
    e.preventDefault();
    addProduct();
    elForm.style.display = "none";
    main.style.filter = "blur(0)";
    titleInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";
    imgInput.value = "";
});



function editProduct(index) {

    const product = products[index];
    console.log(product.title);
    titleInputUpd.value = product.title;
    descriptionInputUpd.value = product.desc;
    priceInputUpd.value = product.price;
    elFormUpd.style.display = "block";
    main.style.filter = "blur(2px)";
    const updateButton = document.querySelector("#update-button");
    updateButton.addEventListener("click", () => {
        updateProduct(index);
    });
}

function updateProduct(index) {

    const updatedProduct = {
        title: titleInputUpd.value,
        desc: descriptionInputUpd.value,
        price: priceInputUpd.value,
        image: imgInputUpd.value
    };

    products[index] = updatedProduct;
    localStorage.setItem("data", JSON.stringify(products));
    showData();
    clearUpdateInputs();
    elFormUpd.style.display = "none";
    main.style.filter = "blur(0)";
}

function clearUpdateInputs() {
    imgInputUpd.value = "";
    titleInputUpd.value = "";
    descriptionInputUpd.value = "";
    priceInputUpd.value = "";
}