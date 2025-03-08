class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    getItems() {
        return this.items;
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
}

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

const cart = new ShoppingCart();

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { id: 1, name: 'PRODUCT NAME 1', image: '1.PNG', price: 120000 },
    { id: 2, name: 'PRODUCT NAME 2', image: '2.PNG', price: 120000 },
    { id: 3, name: 'PRODUCT NAME 3', image: '3.PNG', price: 220000 },
    { id: 4, name: 'PRODUCT NAME 4', image: '4.PNG', price: 123000 },
    { id: 5, name: 'PRODUCT NAME 5', image: '5.PNG', price: 320000 },
    { id: 6, name: 'PRODUCT NAME 6', image: '6.PNG', price: 120000 }
];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCart(key) {
    const product = { ...products[key], quantity: 1 };
    cart.addItem(product);
    reloadCart();
}

function reloadCart() {
    listCard.innerHTML = '';
    const items = cart.getItems();
    let count = items.reduce((acc, item) => acc + item.quantity, 0);
    let totalPrice = cart.getTotalPrice();

    items.forEach((value, key) => {
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, newQuantity) {
    const items = cart.getItems();
    if (newQuantity == 0) {
        cart.removeItem(items[key]);
    } else {
        items[key].quantity = newQuantity;
        items[key].price = newQuantity * products[key].price;
    }
    reloadCart();
}
