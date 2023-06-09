import Highcharts from "highcharts/highstock";
import More from "highcharts/highcharts-more";
import stockInit from "highcharts/modules/stock";
import loadIndicatorsAll from "highcharts/indicators/indicators";
import { isMobile, isTablet } from "mobile-device-detect";
import $ from "jquery";
import Chart from "highcharts-react-official";
import { useContext, useEffect, useRef, useState } from "react";
import borderRadius from "highcharts-border-radius";
import Exporting from "highcharts/modules/exporting";
// import { SocketContainerContext } from "../../utils/SocketContainer/SocketContainer";
// import b_price from "../../api/price/b_price";
import getData from "../../../data.json";
import { SocketContainerContext } from "../../../utils/SocketContainer/SocketContainer";
// import b_price from "../../../api/price/b_price";
import "./ChartIndex.css";
import "./index.scss";
import { TradingContext } from "../../../pages/Index/Trading/Trading";
import { debounce } from "lodash";

// Initialize exporting module. (CommonJS only)
Exporting(Highcharts);
borderRadius(Highcharts);
More(Highcharts);
stockInit(Highcharts);
loadIndicatorsAll(Highcharts);

// eslint-disable-next-line
function convertTextValueMeter(t) {
  return t >= -90 && t <= -54
    ? { cl: "rank-1", text: "Strong sell", index: 1 }
    : t > -54 && t <= -18
    ? { cl: "rank-2", text: "Sell", index: 2 }
    : t > -18 && t <= 17
    ? { cl: "rank-3", text: "Neutral", index: 3 }
    : t > 17 && t <= 53
    ? { cl: "rank-4", text: "Buy", index: 4 }
    : t > 53
    ? { cl: "rank-5", text: "Strong Buy", index: 5 }
    : void 0;
}
var UP_COLOR = "#31baa0",
  DOWN_COLOR = "#fc5f5f";

var progressBar = $(".e-c-progress");
var lengthp = Math.PI * 2 * 100;
progressBar.css("stroke-dasharray", lengthp);

