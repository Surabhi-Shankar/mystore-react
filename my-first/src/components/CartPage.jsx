import './CartPage.css';

const CartPage = ({ cartItems, updateQuantity, removeFromCart, clearCart }) => {
const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const shipping = cartItems.length > 0 ? 5.00 : 0;
const taxRate = 0.08;
const tax = subtotal * taxRate;
const total = subtotal + shipping + tax;

return (
<div className="cart-container">
    <h1 className="cart-header">Your Shopping Cart</h1>

    {cartItems.length === 0 ? (
    <p className="empty-cart-message">Your cart is empty. Go add some awesome products!</p>
    ) : (
    <>
        <ul className="cart-items">
        {cartItems.map(item => (
            <li key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div className="cart-item-quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                    updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
                    }
                    min="1"
                />
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
            </div>
            <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => removeFromCart(item.id)} className="remove-item-button">
                Remove
            </button>
            </li>
        ))}
        </ul>

        <div className="cart-summary">
        <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="summary-row">
            <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
            <span>${tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
        </div>
        </div>

        <div className="cart-actions">
        <button onClick={clearCart} className="clear-cart-button">
            Clear Cart
        </button>
        <button
            className="checkout-button"
            disabled={cartItems.length === 0}
            title={cartItems.length === 0 ? 'Add items to cart first' : 'Proceed to Checkout'}
        >
            Proceed to Checkout
        </button>
        </div>
    </>
    )}
</div>
);
};

export default CartPage;
