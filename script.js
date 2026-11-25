// Sample data for the demo. Replace with real prices later.
const products = [
  { name: "Rice (5kg)", category: "groceries", shop: "Shop A", price: 85 },
  { name: "Rice (5kg)", category: "groceries", shop: "Shop B", price: 78 },
  { name: "Rice (5kg)", category: "groceries", shop: "Shop C", price: 92 },
  { name: "Cooking Oil (1L)", category: "groceries", shop: "Shop A", price: 38 },
  { name: "Cooking Oil (1L)", category: "groceries", shop: "Shop B", price: 42 },
  { name: "Sugar (1kg)", category: "groceries", shop: "Shop A", price: 22 },
  { name: "Sugar (1kg)", category: "groceries", shop: "Shop C", price: 19 },
  { name: "Milk (400g)", category: "groceries", shop: "Shop B", price: 30 },
  { name: "Milk (400g)", category: "groceries", shop: "Shop C", price: 27 },
  { name: "Tomato Paste", category: "groceries", shop: "Shop A", price: 8 },
  { name: "Tomato Paste", category: "groceries", shop: "Shop B", price: 7 },
  { name: "Sneakers", category: "shoes", shop: "Shop A", price: 250 },
  { name: "Sneakers", category: "shoes", shop: "Shop B", price: 230 },
  { name: "Smartphone", category: "electronics", shop: "Shop A", price: 1800 },
  { name: "Smartphone", category: "electronics", shop: "Shop C", price: 1650 }
];

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const chips = document.querySelectorAll(".chip");
const categories = document.querySelectorAll(".category");
const resultsSection = document.getElementById("results");
const resultsTitle = document.getElementById("results-title");
const resultsList = document.getElementById("results-list");

function showResults(title, matches) {
  resultsSection.hidden = false;
  resultsTitle.textContent = title;
  resultsList.innerHTML = "";

  if (matches.length === 0) {
    resultsList.innerHTML = "<li>No results yet. Try another product.</li>";
    return;
  }

  // Sort cheapest first
  matches.sort((a, b) => a.price - b.price);

  matches.forEach((item, index) => {
    const li = document.createElement("li");
    if (index === 0) li.classList.add("cheapest");
    li.innerHTML = `<span>${item.name} - ${item.shop}</span><strong>GH₵ ${item.price}</strong>`;
    resultsList.appendChild(li);
  });

  resultsSection.scrollIntoView({ behavior: "smooth" });
}

function searchProducts(text) {
  const query = text.trim().toLowerCase();
  if (query === "") return;

  const matches = products.filter((p) => p.name.toLowerCase().includes(query));
  showResults(`Results for "${text.trim()}"`, matches);
}

// Search form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchProducts(input.value);
});

// Popular search chips
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const text = chip.textContent.replace("🔍", "").trim();
    input.value = text;
    searchProducts(text);
  });
});

// Category buttons
categories.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    const matches = products.filter((p) => p.category === category);
    showResults(`${button.textContent.trim()}`, matches);
  });
});
