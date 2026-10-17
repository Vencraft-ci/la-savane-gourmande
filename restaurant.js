/* ========================= */
/* CONFIG */
/* ========================= */

/*
   Astuce réutilisation : pour un autre restaurant, il suffit de modifier
   les attributs data-restaurant et data-whatsapp sur la balise <body>
   du fichier HTML. Les valeurs ci-dessous ne servent que de secours
   si ces attributs sont absents.
*/
const DEFAULT_WHATSAPP_NUMBER = "2250151030957";

const RESTAURANT_NAME =
    document.body.dataset.restaurant || "Notre restaurant";

const WHATSAPP_NUMBER =
    document.body.dataset.whatsapp || DEFAULT_WHATSAPP_NUMBER;

/* ========================= */
/* ELEMENTS */
/* ========================= */

const loader = document.getElementById("loader");

const categoryButtons = document.querySelectorAll(".category-btn");
const menuCategories = document.querySelectorAll(".menu-category");

const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const modalTotal = document.getElementById("modalTotal");
const modalSubtitle = document.getElementById("modalSubtitle");

const openCartBtn = document.getElementById("openCart");
const closeModalBtn = document.getElementById("closeModal");
const closeCartBtn = document.getElementById("closeCartBtn");

const cartModal = document.getElementById("cartModal");
const orderList = document.getElementById("orderList");

const clearCartBtn = document.getElementById("clearCart");
const sendOrderBtn = document.getElementById("sendOrder");

const toast = document.getElementById("toast");

const heroBadgeText = document.getElementById("heroBadgeText");
const scrollCueBtn = document.getElementById("scrollCue");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const footerYear = document.getElementById("footerYear");
const footerRestaurantName = document.querySelectorAll(".js-restaurant-name");

/* ========================= */
/* STORAGE — PANIER & CLIENT */
/* ========================= */

let cart = JSON.parse(localStorage.getItem("savaneCart")) || [];

/* ========================= */
/* SERVICE TYPE              */
/* ========================= */

let selectedServiceType = null;

const serviceBtns = document.querySelectorAll(".service-btn");
const allForms = document.querySelectorAll(".customer-form");

serviceBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    serviceBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedServiceType = btn.dataset.type;

    allForms.forEach(f => f.style.display = "none");
    const target = document.getElementById("form-" + selectedServiceType);
    if (target) target.style.display = "block";
  });
});

/* ========================= */
/* RÉCUPÉRER INFOS CLIENT    */
/* ========================= */

function getClientInfo() {
  if (!selectedServiceType) return null;

  if (selectedServiceType === "livraison") {
    return {
      type: "🛵 Livraison",
      nom: document.getElementById("customerName")?.value.trim() || "",
      tel: document.getElementById("customerPhone")?.value.trim() || "",
      extra: "📍 Lieu : " + (document.getElementById("customerLocation")?.value.trim() || "")
    };
  }
  if (selectedServiceType === "surplace") {
    return {
      type: "🏠 Sur place",
      nom: document.getElementById("customerNameSP")?.value.trim() || "",
      tel: document.getElementById("customerPhoneSP")?.value.trim() || "",
      extra: "🪑 Table : " + (document.getElementById("customerTable")?.value.trim() || "")
    };
  }
  if (selectedServiceType === "emporter") {
    return {
      type: "🥡 À emporter",
      nom: document.getElementById("customerNameEM")?.value.trim() || "",
      tel: document.getElementById("customerPhoneEM")?.value.trim() || "",
      extra: "💺 Espace : " + (document.getElementById("customerSeat")?.value.trim() || "Non précisé")
    };
  }
}

/* ========================= */
/* ACCESSIBILITÉ — liaison label/champ (note + portion) */
/* ========================= */

/*
   Génère un id unique par carte pour chaque textarea de note et chaque
   select de portion, puis relie le <label> correspondant via l'attribut
   "for". Cela permet aux lecteurs d'écran et au clic sur le label
   d'atteindre correctement le bon champ, sans avoir à écrire 29 id
   à la main dans le HTML (source d'erreurs et de doublons).
*/

