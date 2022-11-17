var app = require('./index.js');

checkTranslations(app.name,
  'English', require('./i18n/en'),
  'French', require('./i18n/fr')
);
checkTranslations(app.name,
  'English', require('./i18n/en'),
  'German', require('./i18n/de')
);
checkTranslations(app.name,
  'English', require('./i18n/en'),
  'Italian', require('./i18n/it')
);
