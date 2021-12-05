// TODO: If Plotly is chosen here a sample of a graph helper function
// Source: https://plotly.com/javascript/line-charts/

export function LabelledLinesAnnotations(xData, yData, labels) {
	var colors = [
		"rgba(67,67,67,1)",
		"rgba(115,115,115,1)",
		"rgba(49,130,189, 1)",
		"rgba(189,189,189,1)",
	];

	var lineSize = [2, 2, 4, 2];

	var data = [];

	// Data
	for (var i = 0; i < xData.length; i++) {
		var result = {
			x: xData[i],
			y: yData[i],
			type: "scatter",
			mode: "lines",
			line: {
				color: colors[i],
				width: lineSize[i],
			},
		};
		var result2 = {
			x: [xData[i][0], xData[i][11]],
			y: [yData[i][0], yData[i][11]],
			type: "scatter",
			mode: "markers",
			marker: {
				color: colors[i],
				size: 12,
			},
		};
		data.push(result, result2);
		// console.log("Data - after 1st for loop", data);
	}

	var layout = {
		showlegend: false,
		height: 600,
		width: 900,
		xaxis: {
			showline: true,
			showgrid: false,
			showticklabels: true,
			linecolor: "rgb(204,204,204)",
			linewidth: 2,
			autotick: false,
			ticks: "outside",
			tickcolor: "rgb(204,204,204)",
			tickwidth: 2,
			ticklen: 5,
			tickfont: {
				family: "Arial",
				size: 12,
				color: "rgb(82, 82, 82)",
			},
		},
		yaxis: {
			showgrid: false,
			zeroline: false,
			showline: false,
			showticklabels: false,
		},
		autosize: false,
		margin: {
			autoexpand: false,
			l: 100,
			r: 20,
			t: 100,
		},
		annotations: [
			{
				xref: "paper",
				yref: "paper",
				x: 0.0,
				y: 1.05,
				xanchor: "left",
				yanchor: "bottom",
				text: "Main Source for News",
				font: {
					family: "Arial",
					size: 30,
					color: "rgb(37,37,37)",
				},
				showarrow: false,
			},
			{
				xref: "paper",
				yref: "paper",
				x: 0.5,
				y: -0.1,
				xanchor: "center",
				yanchor: "top",
				text: "Source: Pew Research Center & Storytelling with data",
				showarrow: false,
				font: {
					family: "Arial",
					size: 12,
					color: "rgb(150,150,150)",
				},
			},
		],
	};

	// Annotations
	for (var x = 0; x < xData.length; x++) {
		var Result3 = {
			xref: "paper",
			x: 0.05,
			y: yData[x][0],
			xanchor: "right",
			yanchor: "middle",
			text: labels[x] + " " + yData[x][0] + "%",
			showarrow: false,
			font: {
				family: "Arial",
				size: 16,
				color: "black",
			},
		};
		var Result4 = {
			xref: "paper",
			x: 0.95,
			y: yData[x][11],
			xanchor: "left",
			yanchor: "middle",
			text: yData[x][11] + "%",
			font: {
				family: "Arial",
				size: 16,
				color: "black",
			},
			showarrow: false,
		};

		layout.annotations.push(Result3, Result4);
	}

	return { data, layout };
}

export default LabelledLinesAnnotations;
