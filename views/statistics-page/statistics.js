let data;
let yearStatistics = 2020;
let nameWinner = "actor";
let id;
const urlStatistics = `http://localhost:5000/statistics`;
function statusStatistics(response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    console.log(response);
    return Promise.reject(new Error("An unexpected error occured"));
  }
}
async function getDataStatistics() {
  await fetch(urlStatistics)
    .then(statusStatistics)
    .then((res) => res.json())
    .then((response) => {
      data = response;
    });
}
async function getDataStatisticsWinner() {
  let urlStatisticsWinner = `http://localhost:5000/statistics/${nameWinner}`;
  await fetch(urlStatisticsWinner)
    .then(statusStatistics)
    .then((res) => res.json())
    .then((response) => {
      newData = response;
    });
}
function changeText() {
  var containerH3 = document.getElementsByTagName("h3");
  for (var index = 0; index < containerH3.length; index++) {
    if (index === 0) {
      containerH3[
        index
      ].innerHTML = `Number of SAG Awards nominations in ${yearStatistics}`;
    }
    if (index === 1 || index === 2)
      containerH3[
        index
      ].innerHTML = `Number of SAG Awards nominations and wins in ${yearStatistics}`;
  }
}

var container = document.getElementById("filters");
var filters = container.getElementsByClassName("year");
for (var i = 0; i < filters.length; i++) {
  filters[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active-year");
    current[0].className = current[0].className.replace(" active-year", "");
    yearStatistics = this.id;
    changeText();
    this.className += " active-year";
    getInformationStatistics(yearStatistics);
  });
}
var containerPieChart = document.getElementById("export-buttons-pie-chart");
var buttonsPieChart =
  containerPieChart.getElementsByClassName("button-pie-chart");
var containerBarplot = document.getElementById("export-buttons-barplot");
var buttonsBarplot = containerBarplot.getElementsByClassName("button-barplot");
var containerScatterplot = document.getElementById(
  "export-buttons-scatterplot"
);
var buttonsScatterplot =
  containerScatterplot.getElementsByClassName("button-scatterplot");

async function filter(yearStatistics1) {
  var filteredData = [];
  for (var i = 0; i < data.length; i++) {
    var newYear = data[i]._id.year.substring(0, 4);
    if (newYear == yearStatistics1) {
      filteredData.push(data[i]);
    }
  }
  return filteredData;
}
async function eventPieChartCSVButton() {
  for (var i = 0; i < buttonsPieChart.length; i++) {
    buttonsPieChart[i].addEventListener("click", function () {
      id = this.id;
      if (id == "SVG") {
        var gd = document.getElementById("piechart");
        Plotly.downloadImage(gd, {
          filename: "pie_chart_svg",
          format: "svg",
          width: gd._fullLayout.width,
          height: gd._fullLayout.height,
        });
      } else if (id == "WebP") {
        var gd = document.getElementById("piechart");
        Plotly.downloadImage(gd, {
          filename: "pie_chart_webp",
          format: "webp",
          width: gd._fullLayout.width,
          height: gd._fullLayout.height,
        });
      } else if (id == "CSV") {
        setTimeout(async function () {
          let filtered = await filter(yearStatistics);
          download(filtered, "pie_chart_csv.csv");
        }, 500);
      }
    });
  }
}
async function eventBarBlotCSVButton() {
  for (var i = 0; i < buttonsBarplot.length; i++) {
    buttonsBarplot[i].addEventListener("click", function () {
      id = this.id;
      if (id == "SVG") {
        var gd = document.getElementById("barplot");
        Plotly.downloadImage(gd, {
          filename: "barplot_svg",
          format: "svg",
          width: gd._fullLayout.width,
          height: gd._fullLayout.height,
        });
      } else if (id == "WebP") {
        var gd = document.getElementById("barplot");
        Plotly.downloadImage(gd, {
          filename: "barplot_webp",
          format: "webp",
          width: gd._fullLayout.width,
          height: gd._fullLayout.height,
        });
      } else if (id == "CSV") {
        setTimeout(async function () {
          let filtered = await filter(yearStatistics);
          downloadWithWins(filtered, "bar_plot_csv.csv");
        }, 500);
      }
    });
  }
}
async function eventScatterPlotCSVButton() {
  for (var i = 0; i < buttonsScatterplot.length; i++) {
    buttonsScatterplot[i].addEventListener("click", function () {
      id = this.id;
      if (id == "SVG") {
        var gd = document.getElementById("scatterplot");
        Plotly.downloadImage(gd, {
          filename: "scatterplot_svg",
          format: "svg",
          width: gd._fullLayout.width,
          height: gd._fullLayout.height,
        });
      } else if (id == "WebP") {
        var gd = document.getElementById("scatterplot");
        Plotly.downloadImage(gd, {
          filename: "scatterplot_webp",
          format: "webp",
          width: gd._fullLayout.width,
          height: gd._fullLayout.height,
        });
      } else if (id == "CSV") {
        setTimeout(async function () {
          let filtered = await filter(yearStatistics);
          downloadWithWins(filtered, "scatter_plot_csv.csv");
        }, 500);
      }
    });
  }
}
async function getInformationStatistics(yearStatistics1) {
  await getDataStatistics();
  var filteredData = await filter(yearStatistics1);
  await loadPieChart(filteredData);
  await loadBarplot(filteredData);
  await loadScatterplot(filteredData);
}

