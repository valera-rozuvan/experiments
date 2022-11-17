import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCampaignAction } from '../actions/select_campaign';
import { updateAllCampaignsAction } from '../actions/update_all_compaigns';
import { updateCampaignStateAction } from '../actions/update_campaign_state';
import { bindActionCreators } from 'redux';

class CampaignList extends Component {
  componentWillMount() {
    if (!this.props.campaignList || this.props.campaignList.length === 0) {
      axios.get('/api/campaigns')
        .then((response) => {
          this.props.getCampaigns(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.error(error.response.data);
          }
          console.error(error);
        });
    }
  }

  renderList() {
    return this.props.campaignList.map((campaign) => {
      return (
        <tr key={campaign.id}>
          <td>
            <span
              className={'badge badge-' + (campaign.status === 'ACTIVE' ? 'primary' : 'secondary')}
            >{campaign.status}</span>
          </td>
          <td>{campaign.name}</td>
          <td>{campaign.daily_budget}</td>
          <td>{campaign.total_budget}</td>
          <td>
            <div className="dropdown show">
              <button
                className="btn btn-secondary btn-sm dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Actions</button>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" href="#" onClick={(e) => {
                  const toggleState = (campaign.status === 'ACTIVE') ? 'deactivate' : 'activate';

                  axios.post(`/api/campaigns/${campaign.id}/${toggleState}`).then((data) => {
                    const newState = (campaign.status === 'ACTIVE') ? 'INACTIVE' : 'ACTIVE';

                    this.props.toggleCampaignState(campaign.id, newState);
                  });
                }}>
                  {(campaign.status === 'ACTIVE' ? 'Deactivate' : 'Activate')}
                </a>
                <a className="dropdown-item" href="#" onClick={(e) => {
                  this.props.selectCampaign(campaign);
                  this.props.history.push('/details');
                }}>
                  Stats
                </a>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Daily Budget</th>
                <th>Total Budget</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.renderList()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaignList: state.campaigns
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectCampaign: selectCampaignAction,
    getCampaigns: updateAllCampaignsAction,
    toggleCampaignState: updateCampaignStateAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);
