const channelSubmitName = document.getElementById("channelSubmitName");
const footerSubmittext = document.getElementById("footerSubmittext");
const countSubmit = document.getElementById("countSubmit");
const channelSubs = document.getElementById("channelSubs");
const channelName = document.getElementById("channelName");
const footertext = document.getElementById("footertext");
const subsPerMinute = document.getElementById("subsPerMinute");
const rateOption = document.getElementById("rateOption");
const gainType = document.getElementById("gainType");
const uniformGainFields = document.getElementById("uniformGainFields");
const gaussianGainFields = document.getElementById("gaussianGainFields");
const legacyGainFields = document.getElementById("legacyGainFields");
const uniformMinRate = document.getElementById("uniformMinRate");
const uniformMaxRate = document.getElementById("uniformMaxRate");
const uniformGainPer = document.getElementById("uniformGainPer");
const gaussianMeanRate = document.getElementById("gaussianMeanRate");
const gaussianStandardDeviation = document.getElementById("gaussianStandardDeviation");
const gaussianGainPer = document.getElementById("gaussianGainPer");
const countSyncMode = document.getElementById("countSyncMode");
const countPlaybackButton = document.getElementById("countPlaybackButton");

let count = 0;
let rate = 0;
let hotkey = "KeyQ";
let abbreviate = false;
let isCountPaused = false;
const checkbox = document.getElementById("abbreviate");
const iconSelect = document.getElementById('icon-select');
const icon = document.getElementById('icon');

checkbox.addEventListener("change", function () {
  abbreviate = this.checked;
});

function isCountSyncEnabled() {
  return countSyncMode && countSyncMode.value === "sync";
}

function syncCountInput() {
  if (!isCountSyncEnabled()) return;
  countSubmit.value = Math.floor(count);
}

function updateCountSyncMode() {
  if (!countSyncMode) return;
  countSubmit.readOnly = isCountSyncEnabled();
  countSubmit.placeholder = isCountSyncEnabled()
    ? "Synced with live count"
    : "Channel subs";
  syncCountInput();
}

function updatePlaybackButton() {
  if (!countPlaybackButton) return;
  countPlaybackButton.setAttribute("aria-pressed", isCountPaused);
  countPlaybackButton.innerHTML = isCountPaused
    ? '<i class="fa-solid fa-play"></i> Play count'
    : '<i class="fa-solid fa-pause"></i> Pause count';
}

function toggleCountPlayback() {
  isCountPaused = !isCountPaused;
  updatePlaybackButton();
  saveAllSettings();
}

function getNumberInputValue(input, fallback = 0) {
  if (!input) return fallback;
  const value = parseFloat(input.value);
  return Number.isFinite(value) ? value : fallback;
}

function getPositiveInputValue(input, fallback) {
  const value = getNumberInputValue(input, fallback);
  return value > 0 ? value : fallback;
}

function getUniformRate() {
  const minimumRate = getNumberInputValue(uniformMinRate);
  const maximumRate = getNumberInputValue(uniformMaxRate);
  const min = Math.min(minimumRate, maximumRate);
  const max = Math.max(minimumRate, maximumRate);
  return min + Math.random() * (max - min);
}

function getGaussianRate() {
  const mean = getNumberInputValue(gaussianMeanRate);
  const standardDeviation = Math.max(0, getNumberInputValue(gaussianStandardDeviation));
  const randomA = Math.random() || Number.EPSILON;
  const randomB = Math.random();
  const normalSample = Math.sqrt(-2 * Math.log(randomA)) * Math.cos(2 * Math.PI * randomB);
  return mean + normalSample * standardDeviation;
}

function updateGainTypeFields() {
  if (!gainType) return;
  const selectedType = gainType.value;
  if (uniformGainFields) {
    uniformGainFields.style.display = selectedType === "uniform" ? "block" : "none";
  }
  if (gaussianGainFields) {
    gaussianGainFields.style.display = selectedType === "gaussian" ? "block" : "none";
  }
  if (legacyGainFields) {
    legacyGainFields.style.display = selectedType === "legacy" ? "block" : "none";
  }
}

