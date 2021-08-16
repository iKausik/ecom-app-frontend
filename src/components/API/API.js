const API_URL = process.env.REACT_APP_API_URL;

// Signup
export const signUp = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errMsg = await res.text();
      throw new Error(errMsg);
    }

    await res.json();
  } catch (err) {
    console.error(err.message);
  }
};

//Login
export const login = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errMsg = await res.text();
      throw new Error(errMsg);
    }

    const jwtToken = await res.text();
    localStorage.setItem("token", jwtToken);
  } catch (err) {
    console.error(err.message);
  }
};

// Profile Details
export const profile = async () => {
  try {
    const res = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

// Update Profile
// export const updateProfile = async (id) => {
//   try {
//     const res = await fetch(`${API_URL}/user`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem("token"),
//       },
//     });

//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// Delete Account

//
//
// Get All Products
export const getAllProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err.message);
  }
};

// Single Product
export const singleProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`);
  const data = await res.json();

  return data;
};

//
//
// Add to Cart
export const addToCart = async (productId) => {
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(productId),
    });

    await res.json();
  } catch (err) {
    console.error(err.message);
  }
};

// All Cart
export const getAllCart = async () => {
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err.message);
  }
};

// Update Cart Quantity
export const updateCartQty = async (cartData) => {
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(cartData),
    });

    await res.json();
  } catch (err) {
    console.error(err.message);
  }
};

// Delete Cart Item
export const deleteCartItem = async (cartId) => {
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(cartId),
    });

    await res.json();
  } catch (err) {
    console.error(err.message);
  }
};

//
//
// All Orders
export const getAllOrders = async () => {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const data = res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

// Cancel Order
export const changeOrderStatus = async (updatedOrderData) => {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(updatedOrderData),
    });

    await res.json();
  } catch (err) {
    console.error(err.message);
  }
};

//
//
// Add Address
export const addAddress = async (addressData) => {
  try {
    const res = await fetch(`${API_URL}/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(addressData),
    });

    await res.json();
  } catch (err) {
    console.error(err.message);
  }
};

// All Address
export const getAllAddress = async () => {
  try {
    const res = await fetch(`${API_URL}/address`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

// Update Address
// export const updateAddress = async (updatedAddressData) => {
//   try {
//     const res = await fetch(`${API_URL}/address`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem("token"),
//       },
//       body: JSON.stringify(updatedAddressData),
//     });

//     await res.json();
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// Delete Address
export const deleteAddress = async (addressId) => {
  try {
    const res = await fetch(`${API_URL}/address`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(addressId),
    });

    await res.json();
  } catch (err) {
    console.error(err.message);
  }
};

//
//
// Stripe Payment
// export const makePayment = async () => {
//   try {
//     const res = await fetch(`${API_URL}/create-checkout-session`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": localStorage.getItem("token"),
//       },
//     });

//     await res.json();
//   } catch (err) {
//     console.error(err.message);
//   }
// };
