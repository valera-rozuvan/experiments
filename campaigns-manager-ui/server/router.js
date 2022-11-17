const fs = require('fs');

const Router = {};

const projRoot = __dirname + '/..';

Router.index = (request, response) => {
  response.sendFile('index.html', { root: projRoot + '/web_app' });
};

Router.notFound = (request, response) => {
  response.sendFile('not_found.html', { root: projRoot + '/web_app' });
};

Router.error = (request, response) => {
  throw new Error('Throw new Error() test.');
};

Router.campaigns = (request, response) => {
  fs.readFile(__dirname + '/data/campaigns.json', 'utf8', (err, data) => {
    if (err) {
      throw new Error('Something went wrong while opening the file "data/campaigns.json".');
    }

    let outputObj;

    try {
      outputObj = JSON.parse(data);
    } catch (err) {
      throw new Error('The file "data/campaigns.json" is not a valid JSON.');
    }

    response.json(outputObj);
  });
};

Router.campaignData = (request, response) => {
  const campaignId = request.params.campaignId;

  if (!campaignId || campaignId.length === 0) {
    response.status(404);
    response.send('Please specify a valid campaign ID.');

    return;
  }

  fs.readFile(__dirname + `/data/${campaignId}/data.json`, 'utf8', (err, data) => {
    if (err) {
      throw new Error(`Something went wrong while opening the file "/data/${campaignId}/data.json".`);
    }

    let outputObj;

    try {
      outputObj = JSON.parse(data);
    } catch (err) {
      throw new Error(`The file "/data/${campaignId}/data.json" is not a valid JSON.`);
    }

    response.json(outputObj);
  });
};

Router.unknownApiError = (request, response) => {
  response.status(404);
  response.send('The API does not contain a "' + request.url + '" route.');
};

function toggleCampaignState(request, response, newCampaignState) {
  const campaignId = request.params.campaignId;

  if (!campaignId || campaignId.length === 0) {
    response.status(404);
    response.send('Please specify a valid campaign ID.');

    return;
  }

  fs.readFile(__dirname + '/data/campaigns.json', 'utf8', (err, data) => {
    if (err) {
      throw new Error('Something went wrong while opening the file "data/campaigns.json".');
    }

    let campaignsArr;

    try {
      campaignsArr = JSON.parse(data);
    } catch (err) {
      throw new Error('The file "data/campaigns.json" is not a valid JSON.');
    }

    let campaignFound = false;

    campaignsArr.some((campaign) => {
      if (campaign.id === campaignId) {
        campaign.status = newCampaignState;

        campaignFound = true;
        return true;
      }

      return false;
    });

    if (campaignFound === true) {
      fs.writeFile(__dirname + '/data/campaigns.json', JSON.stringify(campaignsArr), 'utf8', (error) => {
        if (error) {
          throw new Error('Something went wrong while writing the file "data/campaigns.json".');
        }

        const campaignState = (newCampaignState === 'ACTIVE') ? 'activated' : 'deactivated';

        response.status(200);
        response.json({
          message: `Campaign has been ${campaignState}`
        });
      });
    } else {
      response.status(404);
      response.send(`Campaign with ID "${campaignId}" not found.`);
    }
  });
}

Router.activateCampaign = (request, response) => {
  toggleCampaignState(request, response, 'ACTIVE');
};

Router.deactivateCampaign = (request, response) => {
  toggleCampaignState(request, response, 'INACTIVE');
};

module.exports = Router;
