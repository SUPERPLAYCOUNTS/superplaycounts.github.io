fetch('https://ipinfo.io/json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var country = data.country;
        var blockedCountries = [
            'AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ',
            'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BA', 'BW', 'BV', 'BR', 'IO',
            'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO',
            'KM', 'CG', 'CD', 'CR', 'CI', 'HR', 'CU', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG',
            'SV', 'GQ', 'ER', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE',
            'DE', 'GH', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HM', 'VA',
            'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO',
            'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU',
            'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MU', 'YT', 'MX', 'FM', 'MD',
            'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'AN', 'NC', 'NZ', 'NI', 'NE',
            'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL',
            'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'SH', 'KN', 'LC', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA',
            'SN', 'RS', 'SL', 'SG', 'SK', 'SB', 'SO', 'ZA', 'GS', 'ES', 'LK', 'SD', 'SR', 'SJ',
            'SE', 'CH', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TT', 'TN', 'TR', 'TM',
            'TC', 'TV', 'AE', 'UM', 'UY', 'UZ', 'VU', 'VE', 'VN', 'VG', 'VI', 'WF',
            'EH', 'YE', 'ZM', 'ZW'
        ];
    if (blockedCountries.includes(country)) {
      window.stop();
      document.body.remove();
      var iframe = document.createElement('iframe');
      iframe.src = '/blocked.html';
      iframe.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; z-index:999999; border:none;';
      document.documentElement.appendChild(iframe);
    }
});