function setupFieldAccessibility(){

    document.querySelectorAll(".menu-card").forEach((card, cardIndex) => {

        const cardId = card.dataset.id || `card-${cardIndex}`;

        const noteBox = card.querySelector(".note-box");

        if(noteBox){

            const label = noteBox.querySelector("label");
            const textarea = noteBox.querySelector(".note-input");

            if(label && textarea){

                const fieldId = `note-${cardId}`;

                textarea.id = fieldId;

                label.setAttribute("for", fieldId);

            }

        }

        const portionBox = card.querySelector(".portion-box");

        if(portionBox){

            const label = portionBox.querySelector("label");
            const select = portionBox.querySelector(".portion-select");

            if(label && select){

                const fieldId = `portion-${cardId}`;

                select.id = fieldId;

                label.setAttribute("for", fieldId);

            }

        }

    });

}

/* ========================= */
/* INIT IDENTITÉ RESTAURANT */
/* ========================= */

function initRestaurantBranding(){

    document.title = `${RESTAURANT_NAME} \u2014 Menu`;

    if(heroBadgeText){
        heroBadgeText.textContent = `\u{1F4CD} ${RESTAURANT_NAME}`;
    }

    if(modalSubtitle){
        modalSubtitle.textContent =
            `R\u00E9sum\u00E9 de votre commande \u2014 ${RESTAURANT_NAME}`;
    }

    footerRestaurantName.forEach(el => {
        el.textContent = RESTAURANT_NAME;
    });

    if(footerYear){
        footerYear.textContent = new Date().getFullYear();
    }

}

/* ========================= */
/* LOADER */
/* ========================= */

window.addEventListener("load", () => {

    setTimeout(() => {
        loader.classList.add("hide");
    }, 1200);

});

/* ========================= */
/* CATEGORY NAVIGATION */
/* ========================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        menuCategories.forEach(section => {
            section.classList.remove("active-category");
        });

        const activeSection = document.getElementById(category);

        if(activeSection){
            activeSection.classList.add("active-category");

            window.scrollTo({
                top: activeSection.offsetTop - 120,
                behavior: "smooth"
            });
        }

    });

});

/* ========================= */
/* TOAST */
/* ========================= */

let toastTimeout = null;

function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}

/* ========================= */
/* FORMAT PRICE */
/* ========================= */

function formatPrice(price){

    return price.toLocaleString("fr-FR") + " F";

}

/* ========================= */
/* SAVE STORAGE */
/* ========================= */

function saveCart(){

    localStorage.setItem(
        "savaneCart",
        JSON.stringify(cart)
    );

}

/* ========================= */
/* UPDATE TOTALS */
/* ========================= */

function updateTotals(){

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

        totalPrice += item.subtotal;

    });

    const previousCount = parseInt(cartCount.textContent) || 0;

    cartCount.textContent = totalItems;

    if(totalItems !== previousCount){

        cartCount.classList.remove("bump");

        void cartCount.offsetWidth;

        cartCount.classList.add("bump");

    }

    cartTotal.textContent = `Total : ${formatPrice(totalPrice)}`;

    modalTotal.textContent = formatPrice(totalPrice);

}

/* ========================= */
/* GENERATE UNIQUE KEY */
/* ========================= */

function generateKey(item){

    let key = item.id;

    if(item.portion){
        key += "-" + item.portion;
    }

    return key;

}

/* ========================= */
/* UPDATE ORDER MODAL */
/* ========================= */

