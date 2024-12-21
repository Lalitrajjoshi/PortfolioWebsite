// Simple form validation for contact form
function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    
    if (name === "" || email === "" || message === "") {
      alert("Please fill out all fields before submitting.");
      return false;
    }
    
    alert("Your message has been sent successfully!");
    return true;
  }
  