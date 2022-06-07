# quave:react-data

`quave:react-data` is a Meteor package that allows you to subscribe to publications and also call methods.

Features

- Call methods with await
- Subscribe to data with skip logic
- Deps array to resubscribe

## Why

Almost every Meteor application with React is using Subscriptions and Methods, so it's helpful to provide React Hooks ready to use in common cases.

## Installation

```sh
meteor add quave:react-data
```

## Usage

Both methods listed below rely on the idea of providing a single object to `Meteor.call` and also to `Meteor.subscribe` as the second parameter.

It means that you should send the data to the server putting in the arg field.

For example, instead of using `Meteor.call('myMethod', param1, param2);` you should do  `Meteor.call('myMethod', { param1, param2 });`. Of course, using the `method` provided instead of `Meteor.call`. 

The same for `Meteor.subscribe` but also using `useData` and in this case, as we have many ways to use it, you should use a named property called `arg` to send your arguments to the server.

We have decided this way because of our long experience with Meteor projects and as these calls are creating contracts (APIs) between the client and the server clear named objects are better in the long term than positional arguments. This will make your Meteor project more reliable in the long term and easier to maintain.

### `useMethod`

Return a `method` function that is async. You can call it with a method name and an argument.

Example:
```jsx
import { useMethod } from 'meteor/quave:react-data';

export const Snapshot = () => {
  const { method } = useMethod();

  const save = async () => {
    const snapshot = await method('saveSnapshot', {
      snapshot: {
        _id: snapshotId,
        items
      },
    });
    clear();
  };
  
  // continue to render...
}
```

### `useData`

Subscribe to a publication and find the data.

Example:
```jsx
import { useData } from 'meteor/quave:react-data';
import { useLoggedUser } from 'meteor/quave:logged-user-react';

export const Home = () => {
  const { loggedUser } = useLoggedUser();
  
  const {
    data: snapshots,
    loading
  } = useData({
    publicationName: 'mySnapshots',
    skip: !loggedUser,
    find: () => SnapshotsCollection.find({}, { sort: { at: -1 } }),
  });

  // continue to render...
}
```

A more complex example:
```jsx
import { useData } from 'meteor/quave:react-data';

export const Snapshot = () => {
  const navigate = useNavigate();
  const snapshotId = useParams()[RouteParams.SNAPSHOT_ID];

  const { data: snapshotItems } = useData({
    publicationName: 'mySnapshots',
    arg: { snapshotId },
    skip: !snapshotId,
    deps: [snapshotId],
    dataReturnWhenLoading: [],
    find: () =>
      SnapshotItemsCollection.find({ snapshotId }, { sort: { at: -1 } }),
  });

  // continue to render...
}
```

`shouldSkip` property is also available, it works like skip, but it is a function instead of a static property.

### Extra Features

In some cases is nice to inject some argument in all the method calls and subscribes, for example, providing the language from the client or timezone.

We export a method called `setGetAdditionalArgsFunction` so you can provide additional args for all the calls and subscribe in a single place.

Example:

```js
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createRoot } from 'react-dom/client';
import { App } from '../app/general/App';
import { setGetAdditionalArgsFunction } from 'meteor/quave:react-data';
import { getLanguage } from '../imports/infra/languages';

setGetAdditionalArgsFunction(() => {
  const language = getLanguage();
  return { filter: { language } };
});

Meteor.startup(() => {
  const root = createRoot(document.getElementById('app'));
  root.render(<App />);
});
```

## Limitations

This package uses internally to handle errors automatically in Method calls another quave package called `quave:alert-react-tailwind`. Since quave:alert-react-tailwind@2.0.0 we only React Router v6 or newer.

Feel free to open PRs changing this limitation if that affects you badly.

### License

MIT