function updateOrderModal(){

    if(cart.length === 0){

        orderList.innerHTML = `
            <div class="empty-cart">

                <div class="empty-icon">
                    \u{1F37D}\uFE0F
                </div>

                <h3>Aucune commande</h3>

                <p>
                    Ajoutez des plats pour commencer votre commande.
                </p>

            </div>
        `;

        updateTotals();

        return;
    }

    orderList.innerHTML = "";

    cart.forEach(item => {

        const orderItem = document.createElement("div");

        orderItem.classList.add("order-item");

        let includedHTML = "";
        let extrasHTML = "";
        let noteHTML = "";

        if(item.included && item.included.length > 0){

            includedHTML = `
                <div class="order-detail-box">

                    <strong>
                        Accompagnements :
                    </strong>

                    <ul>
                        ${item.included.map(side => `
                            <li>${side}</li>
                        `).join("")}
                    </ul>

                </div>
            `;

        }

        if(item.extras && item.extras.length > 0){

            extrasHTML = `
                <div class="order-detail-box">

                    <strong>
                        Suppl\u00E9ments :
                    </strong>

                    <ul>
                        ${item.extras.map(extra => `
                            <li>
                                ${extra.name} x${extra.quantity} \u2014 ${formatPrice(extra.price * extra.quantity)}
                            </li>
                        `).join("")}
                    </ul>

                </div>
            `;

        }

        if(item.note && item.note.trim() !== ""){

            noteHTML = `
                <div class="order-detail-box note-detail">

                    <strong>
                        \u{1F4DD} Pr\u00E9cision du client :
                    </strong>

                    <p>
                        ${escapeHTML(item.note)}
                    </p>

                </div>
            `;

        }

        orderItem.innerHTML = `
            <div class="order-item-top">

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Quantit\u00E9 : ${item.quantity}
                    </p>

                    ${
                        item.portion
                        ?
                        `<p>Portion : ${item.portion}</p>`
                        :
                        ""
                    }

                </div>

                <div class="order-price">
                    ${formatPrice(item.subtotal)}
                </div>

            </div>

            <div class="order-details">

                ${includedHTML}

                ${extrasHTML}

                ${noteHTML}

            </div>

            <div class="order-footer">

                <button
                    class="delete-item-btn"
                    data-key="${item.key}"
                >
                    Supprimer
                </button>

                <div class="subtotal">
                    Sous-total : ${formatPrice(item.subtotal)}
                </div>

            </div>
        `;

        orderList.appendChild(orderItem);

    });

    updateTotals();

    attachDeleteButtons();

}

/* ========================= */
/* ÉCHAPPEMENT HTML (sécurité affichage note) */
/* ========================= */

function escapeHTML(text){

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}

/* ========================= */
/* DELETE ITEM */
/* ========================= */

function attachDeleteButtons(){

    const deleteButtons = document.querySelectorAll(".delete-item-btn");

    deleteButtons.forEach(button => {

        button.addEventListener("click", () => {

            const key = button.dataset.key;

            cart = cart.filter(item => item.key !== key);

            saveCart();

            updateOrderModal();

            syncCards();

            showToast("Produit supprim\u00E9");

        });

    });

}

/* ========================= */
/* OPEN / CLOSE MODAL */
/* ========================= */

let scrollPosition = 0;

openCartBtn.addEventListener("click", () => {

    scrollPosition = window.scrollY;

    cartModal.classList.add("active");

    document.body.style.overflow = "hidden";

    updateOrderModal();

});

function closeModal(){

    cartModal.classList.remove("active");

    document.body.style.overflow = "auto";

    window.scrollTo({
        top: scrollPosition
    });

}

closeModalBtn.addEventListener("click", closeModal);

closeCartBtn.addEventListener("click", closeModal);

cartModal.addEventListener("click", (e) => {

    if(e.target === cartModal){
        closeModal();
    }

});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape" && cartModal.classList.contains("active")){

        closeModal();

    }

});

/* ========================= */
/* CLEAR CART */
/* ========================= */

clearCartBtn.addEventListener("click", () => {

    cart = [];

    saveCart();

    updateOrderModal();

    syncCards();

    clearAllNoteFields();

    showToast("Commande vid\u00E9e");

});

function clearAllNoteFields(){

    document.querySelectorAll(".note-input").forEach(textarea => {

        textarea.value = "";

    });

}

/* ========================= */
/* CALCULATE SUBTOTAL */
/* ========================= */

function calculateSubtotal(basePrice, quantity, extras){

    let extrasTotal = 0;

    extras.forEach(extra => {

        extrasTotal += extra.price * extra.quantity;

    });

    return (basePrice + extrasTotal) * quantity;

}

