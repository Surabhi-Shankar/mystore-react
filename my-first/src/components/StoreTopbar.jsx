import { Link } from 'react-router-dom';
import './StoreTopbar.css';

const StoreTopbar = ({ cartItemCount, showAddNotification }) => {
return (
<header className="topbar">
    <div className="logo">
    <Link to="/">MyStore</Link>
    </div>

    <nav className="nav-links">
    <Link to="/">Shop</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
    </nav>

    <div className="cart-icon-wrapper">
    <Link to="/cart" className="cart-icon" aria-label="View Cart">
        🛒
        {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>}
    </Link>
    </div>

    {showAddNotification && (
    <div className="add-notification">
        Item added to cart!
    </div>
    )}
</header>
);
};

export default StoreTopbar;
