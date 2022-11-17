export function selectCampaignAction(campaign) {
  return {
    type: 'CAMPAIGN_SELECTED',
    payload: campaign
  };
}