/* ========================= */
/* GET PORTION LABEL */
/* ========================= */

function getPortionLabel(select){

    const option = select.options[select.selectedIndex];

    return option.textContent.split("\u2014")[0].trim();

}

/* ========================= */
/* HELPERS — QUANTITÉ D'UNE CARTE */
/* ========================= */

/*
   Les cartes simples utilisent ".qty-value", les cartes avancées
   (Garba, Poulet braisé, Tilapia...) utilisent ".product-qty".
   Cette fonction unique évite les bugs de recalcul selon le type de carte.
*/

function getQtyElement(card){

    return card.querySelector(".qty-value") || card.querySelector(".product-qty");

}

function getQtyValue(card){

    const el = getQtyElement(card);

    return el ? (parseInt(el.textContent) || 0) : 0;

}

/* ========================= */
/* HELPER — NOTE D'UNE CARTE */
/* ========================= */

function getCardNote(card){

    const noteInput = card.querySelector(".note-input");

    return noteInput ? noteInput.value.trim() : "";

}

/* ========================= */
/* UPDATE CARD LIVE PRICE */
/* ========================= */

function updateCardLivePrice(card){

    const livePrice = card.querySelector(".live-price");

    if(!livePrice){
        return;
    }

    const select = card.querySelector(".portion-select");

    if(select){

        const value = parseInt(select.value);

        livePrice.textContent = formatPrice(value);

    }

}

/* ========================= */
/* RECALCULER SI LA CARTE EST ACTIVE */
/* ========================= */

/*
   Appelé chaque fois qu'un supplément, une portion ou un accompagnement
   change : si le produit est déjà dans le panier (quantité > 0), on
   recalcule immédiatement le sous-total. Sinon on ne fait rien tant
   que le client n'a pas choisi de quantité.
*/

function recalcIfActive(card){

    const quantity = getQtyValue(card);

    if(quantity > 0){
        updateProduct(card, quantity);
    }

}

/* ========================= */
/* EXTRAS — boutons +/- */
/* ========================= */

document.querySelectorAll(".extra-item").forEach(extraItem => {

    const minusBtn = extraItem.querySelector(".extra-minus");
    const plusBtn = extraItem.querySelector(".extra-plus");
    const valueEl = extraItem.querySelector(".extra-value");

    plusBtn.addEventListener("click", () => {

        const value = (parseInt(valueEl.textContent) || 0) + 1;

        valueEl.textContent = value;

        bumpElement(valueEl);

        recalcIfActive(extraItem.closest(".menu-card"));

    });

    minusBtn.addEventListener("click", () => {

        const value = parseInt(valueEl.textContent) || 0;

        if(value > 0){

            valueEl.textContent = value - 1;

            bumpElement(valueEl);

            recalcIfActive(extraItem.closest(".menu-card"));

        }

    });

});

/* ========================= */
/* PORTIONS — changement */
/* ========================= */

document.querySelectorAll(".portion-select").forEach(select => {

    select.addEventListener("change", () => {

        const card = select.closest(".menu-card");

        updateCardLivePrice(card);

        recalcIfActive(card);

    });

});

/* ========================= */
/* ACCOMPAGNEMENTS — cases à cocher */
/* ========================= */

document.querySelectorAll(".check-item input").forEach(check => {

    check.addEventListener("change", () => {

        recalcIfActive(check.closest(".menu-card"));

    });

});

/* ========================= */
/* NOTE CLIENT — compteur de caractères + recalcul live */
/* ========================= */

document.querySelectorAll(".note-input").forEach(textarea => {

    const card = textarea.closest(".menu-card");

    textarea.addEventListener("input", () => {

        recalcIfActive(card);

    });

});

/* ========================= */
/* BUMP ANIMATION (micro-interaction) */
/* ========================= */

function bumpElement(el){

    el.classList.remove("bump");

    void el.offsetWidth;

    el.classList.add("bump");

}

/* ========================= */
/* AJOUT / RETRAIT PRODUITS */
/* ========================= */