function submit() {
  const channel = channelSubmitName.value;
  const footertxt = footerSubmittext.value;
  const submittedCount = parseFloat(countSubmit.value);
  count = Number.isFinite(submittedCount) ? submittedCount : count;
  document.title = `${channel || "Fake Counter"} - Subscriber Count`;

  if (!channel) {
    channelName.innerHTML = "Channel name";
  } else {
    channelName.innerHTML = channel;
  }
  
  if (isNaN(count)) {
    count = 0;
  }
  
  if (count < -1e15 || count > 1e15) {
    return alert(
      "Count must be between -1 000 000 000 000 000 and 1 000 000 000 000 000."
    );
  }

  channelSubs.innerHTML = abbreviateCount(count);
  syncCountInput();
  footertext.innerHTML = footertxt;

  rate = parseInt(subsPerMinute.value, 10) || 0;

  if (rateOption.value == "mins") {
    rate = rate / 60;
  } else if (rateOption.value == "hrs") {
    rate = rate / 3600;
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
    icon.style.color = '';
  } else if (selectedValue === 'tiktok-icon') {
    icon.className = 'fa-brands fa-tiktok';
    icon.style.color = '#FE2C55';
  } else if (selectedValue === 'none-icon') {
    icon.className = '';
    icon.style.color = '';
  }
});

