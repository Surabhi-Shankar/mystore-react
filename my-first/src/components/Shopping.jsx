import { useEffect, useState } from "react";
import './shopping.css';

const mainMenu = [
    { name: "All", categories: [] },
    { name: "Men", categories: ["mens-shirts", "mens-shoes", "mens-watches"] },
    { name: "Women", categories: ["womens-dresses", "womens-shoes", "womens-watches", "tops"] },
    { name: "Makeup", categories: ["fragrances", "skincare"] },
    { name: "Accessories", categories: ["sunglasses", "womens-bags", "womens-jewellery"] },
    { name: "Tech", categories: ["smartphones", "laptops"] },
    { name: "Home", categories: ["home-decoration", "furniture", "lighting"] },
];

const ITEMS_PER_PAGE = 12;

const Shopping = ({ addToCart }) => {
    const [apiData, setApiData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMenu, setSelectedMenu] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://dummyjson.com/products?limit=200")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setApiData(data.products);
                const allCategories = [...new Set(data.products.map(item => item.category))];
                setCategories(allCategories);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedMenu, selectedCategory, sortOrder]);

    let filteredData = apiData
        .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(item => {
            const menu = mainMenu.find(m => m.name === selectedMenu);
            return selectedMenu === "All" || (menu && menu.categories.includes(item.category));
        })
        .filter(item => selectedCategory === "All" || item.category === selectedCategory);

    if (sortOrder === "asc") filteredData.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") filteredData.sort((a, b) => b.price - a.price);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    if (isLoading) return <div className="status-msg">Loading products...</div>;
    if (error) return <div className="status-msg error">Error: {error}</div>;

    return (
        <div className="shopping-container">
            <h1>Our Products</h1>

            <div className="filters">
                <div className="menu-bar">
                    {mainMenu.map(menu => (
                        <button
                            key={menu.name}
                            onClick={() => {
                                setSelectedMenu(menu.name);
                                setSelectedCategory("All");
                            }}
                            className={`menu-button ${selectedMenu === menu.name ? "active" : ""}`}
                        >
                            {menu.name}
                        </button>
                    ))}
                </div>

                <input
                    className="search-input"
                    type="text"
                    value={searchTerm}
                    placeholder="Search products..."
                    onChange={e => setSearchTerm(e.target.value)}
                />

                <div className="category-bar">
                    <button
                        onClick={() => setSelectedCategory("All")}
                        className={`category-button ${selectedCategory === "All" ? "active" : ""}`}
                    >
                        All Categories
                    </button>
                    {mainMenu.find(m => m.name === selectedMenu)?.categories.length > 0 ?
                        mainMenu.find(m => m.name === selectedMenu).categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`category-button ${selectedCategory === cat ? "active" : ""}`}
                            >
                                {cat}
                            </button>
                        ))
                        :
                        selectedMenu === "All" && categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`category-button ${selectedCategory === cat ? "active" : ""}`}
                            >
                                {cat}
                            </button>
                        ))
                    }
                </div>

                <div className="sort-bar">
                    <label htmlFor="sort">Sort by price:</label>
                    <select
                        id="sort"
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value)}
                    >
                        <option value="">None</option>
                        <option value="asc">Low → High</option>
                        <option value="desc">High → Low</option>
                    </select>
                </div>
            </div>

            <div className="product-grid">
                {paginatedData.map(product => (
                    <div className="product-card card" key={product.id}>
                        <img src={product.thumbnail} alt={product.title} />
                        <div className="product-info">
                            <h2>{product.title}</h2>
                            <p className="text-muted">{product.category}</p>
                            <p className="description">{product.description}</p>
                            <p className="price">${product.price}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>

            {paginatedData.length === 0 && (
                <div className="status-msg">No products found.</div>
            )}

            {filteredData.length > ITEMS_PER_PAGE && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Shopping;