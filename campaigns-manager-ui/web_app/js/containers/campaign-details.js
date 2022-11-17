import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from 'chart.js';
import { ChartOptions } from './details-chart-options';
import { updateChartDataAction } from '../actions/update_chart_data';

class CampaignDetails extends Component {
  componentWillMount() {
    if (!this.props.campaign) {
      return;
    }

    if (!this.props.data[this.props.campaign.id]) {
      axios.get(`/api/campaigns/${this.props.campaign.id}/stats`)
        .then((response) => {
          this.props.getCampaignData(this.props.campaign.id, response.data);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.error(error.response.data);
          }
          console.error(error);
        });
    }
  }

  componentDidMount() {
    if (!this.props.campaign) {
      return;
    }

    let initialData = {};
    if (this.props.data[this.props.campaign.id]) {
      initialData = this.props.data[this.props.campaign.id];
    }

    let chartCanvas = this.refs.chart;

    let myChart = new Chart(chartCanvas, {
      type: 'line',
      data: initialData,
      options: ChartOptions
    });

    this.setState({ chart: myChart });
  }

  componentDidUpdate() {
    if (!this.props.campaign || !this.props.data[this.props.campaign.id]) {
      return;
    }

    let chart = this.state.chart;
    let data = this.props.data[this.props.campaign.id];

    chart.data = data;

    chart.update();
  }

  render() {
    let noDetailsMessage = '';
    let details = '';
    let campaignChart = '';

    if (!this.props.campaign) {
      noDetailsMessage = <div className="col">
        <h2>No campaign selected</h2>
      </div>;
    } else {
      details = <div className="col">
        <h2>{this.props.campaign.name}</h2>
      </div>;
      campaignChart = <canvas className="campaign-chart" ref={'chart'} width="600" height="400"></canvas>;
    }

    return (
      <div className="container">
        <div className="row">
          {noDetailsMessage}
          {details}
          <div className="col">
            <button type="button" className="btn btn-light" onClick={() => this.props.history.push('/')}>
              All Campaigns
          </button>
          </div>
        </div>

        <div className="row">
          {campaignChart}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.activeCampaign,
    data: state.campaignData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCampaignData: updateChartDataAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetails);
