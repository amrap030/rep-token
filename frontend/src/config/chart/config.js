import { CrosshairMode } from "lightweight-charts";

const chartConfig = {
  layout: {
    backgroundColor: "transparent",
    textColor: "white",
  },
  grid: {
    vertLines: {
      color: "rgba(197, 203, 206, 0.5)",
      visible: false,
    },
    horzLines: {
      color: "rgba(197, 203, 206, 0.5)",
      visible: false,
    },
  },
  crosshair: {
    vertLine: {
      visible: true,
      labelVisible: false,
    },
    horzLine: {
      visible: false,
      labelVisible: false,
    },
    mode: CrosshairMode.Normal,
  },
  rightPriceScale: {
    borderVisible: false,
    mode: 1,
    visible: false,
  },
  timeScale: {
    timeVisible: true,
    secondsVisible: false,
    borderVisible: false,
    // tickMarkFormatter: (time, tickMarkType, locale) => {
    //   console.log(time, tickMarkType, locale);
    //   const year = new Date(time * 1000).getUTCDay();
    //   return String(year);
    // },
  },
  localization: {
    locale: "de-DE",
  },
};

const candlestickConfig = {
  upColor: "#22C55E",
  downColor: "#EF4444",
  borderDownColor: "#EF4444",
  borderUpColor: "#22C55E",
  wickDownColor: "#EF4444",
  wickUpColor: "#22C55E",
  scaleMargins: {
    top: 5,
    bottom: 0,
  },
};

export { chartConfig, candlestickConfig };
