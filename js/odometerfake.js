const channel = channelSubmitName.value;
let count = 0;
let rate = 0;
function submit() {
    const channel = channelSubmitName.value;
    count = parseInt(countSubmit.value, 10);
    if (!channel) {
        return alert("Invalid channel name.");
    } if (typeof count === "undefined") {
        return alert("Count must be a number.");
    } if (count < -1e12 || count > 1e12) {
        return alert( "Count must be between -1 000 000 000 000 and 1 000 000 000 000." );
    }
    channelSubs.innerHTML = count;
    channelName.innerHTML = channel;
    if (parseInt(subsPerMinute.value, 10)) {
        rate = parseInt(subsPerMinute.value, 10);
    } else {
        rate = 0;
    } if (rate > 1e9 || rate < -1e9) {
        return alert("Rate must be between -1 000 000 000 and 1 000 000 000.");
    }
}
function updateSubs() {
    if (rate > 1e9 || rate < -1e9) return;
    subsOdometer.innerHTML = Math.floor(count + rate / 80);
    count = count + rate / 80;
} setInterval(updateSubs, 2000); 

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
