import React, { Component } from 'react';

import { BrowserRouter, Route, Link } from 'react-router-dom';

import { Advertiser } from '../components/advertiser';
import CampaignList from '../containers/campaign-list';
import CampaignDetails from '../containers/campaign-details';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Advertiser />
          <Route exact path="/" component={CampaignList} />
          <Route path="/details" component={CampaignDetails} />
        </div>
      </BrowserRouter>
    );
  }
}
