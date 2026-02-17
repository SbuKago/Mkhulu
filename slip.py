menu = [
    {
        "name": "Lamborghini Urus",
        "description": "Chips, lettuce, beef burger, Russian, cheese, cheese griller, bacon",
        "price": 70.00
    },
    {
        "name": "Rolls-Royce",
        "description": "Chips, lettuce, beef burger, Russian, cheese, cheese griller, bacon, rib burger",
        "price": 90.00
    },
    {
        "name": "Porsche",
        "description": "Chips, lettuce, beef burger, Russian, cheese",
        "price": 50.00
    },
    {
        "name": "Range Rover",
        "description": "Chips, lettuce, Russian, cheese, cheese griller",
        "price": 45.00
    },
    {
        "name": "Bugatti",
        "description": "Lettuce, chips, cheese, Russian, rib burger, cheese griller",
        "price": 75.00
    },
    {
        "name": "Mustang Shelby",
        "description": "Double beef burger, cheese, bacon, gherkins, tomato, lettuce",
        "price": 75.00
    },
    {
        "name": "POLO TSI",
        "description": "Kota chips, lettuce, cheese, Vienna",
        "price": 30.00
    },
    {
        "name": "V-CLASS Family Pack",
        "description": "Full chicken, Greek salad, medium chips",
        "price": 180.00
    },
    {
        "name": "Chicken Wrap (Maserati)",
        "description": "",
        "price": 50.00
    },
    {
        "name": "Chicken Schwarma (McLarren)",
        "description": "",
        "price": 50.00
    }
]

cart = []

def add_to_cart(item_name):
    for item in menu:
        if item["name"] == item_name:
            cart.append(item)
            print(f"{item_name} added to cart.")
            return
    print("Item not found.")

def view_cart():
    total = 0
    print("\nYour Cart:")
    for item in cart:
        print(f"{item['name']} - R{item['price']}")
        total += item["price"]
    print(f"Total: R{total}")
