var container = document.getElementById("filters");
var filters = container.getElementsByClassName("year");
for (var i = 0; i < filters.length; i++) {
  filters[i].addEventListener("click", function () {
    this.classList.toggle("active-year");
  });
}

function loadPieChart() {
  var data = [
    {
      values: [2, 3, 3, 4, 5, 5],
      labels: [
        "Emma Stone",
        "Al Pacino",
        "Bradley Cooper",
        "Charlize Theron",
        "Brad Pitt",
        "Margot Robbie",
      ],
      type: "pie",
      textinfo: "label+value",
      insidetextorientation: "radial",
      textposition: "inside",
      marker: {
        colors: [
          "#DB6AB5",
          "#AF58BD",
          "#C260BA",
          "#9C50C0",
          "#6E3DC8",
          "#8647C4",
        ],
      },
      textfont: { size: 16, color: "#FFFFFF", family: "montserrat" },
    },
  ];
  if (screen.width > 600)
    var layout = {
      // title: "Number of SAG Awards nominations in 2019",
      font: { color: "#FFFFFF", family: "montserrat" },
      showlegend: true,
      legend: { orientation: "h", xanchor: "center", y: -0.2, x: 0.5 },
      plot_bgcolor: "#22304A",
      paper_bgcolor: "#22304A",
      width: 520,
      height: 600,
      margin: {
        l: 12,
        r: 12,
        b: 0,
        t: 30,
        pad: 4,
      },
    };
  else if (screen.width > 360)
    var layout = {
      // title: "Number of SAG Awards nominations in 2019",
      font: { color: "#FFFFFF", family: "montserrat" },
      showlegend: true,
      legend: { orientation: "h", xanchor: "center", y: -0.2, x: 0.5 },
      plot_bgcolor: "#22304A",
      paper_bgcolor: "#22304A",
      width: 300,
      height: 400,
      margin: {
        l: 12,
        r: 12,
        b: 0,
        t: 30,
        pad: 4,
      },
    };
  else
    var layout = {
      // title: "Number of SAG Awards nominations in 2019",
      font: { color: "#FFFFFF", family: "montserrat" },
      showlegend: true,
      legend: { orientation: "h", xanchor: "center", y: -0.2, x: 0.5 },
      plot_bgcolor: "#22304A",
      paper_bgcolor: "#22304A",
      width: 200,
      height: 400,
      margin: {
        l: 12,
        r: 12,
        b: 0,
        t: 30,
        pad: 4,
      },
    };
  var config = { responsive: true };
  Plotly.newPlot("piechart", data, layout, config);
}
loadPieChart();

function loadBarplot() {
  var trace1 = {
    y: [
      "Emma Stone ",
      "Al Pacino ",
      "Bradley Cooper ",
      "Charlize Theron ",
      "Brad Pitt ",
      "Margot Robbie ",
    ],
    x: [2, 3, 3, 4, 5, 5],
    name: "Nominations",
    orientation: "h",
    marker: {
      color: "rgb(110,61,200)",
    },
    type: "bar",
  };

  var trace2 = {
    y: [
      "Emma Stone ",
      "Al Pacino ",
      "Bradley Cooper ",
      "Charlize Theron ",
      "Brad Pitt ",
      "Margot Robbie ",
    ],
    x: [1, 0, 2, 2, 3, 4],
    name: "Wins",
    orientation: "h",
    marker: {
      color: "rgb(219,106,181)",
    },
    type: "bar",
  };

  var data = [trace1, trace2];

  if (screen.width > 800)
    var layout = {
      font: { color: "#FFFFFF", family: "montserrat" },
      showlegend: true,
      legend: { orientation: "h", xanchor: "center", y: -0.2, x: 0 },
      plot_bgcolor: "#22304A",
      paper_bgcolor: "#22304A",
      barmode: "stack",
      width: 720,
      height: 600,
      margin: {
        // l: 12,
        r: 12,
        b: 0,
        t: 30,
        pad: 4,
      },
    };
  else if (screen.width > 600)
    var layout = {
      font: { color: "#FFFFFF", family: "montserrat" },
      showlegend: true,
      legend: { orientation: "h", xanchor: "center", y: -0.2, x: 0 },
      plot_bgcolor: "#22304A",
      paper_bgcolor: "#22304A",
      barmode: "stack",
      width: 520,
      height: 600,
      margin: {
        // l: 12,
        r: 12,
        b: 0,
        t: 30,
        pad: 4,
      },
    };
  else if (screen.width > 360)
    var layout = {
      font: { color: "#FFFFFF", family: "montserrat" },
      showlegend: true,
      legend: { orientation: "h", xanchor: "center", y: -0.2, x: 0 },
      plot_bgcolor: "#22304A",
      paper_bgcolor: "#22304A",
      barmode: "stack",
      width: 300,
      height: 400,
      margin: {
        // l: 12,
        r: 12,
        b: 0,
        t: 30,
        pad: 4,
      },
    };
  else
    var layout = {
      // title: "Number of SAG Awards nominations in 2019",
      font: { color: "#FFFFFF", family: "montserrat" },
      showlegend: true,
      legend: { orientation: "h", xanchor: "center", y: -0.2, x: 0 },
      plot_bgcolor: "#22304A",
      paper_bgcolor: "#22304A",
      width: 200,
      height: 400,
      margin: {
        // l: 12,
        r: 12,
        b: 0,
        t: 30,
        pad: 4,
      },
    };
  var config = { responsive: true };
  Plotly.newPlot("barplot", data, layout, config);
}
loadBarplot();

