const API_KEY = "fHN8YGLq84OsDes1Sng2dzOKu5D3t89s3d8TTayz"; // Replace with your NASA API key
const BASE_URL = "https://api.nasa.gov/planetary/apod";

// DOM Elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById(
  "current-image-container"
);
const searchHistoryList = document.getElementById("search-history");

// Fetch and display the current image of the day on page load
window.onload = getCurrentImageOfTheDay;

// Function to fetch and display the current image of the day
async function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  const url = `${BASE_URL}?api_key=${API_KEY}&date=${currentDate}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayImage(data);
  } catch (error) {
    console.error("Error fetching current image:", error);
    currentImageContainer.innerHTML =
      "<p>Failed to fetch the image. Please try again later.</p>";
  }
}

// Function to fetch and display the image for a selected date
async function getImageOfTheDay(date) {
  const currentDate = new Date().toISOString().split("T")[0];
  const earliestDate = "1995-06-16"; // Earliest date supported by the API

  // Validate the selected date
  if (date > currentDate) {
    currentImageContainer.innerHTML =
      "<p>Please select a date on or before today.</p>";
    return;
  }
  if (date < earliestDate) {
    currentImageContainer.innerHTML = `<p>Please select a date on or after ${earliestDate}.</p>`;
    return;
  }
  const url = `${BASE_URL}?api_key=${API_KEY}&date=${date}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.code === 400 || data.error) {
      // Handle API errors (e.g., invalid date)
      currentImageContainer.innerHTML = `<p>Error: ${
        data.msg || "No data available for this date."
      }</p>`;
    } else {
      displayImage(data);
      saveSearch(date);
      addSearchToHistory(date);
    }
  } catch (error) {
    console.error("Error fetching image for selected date:", error);
    currentImageContainer.innerHTML =
      "<p>Failed to fetch the image. Please try again later.</p>";
  }
}


function displayImage(data) {
  if (data.media_type === "video") {
    currentImageContainer.innerHTML = `
      <h2>${data.title}</h2>
      <p>Today's is a video. <a href="${data.url}" target="_blank">Watch it here</a>.</p>
      <p>${data.explanation}</p>
    `;
  } else if (data.media_type === "image") {
    currentImageContainer.innerHTML = `
      <h2>Picture on ${data.date}</h2>
      <img src="${data.url}" alt="${data.title}">
      <h2>${data.title}</h2>
      <p>${data.explanation}</p>
    `;
  } else {
    currentImageContainer.innerHTML = `<p>No media available for this date.</p>`;
  }
}

// Function to save the search date to local storage
function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  if (!searches.includes(date)) {
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
}

// Function to add the search date to the search history list
function addSearchToHistory(date) {
  const listItem = document.createElement("li");
  listItem.textContent = date;
  listItem.addEventListener("click", () => {
    getImageOfTheDay(date);
  });
  searchHistoryList.appendChild(listItem);
}

// Function to load search history from local storage
function loadSearchHistory() {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.forEach((date) => addSearchToHistory(date));
}

// Event listener for the search form
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedDate = searchInput.value;
  getImageOfTheDay(selectedDate);
});

// Load search history when the page loads
loadSearchHistory();
