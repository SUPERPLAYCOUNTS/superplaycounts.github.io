const channel = channelSubmitName.value;
let count = 0;
let rate = 0;

function submit() {
  const channel = channelSubmitName.value;
  count = parseInt(countSubmit.value, 10);

  if (!channel) {
    return alert("Invalid channel name.");
  }
  if (typeof count === "undefined") {
    return alert("Count must be a number.");
  }
  if (count < -1e12 || count > 1e12) {
    return alert("Count must be between -1 000 000 000 000 and 1 000 000 000 000.");
  }

  channelSubs.innerHTML = count;
  channelName.innerHTML = channel;

  rate = parseInt(subsPerMinute.value, 10);

  if (rateOption.value == "mins") {
    rate = rate / 60; // convert rate from subs/minute to subs/second
  } else if (rateOption.value == "hrs") {
    rate = rate / 3600; // convert rate from subs/hour to subs/second
  }

  if (rate > 1e12 || rate < -1e12) {
    return alert("Rate must be between -1 000 000 000 000 and 1 000 000 000 000.");
  }

  if (rateOption.value == "mins" && (rate > 1e9 / 60 || rate < -1e9 / 60)) {
    return alert("Rate must be between -1 000 000 000 and 1 000 000 000 subscribers per minute.");
  }

  if (rateOption.value == "secs" && (rate > 1e9 || rate < -1e9)) {
    return alert("Rate must be between -1 000 000 000 and 1 000 000 000 subscribers per second.");
  }

  if (rateOption.value == "hrs" && (rate > 1e9 / 3600 || rate < -1e9 / 3600)) {
    return alert("Rate must be between -1 000 000 000 and 1 000 000 000 subscribers per hour.");
  }
}

function updateSubs() {
  let updateInterval = 5000; // default update interval in milliseconds

  if (rateOption.value == "mins") {
    updateInterval = 30000; // update every 30 seconds
  } else if (rateOption.value == "hrs") {
    updateInterval = 1800000; // update every 30 minutes
  }

  if (rate > 1e9 || rate < -1e9) return;

  count += rate * (updateInterval / 1000);
  channelSubs.innerHTML = Math.floor(count);
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
         chosenImage.setAttribute("src",reader.result);
     }
}
function setImage() {
    let imageUrl = document.getElementById("upload-img-url").value;
    let bannerUrl = document.getElementById("upload-banner-url").value;
    
    let chosenImage = document.getElementById("chosen-image");
    let chosenBanner = document.getElementById("chosen-banner");
    
    chosenImage.src = imageUrl;
    chosenBanner.src = bannerUrl;
}
uploadbanner.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(uploadbanner.files[0]);
    console.log(uploadbanner.files[0]);
    reader.onload = () => {
        chosenBanner.setAttribute("src",reader.result);
    }
}


var knopka = document.getElementById ('push');
knopka.addEventListener('click',func1);
 
function func1() {
  var shadow = document.getElementById ('settings');
  if (shadow.style.display !== 'none'){
  	shadow.style.display="none";
  }else{
  	shadow.style.display="block";
  }
};

document.onkeyup = function(e) {
    if (e.which == 81) {
        var shadow = document.getElementById ('settings');
        if (shadow.style.display !== 'none'){
            shadow.style.display="none";
        }else{
            shadow.style.display="block";
        }
    }
}
function abb(count) {
    if (count < 1000) {
      return count.toString();
    }
    var exp = Math.floor(Math.log(count) / Math.log(1000));
    var base = Math.floor(count / Math.pow(1000, exp));
    var suffix = "";
    for (let i = 0; i < exp; i++) {
      suffix += "0";
    }
    return base + "," + suffix;
}
