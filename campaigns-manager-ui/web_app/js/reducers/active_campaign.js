export function ActiveCampaignReducer(state = null, action) {
  switch (action.type) {
    case 'CAMPAIGN_SELECTED':
      return action.payload;
  }

  return state;
}
