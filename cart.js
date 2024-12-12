document.addEventListener("DOMContentLoaded", () => {
    const prices = {
      halal: 12,
      tacos: 11,
      hotdog: 10,
      chicken: 12,
      lamb: 10,
    };
  
    const elements = {
      halal: document.getElementById("halalQuantity"),
      tacos: document.getElementById("tacosQuantity"),
      hotdog: document.getElementById("hotdogQuantity"),
      chicken: document.getElementById("chickenQuantity"),
      lamb: document.getElementById("lambQuantity"),
      halalSubtotal: document.getElementById("halalSubtotal"),
      tacosSubtotal: document.getElementById("tacosSubtotal"),
      hotdogSubtotal: document.getElementById("hotdogSubtotal"),
      chickenSubtotal: document.getElementById("chickenSubtotal"),
      lambSubtotal: document.getElementById("lambSubtotal"),
      grandTotal: document.getElementById("grandTotal"),
    };
  
    const calculateTotals = () => {
      let grandTotal = 0;
  
      for (const food in prices) {
        const quantity = elements[food].value || 0;
        const subtotal = quantity * prices[food];
        elements[`${food}Subtotal`].value = subtotal.toFixed(2);
        grandTotal += subtotal;
      }
  
      elements.grandTotal.value = grandTotal.toFixed(2);
    };
  
    for (const food in prices) {
      elements[food].addEventListener("change", calculateTotals);
    }
  
    document.getElementById("orderForm").addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const address = document.getElementById("address").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const creditCard = document.getElementById("creditCard").value.trim();
  
      if (!name || !email || !address || !phone || !creditCard) {
        alert("Please fill out all required fields.");
        return;
      }
  
      if (phone.length !== 10) {
        alert("Phone number must be 10 digits.");
        return;
      }
  
      if (creditCard.length !== 16) {
        alert("Credit card number must be 16 digits.");
        return;
      }
  
      const maskedCard = creditCard.slice(-4).padStart(16, "*");
  
      const receipt = `
        <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Bungee', cursive;
              background-color: #FFD700;
              color: #333;
              padding: 20px;
            }
            h1 {
              text-align: center;
              color: #E31837;
            }
          </style>
        </head>
        <body>
          <h1>Order Receipt</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <div class="divider">~~~</div>
          <p><strong>Halal Food:</strong> ${elements.halal.value} ($${elements.halalSubtotal.value})</p>
          <p><strong>Tacos:</strong> ${elements.tacos.value} ($${elements.tacosSubtotal.value})</p>
          <p><strong>Hot Dog:</strong> ${elements.hotdog.value} ($${elements.hotdogSubtotal.value})</p>
          <p><strong>Chicken Over Rice:</strong> ${elements.chicken.value} ($${elements.chickenSubtotal.value})</p>
          <p><strong>Lamb Over Rice:</strong> ${elements.lamb.value} ($${elements.lambSubtotal.value})</p>
          <p><strong>Grand Total:</strong> $${elements.grandTotal.value}</p>
          <div class="divider">~~~</div>
          <p><strong>Credit Card:</strong> ${maskedCard}</p>
        </body>
        </html>
      `;
  
      const receiptWindow = window.open("", "Receipt", "width=600,height=400");
      receiptWindow.document.write(receipt);
      receiptWindow.document.close();
    });
  });
  