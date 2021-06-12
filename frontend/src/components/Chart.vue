<template>
  <div
    ref="chartContainer"
    class="relative flex-grow p-4 bg-custom-secondary rounded-xl"
    style="height: 500px"
  >
    <div class="absolute bottom-0" ref="chartRef"></div>
  </div>
</template>

<script>
import { useApolloClient } from "../composables/useApolloClient.js";
import { filteredQuotes } from "../graphql/subscriptions.js";
import { ref, onMounted } from "vue";
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

export default {
  props: ["symbol"],
  setup(props) {
    const smbl = ref([]);
    const apollo = useApolloClient();
    const chartRef = ref(null);
    const chartContainer = ref(null);

    const quoteObserver = apollo.client.subscribe({
      query: filteredQuotes,
      variables: {
        symbol: props.symbol,
      },
    });

    onMounted(() => {
      const chart = createChart(chartRef.value, chartConfig);
      const candleSeries = chart.addCandlestickSeries(candlestickConfig);

      chart.subscribeCrosshairMove((param) => {
        console.log(param);
        if (param.time) console.log(param.seriesPrices.get(candleSeries));
      });

      const chartContainerObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          chart.resize(entry.contentRect.width, 380);
          chart.timeScale().fitContent();
        });
      });

      chartContainerObserver.observe(chartContainer.value);

      quoteObserver.subscribe({
        next(data) {
          smbl.value = data.data.symbols;
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
        },
        error(error) {
          console.error(error);
        },
      });
    });

    return { smbl, chartRef, chartContainer };
  },
};
</script>

<style></style>
