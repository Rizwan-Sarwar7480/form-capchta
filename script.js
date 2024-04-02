// Intel Input 
$("input#phone").intlTelInput({
        initialCountry: "auto",
        separateDialCode: false,
        formatOnDisplay: true,
        nationalMode: false,
        // allowDropdown: false,
        geoIpLookup: function(callback) {
            $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
            });
        },
        utilsScript: "../../build/js/utils.js?1562189064761",
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.3/js/utils.js",
        preferredCountries: [],
    });

function resetIntlTelInput() {
    if (typeof intlTelInputUtils !== 'undefined') { // utils are lazy loaded, so must check
        var currentText = telInput.intlTelInput("getNumber", intlTelInputUtils.numberFormat.E164);
        if (typeof currentText === 'string') { // sometimes the currentText is an object :)
            telInput.intlTelInput('setNumber', currentText); // will autoformat because of formatOnDisplay=true
        }
    }
}



// Custom Captcha
$(document).ready(function () {
      // Generate captcha on page load
      generateCaptcha();
      // Handle captcha refresh button click
      $("#refresh-captcha").click(function () {
        generateCaptcha();
        $("#captcha-input").val("");
      });
      // Handle form submit
      $("#captcha-form").submit(function (event) {
        event.preventDefault();

        // Validate captcha
        var captchaInput = $("#captcha-input").val();
        var captchaCode = sessionStorage.getItem("captchaCode");
        if (captchaInput != captchaCode) {
          alert("Invalid captcha code. Please try again.");
          generateCaptcha();
          $("#captcha-input").val("");
          return;
        }
        // Form validation successful, submit form
        alert("Form submitted successfully.");
        $("#captcha-form").trigger("reset");
        generateCaptcha();
      });

      // Define the function generateCaptcha()
      function generateCaptcha() {
        // Get the canvas element with ID captcha and create an instance of its canvas rendering context
        var a = $("#captcha")[0],
            b = a.getContext("2d");
          // Clear the canvas
          b.clearRect(0, 0, a.width, a.height);
          // Define the string of characters that can be included in the captcha
          var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
              e = "",
              g = -45,
              h = 45,
              i = h - g,
              j = 20,
              k = 30,
              l = k - j;
          // Generate each character of the captcha
          for (var m = 0; m < 4; m++) {
            // Select random letter from the pool to be part of the captcha
            var n = f.charAt(Math.floor(Math.random() * f.length));
            e += n;
            
            // Set up the text formatting
            b.font = j + Math.random() * l + "px Arial";
            b.textAlign = "center";
            b.textBaseline = "middle";
            
            // Set the color of the text
            b.fillStyle = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
        
            // Add the character to the canvas
            var o = g + Math.random() * i;
            b.translate(20 + m * 30, a.height / 2);
            b.rotate(o * Math.PI / 180);
            b.fillText(n, 0, 0);
            b.rotate(-1 * o * Math.PI / 180);
            b.translate(-(20 + m * 30), -1 * a.height / 2);
          }
          // Set the captcha code in session storage
          sessionStorage.setItem("captchaCode", e);
      }
    })



    // const abc = () => {
    //     debugger
    //     document.querySelector("#captcha-form").submit();
    // }