document.querySelectorAll(".menu-card").forEach(card => {

    const minusBtn = card.querySelector(".minus") || card.querySelector(".product-minus");
    const plusBtn = card.querySelector(".plus") || card.querySelector(".product-plus");
    const qtyValue = getQtyElement(card);

    if(!minusBtn || !plusBtn || !qtyValue) return;

    plusBtn.addEventListener("click", (e) => {

        e.preventDefault();

        const currentQuantity = (parseInt(qtyValue.textContent) || 0) + 1;

        qtyValue.textContent = currentQuantity;

        bumpElement(qtyValue);

        updateProduct(card, currentQuantity);

    });

    minusBtn.addEventListener("click", (e) => {

        e.preventDefault();

        const currentQuantity = parseInt(qtyValue.textContent) || 0;

        if(currentQuantity > 0){

            const newQuantity = currentQuantity - 1;

            qtyValue.textContent = newQuantity;

            bumpElement(qtyValue);

            updateProduct(card, newQuantity);

        }

    });

});

/* ========================= */
/* UPDATE PRODUCT (cœur du panier) */
/* ========================= */

function updateProduct(card, quantity){

    const id = card.dataset.id;
    const name = card.dataset.name;

    let basePrice = parseInt(card.dataset.price || 0);

    let portion = "";

    const select = card.querySelector(".portion-select");

    if(select){

        basePrice = parseInt(select.value);

        portion = getPortionLabel(select);

    }

    const included = [];

    const checkboxes = card.querySelectorAll(".check-item input");

    checkboxes.forEach(check => {

        if(check.checked){
            included.push(check.value);
        }

    });

    const extras = [];

    const extraItems = card.querySelectorAll(".extra-item");

    extraItems.forEach(extraItem => {

        const extraQty = parseInt(
            extraItem.querySelector(".extra-value").textContent
        ) || 0;

        if(extraQty > 0){

            extras.push({
                name: extraItem.dataset.extraName,
                price: parseInt(extraItem.dataset.extraPrice),
                quantity: extraQty
            });

        }

    });

    const note = getCardNote(card);

    const subtotal = calculateSubtotal(
        basePrice,
        quantity,
        extras
    );

    const key = generateKey({ id, portion });

    const item = {
        id,
        key,
        name,
        portion,
        quantity,
        price: basePrice,
        included,
        extras,
        note,
        subtotal
    };

    const existingIndex = cart.findIndex(
        product => product.key === key
    );

    const isNewAddition = quantity > 0 && existingIndex === -1;

    if(quantity <= 0){

        if(existingIndex !== -1){

            cart.splice(existingIndex, 1);

        }

    }else{

        if(existingIndex !== -1){

            cart[existingIndex] = item;

        }else{

            cart.push(item);

        }

    }

    card.classList.toggle("in-cart", quantity > 0);

    saveCart();

    updateTotals();

    updateOrderModal();

    if(isNewAddition){
        showToast(`${name} ajout\u00E9 au panier \u{1F6D2}`);
    }

}

/* ========================= */
/* VALIDATION DES INFOS CLIENT */
/* ========================= */

function validateCustomerInfo(){

    if(!selectedServiceType){
        alert("Choisissez un mode de commande (Livraison, Sur place ou À emporter)");
        return false;
    }

    const info = getClientInfo();

    if(info.nom === ""){
        alert("Veuillez renseigner votre nom");
        return false;
    }

    if(info.tel === ""){
        alert("Veuillez renseigner votre téléphone");
        return false;
    }

    if(selectedServiceType === "livraison"){
        const lieu = document.getElementById("customerLocation").value.trim();
        if(lieu === ""){
            alert("Veuillez renseigner votre lieu de livraison");
            return false;
        }
    }

    if(selectedServiceType === "surplace"){
        const table = document.getElementById("customerTable").value.trim();
        if(table === ""){
            alert("Veuillez renseigner votre numéro de table");
            return false;
        }
    }

    if(selectedServiceType === "emporter"){
        const espace = document.getElementById("customerSeat").value.trim();
        if(espace === ""){
            alert("Veuillez renseigner votre espace d'attente");
            return false;
        }
    }

    return true;
}
/* ========================= */
/* SAUVEGARDE DES INFOS CLIENT */
/* ========================= */

