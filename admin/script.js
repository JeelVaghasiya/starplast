// ═══════════════════════════════════════════
// Star Plast – Admin Panel JavaScript
// ═══════════════════════════════════════════

// API Configuration – Replace when backend is deployed
const API_BASE_URL = "https://script.google.com/macros/s/AKfycbx0e0xBd9YVf2WFgi0tDHCU611OJZrGqNFNT3JrFAXuQNTWL-mDKamkai-mj4xOECB6/exec"; // e.g. "https://your-project.supabase.co/rest/v1"
const API_KEY = "";

// ─── Sidebar Toggle ───
function initMobileNav() {
    const toggle = document.getElementById("sidebarToggle");
    const overlay = document.getElementById("sidebarOverlay");
    const sidebar = document.querySelector(".sidebar");

    if (!toggle || !sidebar) return;

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    if (overlay) {
        overlay.addEventListener("click", () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        });
    }

    // Close on link click
    sidebar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        });
    });
}

// ─── Color Toggle ───
// ─── Utility ───
function convertDriveUrl(url) {
    if (!url) return "";
    if (url.includes("drive.google.com")) {
        let id = "";
        const parts = url.split("/");
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === "d") id = parts[i + 1];
        }
        if (!id && url.includes("id=")) {
            id = url.split("id=")[1].split("&")[0];
        }
        return id ? `https://lh3.googleusercontent.com/u/0/d/${id}` : url;
    }
    return url;
}

function toggleColor(el) {
    el.classList.toggle("selected");
}

// ─── Dashboard Initialization ───
async function initDashboard() {
    const listContainer = document.getElementById("productListContainer");
    if (!listContainer) return;

    if (!API_BASE_URL) {
        listContainer.innerHTML = '<p style="color:#666; padding:20px;">API URL not set. Cannot load products.</p>';
        return;
    }

    listContainer.innerHTML = '<p style="color:#666; padding:20px;">Loading products...</p>';

    try {
        const res = await fetch(API_BASE_URL);
        const data = await res.json();

        if (data && data.length > 0) {
            listContainer.innerHTML = '';
            data.forEach(product => {
                const getVal = (key) => product[key] || product[key.toLowerCase()] || "";
                const finalId = product.id || product.ID || product.Id || "";

                const imgUrl = convertDriveUrl(getVal("primaryImage"));

                const row = document.createElement("div");
                row.className = "table-row";
                row.id = `row-${finalId}`;
                row.innerHTML = `
                    <div class="product-cell">
                        <div class="product-thumb" style="background-image: url('${imgUrl}'); background-size: contain; background-repeat: no-repeat; background-position: center;"></div>
                        <div>
                            <div class="product-name">${getVal("name") || 'Unnamed Product'}</div>
                            <div class="product-subtitle">${getVal("category") || ''}</div>
                        </div>
                    </div>
                    <div class="actions-cell">
                        <a href="edit-product.html?id=${finalId}" class="action-btn" title="Edit">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </a>
                        <button class="action-btn delete" onclick="deleteProduct('${finalId}')" title="Delete">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                `;
                listContainer.appendChild(row);
            });
        } else {
            listContainer.innerHTML = '<p style="color:#666; padding:20px;">No products found in catalog.</p>';
        }
    } catch (e) {
        console.error("Dashboard Load Error:", e);
        listContainer.innerHTML = '<p style="color:red; padding:20px;">Failed to load products. Check console or endpoint permissions.</p>';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Mobile Nav
    initMobileNav();

    // If we are on index.html
    if (document.getElementById("productListContainer")) {
        initDashboard();
    }

    // If we are on edit-product.html (check for productId input)
    const productIdInput = document.getElementById("productId");
    if (productIdInput) {
        const urlParams = new URLSearchParams(window.location.search);
        const editId = urlParams.get('id');
        if (editId) {
            loadProductDetails(editId);
        }
    }
});

