/* --------------------------------------------
   Project HOPE — Pads for Dignity
   Final Script (v1.0) - GitHub Ready
   -------------------------------------------- */

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Project HOPE site loaded successfully.");

  // ---- COPY WALLET ADDRESS FEATURE (Block 8) ----
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const address = button.getAttribute("data-address");
      if (!address) {
        showPopup("⚠️ Address not set!");
        return;
      }

      // Copy to clipboard
      navigator.clipboard.writeText(address).then(() => {
        showPopup("✅ Wallet address copied!");
      }).catch(err => {
        console.error("Copy failed:", err);
        showPopup("❌ Copy failed. Try again.");
      });
    });
  });

  // ---- POPUP CONFIRMATION ----
  function showPopup(message) {
    let popup = document.createElement("div");
    popup.textContent = message;
    
    // Style the popup (using hardcoded styles to keep them out of the main CSS)
    popup.style.position = "fixed";
    popup.style.bottom = "25px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.background = "var(--color-orange)"; /* Using a primary color */
    popup.style.color = "white";
    popup.style.padding = "10px 20px";
    popup.style.borderRadius = "25px";
    popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    popup.style.fontSize = "0.95rem";
    popup.style.zIndex = "2000";
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.3s ease";
    
    document.body.appendChild(popup);

    // Show and hide sequence
    setTimeout(() => (popup.style.opacity = "1"), 50);
    setTimeout(() => {
      popup.style.opacity = "0";
      setTimeout(() => popup.remove(), 300); // Remove after fade out
    }, 3000); // Show for 3 seconds
  }
});