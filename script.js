const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

let quantities = { latte: 0, flatwhite: 0, v60: 0, americano: 0 };
const prices = { latte: 22, flatwhite: 18, v60: 24, americano: 15 };
let total = 0;

function updateQty(id, change) {
    quantities[id] = Math.max(0, quantities[id] + change);
    document.getElementById(`qty-${id}`).innerText = quantities[id];
    calculateTotal();
}

function calculateTotal() {
    total = (quantities.latte * prices.latte) + 
            (quantities.flatwhite * prices.flatwhite) + 
            (quantities.v60 * prices.v60) + 
            (quantities.americano * prices.americano);
    document.getElementById('order-summary-btn').innerText = `Total: ${total} SAR | Order Now`;
}

function resetOrder() {
    for (let item in quantities) {
        quantities[item] = 0;
        document.getElementById(`qty-${item}`).innerText = 0;
    }
    calculateTotal();
    closeModal();
}

document.getElementById('order-summary-btn').onclick = function() {
    const modalBody = document.getElementById('modal-body');
    const modalFooter = document.getElementById('modal-footer-btns');
    
    if (total === 0) {
        modalBody.innerHTML = `
            <div class="empty-msg" style="padding:10px; color:#e74c3c; font-weight:bold;">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 10px;"></i>
                <p>Your cart is empty! ❌</p>
            </div>`;
        modalFooter.innerHTML = `<button onclick="closeModal()" class="close-btn">Back to Menu</button>`;
    } else {
        let randomID = Math.floor(1000 + Math.random() * 9000);
        let details = "";
        for (let item in quantities) {
            if (quantities[item] > 0) {
                details += `<p><span>${item.toUpperCase()} (x${quantities[item]})</span> <span>${quantities[item] * prices[item]} SAR</span></p>`;
            }
        }

        modalBody.innerHTML = `
            <div class="invoice-header"><h2>FANAR COFFEE</h2></div>
            <div id="order-id">RECEIPT: #ORD-${randomID}</div>
            <div class="bill-list">${details}</div>
            <div class="total-section">
                <p style="margin:0; font-size:0.9rem;">AMOUNT DUE</p>
                <h2 style="margin:5px 0 0 0;">${total} SAR</h2>
            </div>`;
        modalFooter.innerHTML = `
            <button onclick="closeModal()" class="close-btn">Keep Ordering</button>
            <button onclick="resetOrder()" class="reset-btn">Clear Basket</button>
        `;
    }
    document.getElementById('orderModal').style.display = "flex";
};

function closeModal() {
    document.getElementById('orderModal').style.display = "none";
}