// ─── Load Product Details for Editing ───
async function loadProductDetails(id) {
    if (!API_BASE_URL) return;

    try {
        const res = await fetch(API_BASE_URL);
        const data = await res.json();
        console.log("Fetched products:", data);
        const product = data.find(p => {
            const pid = p.id || p.ID || p.Id || "";
            return String(pid).trim() === String(id).trim();
        });

        if (product) {
            console.log("Found product for edit:", product);
            const getVal = (key) => product[key] || product[key.toLowerCase()] || "";

            const productIdInput = document.getElementById("productId");
            const finalId = product.id || product.ID || product.Id || "";
            if (productIdInput) productIdInput.value = finalId;

            const displayIdEl = document.getElementById("displayId");
            if (displayIdEl) displayIdEl.innerText = finalId;

            document.getElementById("productName").value = getVal("name");
            document.getElementById("productDesc").value = getVal("description");
            document.getElementById("primaryImage").value = getVal("primaryImage");

            // Clean capacity (remove 'L' if present)
            let rawCapacity = getVal("capacity");
            if (typeof rawCapacity === 'string') rawCapacity = rawCapacity.replace(/[Ll]/g, '').trim();
            document.getElementById("capacity").value = rawCapacity;

            // Parse colors
            let primaryColorHex = "#E5E7EB";
            const rawColors = getVal("colors");
            const colorsArray = rawColors ? String(rawColors).split(';') : [];
            const variantColors = [];

            colorsArray.forEach((c, idx) => {
                const parts = c.split(':');
                const hex = parts.length > 1 ? parts[1] : parts[0];
                if (idx === 0) {
                    primaryColorHex = hex;
                } else {
                    variantColors.push(hex);
                }
            });

            const primaryColorInput = document.getElementById("primaryImageColor");
            if (primaryColorInput) {
                primaryColorInput.value = primaryColorHex;
                primaryColorInput.parentElement.style.backgroundColor = primaryColorHex;
            }

            // Parse additional images
            const rawAddImages = getVal("additionalImages");
            const additionalImages = rawAddImages ? String(rawAddImages).split(';') : [];
            const additionalContainer = document.getElementById("additionalImages");
            if (additionalImages.length > 0 && additionalContainer) {
                additionalContainer.innerHTML = ''; // clear default empty row
                additionalImages.forEach((img, idx) => {
                    const colorHex = variantColors[idx] || "#E5E7EB";

                    const row = document.createElement("div");
                    row.className = "url-row";
                    row.style.display = "flex";
                    row.style.gap = "10px";
                    row.style.marginBottom = "10px";
                    row.innerHTML = `
                        <label class="custom-color-btn" style="background-color: ${colorHex};" title="Select color for this image">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17.5 2.5a2.121 2.121 0 0 1 3 3L12 14l-4 1 1-4 8.5-8.5z"/>
                                <path d="M7 17l-4 4L7 17z"/>
                            </svg>
                            <input type="color" class="additional-color-picker" value="${colorHex}" oninput="this.parentElement.style.backgroundColor = this.value;" />
                        </label>
                        <input type="text" value="${img}" style="flex:1;" />
                        <button class="btn btn-outline" style="padding:10px 14px; font-size:12px;" onclick="this.parentElement.remove()">
                            Remove
                        </button>
                    `;
                    additionalContainer.appendChild(row);
                });
            }

            // Parse weights
            const rawWeight = product.weight || product.Weight || product.weight || "";
            const weightsArray = rawWeight ? String(rawWeight).split(';') : [];
            const weightContainer = document.getElementById("weightContainer");
            if (weightsArray.length > 0 && weightContainer) {
                weightContainer.innerHTML = ''; // clear default empty row
                weightsArray.forEach((w) => {
                    const cleanWeight = w.replace(/[Gg]/g, '').trim();
                    // Don't create row if weight is empty string or effectively zero
                    if (cleanWeight === "" || cleanWeight === "0") return;

                    const row = document.createElement("div");
                    row.className = "input-with-suffix weight-row";
                    row.style.marginBottom = "8px";
                    row.innerHTML = `
                        <input type="number" class="weight-input" value="${cleanWeight}" />
                        <span class="suffix">grams</span>
                        <button class="btn btn-outline" style="padding:8px 12px; font-size:12px; border-radius:0 8px 8px 0; border-left:none;" onclick="this.parentElement.remove()">
                            Remove
                        </button>
                    `;
                    const suffix = row.querySelector("span.suffix");
                    if (suffix) suffix.style.borderRadius = "0";
                    weightContainer.appendChild(row);
                });
            }
        }
    } catch (e) {
        console.error("Error loading product details:", e);
    }
}

// ─── Add Image URL Row ───
function addImageUrl() {
    const container = document.getElementById("additionalImages");
    if (!container) return;

    const row = document.createElement("div");
    row.className = "url-row";
    row.style.display = "flex";
    row.style.gap = "10px";
    row.style.marginBottom = "10px";
    row.innerHTML = `
    <label class="custom-color-btn" style="background-color: #E5E7EB;" title="Select color for this image">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17.5 2.5a2.121 2.121 0 0 1 3 3L12 14l-4 1 1-4 8.5-8.5z"/>
            <path d="M7 17l-4 4L7 17z"/>
        </svg>
        <input type="color" class="additional-color-picker" value="#E5E7EB" oninput="this.parentElement.style.backgroundColor = this.value;" />
    </label>
    <input type="text" placeholder="https://example.com/image.jpg" style="flex:1;" />
    <button class="btn btn-outline" style="padding:10px 14px; font-size:12px;" onclick="this.parentElement.remove()">
      Remove
    </button>
  `;
    container.appendChild(row);
}

