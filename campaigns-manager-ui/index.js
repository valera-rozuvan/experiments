const express = require('express');

const enableLiveReload = require('./server/enable-livereload');

const RouteLogMiddleware = require('./server/middleware/route-log-middleware');
const CatchErrorMiddleware = require('./server/middleware/catch-error-middleware');

const Router = require('./server/router');

const app = express();
const port = 3000;

app.use(RouteLogMiddleware);

app.use('/static', express.static('web_app'));

app.get('/', Router.index);
app.get('/details', Router.index);

app.get('/api/campaigns', Router.campaigns);
app.get('/api/campaigns/:campaignId/stats', Router.campaignData);
app.get('/api/*', Router.unknownApiError);

app.post('/api/campaigns/:campaignId/activate', Router.activateCampaign);
app.post('/api/campaigns/:campaignId/deactivate', Router.deactivateCampaign);
app.post('/api/*', Router.unknownApiError);

app.get('/error', Router.error);
app.get('/*', Router.notFound);

app.use(CatchErrorMiddleware);

app.listen(port, (err) => {
  if (err) {
    console.log('Error while starting Express Server:');
    console.log(err);

    return;
  }

  console.log(`Express Server is listening on ${port}.`);
});

enableLiveReload();
