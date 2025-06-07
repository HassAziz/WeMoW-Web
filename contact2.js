/* Email functionality*/
function sendContactEmail(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get form values
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let subject = document.getElementById("subject").value.trim();
  let message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all required fields!");
    return;
  }

  let submitButton = document.getElementById("submitButton");
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  // EmailJS parameters
  let params = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

  emailjs.send("service_55oc0q6", "template_n1mcfww", params)
    .then(function(response) {
      console.log("SUCCESS!", response.status, response.text);
      //alert("Email sent successfully!");
      showPopup('Email sent successfully!', true);
       document.querySelector('section.left .contactTitle').classList.add('expanded');
      submitButton.disabled = false;
      submitButton.textContent = "Send Email";
      document.getElementById("contactForm").reset(); // Reset form after success
    })
    .catch(function(error) {
      console.log("FAILED...", error);
      //alert("Failed to send email. Please try again later.");
      showPopup('Failed to send email. Email us at wemowmobile@gmail.com', false);
      submitButton.disabled = false;
      submitButton.textContent = "Send Email";
    });
}


function testo(event){
  event.preventDefault(); // Prevent form from refreshing the page
  showPopup('Email sent successfully!', true);
      submitButton.disabled = false;
      submitButton.textContent = "Send Email";
      document.getElementById("contactForm").reset(); // Reset form after success
      document.querySelector('section.left .contactTitle').classList.add('expanded');
}

function showPopup(message,success) {
  // Get the popup element and message element
  var popup = document.getElementById("popup");
  var popupMessage = document.getElementById("popup-message");

  popupMessage.textContent = message;

  if(success){
   popup.style.backgroundColor = '#A87B51'; 
  }

  else{
    popup.style.backgroundColor = '#C0392B'; 
  }

  // Show the popup
  popup.style.display = 'block';
  popup.classList.add('show'); // Add the "show" class for the slide-up effect



  
  // Hide the popup after 3 seconds
  setTimeout(function() {
    popup.classList.remove('show'); // Add the "show" class for the slide-up effect

    setTimeout(function() {
      popup.style.display = 'none'; // Then hide completely
    }, 300); // Match this with the transition duration in the CSS
  }, 3000); // Display for 3 seconds
}



  document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navLinks.contains(event.target) || hamburger.contains(event.target);
        
        if (!isClickInside && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});