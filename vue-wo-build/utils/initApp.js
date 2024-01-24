function initApp(rootId, rootComponent) {
  let resolve;
  let reject;

  new Promise((_res, _rej) => {
    resolve = _res;
    reject = _rej;
  });

  let app = null;

  try {
    app = Vue.createApp(rootComponent);
  } catch (err) {
    return reject('Vue createApp() function failed');
  }

  let appInstance = null;

  try {
    appInstance = app.mount(`#${rootId}`);
  } catch (err) {
    return reject('Vue app.mount() function failed');
  }

  if (!appInstance) {
    return reject('Vue could not instantiate an app');
  }

  // if we got here - all is good; make sure to resolve the promise, before returning it
  return resolve();
}

export {
  initApp
};