const ChartIndex = () => {
  const { data } = useContext(TradingContext);
  const listData = useRef();
  const containerRef = useRef();
  const prevWidthContainerRef = useRef();
  const [ohlcStock, setOhlcStock] = useState([]);
  const [sma5, setSma5] = useState([]);
  const [sma10, setSma10] = useState([]);
  const [volumeStock, setVolumeStock] = useState([]);
  const [classLandscape, setClassLandscape] = useState("");
  const [deviceVersion, setDeviceVersion] = useState("pc");
  useEffect(() => {
    if (isMobile) {
      setDeviceVersion("mobile");
    } else if (isTablet) {
      setDeviceVersion("tablet");
    }
  }, []);

  const stockChart = {
    chart: {
      backgroundColor: "#011022",
      type: "areaspline",
      aspectRatio: "16:9",
      panning: false,
      followTouchMove: false,
      width: "100%",
      // height: "100%",
      marginTop: 0,
      height: "pc" !== deviceVersion ? "100%" : (9 / 16) * 100 + "%", // 16:9 ratio
      zoomType: "",
      // backgroundColor: "transparent",
      // plotBackgroundImage: require("@/assets/images/sky/world_map.svg"),
      marginLeft: 10,
      marginRight: "pc" !== deviceVersion ? 60 : 75,
      marginBottom: "pc" !== deviceVersion ? 18 : 20,
      renderTo: "tradePage",
      events: {},
    },
    rangeSelector: {
      enabled: false,
      selected: 4,
    },
    credits: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },

    stockTools: {
      gui: {
        enabled: false,
      },
    },
    exporting: {
      enabled: false,
    },
    plotOptions: {
      candlestick: {
        lineColor: DOWN_COLOR,
        upLineColor: UP_COLOR,
        pointWidth: "pc" !== deviceVersion ? 7 : 8.6,
        maxPointWidth: "pc" !== deviceVersion ? 7 : 12,
        paddingPoint: "pc" !== deviceVersion ? 7.7 : 10.5,
        // pointRange: 0.1,
      },
      column: {
        minPointLength: 3,
        pointWidth: "pc" !== deviceVersion ? 8.6 : 8.6,
        maxPointWidth: "pc" !== deviceVersion ? 8.6 : 12,
        borderWidth: 0,
        paddingPoint: "pc" !== deviceVersion ? 7.7 : 10.5,
        numberPoint: "pc" !== deviceVersion ? 15 : 60,
        pointRange: 0.1,
        borderRadius: "0 0 0 0",
      },
      series: {
        zIndex: 2,
        states: {
          inactive: {
            opacity: 1,
          },
        },
        allowPointSelect: false,
        point: {
          events: {
            click() {},
          },
        },
      },
    },
    tooltip: {
      split: false,
      enabled: true,
      label: false,
      animation: true,
      backgroundColor: "transparent",
      opacity: "1",
      visibility: "visible",
      borderColor: "transparent",
      borderWidth: 0,
      shadow: false,
      stroke: "transparent",
      useHTML: true,
      style: {
        color: "#fff",
        fontSize: "10px",
        stroke: "transparent",
        top: "60px",
      },
      formatter() {
        return "BTC/USDT" === this.series.name
          ? '\n<span style="margin-right: 10px;"><b>O</b>: ' +
              this.point.open +
              '</span>\n<span style="margin-right: 10px;"><b>C</b>: ' +
              this.point.close +
              '</span>\n<span>&nbsp;</span>\n<br/>\n<span style="margin-right: 10px;"><b>H</b>: ' +
              this.point.high +
              '</span>\n<span style="margin-right: 10px;"><b>L</b>: ' +
              this.point.low +
              "</span>\n<span><b>Vol</b>: " +
              this.point.vol +
              "</span>"
          : "Volume" === this.series.name
          ? "<b>Vol</b>: " + this.y
          : "";
      },
      positioner() {
        var t = 20,
          e = "pc" !== deviceVersion ? 50 : 60;
        return {
          x: t,
          y: e,
        };
      },
    },
    xAxis: {
      // minRange: 1 * 1,
      type: "datetime",
      // tickInterval: 5,
      labels: {
        y: 10,
        enabled: true,
        formatter() {
          // console.log(this.value)
          return Highcharts.dateFormat("%M:%S", this.value);
        },
        style: {
          fontSize: 10,
          color: "#707070",
        },
      },

      plotLines: [
        {
          value: 0,
          color: "#ffffff",
          width: 0.75,
          id: "current-pricex",
          zIndex: 1e3,
          dashStyle: "LongDash",
        },
      ],
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: "transparent",
      minorTickLength: 0,
      tickLength: 0,
      zIndex: 2,
    },
    yAxis: [
      {
        gridLineColor: "#2D3140",
        gridLineDashStyle: "LongDash",
        labels: {
          align: "right",
          x: "pc" !== deviceVersion ? 45 : 50,
          style: {
            color: "#fff",
            fontSize: "11px",
          },
        },
        height: "83%",
        maxPadding: 0.3,
        top: 10,
        bot: 15,
        plotLines: [
          {
            value: 0,
            color: "#ffffff",
            width: 0.75,
            id: "current-price",
            zIndex: 100,
            label: {
              useHTML: true,
              text: 0,
              x: "pc" !== deviceVersion ? 60 : 70,
              align: "right",
              style: {
                color: "#fff",
                fontSize: "11px",
                background: "transparent",
                borderRadius: "4px",
              },
            },
          },
        ],
        lineWidth: 0,
        resize: {
          enabled: true,
        },
      },
      {
        gridLineColor: "",
        visible: false,
        title: {
          align: "high",
          text: null,
          rotation: 0,
          y: 0,
          useHTML: true,
        },
        top: "pc" == deviceVersion ? "83.4%" : "85%",
        height: "15%",
        lineWidth: 0,
        offset: 0,
      },
    ],
    series: [
      {
        id: "aapl",
        type: "candlestick",
        name: "BTC/USDT",
        color: DOWN_COLOR,
        upColor: UP_COLOR,
        data: ohlcStock,
      },
      {
        type: "column",
        name: "Volume",
        data: volumeStock,
        yAxis: 1,
      },

      {
        name: "sma2",
        id: "sma2",
        type: "sma",
        linkedTo: "aapl",
        // data: sma5,
        color: "#E22A67",
        lineWidth: 1.5,
        marker: false,
        zIndex: 3,
        visible: true,
        enableMouseTracking: false,
        params: {
          // index: "1",
          period: 5,
        },
        allowPointSelect: false,
        point: {
          events: {},
          tooltip: {
            enabled: false,
          },
        },
      },
      {
        // data: sma10chartInstance?.reflow();,
        name: "sma1",
        id: "sma1",
        type: "sma",
        linkedTo: "aapl",
        color: "#4682B4",
        lineWidth: 1.5,
        marker: false,
        zIndex: 3,
        visible: true,
        enableMouseTracking: false,
        params: {
          index: "0",
          period: 10,
        },
        allowPointSelect: false,
        point: {
          events: {
            // click: function (t) {
            //   setTimeout(function () { }, 500)
            // }
          },
          tooltip: {
            enabled: false,
          },
        },
      },
    ],
  };
  const { socketWeb } = useContext(SocketContainerContext);
  const chartStock = useRef();
  const chartGet = useRef();
  useEffect(() => {
    chartGet.current = chartStock.current?.chart;
  }, []);

  const [chartDataLoaded, setChartDataLoaded] = useState(false);

  const [chartOptions, setChartOptions] = useState({
    beforeMount() {
      chartStock.current.chart.redraw = true;
      chartGet.current.redraw();
    },
  });
  // const [chartOptionsStock, setChartOptionsStock] = useState(stockChart);
  // const [betOpen, setBetOpen] = useState({
  //   s: 0,
  //   l: {
  //     bet: [
  //       {
  //         items: [],
  //       },
  //     ],
  //   },
  // });
  // useEffect(()=> {
  //   setChartOptionsStock(stockChart)
  // }, [stockChart])
  const getColor = (openPrice, closePrice) => {
    return openPrice < closePrice ? UP_COLOR : DOWN_COLOR;
  };
  // const handleResize=()=> {
  //   if (this.chart) {
  //     this.chart.reflow()
  //   }
  // }
  const redrawChart = () => {
    // if (chartGet && windowWidth > 768) {
    // if (chartStock.current?.chart?.reflow() && window.innerWidth > 768) {
    // var chartInstance = chartGet;
    chartStock.current?.chart?.reflow();
    chartStock.current?.chart?.redraw();
    // }
  };
  const reflowChart = () => {
    if (chartStock) {
      chartStock.current.chart.reflow();
    }
  };
  const updateWindowDimensions = () => {
    // windowWidth = window.innerWidth;
    // windowHeight = window.innerHeight;
    redrawChart();
  };

  // const replaceAll= (str, find, replace)=> {
  //   return Number(str.replace(new RegExp(find, "g"), replace));
  // }

  // const toggleDataSidebar=(val = false)=> {
  //   this.addNewDataSidebar = val;
  // }

  const updateBarChart = (data) => {
    try {
      if (chartStock.current) {
        const chartInstance = chartStock?.current.chart;
        var lastCandle =
          chartInstance.series[1].points[
            chartInstance.series[1].points?.length - 1
          ];
        var color = getColor(data.openPrice, data.closePrice);
        if (lastCandle?.x === data.createDateTime) {
          lastCandle.update(
            {
              x: data.createDateTime,
              y: data.baseVolume,
              color: color,
            },
            true
          );
        } else {
          chartInstance.series[1].addPoint(
            {
              x: data.createDateTime,
              y: data.baseVolume,
              color: color,
            },
            true,
            true
          );
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      //
    }
  };

  const updateCandleStickChart = (data) => {
    // console.log(12345)
    const chartInstance = chartStock.current?.chart;
    try {
      if (chartInstance?.series?.[0]) {
        var lastCandle =
          chartInstance.series[0].points[
            chartInstance.series[0].points?.length - 1
          ];
        var color = getColor(data.openPrice, data.closePrice);

        var counter = Number(data.order);

        var o = {
          x: data.createDateTime,
          open: data.openPrice,
          high: data.highPrice,
          low: data.lowPrice,
          close: data.closePrice,
          vol: data.baseVolume,
          color: color,
        };
        if (lastCandle?.x === data.createDateTime) {
          lastCandle.update(o, true);
          // console.log(lastCandle.x, data.createDateTime)
        } else {
          chartInstance.series[0].addPoint(o, true, true);
          // console.log(chartInstance.series);
          listData.current.push(data);
          let begin = 0;
          // console.log("begin", begin)

          const { dataMax } = chartInstance.xAxis[0].getExtremes();
          if (deviceVersion !== "pc") {
            // begin = setSizeStock(listData.current);
            // console.log("begin", begin);
            begin= 84
            chartGet.current.xAxis[0].setExtremes(
              listData.current[begin + 40][0],
              dataMax,
              true
            );
            chartGet.current.redraw();
          } else {
            let c = listData.current?.length;
            chartGet.current.xAxis[0].setExtremes(
              listData.current[c - 90][0],
              dataMax,
              false
            );
            chartGet.current.redraw();
          }
        }
        chartInstance.xAxis[0].options.plotLines[0].value = data.createDateTime;
        chartInstance.yAxis[0].options.plotLines[0].value = data.closePrice;
        let f = chartInstance.yAxis[0].plotLinesAndBands[0];

        f?.label &&
          f?.label.attr({
            text:
              '<div class="plotlineChart flex flex-col"><span class="price">' +
              data?.closePrice.toFixed(2) +
              '</span><span class="time self-end">00:' +
              (counter > 9 ? counter : "0" + counter) +
              "</span></div>",
          });

        getData.countDown = counter > 9 ? counter : "0" + counter;
        window.addEventListener("resize", debounce(function () {
          getDataDefaultGet(listData.current)
          chartStock.current?.chart?.redraw();
          chartStock.current?.chart?.reflow();
        }, 500));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onReceiveSocketData = (data) => {
    updateCandleStickChart(data);
    updateBarChart(data);
  };
  const getDataDefaultGet = (get) => {
    let data = get;
    // (ohlcStock = []), (volumeStock = []); // chắc nó chia giá với volume ra riêng 2 mảng
    var begin = 0;

    if (deviceVersion !== "pc") {
      begin = 84;
      // console.log("begin", begin);
      // console.log(begin)
    } else {
      let getWidth = parseInt($("body").width());

      if (getWidth > 1600) {
        begin = 10;
      } else if (getWidth >= 1500 && getWidth <= 1600) {
        begin = 31;
      }  else if (getWidth >= 1480 && getWidth < 1500) {
        begin = 37;
      } else if (getWidth >= 1460 && getWidth < 1480) {
        begin = 38;
      } else if (getWidth >= 1440 && getWidth < 1460) {
        begin = 39;
      } else if (getWidth >= 1420 && getWidth < 1440) {
        begin = 40;
      } else if (getWidth >= 1400 && getWidth < 1420) {
        begin = 41;
      } else if (getWidth >= 1380 && getWidth < 1400) {
        begin = 42;
      } else if (getWidth >= 1360 && getWidth < 1380) {
        begin = 43;
      } else if (getWidth >= 1340 && getWidth < 1360) {
        begin = 44;
      } else if (getWidth >= 1320 && getWidth < 1340) {
        begin = 45;
      } else if (getWidth >= 1300 && getWidth < 1320) {
        begin = 46;
      } else if (getWidth >= 1280 && getWidth < 1300) {
        begin = 47;
      } else if (getWidth >= 1260 && getWidth < 1280) {
        begin = 48;
      } else if (getWidth >= 1240 && getWidth < 1260) {
        begin = 49;
      } else if (getWidth >= 1220 && getWidth < 1240) {
        begin = 50;
      } else if (getWidth >= 1200 && getWidth < 1220) {
        begin = 51;
      } else if (getWidth >= 1180 && getWidth < 1200) {
        begin = 52;
      } else if (getWidth >= 1160 && getWidth < 1180) {
        begin = 53;
      } else if (getWidth >= 1140 && getWidth < 1160) {
        begin = 54;
      } else if (getWidth >= 1120 && getWidth < 1140) {
        begin = 55;
      } else if (getWidth >= 1100 && getWidth < 1120) {
        begin = 56;
      } else if (getWidth >= 1080 && getWidth < 1100) {
        begin = 57;
      } else if (getWidth >= 1060 && getWidth < 1080) {
        begin = 58;
      } else if (getWidth >= 1040 && getWidth < 1060) {
        begin = 59;
      } else if (getWidth >= 1020 && getWidth < 1040) {
        begin = 60;
      } if (getWidth >= 1000 && getWidth < 1020) {
        begin = 61;
      } else if (getWidth >= 980 && getWidth < 1000) {
        begin = 62;
      } else if (getWidth >= 960 && getWidth < 980) {
        begin = 63;
      } else if (getWidth >= 940 && getWidth < 960) {
        begin = 64;
      } else if (getWidth >= 920 && getWidth < 940) {
        begin = 65;
      } else if (getWidth >= 900 && getWidth < 920) {
        begin = 66;
      } else if (getWidth >= 880 && getWidth < 900) {
        begin = 67;
      } else if (getWidth >= 860 && getWidth < 880) {
        begin = 68;
      } else if (getWidth >= 840 && getWidth < 860) {
        begin = 69;
      } else if (getWidth >= 820 && getWidth < 840) {
        begin = 70;
      } 
    }

    const ohlcStockTemp = [];
    const volumeStockTemp = [];
    const sma5Temp = [];
    const sma10Temp = [];
    // for(let i= parseInt(begin) - 20; i < data.length; i++ ) {
    //   console.log("i", i)
    //   let _o = {
    //     x: data[i][0], // the date
    //     open: data[i][1], // open
    //     high: data[i][2], // high
    //     low: data[i][3], // low
    //     close: data[i][4], // close
    //     vol: data[i][5], // volume
    //   };
    //   sma5Temp.push(_o);
    //   setSma5(sma5Temp);
    // }
    //
    // for(let i= parseInt(begin) - 10; i < data.length; i++ ) {
    //   let _o = {
    //     x: data[i][0], // the date
    //     open: data[i][1], // open
    //     high: data[i][2], // high
    //     low: data[i][3], // low
    //     close: data[i][4], // close
    //     vol: data[i][5], // volume
    //   };
    //   sma10Temp.push(_o);
    //   setSma10(sma10Temp);
    // }
    //
    for (var i = begin; i < data.length; i++) {
      var _o = {
        x: data[i][0], // the date
        open: data[i][1], // open
        high: data[i][2], // high
        low: data[i][3], // low
        close: data[i][4], // close
        vol: data[i][5], // volume
      };
      ohlcStockTemp.push(_o);
      setOhlcStock(ohlcStockTemp);
      volumeStockTemp.push({
        x: data[i][0], // the date
        y: data[i][5], // the volume
        color: data[i][1] < data[i][4] ? UP_COLOR : DOWN_COLOR,
      });
      setVolumeStock(volumeStockTemp);
    }
    // console.log(sma5Temp)
    stockChart.series[0].data = ohlcStockTemp;
    stockChart.series[1].data = volumeStockTemp;
    stockChart.series[2].data = sma5Temp;
    stockChart.series[3].data = sma10Temp;
    chartStock.current.chart.series[0].setData(ohlcStockTemp);
    chartStock.current.chart.series[1].setData(volumeStockTemp);
    chartStock.current.chart.series[2].setData(sma5Temp);
    chartStock.current.chart.series[3].setData(sma10Temp);
    chartStock.current.chart.redraw();

    setChartOptions(stockChart);
    let ao = setInterval(() => {
      if (chartGet.current) {
        clearInterval(ao);
        const { dataMax } = chartGet?.current?.xAxis?.[0].getExtremes();
        if (deviceVersion !== "pc") {
          chartGet.current.xAxis[0].setExtremes(
            data?.[begin + 40]?.[0],
            dataMax,
            false
          );
          chartGet.current.redraw();
        } else {
          let c = data.length;
          chartGet?.current?.xAxis?.[0].setExtremes(
            data?.[c - 90]?.[0],
            dataMax,
            false
          );
          chartGet.current.redraw();
          chartGet.current.reflow();
        }
      }
      chartGet.current.redraw();
      chartGet.current.reflow();
    }, 100);
  };

  const setSizeStock = () => {
    let chartWidth = parseInt($(".chartBox").width());
    // console.log("chartWidth", chartWidth);
    let distance= 1600 - chartWidth
    let numBar = Math.floor(distance / 5)
    const begin= 31 + numBar
    return begin
  };
  const setChartHeight = () => {
    if (window.innerWidth > 768) {
      setDeviceVersion("pc");
    } else {
      setDeviceVersion("mobile");
    }

    // $(".w-18").css("max-width", $("#analysis-wrapper").width() / 4);
    let setS = setInterval(() => {
      if (chartStock?.current) {
        let w = $(".chartBox").width();
        let h = $(".chartBox").height();
        if (!!w && !!h) {
          let cH = chartStock.current.chart.chartHeight;
          let chartInstance = chartStock.current.chart;
          chartInstance.setSize(w, cH, true);
          if (cH !== h) {
            // let chartInstance = this.$refs.chartStock.chart;
            chartInstance.setSize(w, h, true);
            chartGet.current = chartInstance;
          } else {
            clearInterval(setS);
          }
        }
      }
    }, 600);

    //this.$forceUpdate();
  };
  useEffect(() => {
    let touchStart = 0;
    document.addEventListener(
      "touchstart",
      function (event) {
        const now = new Date().getTime();
        const timeSinceLastTouch = now - touchStart;
        if (timeSinceLastTouch <= 100 && timeSinceLastTouch > 0) {
          event.preventDefault();
        }
        touchStart = now;
      },
      false
    );
    setTimeout(() => {
      // Update chartDataLoaded to true when data has finished loading
      setChartDataLoaded(true);
    }, 1300);
    // chartGet = chartStock.current.chart;
    updateWindowDimensions();

    window.addEventListener("resize", redrawChart);
    window.addEventListener("resize", updateWindowDimensions);
    window.addEventListener("resize", setChartHeight);
    if (
      window.screen &&
      window.screen.orientation &&
      window.screen.orientation.type
    ) {
      setClassLandscape(window.screen.orientation.type);
    }

    window.addEventListener(
      "orientationchange",
      () => {
        if (
          window.screen &&
          window.screen.orientation &&
          window.screen.orientation.type
        ) {
          // this.classLandscape = window.screen.orientation.type;
          setClassLandscape(window.screen.orientation.type);
        }
      },
      false
    );
  }, []);

  useEffect(() => {
    setChartHeight();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentWidthContainerRef = containerRef.current?.offsetWidth;
      if (prevWidthContainerRef.current !== currentWidthContainerRef) {
        setChartHeight();
        if (chartStock?.current) {
          chartStock.current.chart?.reflow();
        }
      }
      prevWidthContainerRef.current = currentWidthContainerRef;
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (chartStock?.current) {
        chartStock.current.chart?.reflow();
        chartStock.current.chart?.redraw();
      }
    });
  }, []);
  useEffect(() => {
    (async () => {
      try {
        if (data) {
          listData.current = data.d;
          getDataDefaultGet(data.d);
        }
      } catch (error) {}
    })();
  }, [data?.d]);

  useEffect(() => {
    if (socketWeb) {
      socketWeb.addEventListener("message", (e) => {
        if (
          e.data.indexOf("BO_PRICE") > -1 ||
          e.data.indexOf("TRADER_SENTIMENT") > -1 ||
          e.data.indexOf("BO_CHART_INDICATORS") > -1
        ) {
          // lastUpdatePrice = new Date();
          let data = e.data.replace("42[", "[");
          //   handleDataWs(data);
          const newData = JSON.parse(data);
          if (newData[0] === "BO_PRICE") {
            onReceiveSocketData(newData[1]);
          }
        }
      });
    }
  }, [socketWeb]);

  return (
    <div
      ref={containerRef}
      id="tradePage"
      className={`trade-container ${isMobile ? classLandscape : ""}`}
    >
      <div className="relative chartBox">
        <Chart
          className="wap-chart trans"
          ref={chartStock}
          highcharts={Highcharts}
          options={stockChart}
          constructorType="stockChart"
        />
      </div>
    </div>
  );
};

export default ChartIndex;
