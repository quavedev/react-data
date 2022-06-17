/* global Package */

Package.describe({
  name: 'quave:react-data',
  summary: 'Utilities to manage data with React',
  version: '2.0.1',
  git: 'https://github.com/quavedev/react-data',
});

Package.onUse((api) => {
  api.versionsFrom('2.5.6');

  api.use('ecmascript');

  api.use('react-meteor-data@2.4.0');
  api.use('quave:alert-react-tailwind@2.0.0');

  api.mainModule('react-data.js', 'client');
  api.mainModule('server.js', 'server');
});
