//==================================================
// Function for mobile navbar menu toggling
//==================================================

const mobileNavBar = document.getElementById("mobile-nav");
const mobileNavButtons = document.querySelector(".nav-buttons");
const navBar = document.querySelector("nav");

mobileNavBar.addEventListener("click", () => {
  navBar.appendChild(mobileNavButtons);
  mobileNavButtons.classList.toggle("mobile");
});

//==================================================
// Functions for submiting shortened links
//==================================================

const userLinkInput = document.getElementById("user-link");
const shortenItBtn = document.getElementById("shorten-btn");

userLinkInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    userInputValidation();
  }
});

shortenItBtn.addEventListener("click", () => {
  userInputValidation();
});

//==================================================
// Main Function for shortening user links using
// shortening API api.shrtco.de
//==================================================

const linkShorteningSite = "https://api.shrtco.de/v2/shorten?url=";

function linkShorterer() {
  const userLink = userLinkInput.value;

  fetch(`${linkShorteningSite}${userLink}`, {
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((data) => {
      try {
        const shortenedLink = data.result.short_link3;

        // Creates new shortened link block
        function shortendLinkMaker() {
          const shortendLink = document.createElement("div");
          shortendLink.classList.add("shortend-link");

          const shortendLinkLeftSide = document.createElement("div");
          shortendLinkLeftSide.classList.add("shortend-link-left-side");

          const userLinkSubmited = document.createElement("input");
          userLinkSubmited.id = "user-link-submited";
          userLinkSubmited.type = "text";
          userLinkSubmited.value = userLinkInput.value;
          userLinkSubmited.readOnly = true;

          const shortendLinkRightSide = document.createElement("div");
          shortendLinkRightSide.classList.add("shortend-link-right-side");

          const shortenLink = document.createElement("a");
          shortenLink.href = `https://${shortenedLink}`;
          shortenLink.innerHTML = shortenedLink;

          const copyButton = document.createElement("input");
          copyButton.classList.add("copy-button");
          copyButton.type = "button";
          copyButton.value = "Copy";

          shortendLinkLeftSide.appendChild(userLinkSubmited);
          shortendLinkRightSide.appendChild(shortenLink);
          shortendLinkRightSide.appendChild(copyButton);
          shortendLink.appendChild(shortendLinkLeftSide);
          shortendLink.appendChild(shortendLinkRightSide);

          const shortendLinksSection = document.querySelector(".shortend-links");
          const firstShortendLink = document.querySelector(".shortend-link");

          // puts new block in the first place accordigly
          if (shortendLinksSection.childElementCount > 0) {
            shortendLinksSection.insertBefore(shortendLink, firstShortendLink);
          } else {
            shortendLinksSection.appendChild(shortendLink);
          }

          // copy buttons styling
          copyButton.addEventListener("click", () => {
            copyButtonReset();

            copyButton.style.backgroundColor = "#3b3054";
            copyButton.value = "Copied!";

            // for copying link to clipboard
            navigator.clipboard.writeText(shortenedLink);
          });
        }
        shortendLinkMaker();
        userInputReset();

        // alerting
      } catch (e) {
        alert("Please enter valid adress");
        console.log(e.message);
      }
    });
}

//==================================================
// User input bar reset function
//==================================================

function userInputReset() {
  userLinkInput.value = "";
}
userInputReset();

//==================================================
// Copy buttons reset styling function
//==================================================

function copyButtonReset() {
  const copyButtons = document.querySelectorAll(".copy-button");

  copyButtons.forEach((copyButton) => {
    copyButton.style.backgroundColor = "#2acfcf";
    copyButton.value = "Copy";
  });
}

//==================================================
// Function for checking empty user link input
// and activating main function
//==================================================

const userInput = document.querySelector(".user-input");

function userInputValidation() {
  if (userLinkInput.value == "") {
    userInput.classList.add("error");
  } else {
    userInput.classList.remove("error");
    linkShorterer();
  }
}
