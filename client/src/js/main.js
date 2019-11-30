document.addEventListener("DOMContentLoaded", e => {
  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (document.getElementById("navbar") !== null) {
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0px";
      } else {
        document.getElementById("navbar").style.top = "-75px";
      }
      prevScrollpos = currentScrollPos;

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        document.getElementById("navbar").style.top = "0px";
      }
    }
    // When the user scrolls down 20px from the top of the document, show the button
    scrollFunction();
  };

  // To the top button
  // Get the button:
  const buttonToTop = document.getElementById("top-btn");

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      buttonToTop.style.display = "block";
    } else {
      buttonToTop.style.display = "none";
    }
  }
});
