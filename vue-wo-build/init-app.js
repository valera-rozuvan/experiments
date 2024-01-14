function initApp() {
  let resolve;
  let reject;

  const promise = new Promise((_res, _rej) => {
    resolve = _res;
    reject = _rej;
  });

  let app = null;

  try {
    app = Vue.createApp({
      data: () => ({
        message: "Hello world"
      })
    });
  } catch (err) {
    return reject('Vue createApp() fn failed');
  }


  try {
    app.mount("#app");
  } catch (err) {
    return reject('app failed to mount');
  }

  return promise;
}

export {
  initApp
};
