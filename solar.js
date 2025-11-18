// --- Solar Savings Calculator (Updated 2025 Edition) ---
let userData = {};
let currentStep = 1;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// --- STEP 1 ---
function nextFrom1() {
  userData.buildingType = document.getElementById("buildingType").value;
  currentStep = 2;
  showScreen("dataEntry2");
}

// --- REGION INFO (STEP 2) ---
function showRegionInfo() {
  const region = document.getElementById("region").value;
  const infoBox = document.getElementById("regionInfo");

  const insolationData = {
     
    "Middle East": { level: 6.5, text: "Excellent solar potential — desert sun year-round ☀️" },
      "Central Asia": { 
    level: 5.0, 
    text: "High solar potential — strong sunshine across Kazakhstan, Uzbekistan & Turkmenistan ☀️⛰️" 
  },
    "North America": { level: 5.0, text: "Good sunlight availability in most states 🌤️" },
    "Europe": { level: 3.8, text: "Moderate sunlight — efficient systems still viable 🌦️" },
    "South Asia": { level: 5.5, text: "Strong sunlight, perfect for solar rooftops 🔆" },
    "East Asia": { level: 4.6, text: "Moderate sunlight — urban rooftops suitable 🌤️" },
    "Africa": { level: 6.0, text: "Outstanding exposure — among the best globally ☀️" },
    "South America": { level: 5.2, text: "Good solar resources in most areas 🌞" },
    "Australia": { level: 5.8, text: "High solar potential, one of the world leaders 🔆" },
  };

  if (insolationData[region]) {
    const { level, text } = insolationData[region];
    infoBox.innerHTML = `☀ Average solar potential: <b>${level} kWh/m²/day</b> — ${text}`;
  } else {
    infoBox.textContent = "";
  }
}

function nextFrom2() {
  userData.region = document.getElementById("region").value;
  if (!userData.region) {
    alert("Please select your region.");
    return;
  }
  currentStep = 3;
  showScreen("dataEntry3");
}

// --- STEP 3 ---
function nextFrom3() {
  userData.apartments = parseInt(document.getElementById("apartments").value);
  if (!userData.apartments || userData.apartments <= 0) {
    alert("Please enter a valid number of apartments.");
    return;
  }
  currentStep = 4;
  showScreen("dataEntry4");
}

// --- MAIN CALCULATION (STEP 4) ---
function calculate() {
  userData.bill = parseFloat(document.getElementById("bill").value);
  if (!userData.bill || userData.bill <= 0) {
    alert("Please enter a valid monthly bill.");
    return;
  }

  // --- Realistic Insolation Data (kWh/m²/day) ---
  const insolationMap = {
    "Middle East": 6.5,
     "Central Asia": 5.0,
    "North America": 5.0,
    "Europe": 3.8,
    "South Asia": 5.5,
    "East Asia": 4.6,
    "Africa": 6.0,
    "South America": 5.2,
    "Australia": 5.8,
  };

  // --- Region-based Cost per Apartment (USD, realistic 2025 est.) ---
  const costPerAptMap = {
    "Middle East": 1500, 
    "Central Asia": 1000,    // lower cost (high sunlight, lower install)
    "North America": 5000, // standard residential cost
    "Europe": 3000,
    "South Asia": 3500,
    "East Asia": 3800,
    "Africa": 4500,
    "South America": 4000,
    "Australia": 4000,
  };

  const insolation = insolationMap[userData.region] || 4.5;
  const costPerApt = costPerAptMap[userData.region] || 5000;

  // --- Core Parameters ---
  const consumptionPerApt = 300; // kWh/month
  const totalConsumption = consumptionPerApt * userData.apartments;

  // --- Estimate coverage based on insolation ---
  const baseInsolation = 4.5;
  const coverage = Math.min(1, 0.6 + (insolation - baseInsolation) / 4);

  // --- Calculate Results ---
  const annualSavings = userData.bill * 12 * coverage;
  const totalCost = costPerApt * userData.apartments;
  const payback = totalCost / annualSavings;
  const monthlySavings = annualSavings / 12;

  // --- Update UI ---
  document.getElementById("savings").textContent = annualSavings.toFixed(0);
  document.getElementById("cost").textContent = totalCost.toLocaleString();
  document.getElementById("payback").textContent = payback.toFixed(1);
  document.getElementById("monthly").textContent = monthlySavings.toFixed(0);

  const chartPercentage = (coverage * 100).toFixed(0);
  document.querySelector(".chart").style.background =
    `conic-gradient(#00b894 ${chartPercentage}%, #ddd ${chartPercentage}%)`;
  document.getElementById("chartPercent").textContent = chartPercentage + "%";

  showScreen("results");
}


// function sendReport() {
//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;

//   if (!name || !email) {
//     alert("Iltimos ism va email kiriting.");
//     return;
//   }

//   const templateParams = {
//     user_name: name,
//     user_email: email
//   };

//   emailjs.send("service_rp6zdon", "template_ymiz6ww", templateParams)
//     .then(function() {
//       alert("✅ Report jo‘natildi! Emailingizni tekshiring.");
//     }, function(error) {
//       alert("❌ Xatolik yuz berdi. Qayta urinib ko‘ring.");
//       console.log(error);
//     });
// }

