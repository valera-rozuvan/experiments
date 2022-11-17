export function updateCampaignStateAction(campaignId, newState) {
  return {
    type: 'UPDATE_CAMPAIGN_STATE',
    payload: {
      campaignId, newState
    }
  };
}
