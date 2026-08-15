import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* =========================
   PAGES
========================= */

import Splash from "./pages/Splash";
import Location from "./pages/Location";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";

import LiverCoins from "./pages/LiverCoins";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";
import Wishlist from "./pages/Wishlist";

import Rewards from "./pages/Rewards";
import Tracking from "./pages/Tracking";
import Profile from "./pages/Profile";
import Address from "./pages/Address";

/* =========================
   CATEGORY PAGES
========================= */

import Beer from "./pages/Beer";
import Whisky from "./pages/Whisky";
import Wine from "./pages/Wine";
import Vodka from "./pages/Vodka";
import Rum from "./pages/Rum";
import Brandy from "./pages/Brandy";
import Ice from "./pages/Ice";
import Snacks from "./pages/Snacks";
import Recovery from "./pages/Recovery";

/* =========================
   AUTHENTICATION
========================= */

import Login from "./pages/Login";
import Register from "./pages/Register";

/* =========================
   ADMIN
========================= */

import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";

/* =========================
   LAYOUT
========================= */

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    /* =========================================
       NORMAL APPLICATION LAYOUT
    ========================================= */

    const Layout = ({ children }) => (

        <>
            <Navbar />

            {children}

            <Footer />

            <BottomNav />
        </>

    );


    /* =========================================
       PROTECTED PAGE
    ========================================= */

    const ProtectedPage = ({ children }) => (

        <ProtectedRoute>

            <Layout>
                {children}
            </Layout>

        </ProtectedRoute>

    );


    return (

        <Routes>


            {/* =================================================
                SPLASH
            ================================================= */}

            <Route
                path="/"
                element={<Splash />}
            />


            {/* =================================================
                AUTHENTICATION
            ================================================= */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* =================================================
                LOCATION
            ================================================= */}

            <Route
                path="/location"
                element={
                    <ProtectedPage>
                        <Location />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                HOME

                PUBLIC

                User can browse without login.
            ================================================= */}

            <Route
                path="/home"
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />


            {/* =================================================
                CATEGORIES

                PUBLIC
            ================================================= */}

            <Route
                path="/categories"
                element={
                    <Layout>
                        <Categories />
                    </Layout>
                }
            />


            {/* =================================================
                BEER
            ================================================= */}

            <Route
                path="/category/beer"
                element={
                    <Layout>
                        <Beer />
                    </Layout>
                }
            />


            {/* =================================================
                WHISKY
            ================================================= */}

            <Route
                path="/category/whisky"
                element={
                    <Layout>
                        <Whisky />
                    </Layout>
                }
            />


            {/* =================================================
                WINE
            ================================================= */}

            <Route
                path="/category/wine"
                element={
                    <Layout>
                        <Wine />
                    </Layout>
                }
            />


            {/* =================================================
                VODKA
            ================================================= */}

            <Route
                path="/category/vodka"
                element={
                    <Layout>
                        <Vodka />
                    </Layout>
                }
            />


            {/* =================================================
                RUM
            ================================================= */}

            <Route
                path="/category/rum"
                element={
                    <Layout>
                        <Rum />
                    </Layout>
                }
            />


            {/* =================================================
                BRANDY
            ================================================= */}

            <Route
                path="/category/brandy"
                element={
                    <Layout>
                        <Brandy />
                    </Layout>
                }
            />


            {/* =================================================
                ICE

                DO NOT CHANGE ICE PAGE
            ================================================= */}

            <Route
                path="/category/ice"
                element={
                    <Layout>
                        <Ice />
                    </Layout>
                }
            />


            {/* =================================================
                SNACKS

                DO NOT CHANGE SNACKS PAGE
            ================================================= */}

            <Route
                path="/category/snacks"
                element={
                    <Layout>
                        <Snacks />
                    </Layout>
                }
            />


            {/* =================================================
                RECOVERY
            ================================================= */}

            <Route
                path="/category/recovery"
                element={
                    <Layout>
                        <Recovery />
                    </Layout>
                }
            />

            <Route
                path="/recovery"
                element={
                    <Layout>
                        <Recovery />
                    </Layout>
                }
            />


            {/* =================================================
                PRODUCT DETAILS

                PUBLIC

                User should be able to view product
                before logging in.
            ================================================= */}

            <Route
                path="/product/:id"
                element={
                    <Layout>
                        <ProductDetails />
                    </Layout>
                }
            />


            {/* =================================================
                CART

                PUBLIC

                User can reach cart without login.
            ================================================= */}

            <Route
                path="/cart"
                element={
                    <Layout>
                        <Cart />
                    </Layout>
                }
            />


            {/* =================================================
                CHECKOUT

                PROTECTED

                LOGIN REQUIRED HERE
            ================================================= */}

            <Route
                path="/checkout"
                element={
                    <ProtectedPage>
                        <Checkout />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                ORDER SUCCESS

                PROTECTED
            ================================================= */}

            <Route
                path="/order-success"
                element={
                    <ProtectedPage>
                        <OrderSuccess />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                ORDERS
            ================================================= */}

            <Route
                path="/orders"
                element={
                    <ProtectedPage>
                        <Orders />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                WISHLIST
            ================================================= */}

            <Route
                path="/wishlist"
                element={
                    <ProtectedPage>
                        <Wishlist />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                LIVER COINS
            ================================================= */}

            <Route
                path="/liver-coins"
                element={
                    <ProtectedPage>
                        <LiverCoins />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            <Route
                path="/notifications"
                element={
                    <ProtectedPage>
                        <Notifications />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                SETTINGS
            ================================================= */}

            <Route
                path="/settings"
                element={
                    <ProtectedPage>
                        <Settings />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                HELP & SUPPORT
            ================================================= */}

            <Route
                path="/help-support"
                element={
                    <ProtectedPage>
                        <HelpSupport />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                PROFILE
            ================================================= */}

            <Route
                path="/profile"
                element={
                    <ProtectedPage>
                        <Profile />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                ADDRESSES
            ================================================= */}

            <Route
                path="/addresses"
                element={
                    <ProtectedPage>
                        <Address />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                REWARDS
            ================================================= */}

            <Route
                path="/rewards"
                element={
                    <ProtectedPage>
                        <Rewards />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                TRACKING
            ================================================= */}

            <Route
                path="/tracking"
                element={
                    <ProtectedPage>
                        <Tracking />
                    </ProtectedPage>
                }
            />


            {/* =================================================
                ADMIN DASHBOARD
            ================================================= */}

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                }
            />


            {/* =================================================
                ADMIN PRODUCTS
            ================================================= */}

            <Route
                path="/admin/products"
                element={
                    <AdminRoute>

                        <Layout>
                            <AdminProducts />
                        </Layout>

                    </AdminRoute>
                }
            />


            {/* =================================================
                UNKNOWN URL
            ================================================= */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />

        </Routes>

    );
}


export default App;