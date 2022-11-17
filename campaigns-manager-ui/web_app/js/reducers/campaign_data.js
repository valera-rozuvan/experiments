export function CampaignDataReducer(state = null, action) {
  if (state === null) {
    return {};
  }

  switch (action.type) {
    case 'NEW_CAMPAIGN_DATA':
      let newState = {};

      // Copy old state.
      Object.keys(state).forEach((key) => {
        newState[key] = {
          labels: state[key].labels.map(label => label),
          datasets: state[key].datasets.map((dataset) => {
            const newDataset = Object.assign({}, dataset);
            newDataset.data = dataset.data.map(item => item);

            return newDataset;
          })
        };
      });

      // Add new data for specific campaign.
      newState[action.payload.campaignId] = action.payload.campaignData;

      return newState;
  }

  return state;
}
