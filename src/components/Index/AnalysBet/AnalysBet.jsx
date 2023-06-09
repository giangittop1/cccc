import React, { useContext, useEffect, useRef, useState } from "react";
import "./AnalysBet.css";
// import { Tab, Tabs } from "react-bootstrap";
import Chart from "highcharts-react-official";
import $ from "jquery";
import { TradingContext } from "../../../pages/Index/Trading/Trading";
import { SocketContainerContext } from "../../../utils/SocketContainer/SocketContainer";
// import UpBetIcons from "../../../assets/icons/UpBetIcons";
// import DownBetIcons from "../../../assets/icons/DownBetIcons";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

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
const AnalysBet = () => {
  const isDesktopScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  // const isMobileScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const gaugeMeterSu = {
    chart: {
      type: "gauge",
      plotBorderWidth: null,
      backgroundColor: "rgba(0,0,0,0)",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      height: 60,
      spacingBottom: 0,
      spacingTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
      events: {
        render(t) {
          let td = t.target.series[0].points[0].y;
          let n = convertTextValueMeter(td);
          $(".gauge-meter--su .gauge-meter-background")
            .removeClass("rank-1 rank-2 rank-3 rank-4 rank-5")
            .addClass(n.cl);
          $(".gauge-meter--su .gauge-meter-label-item").removeClass("active");
          $(
            ".gauge-meter--su .gauge-meter-label-item:nth-child(" +
              n.index +
              ")"
          ).addClass("active");
        },
      },
      animation: {
        duration: 1500,
        easing: "easeOutBounce",
      },
    },

    title: {
      text: "",
    },

    pane: [
      {
        startAngle: -90,
        endAngle: 90,
        background: null,
        center: ["50%", "105%"],
        size: 120,
      },
    ],

    credits: {
      enabled: false,
    },

    exporting: {
      enabled: false,
    },

    tooltip: {
      enabled: true,
    },

    yAxis: [
      {
        min: -90,
        max: 90,
        minorTickPosition: "outside",
        tickPosition: "outside",
        labels: {
          rotation: "auto",
          distance: 0,
          style: {
            color: "rgba(0,0,0,0)",
          },
        },
        pane: 0,
        title: "",
        minorTickColor: "rgba(0,0,0,0)",
        lineColor: "rgba(0,0,0,0)",
        tickColor: "rgba(0,0,0,0)",
      },
    ],

    plotOptions: {
      gauge: {
        dataLabels: {
          enabled: false,
        },
        dial: {
          radius: "85%",
          baseLength: "1%",
          rearLength: 0,
          backgroundColor: {
            linearGradient: {
              x1: 1,
              y1: 0,
              x2: 0,
              y2: 0,
            },
            stops: [
              [0, "#fff"],
              [1, "#000"],
            ],
          },
          baseWidth: 6,
          topWidth: 3,
        },
      },
    },

    series: [
      {
        name: "Summary",
        data: [10],
        yAxis: 0,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 89,
          },
          chartOptions: {
            chart: {
              height: 44,
            },
            pane: [
              {
                size: 60,
              },
            ],
          },
        },
      ],
    },
    // ,
    // watch: {
    //   chartOptions: {
    //     handler(val) {
    //       if (this.$refs.chartStock.chart) {
    //         var chartInstance = chartGet;
    //         this.$refs.chartStock.chart.redraw();
    //         chartGet.redraw();
    //       }
    //     },
    //     deep: true,
    //   },
    // },
  };

  const gaugeMeterMa = {
    chart: {
      type: "gauge",
      plotBorderWidth: null,
      backgroundColor: "rgba(0,0,0,0)",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      height: 50,
      spacingBottom: 0,
      spacingTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
      events: {
        render(t) {
          let td = t.target.series[0].points[0].y;
          let n = convertTextValueMeter(td);
          $(".gauge-meter--ma .gauge-meter-background")
            .removeClass("rank-1 rank-2 rank-3 rank-4 rank-5")
            .addClass(n.cl);
          $(".gauge-meter--ma .gauge-meter-label-item").removeClass("active");
          $(
            ".gauge-meter--ma .gauge-meter-label-item:nth-child(" +
              n.index +
              ")"
          ).addClass("active");
        },
      },
      animation: {
        duration: 1000,
        easing: "easeOutBounce",
      },
    },

    title: {
      text: "",
    },

    pane: [
      {
        startAngle: -90,
        endAngle: 90,
        background: null,
        center: ["50%", "105%"],
        size: 100,
      },
    ],

    credits: {
      enabled: false,
    },

    exporting: {
      enabled: false,
    },

    tooltip: {
      enabled: true,
    },

    yAxis: [
      {
        min: -90,
        max: 90,
        minorTickPosition: "outside",
        tickPosition: "outside",
        labels: {
          rotation: "auto",
          distance: 0,
          style: {
            color: "rgba(0,0,0,0)",
          },
        },
        pane: 0,
        title: "",
        minorTickColor: "rgba(0,0,0,0)",
        lineColor: "rgba(0,0,0,0)",
        tickColor: "rgba(0,0,0,0)",
      },
    ],

    plotOptions: {
      gauge: {
        dataLabels: {
          enabled: false,
        },
        dial: {
          radius: "85%",
          baseLength: "1%",
          rearLength: 0,
          backgroundColor: {
            linearGradient: {
              x1: 1,
              y1: 0,
              x2: 0,
              y2: 0,
            },
            stops: [
              [0, "#fff"],
              [1, "#000"],
            ],
          },
          baseWidth: 6,
          topWidth: 3,
        },
      },
    },

    series: [
      {
        name: "ma",
        data: [5],
        yAxis: 0,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 71,
          },
          chartOptions: {
            chart: {
              height: 35,
            },
            pane: [
              {
                size: 50,
              },
            ],
          },
        },
      ],
    },
  };
  const gaugeMeterOs = {
    chart: {
      type: "gauge",
      plotBorderWidth: null,
      backgroundColor: "rgba(0,0,0,0)",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      height: 50,
      spacingBottom: 0,
      spacingTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
      events: {
        render(t) {
          let td = t.target.series[0].points[0].y;
          let n = convertTextValueMeter(td);
          $(".gauge-meter--os .gauge-meter-background")
            .removeClass("rank-1 rank-2 rank-3 rank-4 rank-5")
            .addClass(n.cl);
          $(".gauge-meter--os .gauge-meter-label-item").removeClass("active");
          $(
            ".gauge-meter--os .gauge-meter-label-item:nth-child(" +
              n.index +
              ")"
          ).addClass("active");
        },
      },
      animation: {
        duration: 1500,
        easing: "easeOutBounce",
      },
    },

    title: {
      text: "",
    },

    pane: [
      {
        startAngle: -90,
        endAngle: 90,
        background: null,
        center: ["50%", "105%"],
        size: 140,
      },
    ],

    credits: {
      enabled: false,
    },

    exporting: {
      enabled: false,
    },

    tooltip: {
      enabled: true,
    },

    yAxis: [
      {
        min: -90,
        max: 90,
        maxPadding: 0.1,
        minorTickPosition: "outside",
        tickPosition: "outside",
        labels: {
          rotation: "auto",
          distance: 0,
          style: {
            color: "rgba(0,0,0,0)",
          },
        },
        pane: 0,
        title: "",
        minorTickColor: "rgba(0,0,0,0)",
        lineColor: "rgba(0,0,0,0)",
        tickColor: "rgba(0,0,0,0)",
      },
    ],

    plotOptions: {
      gauge: {
        dataLabels: {
          enabled: false,
        },
        dial: {
          radius: "85%",
          baseLength: "1%",
          rearLength: 0,
          backgroundColor: {
            linearGradient: {
              x1: 1,
              y1: 0,
              x2: 0,
              y2: 0,
            },
            stops: [
              [0, "#fff"],
              [1, "#000"],
            ],
          },
          baseWidth: 6,
          topWidth: 3,
        },
      },
    },

    series: [
      {
        name: "Oscillator",
        data: [10],
        yAxis: 0,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 71,
          },
          chartOptions: {
            chart: {
              height: 35,
            },
            pane: [
              {
                size: 50,
              },
            ],
          },
          windowWidth: 0,
          windowHeight: 0,
        },
      ],
    },
  };
  const { data } = useContext(TradingContext);
  const { socketWeb } = useContext(SocketContainerContext);
  const [totalBuyStatic, setTotalBuyStatic] = useState(0);
  const [totalSellStatic, setTotalSellStatic] = useState(0);
  // 
  const [activeGau, setActiveGau] = useState(false);
  const [activeHis, setActiveHis] = useState(false);
  // 
  const [textTitleOs, setTextTitleOs] = useState("NEUTRAL");
  const [textTitleSu, setTextTitleSu] = useState("BUY");
  const [textTitleMa, setTextTitleMa] = useState("STRONG SELL");
  // 
  const [NumOscNeutral, setNumOscNeutral] = useState(2);
  const [NumOscSELL, setNumOscSELL] = useState(5);
  const [NumOscBUY, setNumOscBUY] = useState(3);
  // 
  const [NumSumSELL, setNumSumSELL] = useState(7);
  const [NumSumNeutral, setNumSumNeutral] = useState(2);
  const [NumSumBUY, setNumSumBUY] = useState(6);
  // 
  const [NumMovSELL, setNumMovSELL] = useState(6);
  const [NumMovBUY, setNumMovBUY] = useState(4);
  const [NumMovNeutral, setNumMovNeutral] = useState(2);
  // 
  const [optionsOs, setOptionsOs] = useState(gaugeMeterOs);
  const [optionsMa, setOptionsMa] = useState(gaugeMeterMa);
  const [optionsSu, setOptionSu] = useState(gaugeMeterSu);
  // 
  const [activeTab, setActiveTab] = useState(true);
  const chartOs = useRef();
  const chartSu = useRef();
  const chartMa = useRef();
  const lastResultBet = useRef();
  const bet1Ref = useRef();
  const bet2Ref = useRef();
  const bet3Ref = useRef();
  const bet4Ref = useRef();
  const bet5Ref = useRef();

  const finalSideCompare = (a, b) => {
    if (parseFloat(a) > parseFloat(b)) {
      return "UP";
    } else if (parseFloat(a) < parseFloat(b)) {
      return "DOWN";
    } else {
      return "NORMAL";
    }
  };
  useEffect(() => {
    if (data) {
      const lastResultPrice = data?.d?.[data?.d?.length - 1];
      const firstItemBet = lastResultPrice?.[9] % 20;
      let lastItemBet = 20 - firstItemBet - 1;
      if (lastItemBet === 0) {
        lastItemBet = 20;
      }
      // const lastItemBet= 100 - firstItemBet
      // console.log(lastItemBet)
      // const lastItemBet= 100 - parseInt(firstItemBet)
      const arrayItemBet = data?.d
        ?.slice(lastItemBet, 100)
        ?.map((item) => ({
          session: item[9],
          gid: 0,
          finalSide: finalSideCompare(item[1], item[4]),
          id: item[9],
        }));
      lastResultBet.current = arrayItemBet;
      setTotalBuyStatic(
        lastResultBet?.current?.filter((item) => item?.finalSide === "DOWN")
          ?.length
      );
      setTotalSellStatic(
        lastResultBet?.current?.filter((item) => item?.finalSide === "UP")
          ?.length
      );
      if (document?.querySelectorAll(".rounded-full")) {
        let spans = document?.querySelectorAll(".rounded-full");
        lastResultBet?.current?.map((item, key) => {
          if (item?.finalSide === "DOWN") {
            if (spans[key]?.classList) {
              return spans[key].classList.add("bet-buy");
            }
          } else if (item?.finalSide === "UP") {
            if (spans[key]?.classList) {
              return spans[key].classList.add("bet-sell");
            }
          } else {
            if (spans[key]?.classList) {
              return spans[key].classList.add("bet-normal");
            }
          }
        });
      }
      // console.log(lastResultBet?.current)
    }
  }, [data]);
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
  const onReceiveSocketData = (data) => {
    if (parseInt(data?.order) === 1) {
      lastResultBet.current = lastResultBet?.current?.concat([
        {
          finalSide: finalSideCompare(data?.openPrice, data?.closePrice),
          session: data?.session,
          gid: 0,
          id: data?.session,
        },
      ]);
      setTotalBuyStatic(
        lastResultBet?.current?.filter((item) => item?.finalSide === "DOWN")
          ?.length
      );
      setTotalSellStatic(
        lastResultBet?.current?.filter((item) => item?.finalSide === "UP")
          ?.length
      );
      let spans = document.querySelectorAll(".rounded-full");
      lastResultBet?.current?.map((item, key) => {
        if (item?.finalSide === "DOWN") {
          if (spans[key]?.classList) {
            return spans[key].classList.add("bet-buy");
          }
        } else if (item?.finalSide === "UP") {
          if (spans[key]?.classList) {
            return spans[key].classList.add("bet-sell");
          }
        } else {
          if (spans[key]?.classList) {
            return spans[key].classList.add("bet-normal");
          }
        }
      });
      if (lastResultBet?.current?.length >= 100) {
        lastResultBet.current = lastResultBet?.current?.slice(20, 100);
        spans.forEach((item) => item.classList.remove("bet-buy"));
        spans.forEach((item) => item.classList.remove("bet-sell"));
        spans.forEach((item) => item.classList.remove("bet-normal"));
      }

      lastResultBet?.current?.map((item, key) => {
        if (item?.finalSide === "DOWN") {
          if (spans[key]?.classList) {
            return spans[key].classList.add("bet-buy");
          }
        } else if (item?.finalSide === "UP") {
          if (spans[key]?.classList) {
            return spans[key].classList.add("bet-sell");
          }
        } else {
          if (spans[key]?.classList) {
            return spans[key].classList.add("bet-normal");
          }
        }
      });
    }
  };
  const StaSummary = (e) => {
    try {
      let chart = chartSu.current.chart;

      let left = chart.series[0].points[0],
        leftVal;

      //Summary
      // this.NumSumBUY = e.b;
      // this.NumSumSELL = e.s;
      // this.NumSumNeutral = e.m;
      setNumSumBUY(e.b);
      setNumSumSELL(e.s);
      setNumSumNeutral(e.m);

      if ((e.m > e.s && e.m > e.b) || (e.m === e.s && e.m === e.b)) {
        setTextTitleSu("NEUTRAL");
        left.update(0, true);
        chart.redraw();
        return;
      }
      if (e.s > e.b) {
        leftVal = -35;
        setTextTitleSu("SELL");
        if (e.s >= 5) {
          leftVal = -50;
          setTextTitleSu("STRONG SELL");
        }
        left.update(leftVal, true);
        chart.redraw();
      } else if (e.s < e.b) {
        leftVal = 35;
        setTextTitleSu("BUY");
        if (e.b >= 5) {
          leftVal = 50;
          setTextTitleSu("STRONG BUY");
        }
        left.update(leftVal, true);
        chart.redraw();
      }
    } catch {}
  };

  const StaOscillators = (e) => {
    try {
      let chart = chartOs.current.chart;

      let left = chart.series[0].points[0],
        leftVal;

      setNumOscBUY(e.b);
      setNumOscSELL(e.s);
      setNumOscNeutral(e.m);

      if ((e.m > e.s && e.m > e.b) || (e.m === e.s && e.m === e.b)) {
        setTextTitleOs("NEUTRAL");
        left.update(0, true);
        chart.redraw();
      }
      if (e.s > e.b) {
        leftVal = -35;
        setTextTitleOs("SELL");
        if (e.s >= 5) {
          leftVal = -50;
          setTextTitleOs("STRONG SELL");
        }
        left.update(leftVal, true);
        chart.redraw();
      } else if (e.s < e.b) {
        leftVal = 35;
        setTextTitleOs("BUY");
        if (e.b >= 5) {
          leftVal = 50;
          setTextTitleOs("STRONG BUY");
        }
        left.update(leftVal, true);
      }
      chart.redraw();
    } catch (e) {
    } finally {
    }
  };

  return (
    <>
      <div
        data-v-3162dcc5
        data-v-0dc9f329
        id="analysis-wrapper"
        className={`analysis-wrapper relative ${
          isDesktopScreen ? "d-flex" : ""
        }`}
      >
        <ul
          data-v-3162dcc5
          data-v-0dc9f329
          className="nav nav-pills tab-last-result d-flex w-100"
        >
          <li
            data-v-3162dcc5
            data-v-0dc9f329
            id="community"
            className="nav-item"
          >
            <Link
              data-v-3162dcc5nk
              onClick={() => setActiveTab(true)}
              data-v-0dc9f329
              className={`nav-link text-capitalize ${
                activeTab === true ? "active" : ""
              }`}
            >
              Indicators
            </Link>
          </li>
          <li
            data-v-3162dcc5
            data-v-0dc9f329
            id="community"
            className="nav-item"
          >
            <Link
              data-v-3162dcc5
              onClick={() => setActiveTab(false)}
              data-v-0dc9f329
              className={`nav-link text-capitalize ${
                activeTab === false ? "active" : ""
              }`}
            >
              Last results
            </Link>
          </li>
          <li
            data-v-3162dcc5
            data-v-0dc9f329
            className="navOverview"
            style={{ display: activeTab ? "none" : "block" }}
          >
            <div
              data-v-3162dcc5
              data-v-24a935a7
              data-v-0dc9f329
              className="ml-3"
            >
              <div data-v-3162dcc5 data-v-24a935a7>
                <div
                  data-v-03d91928
                  className="overviewInfo d-flex align-items-center my-auto"
                >
                  <div data-v-3162dcc5 data-v-03d91928 className="badgeItem">
                    <svg
                      data-v-3162dcc5
                      data-v-03d91928
                      xmlns="http://www.w3.org/2000/svg"
                      width="25.413"
                      height="12.844"
                      viewBox="0 0 25.413 12.844"
                    >
                      <g
                        data-v-03d91928
                        id="trend-up"
                        transform="translate(4.658 -8)"
                      >
                        <path
                          data-v-03d91928
                          id="Path_26233"
                          data-name="Path 26233"
                          d="M25.755,8H16.122l4.249,4.249-6.623,6.623L7.893,12.283a.8.8,0,0,0-1.129-.071L.342,17.831,1.4,19.04l5.822-5.095,5.893,6.629a.806.806,0,0,0,.576.27h.023a.8.8,0,0,0,.568-.235l7.225-7.225,4.249,4.249Z"
                          transform="translate(-5)"
                          fill="#1DBF75"
                        />
                      </g>
                    </svg>
                    <span
                      data-v-3162dcc5
                      data-v-03d91928
                      className="ml-1 ml-lg-3"
                    >
                      36
                    </span>
                  </div>
                  <div
                    data-v-3162dcc5
                    data-v-03d91928
                    className="badgeItem ml-2"
                  >
                    <svg
                      data-v-3162dcc5
                      data-v-03d91928
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.587"
                      height="11.921"
                      viewBox="0 0 23.587 11.921"
                    >
                      <g
                        data-v-03d91928
                        id="trend-down"
                        transform="translate(-0.342 -8)"
                      >
                        <path
                          data-v-03d91928
                          id="Path_26234"
                          data-name="Path 26234"
                          d="M23.929,19.921H14.988l3.944-3.944L12.785,9.831,7.35,15.945a.744.744,0,0,1-1.048.066L.342,10.8l.981-1.122,5.4,4.729L12.2,8.25A.747.747,0,0,1,12.731,8h.022a.743.743,0,0,1,.527.218l6.705,6.705,3.944-3.944Z"
                          fill="#FA2843"
                        />
                      </g>
                    </svg>
                    <span
                      data-v-3162dcc5
                      data-v-03d91928
                      className="ml-1 ml-lg-3"
                    >
                      44
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        {activeTab === true && (
          <div data-v-3162dcc5 className="wrap-gauge-meter b-desktop">
            <div data-v-3162dcc5 className="wrap-gauge-meter-inner">
              <div data-v-3162dcc5 className="gauge-meter">
                <div
                  data-v-3162dcc5
                  className="gauge-meter-sub gauge-meter--os"
                >
                  <div
                    data-v-3162dcc5
                    className="v-popover gauge-meter-popover"
                  >
                    <div data-v-3162dcc5 className="trigger inline-block">
                      <h3 data-v-3162dcc5 className="gauge-meter-title">
                        Oscillators
                        <span
                          data-v-3162dcc5
                          className="gauge-meter-title-icon"
                        >
                          <svg
                            data-v-3162dcc5
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                          >
                            <g
                              data-v-3162dcc5
                              id="c-question"
                              transform="translate(3.068 -8.774)"
                            >
                              <g
                                data-v-3162dcc5
                                id="Ellipse_1825"
                                data-name="Ellipse 1825"
                                transform="translate(-2.068 9.774)"
                                fill="none"
                                stroke="#fefefe"
                                strokeLinecap="square"
                                strokeMiterlimit="10"
                                strokeWidth="1"
                              >
                                <circle
                                  cx="10"
                                  cy="10"
                                  r="10"
                                  stroke="none"
                                ></circle>
                                <circle
                                  cx="10"
                                  cy="10"
                                  r="10.5"
                                  fill="none"
                                ></circle>
                              </g>
                              <g
                                id="question"
                                transform="translate(3.497 13.43)"
                              >
                                <path
                                  id="Path_30768"
                                  data-name="Path 30768"
                                  d="M8.359,10.774a4.349,4.349,0,0,1,.4-2.323,5.026,5.026,0,0,1,1.4-1.421c1.317-.981,1.876-1.491,1.876-2.54,0-1.166-.924-1.637-2.166-1.637a7.306,7.306,0,0,0-3.334.866L5.694,2.063A9.2,9.2,0,0,1,10.035,1a4.89,4.89,0,0,1,3.1.9A3,3,0,0,1,14.287,4.4,3.24,3.24,0,0,1,13.4,6.7,10.58,10.58,0,0,1,11.872,8,5.71,5.71,0,0,0,10.63,9.137a2.68,2.68,0,0,0-.315,1.637H8.359Z"
                                  transform="translate(-5.694 -1)"
                                  fill="#fefefe"
                                ></path>
                                <ellipse
                                  id="Ellipse_1827"
                                  data-name="Ellipse 1827"
                                  cx="1.363"
                                  cy="1.284"
                                  rx="1.363"
                                  ry="1.284"
                                  transform="translate(2.252 11.56)"
                                  fill="#fefefe"
                                ></ellipse>
                              </g>
                            </g>
                          </svg>
                        </span>
                      </h3>
                    </div>
                  </div>
                  <h4 data-v-3162dcc5 className="gauge-meter-sub-title">
                    {textTitleOs}
                  </h4>
                  <div data-v-3162dcc5 className="gauge-meter-border">
                    <div
                      data-v-3162dcc5
                      className="gauge-meter-background rank-2"
                    ></div>
                    <ul data-v-3162dcc5 className="gauge-meter-label-list">
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--strong-sell"
                      >
                        strong
                        <br />
                        sell
                      </li>
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--sell active"
                      >
                        sell
                      </li>
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--neutral"
                      >
                        neutral
                      </li>
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--buy"
                      >
                        buy
                      </li>
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--strong-buy"
                      >
                        strong
                        <br />
                        buy
                      </li>
                    </ul>
                    {
                      isDesktopScreen && 
                      <ul data-v-3162dcc5 className={"gauge-meter-status-list mb-0"}>
                        <li data-v-3162dcc5 className="gauge-meter-status-item">
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-value gauge-meter-status-value--sell"
                          >
                            {NumOscSELL}
                          </span>
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-text"
                          >
                            Sell
                          </span>
                        </li>
                        <li data-v-3162dcc5 className="gauge-meter-status-item">
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-value gauge-meter-status-value--neutral"
                          >
                            {NumOscNeutral}
                          </span>
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-text"
                          >
                            Neutral
                          </span>
                        </li>
                        <li data-v-3162dcc5 className="gauge-meter-status-item">
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-value gauge-meter-status-value--buy"
                          >
                            {NumOscBUY}
                          </span>
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-text"
                          >
                            Buy
                          </span>
                        </li>
                      </ul>
                    }
                    <Chart
                      data-v-3162dcc5
                      ref={chartOs}
                      className="gauge-meter-pane"
                      options={optionsOs}
                    ></Chart>
                  </div>
                </div>
                <div
                  data-v-3162dcc5
                  className="gauge-meter-sub gauge-meter--su"
                >
                  <div
                    data-v-3162dcc5
                    className="v-popover gauge-meter-popover"
                  >
                    <div
                      data-v-3162dcc5
                      className="trigger"
                      style={{ display: "inlineBlock" }}
                    >
                      <h3 data-v-3162dcc5 className="gauge-meter-title">
                        Summary
                        <span
                          data-v-3162dcc5
                          className="gauge-meter-title-icon"
                        >
                          <svg
                            data-v-3162dcc5
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                          >
                            <g
                              id="c-question"
                              transform="translate(3.068 -8.774)"
                            >
                              <g
                                id="Ellipse_1825"
                                data-name="Ellipse 1825"
                                transform="translate(-2.068 9.774)"
                                fill="none"
                                stroke="#fefefe"
                                strokeLinecap="square"
                                strokeMiterlimit="10"
                                strokeWidth="1"
                              >
                                <circle
                                  cx="10"
                                  cy="10"
                                  r="10"
                                  stroke="none"
                                ></circle>
                                <circle
                                  cx="10"
                                  cy="10"
                                  r="10.5"
                                  fill="none"
                                ></circle>
                              </g>
                              <g
                                id="question"
                                transform="translate(3.497 13.43)"
                              >
                                <path
                                  id="Path_30768"
                                  data-name="Path 30768"
                                  d="M8.359,10.774a4.349,4.349,0,0,1,.4-2.323,5.026,5.026,0,0,1,1.4-1.421c1.317-.981,1.876-1.491,1.876-2.54,0-1.166-.924-1.637-2.166-1.637a7.306,7.306,0,0,0-3.334.866L5.694,2.063A9.2,9.2,0,0,1,10.035,1a4.89,4.89,0,0,1,3.1.9A3,3,0,0,1,14.287,4.4,3.24,3.24,0,0,1,13.4,6.7,10.58,10.58,0,0,1,11.872,8,5.71,5.71,0,0,0,10.63,9.137a2.68,2.68,0,0,0-.315,1.637H8.359Z"
                                  transform="translate(-5.694 -1)"
                                  fill="#fefefe"
                                ></path>
                                <ellipse
                                  id="Ellipse_1827"
                                  data-name="Ellipse 1827"
                                  cx="1.363"
                                  cy="1.284"
                                  rx="1.363"
                                  ry="1.284"
                                  transform="translate(2.252 11.56)"
                                  fill="#fefefe"
                                ></ellipse>
                              </g>
                            </g>
                          </svg>
                        </span>
                      </h3>
                    </div>
                  </div>
                  <h4 data-v-3162dcc5 className="gauge-meter-sub-title">
                    {textTitleSu}
                  </h4>
                  <div data-v-3162dcc5 className="gauge-meter-border">
                    <div
                      data-v-3162dcc5
                      className="gauge-meter-background rank-3"
                    ></div>
                    <ul data-v-3162dcc5 className="gauge-meter-label-list">
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--strong-sell"
                      >
                        strong
                        <br />
                        sell
                      </li>
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--sell"
                      >
                        sell
                      </li>
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--neutral active"
                      >
                        neutral
                      </li>
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--buy"
                      >
                        buy
                      </li>
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--strong-buy"
                      >
                        strong
                        <br />
                        buy
                      </li>
                    </ul>
                    {
                      isDesktopScreen && 
                      <ul data-v-3162dcc5 className="gauge-meter-status-list mb-0">
                        <li data-v-3162dcc5 className="gauge-meter-status-item">
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-value gauge-meter-status-value--sell"
                          >
                            {NumSumSELL}
                          </span>
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-text"
                          >
                            Sell
                          </span>
                        </li>
                        <li data-v-3162dcc5 className="gauge-meter-status-item">
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-value gauge-meter-status-value--neutral"
                          >
                            {NumSumNeutral}
                          </span>
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-text"
                          >
                            Neutral
                          </span>
                        </li>
                        <li data-v-3162dcc5 className="gauge-meter-status-item">
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-value gauge-meter-status-value--buy"
                          >
                            {NumSumBUY}
                          </span>
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-text"
                          >
                            Buy
                          </span>
                        </li>
                      </ul>
                    }
                    <Chart
                      data-v-3162dcc5
                      className="gauge-meter-pane"
                      options={optionsSu}
                      ref={chartSu}
                    ></Chart>
                  </div>
                </div>
                <div
                  data-v-3162dcc5
                  className="gauge-meter-sub gauge-meter--ma"
                >
                  <div
                    data-v-3162dcc5
                    className="v-popover gauge-meter-popover"
                  >
                    <div
                      data-v-3162dcc5
                      className="trigger"
                      style={{ display: "inlineBlock" }}
                    >
                      <h3 data-v-3162dcc5 className="gauge-meter-title">
                        Moving Averages
                        <span
                          data-v-3162dcc5
                          className="gauge-meter-title-icon"
                        >
                          <svg
                            data-v-3162dcc5
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                          >
                            <g
                              data-v-3162dcc5
                              id="c-question"
                              transform="translate(3.068 -8.774)"
                            >
                              <g
                                data-v-3162dcc5
                                id="Ellipse_1825"
                                data-name="Ellipse 1825"
                                transform="translate(-2.068 9.774)"
                                fill="none"
                                stroke="#fefefe"
                                strokeLinecap="square"
                                strokeMiterlimit="10"
                                strokeWidth="1"
                              >
                                <circle
                                  data-v-3162dcc5
                                  cx="10"
                                  cy="10"
                                  r="10"
                                  stroke="none"
                                ></circle>
                                <circle
                                  data-v-3162dcc5
                                  cx="10"
                                  cy="10"
                                  r="10.5"
                                  fill="none"
                                ></circle>
                              </g>
                              <g
                                data-v-3162dcc5
                                id="question"
                                transform="translate(3.497 13.43)"
                              >
                                <path
                                
                                  id="Path_30768"
                                  data-name="Path 30768"
                                  d="M8.359,10.774a4.349,4.349,0,0,1,.4-2.323,5.026,5.026,0,0,1,1.4-1.421c1.317-.981,1.876-1.491,1.876-2.54,0-1.166-.924-1.637-2.166-1.637a7.306,7.306,0,0,0-3.334.866L5.694,2.063A9.2,9.2,0,0,1,10.035,1a4.89,4.89,0,0,1,3.1.9A3,3,0,0,1,14.287,4.4,3.24,3.24,0,0,1,13.4,6.7,10.58,10.58,0,0,1,11.872,8,5.71,5.71,0,0,0,10.63,9.137a2.68,2.68,0,0,0-.315,1.637H8.359Z"
                                  transform="translate(-5.694 -1)"
                                  fill="#fefefe"
                                ></path>
                                <ellipse
                                  id="Ellipse_1827"
                                  data-name="Ellipse 1827"
                                  cx="1.363"
                                  cy="1.284"
                                  rx="1.363"
                                  ry="1.284"
                                  transform="translate(2.252 11.56)"
                                  fill="#fefefe"
                                ></ellipse>
                              </g>
                            </g>
                          </svg>
                        </span>
                      </h3>
                    </div>
                  </div>
                  <h4 data-v-3162dcc5 className="gauge-meter-sub-title">
                    {textTitleMa}
                  </h4>
                  <div data-v-3162dcc5 className="gauge-meter-border">
                    <div
                      data-v-3162dcc5
                      className="gauge-meter-background rank-3"
                    ></div>
                    <ul data-v-3162dcc5 className="gauge-meter-label-list">
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--strong-sell"
                      >
                        strong
                        <br />
                        sell
                      </li>
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--sell"
                      >
                        sell
                      </li>
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--neutral active"
                      >
                        neutral
                      </li>
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--buy"
                      >
                        buy
                      </li>
                      <li
                        data-v-3162dcc5
                        className="gauge-meter-label-item gauge-meter-label-item--strong-buy"
                      >
                        strong
                        <br />
                        buy
                      </li>
                    </ul>
                    {
                      isDesktopScreen && 
                      <ul data-v-3162dcc5 className="gauge-meter-status-list mb-0">
                        <li data-v-3162dcc5 className="gauge-meter-status-item">
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-value gauge-meter-status-value--sell"
                          >
                            {NumMovSELL}
                          </span>
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-text"
                          >
                            Sell
                          </span>
                        </li>
                        <li data-v-3162dcc5 className="gauge-meter-status-item">
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-value gauge-meter-status-value--neutral"
                          >
                            {NumMovNeutral}
                          </span>
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-text"
                          >
                            Neutral
                          </span>
                        </li>
                        <li data-v-3162dcc5 className="gauge-meter-status-item">
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-value gauge-meter-status-value--buy"
                          >
                            {NumMovBUY}
                          </span>
                          <span
                            data-v-3162dcc5
                            className="gauge-meter-status-text"
                          >
                            Buy
                          </span>
                        </li>
                      </ul>
                    }
                    <Chart
                      data-v-3162dcc5
                      className="gauge-meter-pane"
                      options={optionsMa}
                      ref={chartMa}
                    ></Chart>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          data-v-3162dcc5
          style={{ display: activeTab === false ? "block" : "none" }}
          className={`historyBox a-desktop ${
            isDesktopScreen ? "position-relative flex-fill" : ""
          }`}
        >
          {/* {
              isDesktopScreen && 
              <div data-v-3162dcc5 className="overviewInfo flex items-center">
                <span data-v-3162dcc5 className="badgeItem" style={{padding: 5, display: "flex", alignItems: "center", justifyContent: 'center', gap: 16}}>
                  <UpBetIcons />
                  <span data-v-3162dcc5 style={{fontWeight: 700}}> {totalBuyStatic} </span>
                </span>
                <span data-v-3162dcc5 className="badgeItem ml-2" style={{padding: 5, display: "flex", alignItems: "center", justifyContent: 'center', gap: 16}}>
                  <DownBetIcons />
                  <span data-v-3162dcc5 style={{fontWeight: 700}}> {totalSellStatic} </span>
                </span>
              </div>
            } */}
          <div
            data-v-3162dcc5
            className={`ct flex justify-center ${
              isDesktopScreen
                ? "position-absolute top-50 start-50 translate-middle"
                : ""
            }`}
          >
            <div
              data-v-3162dcc5
              className={
                isDesktopScreen
                  ? "row fix-list-mobile result-bet"
                  : "row fix-list-mobile result-bet list-r-mobile"
              }
              style={{ flexWrap: "nowrap" }}
            >
              <div data-v-3162dcc5 ref={bet1Ref} className="col w-18 list1">
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
              </div>
              <div data-v-3162dcc5 ref={bet2Ref} className="col w-18 list2">
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
              </div>
              <div data-v-3162dcc5 ref={bet3Ref} className="col w-18 list3">
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
              </div>
              <div data-v-3162dcc5 ref={bet4Ref} className="col w-18 list4">
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
              </div>
              <div data-v-3162dcc5 ref={bet5Ref} className="col w-18 list5">
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-1 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-2 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-3 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-4 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
                <span
                  data-v-3162dcc5
                  className="gridcs-5 inline-flex m-1 item rounded-full empty"
                ></span>
              </div>
            </div>
          </div>
        </div>
        {/* <vs-tabs>
                <vs-tab label="INDICATORS" @click="(activeGau = true), (activeHis = true)">
                </vs-tab> 
                <vs-tab label="LAST RESULTS" @click="(activeGau = true), (activeHis = false)">
                </vs-tab>
              </vs-tabs> */}
        {/* className="{ active: activeGau, hidden: !activeHis }" */}

        {/* className="{ active: !activeGau, hidden: activeHis }" */}
      </div>
    </>
  );
};

export default AnalysBet;
