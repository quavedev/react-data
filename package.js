/* global Package */

Package.describe({
  name: 'quave:react-data',
  summary: 'Utilities to manage data with React',
  version: '4.0.0',
  git: 'https://github.com/quavedev/react-data',
});

Package.onUse((api) => {
  api.versionsFrom('2.12');

  api.use('ecmascript');

  api.use('react-meteor-data@2.6.1');

  api.mainModule('react-data.js', 'client');
  api.mainModule('server.js', 'server');
});