// ─── Add Weight Row ───
function addWeightRow() {
    const container = document.getElementById("weightContainer");
    if (!container) return;

    const row = document.createElement("div");
    row.className = "input-with-suffix weight-row";
    row.style.marginBottom = "8px";
    row.innerHTML = `
        <input type="number" class="weight-input" placeholder="850" />
        <span class="suffix">grams</span>
        <button class="btn btn-outline" style="padding:8px 12px; font-size:12px; border-radius:0 8px 8px 0; border-left:none;" onclick="this.parentElement.remove()">
            Remove
        </button>
    `;

    // adjust previous input rounding inside new row
    row.querySelector("span.suffix").style.borderRadius = "0";

    container.appendChild(row);
}

// ─── Save Product ───
function saveProduct() {
    const name = document.getElementById("productName")?.value || "";
    const desc = document.getElementById("productDesc")?.value || "";
    const primaryImage = document.getElementById("primaryImage")?.value || "";
    const capacity = document.getElementById("capacity")?.value || "";
    const weight = document.getElementById("weight")?.value || "";

    if (!name) {
        alert("Product Name is required!");
        return;
    }

    const primaryImageColor = document.getElementById("primaryImageColor")?.value || "#E5E7EB";

    // Gather additional image URLs and their colors
    const additionalRows = document.querySelectorAll("#additionalImages .url-row");
    const additionalImages = [];
    const colors = [];

    // Push primary image color
    if (primaryImage.trim() !== "") {
        colors.push(`Color:${primaryImageColor}`);
    } else {
        colors.push(`Default:${primaryImageColor}`);
    }

    Array.from(additionalRows).forEach((row, idx) => {
        const urlInput = row.querySelector("input[type='text']");
        const colorInput = row.querySelector("input[type='color']");
        const url = urlInput ? urlInput.value.trim() : "";
        const color = colorInput ? colorInput.value : "#E5E7EB";

        if (url !== "") {
            additionalImages.push(url);
            colors.push(`Color:${color}`);
        }
    });

    // Gather weights
    const weightInputs = document.querySelectorAll(".weight-row .weight-input");
    const weights = [];
    weightInputs.forEach(input => {
        if (input.value.trim() !== "") {
            weights.push(input.value.trim() + "g");
        }
    });

    const existingId = document.getElementById("productId")?.value;
    const isEdit = existingId && existingId.trim() !== "";

    const product = {
        id: isEdit ? existingId.trim() : "prod-" + Date.now().toString(36),
        name,
        description: desc,
        primaryImage,
        additionalImages: additionalImages.join(';'),
        capacity: capacity ? parseFloat(capacity) : 0,
        weight: weights.length > 0 ? weights.join(';') : "",
        colors: colors.join(';'),
    };

    console.log("Saving product:", product);

    if (!API_BASE_URL) {
        alert("Product saved locally (demo mode).\nConnect a backend API to persist data.");
        return;
    }

    const btn = document.querySelector('button[onclick="saveProduct()"]');
    if (btn) {
        btn.innerHTML = "Saving...";
        btn.disabled = true;
    }

    // POST / PUT to backend
    fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: JSON.stringify(product),
    })
        .then(res => res.json())
        .then((data) => {
            if (data.status === 'success') {
                alert("Product saved successfully!");
                window.location.href = "index.html";
            } else {
                throw new Error(data.message || "Unknown error");
            }
        })
        .catch((err) => {
            console.error("Save error:", err);
            alert("Error saving product: " + err.message);
            if (btn) {
                btn.innerHTML = isEdit ? "Save Changes" : "Save Product";
                btn.disabled = false;
            }
        });
}

// ─── Delete Product ───
function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const row = document.getElementById(`row-${id}`);

    if (!API_BASE_URL) {
        if (row) row.remove();
        return;
    }

    const deleteBtn = row ? row.querySelector('.action-btn.delete') : null;
    if (deleteBtn) deleteBtn.disabled = true;

    fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: 'delete', id: id }),
    })
        .then(res => res.json())
        .then((data) => {
            if (data.status === 'success') {
                if (row) row.remove();
            } else {
                alert("Error from server: " + data.message);
                if (deleteBtn) deleteBtn.disabled = false;
            }
        })
        .catch((err) => {
            console.error("Delete error:", err);
            alert("Network error deleting product.");
            if (deleteBtn) deleteBtn.disabled = false;
        });
}