function updateSubs() {
  if (isCountPaused) return;
  const selectedGainType = gainType ? gainType.value : "legacy";

  if (selectedGainType === "uniform") {
    const currentRate = getUniformRate();
    const gainPer = getPositiveInputValue(uniformGainPer, 60);
    if (currentRate > 1e9 || currentRate < -1e9) return;
    count += currentRate * (5 / gainPer);
    channelSubs.innerHTML = abbreviateCount(Math.floor(count));
    syncCountInput();
    return;
  }

  if (selectedGainType === "gaussian") {
    const currentRate = getGaussianRate();
    const gainPer = getPositiveInputValue(gaussianGainPer, 60);
    if (currentRate > 1e9 || currentRate < -1e9) return;
    count += currentRate * (5 / gainPer);
    channelSubs.innerHTML = abbreviateCount(Math.floor(count));
    syncCountInput();
    return;
  }

  if (isNaN(rate) || rate === 0) return;

  let updateInterval = 5000;

  if (rateOption.value == "mins") {
    updateInterval = 30000;
  } else if (rateOption.value == "hrs") {
    updateInterval = 1800000;
  }

  if (rate > 1e9 || rate < -1e9) return;

  count += rate * (updateInterval / 1000);
  channelSubs.innerHTML = abbreviateCount(Math.floor(count));
  syncCountInput();
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

setInterval(updateSubs, 5000);

let uploadbutton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let chosenBanner = document.getElementById("chosen-banner");
let uploadbanner = document.getElementById("upload-banner");

uploadbutton.onchange = () => {
  let reader = new FileReader();
  reader.readAsDataURL(uploadbutton.files[0]);
  reader.onload = () => {
    chosenImage.setAttribute("src", reader.result);
  };
};

uploadbanner.onchange = () => {
  let reader = new FileReader();
  reader.readAsDataURL(uploadbanner.files[0]);
  reader.onload = () => {
    chosenBanner.setAttribute("src", reader.result);
  };
};

function setImage() {
    let imageUrl = document.getElementById("upload-img-url").value;
    let bannerUrl = document.getElementById("upload-banner-url").value;
  
    if (imageUrl) {
      chosenImage.src = imageUrl;
    } else if (!uploadbutton.files[0]) {
      if(!chosenImage.src.startsWith('data:')){
           chosenImage.src = '';
      }
    }
  
    if (bannerUrl) {
      chosenBanner.src = bannerUrl;
    } else if (!uploadbanner.files[0]) {
      if(!chosenBanner.src.startsWith('data:')){
          chosenBanner.src = '';
      }
    }
}

function saveAllSettings() {
    const settings = {
        channelName: channelSubmitName.value,
        count: countSubmit.value,
        countSyncMode: countSyncMode ? countSyncMode.value : 'manual',
        isCountPaused: isCountPaused,
        gainType: gainType ? gainType.value : 'uniform',
        uniformMinRate: uniformMinRate ? uniformMinRate.value : '',
        uniformMaxRate: uniformMaxRate ? uniformMaxRate.value : '',
        uniformGainPer: uniformGainPer ? uniformGainPer.value : '60',
        gaussianMeanRate: gaussianMeanRate ? gaussianMeanRate.value : '',
        gaussianStandardDeviation: gaussianStandardDeviation ? gaussianStandardDeviation.value : '',
        gaussianGainPer: gaussianGainPer ? gaussianGainPer.value : '60',
        footerText: footerSubmittext.value,
        rate: subsPerMinute.value,
        rateOption: rateOption.value,
        abbreviate: abbreviate,
        icon: iconSelect.value,
        imageUrl: document.getElementById("upload-img-url").value,
        bannerUrl: document.getElementById("upload-banner-url").value,
        imageDataUrl: chosenImage.src.startsWith('data:') ? chosenImage.src : null,
        bannerDataUrl: chosenBanner.src.startsWith('data:') ? chosenBanner.src : null,
    };
    try {
        localStorage.setItem('fakeCounterSettings', JSON.stringify(settings));
    } catch (e) {
        console.error('Error saving settings to localStorage:', e);
    }
}

function applySettings(settings) {
    channelSubmitName.value = settings.channelName || '';
    countSubmit.value = settings.count || 0;
    if (countSyncMode) {
        countSyncMode.value = settings.countSyncMode || 'manual';
    }
    isCountPaused = settings.isCountPaused || false;
    if (gainType) {
        gainType.value = settings.gainType || (settings.rate ? 'legacy' : 'uniform');
    }
    if (uniformMinRate) uniformMinRate.value = settings.uniformMinRate || '';
    if (uniformMaxRate) uniformMaxRate.value = settings.uniformMaxRate || '';
    if (uniformGainPer) uniformGainPer.value = settings.uniformGainPer || '60';
    if (gaussianMeanRate) gaussianMeanRate.value = settings.gaussianMeanRate || '';
    if (gaussianStandardDeviation) gaussianStandardDeviation.value = settings.gaussianStandardDeviation || '';
    if (gaussianGainPer) gaussianGainPer.value = settings.gaussianGainPer || '60';
    footerSubmittext.value = settings.footerText || 'SUBSCRIBERS';
    subsPerMinute.value = settings.rate || '';
    rateOption.value = settings.rateOption || 'secs';
    checkbox.checked = settings.abbreviate || false;
    abbreviate = settings.abbreviate || false;
    iconSelect.value = settings.icon || 'youtube-icon';
    document.getElementById("upload-img-url").value = settings.imageUrl || '';
    document.getElementById("upload-banner-url").value = settings.bannerUrl || '';
    iconSelect.dispatchEvent(new Event('change'));
    chosenImage.src = settings.imageDataUrl || settings.imageUrl || '';
    chosenBanner.src = settings.bannerDataUrl || settings.bannerUrl || '';
    submit();
    updateCountSyncMode();
    updatePlaybackButton();
    updateGainTypeFields();
    setImage();
}

function loadAllSettings() {
    try {
        const savedSettings = localStorage.getItem('fakeCounterSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            applySettings(settings);
        }
    } catch (e) {
        console.error('Error loading settings from localStorage:', e);
    }
}

function exportSettingsToFile() {
    saveAllSettings();
    const settings = localStorage.getItem('fakeCounterSettings') || '{}';
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(JSON.parse(settings), null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "counter-settings.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function resetAllSettings() {
    if (confirm("Are you sure you want to reset all settings? This action cannot be undone.")) {
        try {
            localStorage.removeItem('fakeCounterSettings');
            alert('Settings have been reset.');
            location.reload();
        } catch (e) {
            console.error('Error resetting settings:', e);
            alert('Could not reset settings.');
        }
    }
}


document.addEventListener('DOMContentLoaded', loadAllSettings);
updatePlaybackButton();
updateGainTypeFields();
if (gainType) {
    gainType.addEventListener('change', () => {
        updateGainTypeFields();
        saveAllSettings();
    });
}
if (countSyncMode) {
    countSyncMode.addEventListener('change', updateCountSyncMode);
}
if (countPlaybackButton) {
    countPlaybackButton.addEventListener('click', toggleCountPlayback);
}
document.getElementById('export-button').addEventListener('click', exportSettingsToFile);

const importBtn = document.getElementById('import-button');
const fileInput = document.getElementById('import-file-input');
importBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const settings = JSON.parse(e.target.result);
            applySettings(settings);
            saveAllSettings();
            alert('Settings loaded successfully!');
        } catch (error) {
            alert('Error reading or parsing file.');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
});

document.getElementById('reset-settings-button').addEventListener('click', resetAllSettings);


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
  document.addEventListener("keydown", function (e) {
      alert("Key set to " + e.key);
      hotkey = e.code;
      document.getElementById("setting").innerText = "Current: " + e.key;
    }, { once: true });
}

document.addEventListener("keydown", function (event) {
  if (event.target.tagName.toLowerCase() === 'input') return;
  if (event.code === hotkey) {
    var shadow = document.getElementById("settings");
    if (shadow.style.display !== "none") {
      shadow.style.display = "none";
    } else {
      shadow.style.display = "block";
    }
  }
});
