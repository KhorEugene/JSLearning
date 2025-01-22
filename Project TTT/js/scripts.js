// Select the <h1> element
const heading = document.querySelector("h1");

// Add an event listener to the heading.  When clicked, change the text color
heading.addEventListener("click", function() {
  // Toggle the text color between dark gray and blue
  if (heading.style.color === "blue") {
    heading.style.color = "#333"; // Back to dark gray
  } else {
    heading.style.color = "blue";
  }
});