// Animations
ScrollReveal().reveal(".top_nav", {
    origin: "bottom",
    distance: "20px",
    opacity: 0,
  });
  ScrollReveal().reveal(".nav", {
    origin: "bottom",
    distance: "20px",
    opacity: 0,
    delay: 100,
  });
  
  ScrollReveal().reveal(".header", {
    origin: "bottom",
    distance: "20px",
    opacity: 0,
    delay: 200,
  });
  ScrollReveal().reveal(".section", {
    origin: "bottom",
    distance: "20px",
    opacity: 0,
    duration: 1000,
    delay: 100,
  });
  ScrollReveal().reveal(".footer", {
    origin: "bottom",
    distance: "20px",
    opacity: 0,
    duration: 1000,
    delay: 100,
  });



//cart
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded successfully!"); // Debugging log

  // Function to add items to cart
  function addToCart(event) {
    const button = event.target;
    const id = button.getAttribute("data-id");
    const title = button.getAttribute("data-title");
    const image = button.getAttribute("data-image");
    const price = button.getAttribute("data-price");

    const cartItem = {
      id,
      title,
      image,
      price,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Item added:", cartItem); // Debugging log
    console.log("Updated Cart:", cart); // Debugging log

    // Redirect to Cart page
    window.location.href = "./Cart.html";
  }

  // Attach event listeners to "Add to Cart" buttons
  const cartButtons = document.querySelectorAll(".add_to_cart");

  if (cartButtons.length > 0) {
    cartButtons.forEach((button) => {
      button.addEventListener("click", addToCart);
    });
    console.log("Add to Cart buttons found:", cartButtons.length); // Debugging log
  } else {
    console.log("No 'Add to Cart' buttons found!"); // Debugging log
  }

  // Function to display cart items on cart.html
  function displayCartItems() {
    const cartContainer = document.querySelector(".cart-items");
    if (!cartContainer) return; // Prevent errors if not on cart page

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <p class="cart_header_id">${item.id}</p>
        <p class="cart_header_title">${item.title}</p>
        <img src="${item.image}" alt="${item.title}" class="cart_header_image">
        <p class="cart_header_price">$${item.price}</p>
        <p class="cart_header_quantity">Quantity: ${item.quantity}</p>
        <button class="delete-item" data-id="${item.id}">Delete</button>
      `;
      cartContainer.appendChild(cartItem);
    });

    // Attach event listeners to delete buttons
    document.querySelectorAll(".delete-item").forEach((button) => {
      button.addEventListener("click", deleteCartItem);
    });

    console.log("Cart items displayed:", cart); // Debugging log
  }

  // Function to delete item from cart
  function deleteCartItem(event) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const id = event.target.getAttribute("data-id");

    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems(); // Refresh cart display

    console.log("Item deleted. Updated cart:", cart); // Debugging log
  }

  // Display cart items when on cart page
  displayCartItems();
});






//quiz
document.addEventListener("DOMContentLoaded", function() {
  let allQuestions = [];
  
  fetch("questions")
      .then(response => response.text())
      .then(data => {
          allQuestions = data.split("\n").map(line => line.split(";"));
          const selectedQuestions = getRandomQuestions(allQuestions, 10);
          displayQuestions(selectedQuestions);
      });

  function getRandomQuestions(array, num) {
      return array.sort(() => Math.random() - 0.5).slice(0, num);
  }

  function displayQuestions(questions) {
      const quizContainer = document.getElementById("quizContainer");
      quizContainer.innerHTML = "";

      questions.forEach((q, index) => {
          const questionHTML = `
              <div>
                  <p>${index + 1}. ${q[0]}</p>
                  <label><input type="radio" name="q${index}" value="0"> ${q[1]}</label><br>
                  <label><input type="radio" name="q${index}" value="1"> ${q[2]}</label><br>
                  <label><input type="radio" name="q${index}" value="2"> ${q[3]}</label><br>
                  <label><input type="radio" name="q${index}" value="3"> ${q[4]}</label><br>
              </div>
          `;
          quizContainer.innerHTML += questionHTML;
      });
  }

  document.getElementById("quizForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const selectedAnswers = document.querySelectorAll("input[type='radio']:checked");
      let score = 0;
      
      selectedAnswers.forEach((answer, index) => {
          if (answer.value == allQuestions[index][5]) {
              score++;
          }
      });

      document.getElementById("result").innerText = `Your score: ${score}/10`;
  });
});

