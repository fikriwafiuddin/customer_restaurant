
function filterMenu() {
    const input = document.getElementById('menuSearch');
    const filter = input.value.toLowerCase();
    console.log('Searching for: ', filter);  
    const menuItems = document.querySelectorAll('.menu-item');
    console.log('Menu items found: ', menuItems.length); 

    menuItems.forEach((item) => {
        const itemName = item.querySelector('h4').innerText.toLowerCase();
        console.log('Checking item: ', itemName); 
        if (itemName.includes(filter)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}



let cart = [];

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function openCheckout() {
    const checkoutList = document.getElementById('checkout-list');
    const checkoutTotal = document.getElementById('checkout-total');
    const payOptions = document.getElementById('pay-options');
    checkoutList.innerHTML = '';

    if (cart.length === 0) {
        checkoutList.textContent = "Masih kosong nih, pilih menu yuk!"; 
        checkoutTotal.textContent = '';
        payOptions.style.display = 'none';
    } else {
        payOptions.style.display = 'block';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} 
                <span>Rp. ${item.price.toLocaleString('id-ID')}</span>
                <input type="number" id="quantity-${index}" value="${item.amount}" min="0" onchange="updateQuantity(${index})" style="width: 40px; float: right;">
            `;
            checkoutList.appendChild(li);
            total += item.price * item.amount;
        });

        checkoutTotal.textContent = `Total: Rp. ${total.toLocaleString('id-ID')}`;
    }

    document.getElementById('checkout-page').style.display = 'block';
    updateCartItemCount(); 
}

function closeCheckout() {
    document.getElementById('checkout-page').style.display = 'none';
}

function openMenuModal(name, price, description, image) {
    document.getElementById('modal-name').textContent = name;
    document.getElementById('modal-price').textContent = price;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-image').src = image;
    document.getElementById('menu-modal').style.display = 'block';
}
fixed;
function closeMenuModal() {
    document.getElementById('menu-modal').style.display = 'none';
}

function addToCartFromModal() {
    const name = document.getElementById('modal-name').textContent;
    const price = parseInt(document.getElementById('modal-price').textContent.replace(/\D/g, ''));
    const quantity = parseInt(document.getElementById('menu-quantity').value);

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.amount += quantity; 
    } else {
        cart.push({ name, price, amount: quantity }); 
    }

    closeMenuModal();
    toggleCart();
}

function toggleCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} x${item.amount} - Rp. ${item.price.toLocaleString('id-ID')}
            <button onclick="updateCart(${index}, -1)">-</button>
            <button onclick="updateCart(${index}, 1)">+</button>
        `;
        cartList.appendChild(li);
        total += item.price * item.amount;
    });

    cartTotal.textContent = total.toLocaleString('id-ID');
    updateCartItemCount();  
}

function updateCart(index, delta) {
    const item = cart[index];
    item.amount += delta;

    if (item.amount <= 0) {
        cart.splice(index, 1);
    }

    toggleCart(); 
    openCheckout(); 
}

function updateQuantity(index) {
    const input = document.getElementById(`quantity-${index}`);
    const newAmount = parseInt(input.value);

    if (newAmount === 0) {
        const confirmation = confirm(`Are you sure you want to delete ${cart[index].name}?`);
        if (confirmation) {
            cart.splice(index, 1); 
        } else {
            input.value = 1;
        }
    } else if (newAmount > 0) {
        cart[index].amount = newAmount;
    } else {
        alert("Jumlah tidak valid!");
    }

    openCheckout(); 
    updateCartItemCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    toggleCart();
    openCheckout();
    updateCartItemCount();  
}

function increaseQuantity() {
    const quantityInput = document.getElementById('menu-quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('menu-quantity');
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

function updateCartItemCount() {
    const cashierButton = document.querySelector('.cashier');
    const qrButton = document.querySelector('.qr');
    
    if (cart.length > 0) {
        cashierButton.style.display = 'inline-block';
        qrButton.style.display = 'inline-block';
    } else {
        cashierButton.style.display = 'none';
        qrButton.style.display = 'none';
    }
}

function payWithQR() {
    const qris = document.getElementById('qris');
    qris.style.display = 'flex'; // Set display to 'flex'
    console.log(qris); // Log the element itself
};

function closeQris() {
    document.getElementById('qris').style.display = "none"
}

function payWithCash() {
    const qris = document.getElementById('cash');
    qris.style.display = 'flex'; // Set display to 'flex'
    console.log(qris); // Log the element itself
};

function closeCash() {
    document.getElementById('cash').style.display = "none"
}