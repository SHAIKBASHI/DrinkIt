import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaMapMarkerAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  addAddress,
  getUserAddresses,
  deleteAddress as deleteAddressApi
} from "../data/addressService";

import "../styles/address.css";

function Address() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [addresses, setAddresses] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "Home",
    defaultAddress: false
  });


  // ==========================================
  // Load Addresses
  // ==========================================

  const loadAddresses = async () => {

    if (!user || !user.userId) {

      console.log("User not logged in");

      return;
    }

    try {

      setLoading(true);

      console.log(
        "Loading addresses for user:",
        user.userId
      );

      const data =
        await getUserAddresses(user.userId);

      console.log(
        "Address response:",
        data
      );

      setAddresses(
        Array.isArray(data) ? data : []
      );

    } catch (error) {

      console.error(
        "Address loading error:",
        error.response?.status,
        error.response?.data ||
        error.message
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {

        alert(
          "Unable to access your addresses. Please login again."
        );

      } else {

        alert(
          "Unable to load addresses."
        );

      }

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // Load addresses when user is available
  // ==========================================

  useEffect(() => {

    if (user && user.userId) {

      loadAddresses();

    }

  }, [user]);


  // ==========================================
  // Handle Input
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setForm((previous) => ({

      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value

    }));

  };


  // ==========================================
  // Save Address
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // Check login
    if (!user || !user.userId) {

      alert(
        "Please login first."
      );

      return;
    }


    // Clean values
    const fullName =
      form.fullName.trim();

    const mobile =
      form.mobile.trim();

    const houseNo =
      form.houseNo.trim();

    const street =
      form.street.trim();

    const city =
      form.city.trim();

    const state =
      form.state.trim();

    const pincode =
      form.pincode.trim();


    // Validate fields
    if (
      !fullName ||
      !mobile ||
      !houseNo ||
      !street ||
      !city ||
      !state ||
      !pincode
    ) {

      alert(
        "Please fill all address details."
      );

      return;
    }


    // Create request object
    const addressData = {

      userId: user.userId,

      fullName: fullName,

      mobile: mobile,

      houseNo: houseNo,

      street: street,

      city: city,

      state: state,

      pincode: pincode,

      addressType:
        form.addressType || "Home",

      defaultAddress:
        Boolean(form.defaultAddress)

    };


    // Debug information
    console.log(
      "CURRENT USER:",
      user
    );

    console.log(
      "ADDRESS DATA BEING SENT:",
      addressData
    );


    try {

      setLoading(true);


      const savedAddress =
        await addAddress(addressData);


      console.log(
        "ADDRESS SAVED:",
        savedAddress
      );


      // Add saved address to list
      setAddresses((previous) => [

        ...previous,

        savedAddress

      ]);


      // Reset form
      setForm({

        fullName: "",

        mobile: "",

        houseNo: "",

        street: "",

        city: "",

        state: "",

        pincode: "",

        addressType: "Home",

        defaultAddress: false

      });


      setShowForm(false);


      alert(
        "Address added successfully!"
      );

    } catch (error) {

      console.error(
        "Address save error:",
        error.response?.status,
        error.response?.data ||
        error.message
      );


      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {

        alert(
          "Address request was rejected. Please login again."
        );

      } else if (
        error.response?.status === 400
      ) {

        alert(
          "Please enter all address details correctly."
        );

      } else {

        alert(
          "Unable to save address."
        );

      }

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // Delete Address
  // ==========================================

  const handleDeleteAddress = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this address?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      setLoading(true);


      await deleteAddressApi(id);


      setAddresses((previous) =>

        previous.filter(
          (address) =>
            address.id !== id
        )

      );


      alert(
        "Address deleted successfully."
      );

    } catch (error) {

      console.error(
        "Address delete error:",
        error.response?.status,
        error.response?.data ||
        error.message
      );


      alert(
        "Unable to delete address."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="address-page">


      {/* Header */}

      <div className="address-header">

        <button
          className="address-back-btn"
          onClick={() =>
            navigate("/profile")
          }
        >

          <FaArrowLeft />

        </button>


        <h1>
          Saved Addresses
        </h1>

      </div>


      {/* Add Address Button */}

      {!showForm && (

        <button
          className="add-address-btn"
          onClick={() =>
            setShowForm(true)
          }
        >

          <FaPlus />

          Add New Address

        </button>

      )}


      {/* Address Form */}

      {showForm && (

        <form
          className="address-form"
          onSubmit={handleSubmit}
        >

          <h2>

            <FaMapMarkerAlt />

            Add New Address

          </h2>


          {/* Full Name */}

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />


          {/* Mobile */}

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
          />


          {/* House Number */}

          <input
            type="text"
            name="houseNo"
            placeholder="House Number"
            value={form.houseNo}
            onChange={handleChange}
            required
          />


          {/* Street */}

          <input
            type="text"
            name="street"
            placeholder="Street"
            value={form.street}
            onChange={handleChange}
            required
          />


          {/* City */}

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />


          {/* State */}

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
          />


          {/* Pincode */}

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
          />


          {/* Address Type */}

          <select
            name="addressType"
            value={form.addressType}
            onChange={handleChange}
          >

            <option value="Home">
              Home
            </option>

            <option value="Work">
              Work
            </option>

            <option value="Other">
              Other
            </option>

          </select>


          {/* Default Address */}

          <label className="default-address">

            <input
              type="checkbox"
              name="defaultAddress"
              checked={
                form.defaultAddress
              }
              onChange={handleChange}
            />

            Make this my default address

          </label>


          {/* Form Buttons */}

          <div className="address-form-buttons">

            <button
              type="submit"
              className="save-address-btn"
              disabled={loading}
            >

              {loading
                ? "Saving..."
                : "Save Address"}

            </button>


            <button
              type="button"
              className="cancel-address-btn"
              onClick={() =>
                setShowForm(false)
              }
              disabled={loading}
            >

              Cancel

            </button>

          </div>

        </form>

      )}


      {/* Saved Address List */}

      <div className="saved-address-list">


        {loading &&
        addresses.length === 0 ? (

          <p className="loading-address">

            Loading addresses...

          </p>

        ) : addresses.length === 0 ? (

          <div className="no-address">

            <FaMapMarkerAlt />

            <h2>
              No Saved Addresses
            </h2>

            <p>
              Add an address for faster checkout.
            </p>

          </div>

        ) : (

          addresses.map((address) => (

            <div
              className="address-card"
              key={address.id}
            >


              <div className="address-card-header">

                <h3>

                  <FaMapMarkerAlt />

                  {address.addressType}

                </h3>


                {address.defaultAddress && (

                  <span className="default-badge">

                    Default

                  </span>

                )}

              </div>


              <p>

                <strong>

                  {address.fullName}

                </strong>

              </p>


              <p>

                {address.mobile}

              </p>


              <p>

                {address.houseNo},{" "}

                {address.street}

              </p>


              <p>

                {address.city},{" "}

                {address.state} -{" "}

                {address.pincode}

              </p>


              <button
                className="delete-address-btn"
                onClick={() =>
                  handleDeleteAddress(
                    address.id
                  )
                }
                disabled={loading}
              >

                <FaTrash />

                Delete

              </button>


            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Address;