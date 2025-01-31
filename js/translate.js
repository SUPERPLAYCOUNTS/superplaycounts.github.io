// Создаем кнопку для перевода
const translateButton = document.createElement('div');
translateButton.style.position = 'fixed';
translateButton.style.bottom = '20px';
translateButton.style.right = '20px';
translateButton.style.backgroundColor = '#007bff';
translateButton.style.color = 'white';
translateButton.style.padding = '10px 15px';
translateButton.style.borderRadius = '5px';
translateButton.style.cursor = 'pointer';
translateButton.style.zIndex = '1000';
translateButton.textContent = 'Translate';

// Добавляем кнопку на страницу
document.body.appendChild(translateButton);

// Обработчик события нажатия на кнопку
translateButton.addEventListener('click', () => {
  const languageSelector = document.createElement('div');
  languageSelector.style.position = 'fixed';
  languageSelector.style.bottom = '60px';
  languageSelector.style.right = '20px';
  languageSelector.style.backgroundColor = 'white';
  languageSelector.style.border = '1px solid #ddd';
  languageSelector.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
  languageSelector.style.borderRadius = '5px';
  languageSelector.style.zIndex = '1001';
  languageSelector.style.padding = '10px';

  const languages = [
    { code: 'RU', name: 'Русский' },
    { code: 'UK', name: 'Українська' },
    { code: 'PL', name: 'Polski' },
    { code: 'SK', name: 'Slovenský' },
  ];

  // Добавляем кнопки выбора языка
  languages.forEach((language) => {
    const button = document.createElement('button');
    button.style.width = '100%';
    button.style.padding = '10px';
    button.style.border = 'none';
    button.style.background = 'none';
    button.style.cursor = 'pointer';
    button.style.textAlign = 'left';
    button.textContent = language.name;

    // Обработчик выбора языка
    button.addEventListener('click', () => {
      const currentUrl = encodeURIComponent(window.location.href);
      const deeplUrl = `https://www.deepl.com/translator#en/${language.code}/${currentUrl}`;
      window.open(deeplUrl, '_blank');
      languageSelector.remove();
    });

    languageSelector.appendChild(button);
  });

  document.body.appendChild(languageSelector);
});
