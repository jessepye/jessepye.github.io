// This script is optional and can be used to smooth scroll to the various sections of the page

document.addEventListener('DOMContentLoaded', function() {
  // Get all the links on the page
  const links = document.querySelectorAll('a');

  // Add a click event listener to each link
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      // Get the target element (the element the link is navigating to)
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      // Smooth scroll to the target element
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    });
  });
});
