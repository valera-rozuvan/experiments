function domReady() {
  let resolve;
  let reject;

  const promise = new Promise((_res, _rej) => {
    resolve = _res;
    reject = _rej;
  });

  let domLoaded = false;

  if (document.readyState !== 'loading') {
    domLoaded = true;
    return resolve();
  }

  document.addEventListener('DOMContentLoaded', () => {
    domLoaded = true;
    resolve();
  });

  window.setTimeout(() => {
    if (domLoaded === false) {
      // we should have a loaded DOM in less than 1 second
      // if we got here, something went wrong
      // we will fail (reject) the promise

      return reject('DOM did not load under 1 second');
    }
  }, 1000)

  return promise;
}

export {
  domReady
};