function loadScatterplot() {
  var trace1 = {
    x: [2, 3, 3, 4, 5, 5],
    y: [1, 0, 2, 2, 3, 4],
    mode: "markers+text",
    type: "scatter",
    text: [
      "Emma Stone",
      "Al Pacino",
      "Bradley Cooper",
      "Charlize Theron",
      "Brad Pitt",
      "Margot Robbie",
    ],
    textposition: "top center",
    textfont: {
      family: "montserrat",
    },
    marker: {
      color: ["#DB6AB5", "#AF58BD", "#C260BA", "#9C50C0", "#6E3DC8", "#8647C4"],
      size: [20, 20, 20, 20, 20, 20],
    },
  };

  var data = [trace1];

  if (screen.width > 800)
    var layout = {
      xaxis: {
        title: {
          text: "Nominations",
          font: {
            family: "montserrat",
            size: 15,
            color: "#FFFFFF",
          },
        },
        nticks: 5,
        gridcolor: "#FFFFFF",
        gridwidth: 1,
      },
      yaxis: {
        title: {
          text: "Wins",
          font: {
            family: "montserrat",
            size: 18,
            color: "#FFFFFF",
          },
        },
        zerolinecolor: "#FFFFFF",
        zerolinewidth: 1,
        gridcolor: "#FFFFFF",
        gridwidth: 1,
      },
      font: { color: "#FFFFFF", family: "montserrat" },
      plot_bgcolor: "#22304A",
      paper_bgcolor: "#22304A",
      width: 720,
      height: 600,
    };
  else if (screen.width > 600)
    var layout = {
      xaxis: {
        title: {
          text: "Nominations",
          font: {
            family: "montserrat",
            size: 15,
            color: "#FFFFFF",
          },
        },
        nticks: 5,
        gridcolor: "#FFFFFF",
        gridwidth: 1,
      },
      yaxis: {
        title: {
          text: "Wins",
          font: {
            family: "montserrat",
            size: 18,
            color: "#FFFFFF",
          },
        },
        zerolinecolor: "#FFFFFF",
        zerolinewidth: 1,
        gridcolor: "#FFFFFF",
        gridwidth: 1,
      },
      font: { color: "#FFFFFF", family: "montserrat" },
      plot_bgcolor: "#22304A",
      paper_bgcolor: "#22304A",
      width: 520,
      height: 600,
    };
  else if (screen.width > 360) {
    var layout = {
      xaxis: {
        title: {
          text: "Nominations",
          font: {
            family: "montserrat",
            size: 15,
            color: "#FFFFFF",
          },
        },
        nticks: 5,
        gridcolor: "#FFFFFF",
        gridwidth: 1,
      },
      yaxis: {
        title: {
          text: "Wins",
          font: {
            family: "montserrat",
            size: 18,
            color: "#FFFFFF",
          },
        },
        zerolinecolor: "#FFFFFF",
        zerolinewidth: 1,
        gridcolor: "#FFFFFF",
        gridwidth: 1,
      },
      font: { color: "#FFFFFF", family: "montserrat" },
      plot_bgcolor: "#22304A",
      paper_bgcolor: "#22304A",
      width: 300,
      height: 400,
    };
    var trace2 = {
      x: [2, 3, 3, 4, 5, 5],
      y: [1, 0, 2, 2, 3, 4],
      mode: "markers",
      type: "scatter",
      text: [
        "Emma Stone",
        "Al Pacino",
        "Bradley Cooper",
        "Charlize Theron",
        "Brad Pitt",
        "Margot Robbie",
      ],
      textposition: "top center",
      textfont: {
        family: "montserrat",
      },
      marker: {
        color: [
          "#DB6AB5",
          "#AF58BD",
          "#C260BA",
          "#9C50C0",
          "#6E3DC8",
          "#8647C4",
        ],
        size: [20, 20, 20, 20, 20, 20],
      },
    };
    data = [trace2];
  } else {
    var layout = {
      xaxis: {
        title: {
          text: "Nominations",
          font: {
            family: "montserrat",
            size: 15,
            color: "#FFFFFF",
          },
        },
        nticks: 5,
        gridcolor: "#FFFFFF",
        gridwidth: 1,
      },
      yaxis: {
        title: {
          text: "Wins",
          font: {
            family: "montserrat",
            size: 18,
            color: "#FFFFFF",
          },
        },
        zerolinecolor: "#FFFFFF",
        zerolinewidth: 1,
        gridcolor: "#FFFFFF",
        gridwidth: 1,
      },
      font: { color: "#FFFFFF", family: "montserrat" },
      plot_bgcolor: "#22304A",
      paper_bgcolor: "#22304A",
      width: 220,
      height: 400,
    };
    var trace2 = {
      x: [2, 3, 3, 4, 5, 5],
      y: [1, 0, 2, 2, 3, 4],
      mode: "markers",
      type: "scatter",
      text: [
        "Emma Stone",
        "Al Pacino",
        "Bradley Cooper",
        "Charlize Theron",
        "Brad Pitt",
        "Margot Robbie",
      ],
      textposition: "top center",
      textfont: {
        family: "montserrat",
      },
      marker: {
        color: [
          "#DB6AB5",
          "#AF58BD",
          "#C260BA",
          "#9C50C0",
          "#6E3DC8",
          "#8647C4",
        ],
        size: [20, 20, 20, 20, 20, 20],
      },
    };
    data = [trace2];
  }
  var config = { responsive: true };
  Plotly.newPlot("scatterplot", data, layout, config);
}
loadScatterplot();
