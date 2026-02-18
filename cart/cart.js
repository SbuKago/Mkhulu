const menu = [
    // Spaykos
    {name:"Small Spaykos", price:15},
    {name:"Medium Spaykos", price:40},
    {name:"Large Spaykos", price:80},
    {name:"Mkhulu’s Spaykos", price:120},

    // Qwinyas
    {name:"Regular Qwinya Small", price:1},
    {name:"Regular Qwinya Small with Mince", price:3},
    {name:"Regular Qwinya Big", price:7},
    {name:"Regular Qwinya Big with Mince", price:10},

    // Grills
    {name:"Oxtail with Mash or Rice", price:160},
    {name:"Beef Stew with Samp or Pap", price:80},
    {name:"Chicken Fillet with Chips or Salad", price:80},
    {name:"Lamb Chop with Chips or Veg", price:120},
    {name:"Steak with Chips or Veg", price:120},
    {name:"400g Sparerib and Chips", price:120},
    {name:"1kg Sparerib and Chips", price:200},
    {name:"4 Buffalo Wings and Chips", price:110},
    {name:"8 Crumbed Wings and Chips", price:110},

    // Pizza
    {name:"Chicken Pizza (Medium)", price:70},
    {name:"Chicken Pizza (Large)", price:120},
    {name:"Salami Pizza (Medium)", price:70},
    {name:"Salami Pizza (Large)", price:120},
    {name:"Beef Pizza (Medium)", price:80},
    {name:"Beef Pizza (Large)", price:140},
    {name:"Vegetarian Pizza (Medium)", price:60},
    {name:"Vegetarian Pizza (Large)", price:100},
    {name:"Extra Cheese", price:15},

    // Burgers
    {name:"Fatcake Burger Prego", price:40},
    {name:"Fatcake Burger Rib", price:50},
    {name:"Fatcake Burger Beef", price:40},
    {name:"Mini Cooper", price:40},
    {name:"Range Rover", price:45},
    {name:"Porsche", price:50},
    {name:"Audi RS7", price:60},
    {name:"Lamborghini", price:70},
    {name:"Bugatti", price:75},
    {name:"Rolls Royce", price:90},

    // Healthy Eats
    {name:"Greek Salad", price:45},
    {name:"Chicken Salad", price:60},
    {name:"Mogodu with Samp or Pap", price:70},
    {name:"Manqina with Samp or Pap", price:60},
    {name:"Hard Body Chicken", price:70},
    {name:"Isibindi with Pap", price:60},

    // Hot Drinks
    {name:"Tea / Coffee", price:15},
    {name:"Mocha / Cappuccino / Hot Chocolate", price:20}
];

let cart = [];

const menuContainer = document.getElementById("menu");

menu.forEach(item => {
    menuContainer.innerHTML += `
        <div class="card">
            <h4>${item.name}</h4>
            <p>R ${item.price.toFixed(2)}</p>
            <button onclick="addToCart('${item.name}', ${item.price})">
                Add to Cart
            </button>
        </div>
    `;
});

function addToCart(name, price) {
    cart.push({name, price});
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <p>${item.name} - R ${item.price.toFixed(2)}
            <button onclick="removeItem(${index})">❌</button></p>
        `;
    });

    totalDisplay.textContent = total.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

function sendToWhatsApp() {
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    let message = "🛒 *Mkhulu's On Main Order*%0A%0A";
    let total = 0;

    cart.forEach(item => {
        message += `• ${item.name} - R ${item.price.toFixed(2)}%0A`;
        total += item.price;
    });

    message += `%0ATotal: R ${total.toFixed(2)}%0A`;
    message += "%0APlease confirm my order.";

    const phoneNumber = "27730222523"; // your whatsapp number

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}
