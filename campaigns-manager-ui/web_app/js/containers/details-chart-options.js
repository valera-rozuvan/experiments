const ChartOptions = {

  // Resizes the chart canvas when its container does
  responsive: false,

  // Width of the Chart
  width: 600,

  // Height of the Chart
  height: 400,

  // Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines: true,

  // String - Colour of the grid lines
  scaleGridLineColor: 'rgba(0,0,0,.05)',

  // Number - Width of the grid lines
  scaleGridLineWidth: 1,

  // Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,

  // Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,

  // Boolean - Whether the line is curved between points
  bezierCurve: true,

  // Number - Tension of the bezier curve between points
  bezierCurveTension: 0.4,

  // Boolean - Whether to show a dot for each point
  pointDot: true,

  // Number - Radius of each point dot in pixels
  pointDotRadius: 4,

  // Number - Pixel width of point dot stroke
  pointDotStrokeWidth: 1,

  // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  pointHitDetectionRadius: 20,

  // Boolean - Whether to show a stroke for datasets
  datasetStroke: true,

  // Number - Pixel width of dataset stroke
  datasetStrokeWidth: 2,

  // Boolean - Whether to fill the dataset with a colour
  datasetFill: true,

  // String - A legend template
  legendTemplate: `
    <ul class=\"<%=name.toLowerCase()%>-legend\">
      <% for (var i=0; i<datasets.length; i++){%>
        <li>
          <span style=\"background-color:<%=datasets[i].strokeColor%>\">
            <%if(datasets[i].label){%><%=datasets[i].label%><%}%>
          </span>
        </li>
      <%}%></ul>
  `,

  // Boolean - Whether to horizontally center the label and point dot inside the grid
  offsetGridLines: false
};

export { ChartOptions };
