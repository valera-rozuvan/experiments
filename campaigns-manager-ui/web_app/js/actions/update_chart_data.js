export function updateChartDataAction(campaignId, campaignData) {
  return {
    type: 'NEW_CAMPAIGN_DATA',
    payload: {
      campaignId,
      campaignData
    }
  };
}
