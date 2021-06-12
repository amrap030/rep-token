<template>
  <div
    ref="chartContainer"
    class="relative flex-grow p-4 bg-custom-secondary rounded-xl"
    style="height: 500px"
  >
    <div class="text-2xl font-medium text-gray-200">&#8364; {{ price }}</div>
    <div class="ml-0.5 text-xs text-gray-400">{{ time }}</div>
    <div class="absolute bottom-0" ref="chartRef"></div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { createChart } from "lightweight-charts";
import { chartConfig, candlestickConfig } from "../config/chart/config.js";

function getUnixTimestamp(timestamp) {
  return (
    Date.UTC(
      timestamp.getFullYear(),
      timestamp.getMonth(),
      timestamp.getDate(),
      timestamp.getHours(),
      timestamp.getMinutes(),
      0,
      0
    ) / 1000
  );
}

function formatTime(timestamp) {
  const date =
    typeof timestamp === "string"
      ? new Date(timestamp)
      : new Date(timestamp * 1000);
  const year = date.getFullYear();
  const hours =
    typeof timestamp === "string" ? date.getHours() : date.getHours() - 2;
  const minutes = date.getMinutes();
  const day = date.getDate();
  return `${day}. ${date.toLocaleString("default", {
    month: "long",
  })} ${year}, ${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} (CET)`;
}

export default {
  props: ["symbol", "quotes"],
  setup(props) {
    const smbl = ref([]);
    const chartRef = ref(null);
    const chartContainer = ref(null);
    const price = ref("");
    const time = ref("");

    onMounted(() => {
      const chart = createChart(chartRef.value, chartConfig);
      const candleSeries = chart.addCandlestickSeries(candlestickConfig);

      chart.subscribeCrosshairMove((param) => {
        if (smbl.value.length) {
          if (
            param === undefined ||
            param.time === undefined ||
            param.point.x < 0 ||
            param.point.y < 0
          ) {
            price.value = Number(
              smbl.value[0].quotes[smbl.value[0].quotes.length - 1].close
            ).toFixed(2);
            time.value = formatTime(
              smbl.value[0].quotes[smbl.value[0].quotes.length - 1].time
            );
          } else {
            price.value = Number(
              param.seriesPrices.get(candleSeries).close
            ).toFixed(2);
            time.value = formatTime(param.time);
          }
        }
      });

      const chartContainerObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          chart.resize(entry.contentRect.width, 380);
          chart.timeScale().fitContent();
        });
      });

      chartContainerObserver.observe(chartContainer.value);

      watch(
        () => props.quotes,
        () => {
          smbl.value = props.quotes;
          price.value = Number(
            smbl.value[0].quotes[smbl.value[0].quotes.length - 1].close
          ).toFixed(2);
          time.value = formatTime(
            smbl.value[0].quotes[smbl.value[0].quotes.length - 1].time
          );
          const candleData = smbl.value[0].quotes.map((quote) => {
            return {
              time: getUnixTimestamp(new Date(quote.time)),
              open: quote.open,
              high: quote.high,
              low: quote.low,
              close: quote.close,
            };
          });
          candleSeries.setData(candleData);
          chart.timeScale().fitContent();
        }
      );
    });

    return { smbl, chartRef, chartContainer, price, time };
  },
};
</script>

<style>
.tv-lightweight-charts {
  margin: auto !important;
  @apply transform -translate-y-4;
}
</style>