function setupCustomerPersistence(){

    document.querySelectorAll(".customer-form input").forEach(input => {

        const key = "savane-" + input.id;

        input.value = localStorage.getItem(key) || "";

        input.addEventListener("input", () => {

            localStorage.setItem(
                key,
                input.value
            );

        });

    });

}

/* ========================= */
/* ENVOI WHATSAPP — message professionnel */
/* ========================= */

let isSendingOrder = false;

function buildOrderMessage(){

    const info = getClientInfo();

    const clientName = info.nom;

    const clientPhone = info.tel;

    const clientExtra = info.extra;

    const lines = [];

    lines.push(`\u{1F3EA} *${RESTAURANT_NAME.toUpperCase()}*`);
    lines.push(`\u{1F195} Nouvelle commande`);
    lines.push("");
    lines.push(`\u{1F464} *Client :* ${clientName}`);
    lines.push(`\u{1F4DE} *T\u00E9l\u00E9phone :* ${clientPhone}`);
    lines.push(`🚚 *Service :* ${info.type}`);
    lines.push(clientExtra);
    lines.push("");
    lines.push(`\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`);
    lines.push(`\u{1F37D}\uFE0F *D\u00C9TAIL DE LA COMMANDE*`);
    lines.push(`\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`);
    lines.push("");

    let grandTotal = 0;

    cart.forEach(item => {

        grandTotal += item.subtotal;

        lines.push(`\u{1F374} *${item.name}*`);

        if(item.portion){
            lines.push(`\u2022 Portion : ${item.portion}`);
        }

        lines.push(`\u2022 Quantit\u00E9 : ${item.quantity}`);

        if(item.included && item.included.length > 0){

            lines.push(`\u2022 Accompagnements : ${item.included.join(", ")}`);

        }

        if(item.extras && item.extras.length > 0){

            item.extras.forEach(extra => {
                lines.push(`\u2022 ${extra.name} x${extra.quantity} \u2014 ${formatPrice(extra.price * extra.quantity)}`);
            });

        }

        if(item.note && item.note.trim() !== ""){

            lines.push(`\u2022 \u{1F4DD} Pr\u00E9cision : ${item.note.trim()}`);

        }

        lines.push(`\u{1F4B0} Sous-total : ${formatPrice(item.subtotal)}`);
        lines.push("");
        lines.push(`\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`);
        lines.push("");

    });

    lines.push(`\u{1F4B5} *TOTAL : ${formatPrice(grandTotal)} CFA*`);
    lines.push("");
    lines.push(`Merci pour votre confiance ! \u{1F64F}`);

    return lines.join("\n");

}

sendOrderBtn.addEventListener("click", () => {

    if(isSendingOrder) return;

    // 1. Panier vide → alert et STOP, le modal ne s'ouvre pas
    if(cart.length === 0){
        alert("Votre commande est vide !");
        return;
    }

    // 2. Ouvre le modal seulement si le panier n'est pas vide
    cartModal.classList.add("active");
    document.body.style.overflow = "hidden";
    updateOrderModal();

    // 3. Vérifie le formulaire client
    if(!validateCustomerInfo()) return;

    // 4. Envoie la commande
    isSendingOrder = true;
    sendOrderBtn.disabled = true;
    sendOrderBtn.style.opacity = "0.7";
    sendOrderBtn.style.cursor = "not-allowed";

    const message = buildOrderMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    setTimeout(() => {
        isSendingOrder = false;
        sendOrderBtn.disabled = false;
        sendOrderBtn.style.opacity = "1";
        sendOrderBtn.style.cursor = "pointer";
    }, 2500);

});

/* ========================= */
/* SYNC CARDS — remet à zéro / restaure les quantités visibles */
/* ========================= */

