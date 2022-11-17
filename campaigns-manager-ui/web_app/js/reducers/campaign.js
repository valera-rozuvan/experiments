export function CampaignReducer(state = null, action) {
  if (state === null) {
    return [];
  }

  switch (action.type) {
    case 'UPDATE_ALL_CAMPAIGNS':
      return action.payload;
    case 'UPDATE_CAMPAIGN_STATE':
      const newState = state.map(campaign => Object.assign({}, campaign));

      newState.some((campaign) => {
        if (campaign.id === action.payload.campaignId) {
          campaign.status = action.payload.newState;

          return true;
        }

        return false;
      });

      return newState;
  }

  return state;
}
