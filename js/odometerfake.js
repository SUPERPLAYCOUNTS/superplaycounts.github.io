const channel = channelSubmitName.value;
const footertxt = footerSubmittext.value;
let count = 0;
let rate = 0;
let hotkey = "KeyQ";
let abbreviate = false;
const checkbox = document.getElementById("abbreviate");
const iconSelect = document.getElementById('icon-select');
const icon = document.getElementById('icon');

checkbox.addEventListener("change", function () {
  abbreviate = this.checked;
});

function submit() {
  const channel = channelSubmitName.value;
  const footertxt = footerSubmittext.value;
  count = parseInt(countSubmit.value, 10);
  document.title = `${channel} - Subscriber Count`;

  if (!channel) {
    return alert("Invalid channel name.");
  }
  if (typeof count === "undefined") {
    return alert("Count must be a number.");
  }
  if (count < -1e12 || count > 1e12) {
    return alert(
      "Count must be between -1 000 000 000 000 and 1 000 000 000 000."
    );
  }

  channelSubs.innerHTML = abbreviateCount(count, abbreviate);
  channelName.innerHTML = channel;
  footertext.innerHTML = footertxt;

  rate = parseInt(subsPerMinute.value, 10);

  if (rateOption.value == "mins") {
    rate = rate / 60; // convert rate from subs/minute to subs/second
  } else if (rateOption.value == "hrs") {
    rate = rate / 3600; // convert rate from subs/hour to subs/second
  }

  if (rate > 1e12 || rate < -1e12) {
    return alert(
      "Rate must be between -1 000 000 000 000 and 1 000 000 000 000."
    );
  }

  if (rateOption.value == "mins" && (rate > 1e9 / 60 || rate < -1e9 / 60)) {
    return alert(
      "Rate must be between -1 000 000 000 and 1 000 000 000 subscribers per minute."
    );
  }

  if (rateOption.value == "secs" && (rate > 1e9 || rate < -1e9)) {
    return alert(
      "Rate must be between -1 000 000 000 and 1 000 000 000 subscribers per second."
    );
  }

  if (rateOption.value == "hrs" && (rate > 1e9 / 3600 || rate < -1e9 / 3600)) {
    return alert(
      "Rate must be between -1 000 000 000 and 1 000 000 000 subscribers per hour."
    );
  }
}

iconSelect.addEventListener('change', (event) => {
  const selectedValue = event.target.value;
  if (selectedValue === 'youtube-icon') {
    icon.className = 'fa-brands fa-youtube';
    icon.style.color = '#ff0000';
  } else if (selectedValue === 'twitter-icon') {
    icon.className = 'fa-brands fa-twitter';
    icon.style.color = '#1DA1F2';
  } else if (selectedValue === 'twitter-x-icon') {
    icon.className = 'fa-brands fa-x-twitter';
  } else if (selectedValue === 'tiktok-icon') {
    icon.className = 'fa-brands fa-tiktok';
    icon.style.color = '#FE2C55';
  } else if (selectedValue === 'none-icon') {
    icon.className = '';
    icon.style.color = '';
  }
});

function updateSubs() {
  let updateInterval = 5000; // default update interval in milliseconds

  if (rateOption.value == "mins") {
    updateInterval = 30000; // update every 30 seconds
  } else if (rateOption.value == "hrs") {
    updateInterval = 1800000; // update every 30 minutes
  }

  if (rate > 1e9 || rate < -1e9) return;

  count += rate * (updateInterval / 1000);
  channelSubs.innerHTML = abbreviateCount(Math.floor(count));
}

function abbreviateCount(count) {
  if (!abbreviate) {
    return Math.round(count);
  }

  if (Math.abs(count) < 1e3) {
    return Math.round(count);
  }

  const t = Math.sign(count);
  e = Math.abs(count);
  const a = Math.floor(Math.log10(count));
  return t * (Math.floor(count / 10 ** (a - 2)) * 10 ** (a - 2));
}

setInterval(updateSubs, 5000); // default update interval in milliseconds

let uploadbutton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let chosenBanner = document.getElementById("chosen-banner");
let uploadbanner = document.getElementById("upload-banner");

uploadbutton.onchange = () => {
  let reader = new FileReader();
  reader.readAsDataURL(uploadbutton.files[0]);
  console.log(uploadbutton.files[0]);
  reader.onload = () => {
    chosenImage.setAttribute("src", reader.result);
  };
};

function setImage() {
  let imageUrl = document.getElementById("upload-img-url").value;
  let bannerUrl = document.getElementById("upload-banner-url").value;

  let chosenImage = document.getElementById("chosen-image");
  let chosenBanner = document.getElementById("chosen-banner");

  if (!imageUrl) {
    let imageFile = uploadbutton.files[0];
    if (imageFile) {
      let reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        chosenImage.setAttribute("src", reader.result);
      };
    } else {
      chosenImage.src = '';
    }
  } else {
    chosenImage.src = imageUrl;
  }

  if (!bannerUrl) {
    let bannerFile = uploadbanner.files[0];
    if (bannerFile) {
      let reader = new FileReader();
      reader.readAsDataURL(bannerFile);
      reader.onload = () => {
        chosenBanner.setAttribute("src", reader.result);
      };
    } else {
      chosenBanner.src = '';
    }
  } else {
    chosenBanner.src = bannerUrl;
  }
}

uploadbanner.onchange = () => {
  let reader = new FileReader();
  reader.readAsDataURL(uploadbanner.files[0]);
  console.log(uploadbanner.files[0]);
  reader.onload = () => {
    chosenBanner.setAttribute("src", reader.result);
  };
};


var knopka = document.getElementById("push");
knopka.addEventListener("click", func1);

function func1() {
  var shadow = document.getElementById("settings");
  if (shadow.style.display !== "none") {
    shadow.style.display = "none";
  } else {
    shadow.style.display = "block";
  }
}

function changeHotkey() {
  alert("Click what key you want.");
  document.addEventListener(
    "keydown",
    function (e) {
      alert("Key set to " + e.key);
      hotkey = e.code;
      document.getElementById("setting").innerText = "Current: " + e.key;
    },
    { once: true }
  );
}

document.addEventListener("keydown", function (event) {
  if (event.code === hotkey) {
    var shadow = document.getElementById("settings");
    if (shadow.style.display !== "none") {
      shadow.style.display = "none";
    } else {
      shadow.style.display = "block";
    }
  }
});
