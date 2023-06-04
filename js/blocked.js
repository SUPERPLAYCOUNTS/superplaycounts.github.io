fetch('https://ipinfo.io/json')
.then(function(response) {
  return response.json();
})
.then(function(data) {
  var country = data.country;
  if (country === 'RU' || country === 'UA' || country === 'PL') {
    window.stop();
    document.documentElement.innerHTML = '<h1>Access denied from your country.</h1>';
  }
});
