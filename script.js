/* --------------------------------------------
   Project HOPE — Pads for Dignity
   Final Script (v1.0) - GitHub/Vercel Ready
   -------------------------------------------- */

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Project HOPE site loaded successfully.");

  // --- NEW: METRIC WIDGET LOGIC (Countdown) ---

  /**
   * 1. LIVE COUNTDOWN TIMER
   */
  function setupCountdown() {
    // SET YOUR CAMPAIGN END DATE HERE
    const campaignEndDate = new Date("February 10, 2026 01:00:00").getTime();

    // Get elements
    const daysEl = document.getElementById("countdown-days");
    const hoursEl = document.getElementById("countdown-hours");
    const minsEl = document.getElementById("countdown-mins");
    const secsEl = document.getElementById("countdown-secs");

    // Helper function to add leading zero
    function formatTime(time) {
      return time < 10 ? `0${time}` : time;
    }

    // Update the countdown every second
    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = campaignEndDate - now;

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the countdown is over
      if (distance < 0) {
        clearInterval(timerInterval);
        daysEl.innerText = "00";
        hoursEl.innerText = "00";
        minsEl.innerText = "00";
        secsEl.innerText = "00";
        return;
      }

      // Update HTML
      daysEl.innerText = formatTime(days);
      hoursEl.innerText = formatTime(hours);
      minsEl.innerText = formatTime(minutes);
      secsEl.innerText = formatTime(seconds);
    }, 1000);
  }
  
  /**
   * 2. (NEW) PROGRESS BAR CALCULATOR
   */
  function setupProgressBar() {
    // Get all the elements needed
    const girlsSupportedEl = document.getElementById("girls-supported");
    const goalNumberEl = document.querySelector(".goal-number"); // In the adjacent card
    const progressBarEl = document.getElementById("progress-bar-inner");
    const percentageTextEl = document.getElementById("progress-percentage");

    // Check if all elements exist before running
    if (!girlsSupportedEl || !goalNumberEl || !progressBarEl || !percentageTextEl) {
      console.warn("Progress bar elements not found. Skipping calculation.");
      return;
    }

    try {
      // Read the numbers from the HTML, removing any commas
      const girlsSupported = parseFloat(girlsSupportedEl.innerText.replace(/,/g, '')) || 0;
      const goalNumber = parseFloat(goalNumberEl.innerText.replace(/,/g, '')) || 100000; // Default to 100k if not found

      let percentage = 0;
      if (goalNumber > 0) {
        percentage = (girlsSupported / goalNumber) * 100;
      }
      
      // Clamp the percentage between 0 and 100
      if (percentage > 100) percentage = 100;
      if (percentage < 0) percentage = 0;

      // Format the percentage string (e.g., "1.0%")
      const percentageString = percentage.toFixed(1) + "%";

      // Update the progress bar width and the percentage text
      progressBarEl.style.width = percentage + "%";
      percentageTextEl.innerText = percentageString;

    } catch (error) {
      console.error("Error calculating progress bar:", error);
    }
  }


  // --- RUN ALL SETUP FUNCTIONS ---
  setupCountdown();
  setupProgressBar(); // <-- Call the new progress bar function


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

  // ---- POPUP CONFIRMATION (Styling matches CSS colors) ----
  function showPopup(message) {
    let popup = document.createElement("div");
    popup.textContent = message;
    
    // Using CSS variable color
    const orangeColor = window.getComputedStyle(document.body).getPropertyValue('--color-orange') || '#D97A32'; 
    
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


