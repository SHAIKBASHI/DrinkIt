import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaTags,
  FaShoppingBag,
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaSignOutAlt,
  FaChartLine,
  FaBars,
  FaSearch,
  FaChevronDown
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/adminDashboard.css";

const API_BASE =
  `${import.meta.env.VITE_API_URL}/api`;

function AdminDashboard() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [searchProduct, setSearchProduct] =
    useState("");

  const [searchCategory, setSearchCategory] =
    useState("");

  const [showProductModal, setShowProductModal] =
    useState(false);

  const [showCategoryModal, setShowCategoryModal] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [editingCategory, setEditingCategory] =
    useState(null);

  const [productForm, setProductForm] =
    useState({
      name: "",
      description: "",
      category: "",
      volume: "",
      price: "",
      stock: "",
      image: "",
      rating: "",
      offer: "",
      available: true,
      trending: false,
      recommended: false
    });

  const [categoryForm, setCategoryForm] =
    useState({
      name: "",
      image: ""
    });


  // ==========================================
  // ADMIN CHECK
  // ==========================================

  useEffect(() => {

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (user.role !== "ADMIN") {
      navigate("/home", { replace: true });
    }

  }, [user, navigate]);


  // ==========================================
  // TOKEN
  // ==========================================

  const getHeaders = () => {

    const token =
      localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
  };


  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {

    if (!user || user.role !== "ADMIN") {
      return;
    }

    loadProducts();
    loadCategories();
    loadOrders();

  }, [user]);


  // ==========================================
  // PRODUCTS
  // ==========================================

  const loadProducts = async () => {

    try {

      const response =
        await fetch(
          `${API_BASE}/products`,
          {
            headers: getHeaders()
          }
        );

      if (!response.ok) {
        throw new Error("Unable to load products");
      }

      const data =
        await response.json();

      setProducts(data);

    } catch (error) {

      console.error(
        "Product loading error:",
        error
      );

    }

  };


  // ==========================================
  // CATEGORIES
  // ==========================================

  const loadCategories = async () => {

    try {

      const response =
        await fetch(
          `${API_BASE}/categories`
        );

      if (!response.ok) {
        throw new Error(
          "Unable to load categories"
        );
      }

      const data =
        await response.json();

      setCategories(data);

    } catch (error) {

      console.error(
        "Category loading error:",
        error
      );

    }

  };


  // ==========================================
  // ORDERS
  // ==========================================

  const loadOrders = async () => {

    try {

      const response =
        await fetch(
          `${API_BASE}/orders`,
          {
            headers: getHeaders()
          }
        );

      if (!response.ok) {
        throw new Error(
          "Unable to load orders"
        );
      }

      const data =
        await response.json();

      setOrders(data);

    } catch (error) {

      console.error(
        "Order loading error:",
        error
      );

    }

  };


  // ==========================================
  // PRODUCT FORM
  // ==========================================

  // ==========================================
  // IMAGE SELECTION FROM SYSTEM
  // ==========================================

  const handleImageSelect = (e, formType = "product") => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (formType === "product") {
        setProductForm((previous) => ({
          ...previous,
          image: reader.result
        }));
      } else {
        setCategoryForm((previous) => ({
          ...previous,
          image: reader.result
        }));
      }
    };

    reader.readAsDataURL(file);
  };

  const handleProductChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setProductForm({
      ...productForm,
      [name]:
        type === "checkbox"
          ? checked
          : value
    });

  };


  // ==========================================
  // OPEN ADD PRODUCT
  // ==========================================

  const openAddProduct = () => {

    setEditingProduct(null);

    setProductForm({
      name: "",
      description: "",
      category: "",
      volume: "",
      price: "",
      stock: "",
      image: "",
      rating: "",
      offer: "",
      available: true,
      trending: false,
      recommended: false
    });

    setShowProductModal(true);

  };


  // ==========================================
  // OPEN EDIT PRODUCT
  // ==========================================

  const openEditProduct = (product) => {

    setEditingProduct(product);

    setProductForm({
      name: product.name || "",
      description: product.description || "",
      category: product.category || "",
      volume: product.volume || "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      image: product.image || "",
      rating: product.rating ?? "",
      offer: product.offer || "",
      available:
        product.available ?? true,
      trending:
        product.trending ?? false,
      recommended:
        product.recommended ?? false
    });

    setShowProductModal(true);

  };


  // ==========================================
  // SAVE PRODUCT
  // ==========================================

  const saveProduct = async (e) => {

    e.preventDefault();

    if (!productForm.name.trim()) {
      alert("Product name is required.");
      return;
    }

    if (!productForm.category.trim()) {
      alert("Category is required.");
      return;
    }

    if (
      productForm.price === "" ||
      Number(productForm.price) < 0
    ) {
      alert("Enter a valid price.");
      return;
    }

    if (
      productForm.stock === "" ||
      Number(productForm.stock) < 0
    ) {
      alert("Enter a valid stock.");
      return;
    }


    const data = {
  name: productForm.name,
  description: productForm.description,
  category: productForm.category,
  volume: productForm.volume,
  price: Number(productForm.price),
  stock: Number(productForm.stock),
  image: productForm.image,

  rating: productForm.rating === ""
    ? 0
    : Number(productForm.rating),

  offer: productForm.offer,

  available: productForm.available,

  // ADD THESE TWO
  trending: productForm.trending,
  recommended: productForm.recommended
};


    try {

      setLoading(true);

      const url =
        editingProduct
          ? `${API_BASE}/products/${editingProduct.id}`
          : `${API_BASE}/products`;

      const method =
        editingProduct
          ? "PUT"
          : "POST";


      const response =
        await fetch(
          url,
          {
            method,
            headers: getHeaders(),
            body: JSON.stringify(data)
          }
        );


      if (!response.ok) {

        const message =
          await response.text();

        throw new Error(
          message ||
          "Unable to save product"
        );

      }


      await loadProducts();

      setShowProductModal(false);

      setEditingProduct(null);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to save product."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const deleteProduct = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      const response =
        await fetch(
          `${API_BASE}/products/${id}`,
          {
            method: "DELETE",
            headers: getHeaders()
          }
        );


      if (!response.ok) {
        throw new Error(
          "Unable to delete product"
        );
      }


      setProducts(
        products.filter(
          (product) =>
            product.id !== id
        )
      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to delete product."
      );

    }

  };


  // ==========================================
  // CATEGORY FORM
  // ==========================================

  const handleCategoryChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setCategoryForm({
      ...categoryForm,
      [name]: value
    });

  };


  // ==========================================
  // OPEN ADD CATEGORY
  // ==========================================

  const openAddCategory = () => {

    setEditingCategory(null);

    setCategoryForm({
      name: "",
      image: ""
    });

    setShowCategoryModal(true);

  };


  // ==========================================
  // OPEN EDIT CATEGORY
  // ==========================================

  const openEditCategory = (category) => {

    setEditingCategory(category);

    setCategoryForm({
      name: category.name || "",
      image: category.image || ""
    });

    setShowCategoryModal(true);

  };


  // ==========================================
  // SAVE CATEGORY
  // ==========================================

  const saveCategory = async (e) => {

    e.preventDefault();

    if (!categoryForm.name.trim()) {

      alert(
        "Category name is required."
      );

      return;
    }


    try {

      setLoading(true);


      const url =
        editingCategory
          ? `${API_BASE}/categories/${editingCategory.id}`
          : `${API_BASE}/categories`;


      const method =
        editingCategory
          ? "PUT"
          : "POST";


      const response =
        await fetch(
          url,
          {
            method,
            headers: getHeaders(),
            body:
              JSON.stringify({
                name:
                  categoryForm.name,
                image:
                  categoryForm.image
              })
          }
        );


      if (!response.ok) {

        const message =
          await response.text();

        throw new Error(
          message ||
          "Unable to save category"
        );

      }


      await loadCategories();

      setShowCategoryModal(false);

      setEditingCategory(null);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to save category."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // DELETE CATEGORY
  // ==========================================

  const deleteCategory = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this category?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      const response =
        await fetch(
          `${API_BASE}/categories/${id}`,
          {
            method: "DELETE",
            headers: getHeaders()
          }
        );


      if (!response.ok) {
        throw new Error(
          "Unable to delete category"
        );
      }


      setCategories(
        categories.filter(
          (category) =>
            category.id !== id
        )
      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to delete category."
      );

    }

  };


  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const updateOrderStatus =
    async (
      orderId,
      status
    ) => {

      try {

        const response =
          await fetch(
            `${API_BASE}/orders/status/${orderId}/${status}`,
            {
              method: "PUT",
              headers: getHeaders()
            }
          );


        if (!response.ok) {
          throw new Error(
            "Unable to update order"
          );
        }


        const updatedOrder =
          await response.json();


        setOrders(
          orders.map(
            (order) =>
              order.id === orderId
                ? updatedOrder
                : order
          )
        );

      } catch (error) {

        console.error(error);

        alert(
          "Unable to update order status."
        );

      }

    };


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    logout();

    navigate(
      "/login",
      { replace: true }
    );

  };


  // ==========================================
  // FILTERED DATA
  // ==========================================

  const filteredProducts =
    products.filter(
      (product) =>
        product.name
          ?.toLowerCase()
          .includes(
            searchProduct.toLowerCase()
          )
    );


  const filteredCategories =
    categories.filter(
      (category) =>
        category.name
          ?.toLowerCase()
          .includes(
            searchCategory.toLowerCase()
          )
    );


  // ==========================================
  // STATS
  // ==========================================

  const totalProducts =
    products.length;

  const totalCategories =
    categories.length;

  const totalOrders =
    orders.length;

  const availableProducts =
    products.filter(
      (product) =>
        product.available === true
    ).length;


  // ==========================================
  // SIDEBAR NAVIGATION
  // ==========================================

  const changeSection = (section) => {

    setActiveSection(section);

    setMobileMenu(false);

  };


  if (
    !user ||
    user.role !== "ADMIN"
  ) {

    return null;

  }


  return (

    <div className="admin-layout">


      {/* =====================================
          MOBILE TOP BAR
      ====================================== */}

      <div className="admin-mobile-header">

        <button
          className="admin-mobile-menu-btn"
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
        >
          <FaBars />
        </button>

        <div className="admin-mobile-logo">
          Drink<span>It</span>
        </div>

        <div className="admin-mobile-user">
          {user.fullName?.charAt(0)}
        </div>

      </div>


      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`admin-sidebar ${
          mobileMenu
            ? "admin-sidebar-open"
            : ""
        }`}
      >

        <div className="admin-brand">

          <div className="admin-brand-logo">
            Drink<span>It</span>
          </div>

          <p>Admin Panel</p>

        </div>


        <div className="admin-user-card">

          <div className="admin-user-avatar">

            {user.fullName
              ?.charAt(0)
              .toUpperCase()}

          </div>

          <div>

            <strong>
              {user.fullName}
            </strong>

            <span>
              Administrator
            </span>

          </div>

        </div>


        <nav className="admin-nav">

          <button
            className={
              activeSection === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              changeSection("dashboard")
            }
          >
            <FaChartLine />
            Dashboard
          </button>


          <button
            className={
              activeSection === "products"
                ? "active"
                : ""
            }
            onClick={() =>
              changeSection("products")
            }
          >
            <FaBoxOpen />
            Products
          </button>


          <button
            className={
              activeSection === "categories"
                ? "active"
                : ""
            }
            onClick={() =>
              changeSection("categories")
            }
          >
            <FaTags />
            Categories
          </button>


          <button
            className={
              activeSection === "orders"
                ? "active"
                : ""
            }
            onClick={() =>
              changeSection("orders")
            }
          >
            <FaShoppingBag />
            Orders
          </button>

        </nav>


        <div className="admin-sidebar-bottom">

          <button
            onClick={() =>
              navigate("/home")
            }
          >
            Back to Store
          </button>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>


      {/* =====================================
          OVERLAY MOBILE
      ====================================== */}

      {mobileMenu && (

        <div
          className="admin-sidebar-overlay"
          onClick={() =>
            setMobileMenu(false)
          }
        />

      )}


      {/* =====================================
          MAIN
      ====================================== */}

      <main className="admin-main">


        {/* ===================================
            TOP HEADER
        ==================================== */}

        <header className="admin-topbar">

          <div>

            <h1>

              {activeSection === "dashboard" &&
                "Dashboard"}

              {activeSection === "products" &&
                "Products"}

              {activeSection === "categories" &&
                "Categories"}

              {activeSection === "orders" &&
                "Orders"}

            </h1>

            <p>
              Manage your DrinkIt store
            </p>

          </div>


          <div className="admin-top-user">

            <div className="admin-top-avatar">

              {user.fullName
                ?.charAt(0)
                .toUpperCase()}

            </div>

            <div>

              <strong>
                {user.fullName}
              </strong>

              <span>
                Admin
              </span>

            </div>

          </div>

        </header>


        {/* ===================================
            DASHBOARD
        ==================================== */}

        {activeSection === "dashboard" && (

          <section className="admin-section">


            <div className="admin-welcome">

              <div>

                <span>
                  Welcome back
                </span>

                <h2>
                  {user.fullName}
                </h2>

                <p>
                  Here's what's happening
                  with your store today.
                </p>

              </div>

              <FaChartLine />

            </div>


            <div className="admin-stat-grid">


              <div className="admin-stat-card">

                <div className="stat-icon products-icon">
                  <FaBoxOpen />
                </div>

                <div>

                  <span>
                    Total Products
                  </span>

                  <strong>
                    {totalProducts}
                  </strong>

                </div>

              </div>


              <div className="admin-stat-card">

                <div className="stat-icon categories-icon">
                  <FaTags />
                </div>

                <div>

                  <span>
                    Categories
                  </span>

                  <strong>
                    {totalCategories}
                  </strong>

                </div>

              </div>


              <div className="admin-stat-card">

                <div className="stat-icon orders-icon">
                  <FaShoppingBag />
                </div>

                <div>

                  <span>
                    Total Orders
                  </span>

                  <strong>
                    {totalOrders}
                  </strong>

                </div>

              </div>


              <div className="admin-stat-card">

                <div className="stat-icon available-icon">
                  <FaUsers />
                </div>

                <div>

                  <span>
                    Available Products
                  </span>

                  <strong>
                    {availableProducts}
                  </strong>

                </div>

              </div>

            </div>


            <div className="admin-dashboard-grid">


              <div className="admin-panel-card">

                <div className="panel-header">

                  <div>

                    <h3>
                      Recent Products
                    </h3>

                    <p>
                      Recently available
                      products
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      changeSection(
                        "products"
                      )
                    }
                  >
                    View All
                  </button>

                </div>


                <div className="mini-list">

                  {products
                    .slice(0, 5)
                    .map(
                      (product) => (

                        <div
                          className="mini-item"
                          key={product.id}
                        >

                          <div className="mini-image">

                            {product.image ? (

                              <img
                                src={
                                  product.image
                                }
                                alt={
                                  product.name
                                }
                              />

                            ) : (

                              <FaBoxOpen />

                            )}

                          </div>

                          <div>

                            <strong>
                              {product.name}
                            </strong>

                            <span>
                              ₹{product.price}
                            </span>

                          </div>

                        </div>

                      )
                    )}

                  {products.length === 0 && (

                    <p className="empty-text">
                      No products available.
                    </p>

                  )}

                </div>

              </div>


              <div className="admin-panel-card">

                <div className="panel-header">

                  <div>

                    <h3>
                      Categories
                    </h3>

                    <p>
                      Store categories
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      changeSection(
                        "categories"
                      )
                    }
                  >
                    Manage
                  </button>

                </div>


                <div className="category-mini-grid">

                  {categories
                    .slice(0, 6)
                    .map(
                      (category) => (

                        <div
                          className="category-mini"
                          key={category.id}
                        >

                          {category.image ? (

                            <img
                              src={
                                category.image
                              }
                              alt={
                                category.name
                              }
                            />

                          ) : (

                            <FaTags />

                          )}

                          <span>
                            {category.name}
                          </span>

                        </div>

                      )
                    )}

                </div>

              </div>

            </div>

          </section>

        )}


        {/* ===================================
            PRODUCTS
        ==================================== */}

        {activeSection === "products" && (

          <section className="admin-section">


            <div className="section-toolbar">

              <div className="search-box">

                <FaSearch />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchProduct}
                  onChange={(e) =>
                    setSearchProduct(
                      e.target.value
                    )
                  }
                />

              </div>


              <button
                className="primary-admin-btn"
                onClick={openAddProduct}
              >

                <FaPlus />

                Add Product

              </button>

            </div>


            <div className="admin-table-card">

              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>

                      <th>Product</th>

                      <th>Category</th>

                      <th>Price</th>

                      <th>Stock</th>

                      <th>Status</th>

                      <th>Actions</th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredProducts.map(
                      (product) => (

                        <tr
                          key={product.id}
                        >

                          <td>

                            <div className="table-product">

                              <div className="table-product-image">

                                {product.image ? (

                                  <img
                                    src={
                                      product.image
                                    }
                                    alt={
                                      product.name
                                    }
                                  />

                                ) : (

                                  <FaBoxOpen />

                                )}

                              </div>

                              <div>

                                <strong>
                                  {product.name}
                                </strong>

                                <span>
                                  {product.volume ||
                                    "—"}
                                </span>

                              </div>

                            </div>

                          </td>


                          <td>
                            {product.category}
                          </td>


                          <td>
                            ₹{product.price}
                          </td>


                          <td>
                            {product.stock}
                          </td>


                          <td>

                            <span
                              className={`status-badge ${
                                product.available
                                  ? "status-active"
                                  : "status-inactive"
                              }`}
                            >

                              {product.available
                                ? "Available"
                                : "Unavailable"}

                            </span>

                          </td>


                          <td>

                            <div className="action-buttons">

                              <button
                                className="edit-btn"
                                onClick={() =>
                                  openEditProduct(
                                    product
                                  )
                                }
                              >
                                <FaEdit />
                              </button>

                              <button
                                className="delete-btn"
                                onClick={() =>
                                  deleteProduct(
                                    product.id
                                  )
                                }
                              >
                                <FaTrash />
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>


                {filteredProducts.length === 0 && (

                  <div className="table-empty">

                    <FaBoxOpen />

                    <h3>
                      No products found
                    </h3>

                    <p>
                      Add your first product
                      to the store.
                    </p>

                  </div>

                )}

              </div>

            </div>

          </section>

        )}


        {/* ===================================
            CATEGORIES
        ==================================== */}

        {activeSection === "categories" && (

          <section className="admin-section">


            <div className="section-toolbar">

              <div className="search-box">

                <FaSearch />

                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchCategory}
                  onChange={(e) =>
                    setSearchCategory(
                      e.target.value
                    )
                  }
                />

              </div>


              <button
                className="primary-admin-btn"
                onClick={openAddCategory}
              >

                <FaPlus />

                Add Category

              </button>

            </div>


            <div className="category-admin-grid">

              {filteredCategories.map(
                (category) => (

                  <div
                    className="category-admin-card"
                    key={category.id}
                  >

                    <div className="category-admin-image">

                      {category.image ? (

                        <img
                          src={
                            category.image
                          }
                          alt={
                            category.name
                          }
                        />

                      ) : (

                        <FaTags />

                      )}

                    </div>


                    <div className="category-admin-content">

                      <h3>
                        {category.name}
                      </h3>

                      <span>
                        Category #{category.id}
                      </span>

                    </div>


                    <div className="category-actions">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          openEditCategory(
                            category
                          )
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteCategory(
                            category.id
                          )
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>


            {filteredCategories.length === 0 && (

              <div className="table-empty">

                <FaTags />

                <h3>
                  No categories found
                </h3>

                <p>
                  Add a category to
                  organize your products.
                </p>

              </div>

            )}

          </section>

        )}


        {/* ===================================
            ORDERS
        ==================================== */}

        {activeSection === "orders" && (

          <section className="admin-section">


            <div className="order-summary-row">

              <div>
                <span>
                  Total Orders
                </span>

                <strong>
                  {orders.length}
                </strong>
              </div>

              <div>
                <span>
                  Placed
                </span>

                <strong>
                  {
                    orders.filter(
                      (o) =>
                        o.status ===
                        "PLACED"
                    ).length
                  }
                </strong>
              </div>

              <div>
                <span>
                  Delivered
                </span>

                <strong>
                  {
                    orders.filter(
                      (o) =>
                        o.status ===
                        "DELIVERED"
                    ).length
                  }
                </strong>
              </div>

            </div>


            <div className="admin-table-card">

              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>

                      <th>Order ID</th>

                      <th>User ID</th>

                      <th>Address ID</th>

                      <th>Total</th>

                      <th>Date</th>

                      <th>Status</th>

                    </tr>

                  </thead>


                  <tbody>

                    {orders.map(
                      (order) => (

                        <tr
                          key={order.id}
                        >

                          <td>
                            <strong>
                              #{order.id}
                            </strong>
                          </td>

                          <td>
                            {order.userId}
                          </td>

                          <td>
                            {order.addressId}
                          </td>

                          <td>
                            ₹{order.totalAmount}
                          </td>

                          <td>
                            {order.orderDate
                              ? new Date(
                                  order.orderDate
                                ).toLocaleString()
                              : "—"}
                          </td>

                          <td>

                            <div className="status-select-wrapper">

                              <select
                                value={
                                  order.status ||
                                  "PLACED"
                                }
                                onChange={(e) =>
                                  updateOrderStatus(
                                    order.id,
                                    e.target.value
                                  )
                                }
                              >

                                <option value="PLACED">
                                  PLACED
                                </option>

                                <option value="CONFIRMED">
                                  CONFIRMED
                                </option>

                                <option value="OUT_FOR_DELIVERY">
                                  OUT FOR DELIVERY
                                </option>

                                <option value="DELIVERED">
                                  DELIVERED
                                </option>

                                <option value="CANCELLED">
                                  CANCELLED
                                </option>

                              </select>

                              <FaChevronDown />

                            </div>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>


                {orders.length === 0 && (

                  <div className="table-empty">

                    <FaShoppingBag />

                    <h3>
                      No orders yet
                    </h3>

                    <p>
                      Customer orders will
                      appear here.
                    </p>

                  </div>

                )}

              </div>

            </div>

          </section>

        )}

      </main>


      {/* =====================================
          PRODUCT MODAL
      ====================================== */}

      {showProductModal && (

        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <p>
                  Enter the product details
                  below.
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setShowProductModal(false)
                }
              >
                <FaTimes />
              </button>

            </div>


            <form
              onSubmit={saveProduct}
              className="admin-form"
            >

              <div className="form-grid">


                <div className="form-group full">

                  <label>
                    Product Name *
                  </label>

                  <input
                    name="name"
                    value={
                      productForm.name
                    }
                    onChange={
                      handleProductChange
                    }
                    placeholder="Example: Kingfisher Premium"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Category *
                  </label>

                  <select
                    name="category"
                    value={
                      productForm.category
                    }
                    onChange={
                      handleProductChange
                    }
                  >

                    <option value="">
                      Select Category
                    </option>

                    {categories.map(
                      (category) => (

                        <option
                          key={category.id}
                          value={
                            category.name
                          }
                        >
                          {category.name}
                        </option>

                      )
                    )}

                  </select>

                </div>


                <div className="form-group">

                  <label>
                    Volume
                  </label>

                  <input
                    name="volume"
                    value={
                      productForm.volume
                    }
                    onChange={
                      handleProductChange
                    }
                    placeholder="650ml"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Price *
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="price"
                    value={
                      productForm.price
                    }
                    onChange={
                      handleProductChange
                    }
                    placeholder="₹"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Stock *
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="stock"
                    value={
                      productForm.stock
                    }
                    onChange={
                      handleProductChange
                    }
                    placeholder="0"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Rating
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    name="rating"
                    value={
                      productForm.rating
                    }
                    onChange={
                      handleProductChange
                    }
                    placeholder="4.5"
                  />

                </div>


                <div className="form-group">

                  <label>
                    Offer
                  </label>

                  <input
                    name="offer"
                    value={
                      productForm.offer
                    }
                    onChange={
                      handleProductChange
                    }
                    placeholder="20% OFF"
                  />

                </div>


                <div className="form-group full">

                  <label>
                    Product Image
                  </label>

                  <div className="admin-image-upload">

                    <label className="image-upload-box">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageSelect(e, "product")
                        }
                      />

                      <FaPlus />
                      <span>Select Image From Computer</span>
                      <small>PNG, JPG, JPEG or WEBP</small>
                    </label>

                    {productForm.image && (
                      <div className="image-preview-box">
                        <img
                          src={productForm.image}
                          alt="Product preview"
                        />
                        <span>Selected image</span>
                      </div>
                    )}

                  </div>

                </div>


                <div className="form-group full">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      productForm.description
                    }
                    onChange={
                      handleProductChange
                    }
                    rows="4"
                    placeholder="Product description..."
                  />

                </div>


                <label className="checkbox-field">

                  <input
                    type="checkbox"
                    name="available"
                    checked={
                      productForm.available
                    }
                    onChange={
                      handleProductChange
                    }
                  />

                  <span>
                    Product is available
                  </span>

                </label>


                <label className="checkbox-field">

                  <input
                    type="checkbox"
                    name="trending"
                    checked={
                      productForm.trending
                    }
                    onChange={
                      handleProductChange
                    }
                  />

                  <span>
                    🔥 Show in Trending Products
                  </span>

                </label>


                <label className="checkbox-field">

                  <input
                    type="checkbox"
                    name="recommended"
                    checked={
                      productForm.recommended
                    }
                    onChange={
                      handleProductChange
                    }
                  />

                  <span>
                    ⭐ Show in Recommended Products
                  </span>

                </label>

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-admin-btn"
                  onClick={() =>
                    setShowProductModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-admin-btn"
                  disabled={loading}
                >

                  <FaSave />

                  {loading
                    ? "Saving..."
                    : editingProduct
                    ? "Update Product"
                    : "Save Product"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =====================================
          CATEGORY MODAL
      ====================================== */}

      {showCategoryModal && (

        <div className="admin-modal-overlay">

          <div className="admin-modal small-modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p>
                  Manage your store category.
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setShowCategoryModal(false)
                }
              >
                <FaTimes />
              </button>

            </div>


            <form
              onSubmit={saveCategory}
              className="admin-form"
            >

              <div className="form-group">

                <label>
                  Category Name *
                </label>

                <input
                  name="name"
                  value={
                    categoryForm.name
                  }
                  onChange={
                    handleCategoryChange
                  }
                  placeholder="Example: Beer"
                />

              </div>


              <div className="form-group">

                <label>
                  Category Image
                </label>

                <div className="admin-image-upload">

                  <label className="image-upload-box">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageSelect(e, "category")
                      }
                    />

                    <FaPlus />
                    <span>Select Image From Computer</span>
                    <small>PNG, JPG, JPEG or WEBP</small>
                  </label>

                  {categoryForm.image && (
                    <div className="image-preview-box">
                      <img
                        src={categoryForm.image}
                        alt="Category preview"
                      />
                      <span>Selected image</span>
                    </div>
                  )}

                </div>

              </div>


              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-admin-btn"
                  onClick={() =>
                    setShowCategoryModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-admin-btn"
                  disabled={loading}
                >

                  <FaSave />

                  {loading
                    ? "Saving..."
                    : editingCategory
                    ? "Update Category"
                    : "Save Category"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}

export default AdminDashboard;