# NASA Picture of the Day Viewer

A web application that retrieves and displays NASA's Astronomy Picture of the Day (APOD). Users can select a date, view the image or video for that day, and save their search history. Built with HTML, CSS, and JavaScript.

![Demo Screenshot](./screenshot.png) <!-- Add a screenshot if available -->

---

## Features

- **Current Image of the Day**: Automatically displays the image or video for the current date when the page loads.
- **Date Selection**: Users can select a date using a form to view the APOD for that specific date.
- **Search History**: Saves past searches to local storage and displays them in a list.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

---

## How It Works

1. The application fetches data from NASA's APOD API (`https://api.nasa.gov/planetary/apod`).
2. Users can select a date using the form input.
3. The application checks if the selected date is valid (not in the future or before June 16, 1995).
4. If the date is valid, the image or video for that date is displayed.
5. The selected date is saved to local storage and added to the search history list.
6. Users can click on a past search to view the APOD for that date again.

---

## Technologies Used

- **HTML**: Structure of the web page.
- **CSS**: Styling and layout.
- **JavaScript**: Fetching data from the NASA API, handling user interactions, and managing local storage.
- **NASA APOD API**: Provides the data for the Astronomy Picture of the Day.

---

## Setup Instructions

### Prerequisites

1. **NASA API Key**: Get your API key from [https://api.nasa.gov](https://api.nasa.gov).
2. **Web Browser**: The application runs in any modern web browser.

### Steps to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nasa-apod-viewer.git