function download(filteredData, fileName) {
  let contentCSV = "Name, Number of nominations\n";
  for (indexFilteredData = 0; indexFilteredData < 6; indexFilteredData++) {
    contentCSV += filteredData[indexFilteredData]._id.full_name;
    contentCSV += ",";
    contentCSV += filteredData[indexFilteredData].count;
    contentCSV += "\n";
  }
  var create = document.createElement("a");
  create.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(contentCSV)
  );
  create.setAttribute("download", fileName);
  create.click();
}
async function downloadWithWins(filteredData, fileName) {
  let contentCSV = "Name, Number of nominations,Number of wins\n";
  for (indexFilteredData = 0; indexFilteredData < 6; indexFilteredData++) {
    contentCSV += filteredData[indexFilteredData]._id.full_name;
    contentCSV += ",";
    contentCSV += filteredData[indexFilteredData].count;
    contentCSV += ",";
    nameWinner = filteredData[indexFilteredData]._id.full_name.replace(
      " ",
      "_"
    );
    await getDataStatisticsWinner();
    if (newData.length == 0) {
      winners = 0;
    } else winners = newData[0].count;
    contentCSV += winners;
    contentCSV += "\n";
  }
  var create = document.createElement("a");
  create.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(contentCSV)
  );
  create.setAttribute("download", fileName);
  create.click();
}
async function loadPieChart(filteredData) {
  var data = [
    {
      values: [
        filteredData[5].count,
        filteredData[4].count,
        filteredData[3].count,
        filteredData[2].count,
        filteredData[1].count,
        filteredData[0].count,
      ],
      labels: [
        filteredData[5]._id.full_name,
        filteredData[4]._id.full_name,
        filteredData[3]._id.full_name,
        filteredData[2]._id.full_name,
        filteredData[1]._id.full_name,
        filteredData[0]._id.full_name,
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

  var config = {
    responsive: true,
    displaylogo: false,
    showTips: false,
    displayModeBar: true,
    modeBarButtons: [
      [
        {
          name: "Download button as CSV",
          icon: Plotly.Icons.camera,
          click: function () {
            setTimeout(async function () {
              let filtered = await filter(yearStatistics);
              download(filtered, "pie_chart_csv.csv");
            }, 500);
          },
        },
        {
          name: "Download button as WebP",
          icon: Plotly.Icons.camera,
          click: function (gd) {
            Plotly.downloadImage(gd, {
              filename: "pie_chart_webp",
              format: "webp",
              width: gd._fullLayout.width,
              height: gd._fullLayout.height,
            });
          },
        },
        {
          name: "Download button as SVG",
          icon: Plotly.Icons.camera,
          click: function (gd) {
            Plotly.downloadImage(gd, {
              filename: "pie_chart_svg",
              format: "svg",
              width: gd._fullLayout.width,
              height: gd._fullLayout.height,
            });
          },
        },
      ],
      [],
    ],
  };
  Plotly.newPlot("piechart", data, layout, config);
}

async function loadBarplot(filteredData) {
  var trace1 = {
    y: [
      filteredData[5]._id.full_name,
      filteredData[4]._id.full_name,
      filteredData[3]._id.full_name,
      filteredData[2]._id.full_name,
      filteredData[1]._id.full_name,
      filteredData[0]._id.full_name,
    ],
    x: [
      filteredData[5].count,
      filteredData[4].count,
      filteredData[3].count,
      filteredData[2].count,
      filteredData[1].count,
      filteredData[0].count,
    ],
    name: "Nominations",
    orientation: "h",
    marker: {
      color: "rgb(110,61,200)",
    },
    type: "bar",
  };
  nameWinner = filteredData[5]._id.full_name.replace(" ", "_");
  await getDataStatisticsWinner();
  if (newData.length == 0) {
    winners5 = 0;
  } else winners5 = newData[0].count;
  nameWinner = filteredData[4]._id.full_name.replace(" ", "_");
  await getDataStatisticsWinner();
  if (newData.length == 0) {
    winners4 = 0;
  } else winners4 = newData[0].count;
  nameWinner = filteredData[3]._id.full_name.replace(" ", "_");
  await getDataStatisticsWinner();
  if (newData.length == 0) {
    winners3 = 0;
  } else winners3 = newData[0].count;
  nameWinner = filteredData[2]._id.full_name.replace(" ", "_");
  await getDataStatisticsWinner();
  if (newData.length == 0) {
    winners2 = 0;
  } else winners2 = newData[0].count;
  nameWinner = filteredData[1]._id.full_name.replace(" ", "_");
  await getDataStatisticsWinner();
  if (newData.length == 0) {
    winners1 = 0;
  } else winners1 = newData[0].count;
  nameWinner = filteredData[0]._id.full_name.replace(" ", "_");
  await getDataStatisticsWinner();
  if (newData.length == 0) {
    winners0 = 0;
  } else winners0 = newData[0].count;
  var trace2 = {
    y: [
      filteredData[5]._id.full_name,
      filteredData[4]._id.full_name,
      filteredData[3]._id.full_name,
      filteredData[2]._id.full_name,
      filteredData[1]._id.full_name,
      filteredData[0]._id.full_name,
    ],
    x: [winners5, winners4, winners3, winners2, winners1, winners0],
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
  var config = {
    responsive: true,
    displaylogo: false,
    showTips: false,
    displayModeBar: true,
    modeBarButtons: [
      [
        {
          name: "Download button as CSV",
          icon: Plotly.Icons.camera,
          click: function () {
            setTimeout(async function () {
              let filtered = await filter(yearStatistics);
              downloadWithWins(filtered, "bar_plot_csv.csv");
            }, 500);
          },
        },
        {
          name: "Download button as WebP",
          icon: Plotly.Icons.camera,
          click: function (gd) {
            Plotly.downloadImage(gd, {
              filename: "barplot_webp",
              format: "webp",
              width: gd._fullLayout.width,
              height: gd._fullLayout.height,
            });
          },
        },
        {
          name: "Download button as SVG",
          icon: Plotly.Icons.camera,
          click: function (gd) {
            Plotly.downloadImage(gd, {
              filename: "barplot_svg",
              format: "svg",
              width: gd._fullLayout.width,
              height: gd._fullLayout.height,
            });
          },
        },
      ],
      [],
    ],
  };
  Plotly.newPlot("barplot", data, layout, config);
}

async function loadScatterplot(filteredData) {
  nameWinner = filteredData[5]._id.full_name.replace(" ", "_");
  await getDataStatisticsWinner();
  if (newData.length == 0) {
    winners5 = 0;
  } else winners5 = newData[0].count;
  nameWinner = filteredData[4]._id.full_name.replace(" ", "_");
  await getDataStatisticsWinner();
  if (newData.length == 0) {
    winners4 = 0;
  } else winners4 = newData[0].count;
  nameWinner = filteredData[3]._id.full_name.replace(" ", "_");
  await getDataStatisticsWinner();
  if (newData.length == 0) {
    winners3 = 0;
  } else winners3 = newData[0].count;
  nameWinner = filteredData[2]._id.full_name.replace(" ", "_");
  await getDataStatisticsWinner();
  if (newData.length == 0) {
    winners2 = 0;
  } else winners2 = newData[0].count;
  nameWinner = filteredData[1]._id.full_name.replace(" ", "_");
  await getDataStatisticsWinner();
  if (newData.length == 0) {
    winners1 = 0;
  } else winners1 = newData[0].count;
  nameWinner = filteredData[0]._id.full_name.replace(" ", "_");
  await getDataStatisticsWinner();
  if (newData.length == 0) {
    winners0 = 0;
  } else winners0 = newData[0].count;
  let arrayOfY = [winners5, winners4, winners3, winners2, winners1, winners0];
  let arrayOfX = [
    filteredData[5].count,
    filteredData[4].count,
    filteredData[3].count,
    filteredData[2].count,
    filteredData[1].count,
    filteredData[0].count,
  ];
  let arrayOfDeleted = [];
  for (let indexTrace1 = 0; indexTrace1 < 5; indexTrace1++) {
    for (let indexTrace2 = indexTrace1 + 1; indexTrace2 < 6; indexTrace2++) {
      if (arrayOfX[indexTrace1] == arrayOfX[indexTrace2]) {
        if (arrayOfY[indexTrace1] == arrayOfY[indexTrace2]) {
          if (arrayOfDeleted.indexOf(indexTrace1) == -1) {
            arrayOfDeleted.push(indexTrace1);
          }
        }
      }
    }
  }
  nr = 0;
  for (
    let indexDeleted = 0;
    indexDeleted < arrayOfDeleted.length;
    indexDeleted++
  ) {
    arrayOfX.splice(arrayOfDeleted[indexDeleted] - nr, 1);
    arrayOfY.splice(arrayOfDeleted[indexDeleted] - nr, 1);
    nr++;
  }

  var trace = {
    x: arrayOfX,
    y: arrayOfY,
    mode: "markers+text",
    type: "scatter",
    text: [
      filteredData[5]._id.full_name,
      filteredData[4]._id.full_name,
      filteredData[3]._id.full_name,
      filteredData[2]._id.full_name,
      filteredData[1]._id.full_name,
      filteredData[0]._id.full_name,
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

  var data = [trace];

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
    var trace = {
      x: [
        filteredData[5].count,
        filteredData[4].count,
        filteredData[3].count,
        filteredData[2].count,
        filteredData[1].count,
        filteredData[0].count,
      ],
      y: [winners5, winners4, winners3, winners2, winners1, winners0],
      mode: "markers",
      type: "scatter",
      text: [
        filteredData[5]._id.full_name,
        filteredData[4]._id.full_name,
        filteredData[3]._id.full_name,
        filteredData[2]._id.full_name,
        filteredData[1]._id.full_name,
        filteredData[0]._id.full_name,
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
    data = [trace];
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

    data = [trace];
  }
  var config = {
    responsive: true,
    displaylogo: false,
    showTips: false,
    displayModeBar: true,
    modeBarButtons: [
      [
        {
          name: "Download button as CSV",
          icon: Plotly.Icons.camera,
          click: function () {
            setTimeout(async function () {
              let filtered = await filter(yearStatistics);
              downloadWithWins(filtered, "scatter_plot_csv.csv");
            }, 500);
          },
        },
        {
          name: "Download button as WebP",
          icon: Plotly.Icons.camera,
          click: function (gd) {
            Plotly.downloadImage(gd, {
              filename: "scatterplot_webp",
              format: "webp",
              width: gd._fullLayout.width,
              height: gd._fullLayout.height,
            });
          },
        },
        {
          name: "Download button as SVG",
          icon: Plotly.Icons.camera,
          click: function (gd) {
            Plotly.downloadImage(gd, {
              filename: "scatterplot_svg",
              format: "svg",
              width: gd._fullLayout.width,
              height: gd._fullLayout.height,
            });
          },
        },
      ],
      [],
    ],
  };
  Plotly.newPlot("scatterplot", data, layout, config);
}
