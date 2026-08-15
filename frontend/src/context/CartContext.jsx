import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  createCart,
  addProductToCart,
  getCartItems,
  updateCartQuantity,
  deleteCartItem,
  clearCart
} from "../data/cartService";

import { useAuth } from "./AuthContext";


const CartContext = createContext();


export const useCart = () =>
  useContext(CartContext);


export const CartProvider = ({ children }) => {

  const {
    user,
    loading: authLoading
  } = useAuth();


  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(false);


  // =========================================
  // LOAD CART
  // =========================================

  useEffect(() => {

    if (authLoading) {
      return;
    }


    if (!user || !user.userId) {

      setCartItems([]);
      setCartId(null);

      return;
    }


    const loadCart = async () => {

      try {

        setLoading(true);

        console.log(
          "Loading cart for user:",
          user.userId
        );


        const cart =
          await createCart(user.userId);


        if (!cart || !cart.id) {
          throw new Error(
            "Cart ID was not returned."
          );
        }


        setCartId(cart.id);


        const items =
          await getCartItems(cart.id);


        setCartItems(
          Array.isArray(items)
            ? items
            : []
        );


      } catch (error) {

        console.error(
          "Error loading cart:",
          error
        );

        setCartItems([]);
        setCartId(null);


      } finally {

        setLoading(false);

      }

    };


    loadCart();

  }, [user, authLoading]);


  // =========================================
  // GET / CREATE CART
  // =========================================

  const getOrCreateCart = async () => {

    if (!user || !user.userId) {

      alert("Please login first.");

      return null;
    }


    if (cartId) {
      return cartId;
    }


    const cart =
      await createCart(user.userId);


    if (!cart || !cart.id) {

      throw new Error(
        "Unable to create cart."
      );

    }


    setCartId(cart.id);

    return cart.id;

  };


  // =========================================
  // ADD PRODUCT
  // =========================================

  const addToCart = async (product) => {

    if (!user || !user.userId) {

      alert("Please login first.");

      return false;
    }


    if (!product || !product.id) {

      console.error(
        "Invalid product:",
        product
      );

      return false;
    }


    try {

      const currentCartId =
        await getOrCreateCart();


      if (!currentCartId) {
        return false;
      }


      const existingItem =
        cartItems.find(
          (item) =>
            Number(item.productId) ===
            Number(product.id)
        );


      // =====================================
      // ALREADY EXISTS
      // =====================================

      if (existingItem) {

        const updated =
          await updateCartQuantity(
            existingItem.id,
            existingItem.quantity + 1
          );


        setCartItems((previousItems) =>
          previousItems.map((item) =>
            item.id === existingItem.id
              ? updated
              : item
          )
        );


        return true;
      }


      // =====================================
      // NEW PRODUCT
      // =====================================

      const cartItem = {

        cartId: currentCartId,

        productId: product.id,

        productName: product.name,

        price: Number(product.price),

        quantity: 1,

        totalPrice:
          Number(product.price),

        image:
          product.image || null

      };


      const savedItem =
        await addProductToCart(
          cartItem
        );


      setCartItems((previousItems) => [
        ...previousItems,
        savedItem
      ]);


      return true;


    } catch (error) {

      console.error(
        "Error adding product:",
        error
      );

      alert(
        "Unable to add product to cart."
      );

      return false;

    }

  };


  // =========================================
  // ADD COMPLETE RECOVERY KIT
  // =========================================

  const addRecoveryKit = async (
    products
  ) => {

    if (!user || !user.userId) {

      alert("Please login first.");

      return false;
    }


    if (
      !Array.isArray(products) ||
      products.length === 0
    ) {

      alert(
        "Recovery Kit is unavailable."
      );

      return false;
    }


    try {

      const currentCartId =
        await getOrCreateCart();


      if (!currentCartId) {
        return false;
      }


      let currentItems = [
        ...cartItems
      ];


      for (const product of products) {

        const existingIndex =
          currentItems.findIndex(
            (item) =>
              Number(item.productId) ===
              Number(product.id)
          );


        // ===================================
        // PRODUCT ALREADY EXISTS
        // ===================================

        if (existingIndex !== -1) {

          const existingItem =
            currentItems[existingIndex];


          const updated =
            await updateCartQuantity(
              existingItem.id,
              existingItem.quantity + 1
            );


          currentItems =
            currentItems.map(
              (item, index) =>
                index === existingIndex
                  ? updated
                  : item
            );


        } else {

          // ================================
          // NEW PRODUCT
          // ================================

          const cartItem = {

            cartId: currentCartId,

            productId: product.id,

            productName: product.name,

            price: Number(product.price),

            quantity: 1,

            totalPrice:
              Number(product.price),

            image:
              product.image || null

          };


          const savedItem =
            await addProductToCart(
              cartItem
            );


          currentItems = [
            ...currentItems,
            savedItem
          ];

        }

      }


      setCartItems(currentItems);

      return true;


    } catch (error) {

      console.error(
        "Error adding recovery kit:",
        error
      );

      alert(
        "Unable to add Recovery Kit."
      );

      return false;

    }

  };


  // =========================================
  // REMOVE PRODUCT
  // =========================================

  const removeFromCart = async (id) => {

    try {

      await deleteCartItem(id);


      setCartItems((previousItems) =>
        previousItems.filter(
          (item) =>
            item.id !== id
        )
      );


    } catch (error) {

      console.error(
        "Error removing cart item:",
        error
      );

      alert(
        "Unable to remove item."
      );

    }

  };


  // =========================================
  // INCREASE QUANTITY
  // =========================================

  const increaseQuantity = async (id) => {

    const item =
      cartItems.find(
        (item) =>
          item.id === id
      );


    if (!item) {
      return;
    }


    try {

      const updated =
        await updateCartQuantity(
          id,
          item.quantity + 1
        );


      setCartItems((previousItems) =>
        previousItems.map(
          (currentItem) =>
            currentItem.id === id
              ? updated
              : currentItem
        )
      );


    } catch (error) {

      console.error(
        "Error increasing quantity:",
        error
      );

    }

  };


  // =========================================
  // DECREASE QUANTITY
  // =========================================

  const decreaseQuantity = async (id) => {

    const item =
      cartItems.find(
        (item) =>
          item.id === id
      );


    if (!item) {
      return;
    }


    if (item.quantity === 1) {

      await removeFromCart(id);

      return;
    }


    try {

      const updated =
        await updateCartQuantity(
          id,
          item.quantity - 1
        );


      setCartItems((previousItems) =>
        previousItems.map(
          (currentItem) =>
            currentItem.id === id
              ? updated
              : currentItem
        )
      );


    } catch (error) {

      console.error(
        "Error decreasing quantity:",
        error
      );

    }

  };


  // =========================================
  // CLEAR CART
  // =========================================

  const clearCartItems = async () => {

    if (!cartId) {
      return;
    }


    try {

      await clearCart(cartId);

      setCartItems([]);


    } catch (error) {

      console.error(
        "Error clearing cart:",
        error
      );

      throw error;

    }

  };


  // =========================================
  // TOTAL ITEMS
  // =========================================

  const totalItems =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );


  // =========================================
  // TOTAL PRICE
  // =========================================

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
        Number(item.quantity || 0),
      0
    );


  return (

    <CartContext.Provider
      value={{

        cartItems,
        cartId,
        loading,

        addToCart,
        addRecoveryKit,

        removeFromCart,

        increaseQuantity,
        decreaseQuantity,

        clearCartItems,

        totalItems,
        totalPrice

      }}
    >

      {children}

    </CartContext.Provider>

  );

};


export default CartContext;