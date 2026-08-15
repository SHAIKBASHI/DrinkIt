import React, {
  useEffect,
  useState
} from "react";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaFire,
  FaStar,
  FaImage,
  FaTimes
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import api from "../data/api";

import "../styles/adminProducts.css";


function AdminProducts() {

  const navigate = useNavigate();


  // =========================================
  // PRODUCTS
  // =========================================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);


  // =========================================
  // FORM
  // =========================================

  const [form, setForm] = useState({

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


  // =========================================
  // IMAGE UPLOAD LOADING
  // =========================================

  const [imageLoading, setImageLoading] =
    useState(false);


  // =========================================
  // LOAD PRODUCTS
  // =========================================

  const loadProducts = async () => {

    try {

      setLoading(true);


      const response =
        await api.get("/products");


      setProducts(
        Array.isArray(response.data)
          ? response.data
          : []
      );


    } catch (error) {

      console.error(
        "Error loading products:",
        error
      );


      if (
        error.response?.status === 403
      ) {

        alert(
          "You are not authorized. Admin access required."
        );

      } else {

        alert(
          "Unable to load products."
        );

      }


    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadProducts();

  }, []);


  // =========================================
  // HANDLE FORM CHANGE
  // =========================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;


    setForm((previousForm) => ({

      ...previousForm,

      [name]:
        type === "checkbox"
          ? checked
          : value

    }));

  };


  // =========================================
  // IMAGE UPLOAD
  // =========================================

  const handleImageChange = (e) => {

    const file =
      e.target.files?.[0];


    if (!file) {
      return;
    }


    // -----------------------------------------
    // FILE TYPE CHECK
    // -----------------------------------------

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp"
    ];


    if (
      !allowedTypes.includes(file.type)
    ) {

      alert(
        "Please select JPG, JPEG, PNG or WEBP image."
      );

      e.target.value = "";

      return;
    }


    // -----------------------------------------
    // FILE SIZE CHECK
    // -----------------------------------------

    const maxSize =
      2 * 1024 * 1024;


    if (file.size > maxSize) {

      alert(
        "Image must be smaller than 2 MB."
      );

      e.target.value = "";

      return;
    }


    // -----------------------------------------
    // CONVERT TO BASE64
    // -----------------------------------------

    setImageLoading(true);


    const reader =
      new FileReader();


    reader.onload = () => {

      setForm((previousForm) => ({

        ...previousForm,

        image: reader.result

      }));


      setImageLoading(false);

    };


    reader.onerror = () => {

      console.error(
        "Error reading image."
      );


      alert(
        "Unable to read image."
      );


      setImageLoading(false);

    };


    reader.readAsDataURL(file);

  };


  // =========================================
  // REMOVE IMAGE
  // =========================================

  const removeImage = () => {

    setForm((previousForm) => ({

      ...previousForm,

      image: ""

    }));

  };


  // =========================================
  // RESET FORM
  // =========================================

  const resetForm = () => {

    setForm({

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


    setEditingId(null);

    setImageLoading(false);


    // Reset file input
    const fileInput =
      document.getElementById(
        "product-image-input"
      );


    if (fileInput) {

      fileInput.value = "";

    }

  };


  // =========================================
  // ADD / UPDATE PRODUCT
  // =========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // -----------------------------------------
    // BASIC VALIDATION
    // -----------------------------------------

    if (!form.name.trim()) {

      alert(
        "Please enter product name."
      );

      return;
    }


    if (!form.category) {

      alert(
        "Please select a category."
      );

      return;
    }


    if (
      form.price === "" ||
      Number(form.price) < 0
    ) {

      alert(
        "Please enter a valid price."
      );

      return;
    }


    if (
      form.stock === "" ||
      Number(form.stock) < 0
    ) {

      alert(
        "Please enter valid stock."
      );

      return;
    }


    try {

      const productData = {

        name:
          form.name.trim(),

        description:
          form.description.trim(),

        category:
          form.category,

        volume:
          form.volume.trim(),

        price:
          Number(form.price),

        stock:
          Number(form.stock),

        image:
          form.image || null,

        rating:
          form.rating === ""
            ? 0
            : Number(form.rating),

        offer:
          form.offer.trim(),

        available:
          Boolean(form.available),

        trending:
          Boolean(form.trending),

        recommended:
          Boolean(form.recommended)

      };


      console.log(
        "Sending product:",
        productData
      );


      // =====================================
      // UPDATE PRODUCT
      // =====================================

      if (editingId) {

        await api.put(

          `/products/${editingId}`,

          productData

        );


        alert(
          "Product updated successfully."
        );

      }


      // =====================================
      // ADD PRODUCT
      // =====================================

      else {

        await api.post(

          "/products",

          productData

        );


        alert(
          "Product added successfully."
        );

      }


      // -----------------------------------------
      // RESET + RELOAD
      // -----------------------------------------

      resetForm();

      await loadProducts();


    } catch (error) {

      console.error(
        "Product save error:",
        error
      );


      console.error(
        "Server response:",
        error.response?.data
      );


      if (
        error.response?.status === 403
      ) {

        alert(
          "You are not authorized. Admin access required."
        );

      } else if (
        error.response?.status === 400
      ) {

        alert(
          "Invalid product data. Please check all fields."
        );

      } else {

        alert(
          "Unable to save product."
        );

      }

    }

  };


  // =========================================
  // EDIT PRODUCT
  // =========================================

  const handleEdit = (product) => {

    setEditingId(product.id);


    setForm({

      name:
        product.name || "",

      description:
        product.description || "",

      category:
        product.category || "",

      volume:
        product.volume || "",

      price:
        product.price ?? "",

      stock:
        product.stock ?? "",

      image:
        product.image || "",

      rating:
        product.rating ?? "",

      offer:
        product.offer || "",

      available:
        product.available ?? true,

      trending:
        product.trending ?? false,

      recommended:
        product.recommended ?? false

    });


    // Clear old file selection
    const fileInput =
      document.getElementById(
        "product-image-input"
      );


    if (fileInput) {

      fileInput.value = "";

    }


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  };


  // =========================================
  // DELETE PRODUCT
  // =========================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );


    if (!confirmed) {

      return;

    }


    try {

      await api.delete(
        `/products/${id}`
      );


      setProducts(
        (previousProducts) =>
          previousProducts.filter(
            (product) =>
              product.id !== id
          )
      );


      alert(
        "Product deleted successfully."
      );


      // If currently editing deleted product
      if (editingId === id) {

        resetForm();

      }


    } catch (error) {

      console.error(
        "Product delete error:",
        error
      );


      if (
        error.response?.status === 403
      ) {

        alert(
          "You are not authorized. Admin access required."
        );

      } else {

        alert(
          "Unable to delete product."
        );

      }

    }

  };


  // =========================================
  // RENDER
  // =========================================

  return (

    <div className="admin-products-page">

      <div className="admin-products-container">


        {/* =====================================
            HEADER
        ===================================== */}

        <div className="admin-products-header">

          <button
            className="admin-back-btn"
            onClick={() =>
              navigate("/admin")
            }
          >

            <FaArrowLeft />

            Admin Dashboard

          </button>


          <h1>
            Product Management
          </h1>


          <p>
            Add, edit and manage DrinkIt products.
          </p>

        </div>


        {/* =====================================
            PRODUCT FORM
        ===================================== */}

        <div className="product-form-card">

          <div className="form-title">

            <FaPlus />

            <h2>

              {editingId
                ? "Edit Product"
                : "Add Product"}

            </h2>

          </div>


          <form
            className="product-admin-form"
            onSubmit={handleSubmit}
          >


            {/* =================================
                PRODUCT NAME
            ================================= */}

            <input
              name="name"
              placeholder="Product name"
              value={form.name}
              onChange={handleChange}
              required
            />


            {/* =================================
                CATEGORY
            ================================= */}

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Category
              </option>

              <option value="Beer">
                Beer
              </option>

              <option value="Whisky">
                Whisky
              </option>

              <option value="Wine">
                Wine
              </option>

              <option value="Vodka">
                Vodka
              </option>

              <option value="Rum">
                Rum
              </option>

              <option value="GIN">
                GIN
              </option>

              {/* DO NOT CHANGE - YOUR ICE CATEGORY */}

              <option value="Ice">
                Ice
              </option>

              {/* DO NOT CHANGE - YOUR SNACKS CATEGORY */}

              <option value="Snacks">
                Snacks
              </option>

              <option value="Recovery">
                Recovery
              </option>

            </select>


            {/* =================================
                VOLUME
            ================================= */}

            <input
              name="volume"
              placeholder="Volume e.g. 750ml"
              value={form.volume}
              onChange={handleChange}
            />


            {/* =================================
                PRICE
            ================================= */}

            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />


            {/* =================================
                STOCK
            ================================= */}

            <input
              name="stock"
              type="number"
              min="0"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              required
            />


            {/* =================================
                RATING
            ================================= */}

            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="Rating"
              value={form.rating}
              onChange={handleChange}
            />


            {/* =================================
                OFFER
            ================================= */}

            <input
              name="offer"
              placeholder="Offer e.g. 10% OFF"
              value={form.offer}
              onChange={handleChange}
            />


            {/* =================================
                PRODUCT IMAGE
            ================================= */}

            <div className="image-upload-section">

              <label className="image-upload-label">

                <FaImage />

                Product Image

              </label>


              <input
                id="product-image-input"
                type="file"
                accept="
                  image/png,
                  image/jpeg,
                  image/jpg,
                  image/webp
                "
                onChange={handleImageChange}
              />


              <small>
                JPG, PNG or WEBP • Maximum 2 MB
              </small>


              {imageLoading && (

                <div className="image-upload-loading">

                  Processing image...

                </div>

              )}


              {form.image && !imageLoading && (

                <div className="image-preview">

                  <img
                    src={form.image}
                    alt="Product Preview"
                  />


                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={removeImage}
                  >

                    <FaTimes />

                    Remove Image

                  </button>

                </div>

              )}

            </div>


            {/* =================================
                DESCRIPTION
            ================================= */}

            <textarea
              name="description"
              placeholder="Product description"
              value={form.description}
              onChange={handleChange}
              rows="4"
            />


            {/* =================================
                PRODUCT OPTIONS
            ================================= */}

            <div className="product-options">


              {/* AVAILABLE */}

              <label className="available-check">

                <input
                  type="checkbox"
                  name="available"
                  checked={
                    Boolean(form.available)
                  }
                  onChange={handleChange}
                />

                <span>
                  Product Available
                </span>

              </label>


              {/* TRENDING */}

              <label className="available-check">

                <input
                  type="checkbox"
                  name="trending"
                  checked={
                    Boolean(form.trending)
                  }
                  onChange={handleChange}
                />

                <FaFire />

                <span>
                  Trending Product
                </span>

              </label>


              {/* RECOMMENDED */}

              <label className="available-check">

                <input
                  type="checkbox"
                  name="recommended"
                  checked={
                    Boolean(form.recommended)
                  }
                  onChange={handleChange}
                />

                <FaStar />

                <span>
                  Recommended Product
                </span>

              </label>


            </div>


            {/* =================================
                BUTTONS
            ================================= */}

            <div className="form-actions">

              <button
                type="submit"
                className="save-product-btn"
                disabled={imageLoading}
              >

                {editingId
                  ? "Update Product"
                  : "Add Product"}

              </button>


              {editingId && (

                <button
                  type="button"
                  className="cancel-product-btn"
                  onClick={resetForm}
                >

                  Cancel

                </button>

              )}

            </div>


          </form>

        </div>


        {/* =====================================
            EXISTING PRODUCTS
        ===================================== */}

        <div className="admin-product-list">

          <h2>
            Existing Products
          </h2>


          {loading ? (

            <p>
              Loading products...
            </p>


          ) : products.length === 0 ? (

            <p>
              No products found.
            </p>


          ) : (

            <div className="admin-product-grid">

              {products.map(
                (product) => (

                  <div
                    className="admin-product-card"
                    key={product.id}
                  >


                    {/* =================================
                        IMAGE
                    ================================= */}

                    <div className="admin-product-image">

                      {product.image ? (

                        <img
                          src={product.image}
                          alt={product.name}
                        />

                      ) : (

                        <span>
                          No Image
                        </span>

                      )}

                    </div>


                    {/* =================================
                        INFO
                    ================================= */}

                    <div className="admin-product-info">

                      <h3>
                        {product.name}
                      </h3>


                      <p>
                        {product.category}
                      </p>


                      <strong>
                        ₹{product.price}
                      </strong>


                      <small>
                        Stock: {product.stock}
                      </small>


                      {/* STATUS */}

                      <div className="product-status">

                        {product.available && (

                          <span>
                            Available
                          </span>

                        )}


                        {product.trending && (

                          <span>
                            🔥 Trending
                          </span>

                        )}


                        {product.recommended && (

                          <span>
                            ⭐ Recommended
                          </span>

                        )}

                      </div>

                    </div>


                    {/* =================================
                        ACTIONS
                    ================================= */}

                    <div className="admin-product-actions">

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(product)
                        }
                      >

                        <FaEdit />

                        Edit

                      </button>


                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            product.id
                          )
                        }
                      >

                        <FaTrash />

                        Delete

                      </button>

                    </div>


                  </div>

                )
              )}

            </div>

          )}

        </div>


      </div>

    </div>

  );

}


export default AdminProducts;