function syncCards(){

    document.querySelectorAll(".menu-card").forEach(card => {

        const qtyEl = getQtyElement(card);

        if(qtyEl) qtyEl.textContent = 0;

        card.classList.remove("in-cart");

    });

    cart.forEach(item => {

        const card = document.querySelector(`.menu-card[data-id="${item.id}"]`);

        if(card){

            const qtyEl = getQtyElement(card);

            if(qtyEl) qtyEl.textContent = item.quantity;

            card.classList.toggle("in-cart", item.quantity > 0);

        }

    });

}

/* ========================= */
/* RESTORE CART — au chargement de la page */
/* ========================= */

function restoreCart(){

    if(cart.length === 0){

        updateTotals();

        return;

    }

    cart.forEach(item => {

        const card = document.querySelector(`.menu-card[data-id="${item.id}"]`);

        if(card){

            const qtyEl = getQtyElement(card);

            if(qtyEl) qtyEl.textContent = item.quantity;

            card.classList.toggle("in-cart", item.quantity > 0);

            const select = card.querySelector(".portion-select");

            if(select && item.price){

                select.value = item.price;

                updateCardLivePrice(card);

            }

            const checkboxes = card.querySelectorAll(".check-item input");

            checkboxes.forEach(check => {

                if(item.included.includes(check.value)){
                    check.checked = true;
                }

            });

            const extraItems = card.querySelectorAll(".extra-item");

            extraItems.forEach(extraItem => {

                const extraName = extraItem.dataset.extraName;

                const matchingExtra = item.extras.find(
                    extra => extra.name === extraName
                );

                if(matchingExtra){

                    extraItem.querySelector(".extra-value").textContent =
                    matchingExtra.quantity;

                }

            });

            const noteInput = card.querySelector(".note-input");

            if(noteInput && item.note){

                noteInput.value = item.note;

            }

        }

    });

    updateTotals();

    updateOrderModal();

}

/* ========================= */
/* MOBILE MENU BUTTON & SCROLL CUE */
/* ========================= */

function scrollToCategories(){

    const nav = document.getElementById("categoryScroll");

    if(nav){

        nav.scrollIntoView({
            behavior:"smooth"
        });

    }

}

if(mobileMenuBtn){
    mobileMenuBtn.addEventListener("click", scrollToCategories);
}

if(scrollCueBtn){
    scrollCueBtn.addEventListener("click", scrollToCategories);
}

/* ========================= */
/* ANIMATION D'ENTRÉE AU SCROLL (.is-visible) */
/* ========================= */

const cardObserver = new IntersectionObserver((entries, observerRef) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("is-visible");

            observerRef.unobserve(entry.target);

        }

    });

},{
    threshold:0.12
});

document.querySelectorAll(".menu-card").forEach(card => {

    cardObserver.observe(card);

});

/* ========================= */
/* PRÉVENTION DOUBLE-TAP ZOOM (mobile) */
/* ========================= */

let lastTouch = 0;

document.addEventListener("touchend", function(event){

    const now = (new Date()).getTime();

    if(now - lastTouch <= 300){
        event.preventDefault();
    }

    lastTouch = now;

}, false);

/* ========================= */
/* CATÉGORIE ACTIVE SELON LE SCROLL */
/* ========================= */

window.addEventListener("scroll", () => {

    let current = "";

    menuCategories.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        if(scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    categoryButtons.forEach(btn => {

        btn.classList.remove("active");

        if(btn.dataset.category === current){

            btn.classList.add("active");

        }

    });

});

/* ========================= */
/* SÉCURITÉ — sauvegarde avant fermeture */
/* ========================= */

window.addEventListener("beforeunload", () => {

    saveCart();

});

/* ========================= */
/* INITIALISATION GÉNÉRALE */
/* ========================= */

initRestaurantBranding();

setupFieldAccessibility();

setupCustomerPersistence();

restoreCart();

updateTotals();

updateOrderModal();

syncCards();

console.log(`${RESTAURANT_NAME.toUpperCase()} \u2014 MENU QR CODE PR\u00CAAT \u{1F1E8}\u{1F1EE}`);

