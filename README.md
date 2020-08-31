# Walmart Cookie Toolkit

## About This Starter Template

This starter template provides a React (based on Create React App) Chrome extension that opens a popup when the extension icon is clicked. Also, when the "Open Full Page Portion" button is clicked within the popup, it will open the full page portion of the extension. This pattern is typically seen when you have a popup extension with a separate settings page, for example.

Popup and full page extensions work slightly different with React than with basic HTML / JS / CSS in that both the full page and the popup point to `index.html` (where the React app is) and the React app is then responsible for routing and rendering the respective page.

This template includes: React, React Router, Prettier, and Eslint.

## Running The Extension

1. Run `npm install` in the folder to install dependencies
2. Run `npm run dev` to start the development server (auto refreshes your extension on change)
3. Navigate to `chrome://extensions` in your browser
4. Ensure `Developer mode` is `enabled` (top right)
5. Click `Load unpacked` in the top left
6. Select the `/build` folder in this directory

After completing the above steps, you should see the developer, unpacked version appear in your extension list as well as the extension icon appear in your browser bar alongside the other extensions you may have installed.

To trigger the extension, simply click the extension icon.

Although you can still use `npm start` if you'd like to run the app like a normal CRA React app and outside of the Chrome ecosystem, it is not recommended as it will often require additional configuration and any specific Chrome APIs will likely not work. If you decide on this route, you'd need to run `npm run build` and then follow steps 3-6 above when you want to test as an unpacked extension as this will not update the build and refresh on every change.

### All Available Commands

- `npm run start` - (NOT RECOMMENDED) starts the normal CRA development server
- `npm run build` - create a production ready build
- `npm run postbuild` - copies required Chrome extension files after build has completed
- `npm run assemble` - creates a production ready build and zips all files needed to publish in the web store to `extension.zip`
- `npm run dev` - (RECOMMENDED) creates a development server that can be used for hot reloading inside the Google Chrome extension ecosystem (see steps 1-6 above)
- `npm run test` - runs any Jest tests you may have
- `npm run eject` - ejects out of Create React App (Not recommended)
- `npm run pretty` - runs prettier on the `/src` folder
- `npm run lint` - runs eslint on the `/src` folder

## Making Changes

Afer starting the dev server via `npm run dev`, changes will be automatically be rebuilt to `/build` via webpack and the unpacked Chrome extension will automatically be refreshed for you behind the scenes, meaning you don't need to press the refresh button on `chrome://extensions`. Note: you may need to re-toggle or refresh the popup / page to see actual UI changes reflected there after a rebuild (i.e. re-open it again by clicking the icon again).

## Extending The Template

Extending this template would be similar to working on any other Create React App React application. The core of the React app lives in the `/src` and is unopinionated in terms of how it's been setup, so have fun!

## Manifest Explained

There are 2 key sections of the manifest with this example template:

### Browser Action

```
  "browser_action": {
    "default_icon": {
      "32": "icon.png"
    },
    "default_popup": "index.html/#popup",
    "default_title": "Open Popup"
  }
```

This portion of the manifest is used to define how the browser action (extension icon) should behave. In this case, we tell it we want to use the `index.html` file, which is where the React app is rendered. You'll notice we specifically use `index.html/#popup` because the app uses hash routing. In order to have both a popup and full page, we need to provide the same React app to both, but tell it how to route to the proper component (i.e. either popup or full page) based on the hash.

Inside `components/app.js`, you'll see the following:

```
<Switch>
  <Route exact path="/" component={FullPage} />
  <Route exact path="/popup" component={Popup} />
</Switch>
```

This is where the routing happens and how the app knows to either render the popup or full page. If we we're to define a new route with path `/example`, it would render that component when we go to `index.html/#example`, for example. You'll also notice the full page just uses the base `/`, which means simply visiting `index.html` will render that component. This appears in the following code in `components/popup.js` (inside the popup component):

```
  const handleClick = () => {
    chrome.tabs.create({
      url: chrome.extension.getURL('/index.html'),
    });
  };
```

When the button on the popup is clicked, this function is called. It simply creates a new tab via the Chrome API and routes them to `index.html` and as mentioned above, since it includes no hash, it goes to the `/` route, which in this case is the full page component.

## Preparing to Publish

To prepare for publish, simply run `npm run assemble` which will kick off a production-ready build step and then zip all the contents to `extension.zip` in the folder root. This zip file will include all the files you need for your extension to be uploaded to the web store.

Note: if this isn't your first publish of your extension, make sure you bump up the verison number in the manifest (for example, `1.0.0` to `1.0.1`), as the web store will require a new version in every update you upload.
