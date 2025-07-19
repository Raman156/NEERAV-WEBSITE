function payWithRazorpay() {
  const form = document.getElementById("checkout-form");

  const user = {
    name: form.name.value,
    address: form.address.value,
    phone: form.phone.value,
    email: form.email.value,
    pincode: form.pincode.value,
    payment: form.querySelector('input[name="payment"]:checked')?.value || "Online (Razorpay)"
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalAmount = 0;
  cart.forEach(item => {
    totalAmount += item.price * item.quantity;
  });

  const orderData = {
    user,
    cart,
    totalAmount,
    paymentId: user.payment === "Cash on Delivery" ? "COD" : "" // COD doesn't have Razorpay ID
  };

  const scriptURL = "https://script.google.com/macros/s/AKfycbxb7ec21GHncr1gJdOXF6wo5MfUnDNPeb5qdfZUfZTol5T57v7xlKpVql2FSFHsz6Q4/exechttps://docs.google.com/spreadsheets/d/1_TxrZDH2qyVNLtdSU8x8J6-eIzpQCuyZXne4EBDZ0kM/edit?usp=sharing";

  if (user.payment === "Cash on Delivery") {
    // 📦 For COD, just store and redirect
    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => console.log("✅ COD Order sent to Google Sheet"))
    .catch(err => console.error("❌ COD Sheet error:", err));

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    localStorage.removeItem("cart");

    alert("📦 Order placed with Cash on Delivery!");
    window.location.href = "confirm.html";
  } else {
    // 💳 For Razorpay Online Payment
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with real key
      amount: totalAmount * 100,
      currency: "INR",
      name: "Agrimate India",
      description: "Order Payment",
      handler: function (response) {
        alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);

        orderData.paymentId = response.razorpay_payment_id;

        fetch(scriptURL, {
          method: 'POST',
          body: JSON.stringify(orderData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => console.log("✅ Order sent to Google Sheet"))
        .catch(err => console.error("❌ Sheet error:", err));

        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(orderData);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("lastOrder", JSON.stringify(orderData));
        localStorage.removeItem("cart");

        window.location.href = "confirm.html";
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone
      },
      theme: {
        color: "#28a745"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}
