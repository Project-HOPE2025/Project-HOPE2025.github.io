/* --------------------------------------------
   Project HOPE — Pads for Dignity
   Final Script (v1.1) - Urgency Widget Added
   -------------------------------------------- */

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Project HOPE site loaded successfully.");

  // ---- POPUP CONFIRMATION (Styling matches CSS colors) ----
  function showPopup(message) {
    let popup = document.createElement("div");
    popup.textContent = message;
    
    // Using CSS variable color
    const orangeColor = window.getComputedStyle(document.body).getPropertyValue('--color-orange') || '#D9702F'; 
    
    // Style the popup
    popup.style.position = "fixed";
    popup.style.bottom = "25px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.background = orangeColor;
    popup.style.color = "white";
    popup.style.padding = "10px 20px";
    popup.style.borderRadius = "25px";
    popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    popup.style.fontSize = "0.95rem";
    popup.style.zIndex = "2000";
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.3s ease-in-out";
    
    document.body.appendChild(popup);

    // Show the popup
    setTimeout(() => {
      popup.style.opacity = "1";
    }, 10);

    // Hide and remove the popup after 2 seconds
    setTimeout(() => {
      popup.style.opacity = "0";
      // Wait for transition to finish before removal
      setTimeout(() => {
        popup.remove();
      }, 300); 
    }, 2000);
  }

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
      // Using document.execCommand('copy') for better iframe compatibility
      const textarea = document.createElement('textarea');
      textarea.value = address;
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
            showPopup("✅ Wallet address copied!");
        } else {
            showPopup("❌ Copy failed. Try again.");
        }
      } catch (err) {
        console.error("Copy failed (execCommand):", err);
        showPopup("❌ Copy failed. Try again.");
      }
      
      document.body.removeChild(textarea);

    });
  });

  // ----------------------------------------------------
  // ITEM 4 & 5: URGENCY WIDGET LOGIC (NEW)
  // ----------------------------------------------------

  // --- Countdown Timer Logic (100 days) ---
  function startCountdown() {
      // Sets the campaign end date 100 days from the hypothetical start of the campaign.
      // Date set to Mon, 3 Feb 2026, 00:00:00 GMT for consistent countdown
      const endDate = new Date('2026-02-03T00:00:00Z').getTime(); 
      const countdownEl = document.getElementById('countdown-timer');

      if (!countdownEl) return;

      const interval = setInterval(function() {
          const now = new Date().getTime();
          const distance = endDate - now;

          if (distance < 0) {
              clearInterval(interval);
              countdownEl.innerHTML = "CAMPAIGN ENDED";
              return;
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          
          // Format to ensure two digits
          const pad = (num) => num.toString().padStart(2, '0');

          countdownEl.innerHTML = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m`;

      }, 1000);
  }
  
  // --- Girls Supported Count-Up Logic (Starts from 1) ---
  function animateCountUp() {
      const countEl = document.getElementById('girls-supported-count');
      if (!countEl) return;

      // The animation starts at 1 (your requirement) and ends at the hardcoded value in HTML (100)
      let startValue = 1; 
      const endValue = parseInt(countEl.textContent.replace(/,/g, ''));
      // Duration of 2 seconds for a quick, impactful animation
      const duration = 2000; 
      const startTime = performance.now();

      function step(timestamp) {
          const progress = timestamp - startTime;
          const percentage = Math.min(progress / duration, 1);
          // Interpolate the value from 1 to the end value
          const currentValue = Math.floor(percentage * (endValue - startValue) + startValue);

          // Use toLocaleString for thousand separators
          countEl.textContent = currentValue.toLocaleString();

          if (percentage < 1) {
              requestAnimationFrame(step);
          } else {
              // Ensure the final number is the target number from the HTML
              countEl.textContent = endValue.toLocaleString(); 
          }
      }
      
      requestAnimationFrame(step);
  }

  // Execute the new widget logic
  startCountdown();
  animateCountUp();
});
