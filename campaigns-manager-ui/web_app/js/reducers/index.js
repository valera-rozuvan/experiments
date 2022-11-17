import { combineReducers } from 'redux';

import { CampaignReducer } from './campaign';
import { ActiveCampaignReducer } from './active_campaign';
import { CampaignDataReducer } from './campaign_data';

const rootReducer = combineReducers({
  campaigns: CampaignReducer,
  activeCampaign: ActiveCampaignReducer,
  campaignData: CampaignDataReducer
});

export { rootReducer };
