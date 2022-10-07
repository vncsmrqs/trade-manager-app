<template>
  <v-card elevation="2" class="rounded-lg" min-height="100%">
    <v-card-title class="mb-0 pb-0">
      Gain / Loss - Tarde
    </v-card-title>
    <v-card-text class="pa-0 d-flex justify-center">
      <apex-chart
          width="250"
          type="donut"
          height="250px"
          :options="options"
          :series="series"
      ></apex-chart>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ApexOptions } from "apexcharts";

@Component({})
export default class EveningTradesChart extends Vue {
  options: ApexOptions = {
    chart: {
      id: 'vuechart-example',
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false,
      },
    },
    states: {
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0.35,
        }
      },
    },
    labels: ['0x0', 'Loss', 'Gain'],
    colors: ['#FBC02D', '#FF8A80', '#448AFF'],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              formatter(value, context) {
                const total = context.globals.series.reduce((total, v) => total + v, 0);
                return `${(value / total * 100).toFixed(0)}%`;
              },
              fontSize: '28px',
            }
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      custom: function({series, seriesIndex, w}) {
        const value = series[seriesIndex];
        const name = w.config.labels[seriesIndex];
        return `
            <div class="custom-tooltip" style="color: ${w.globals.colors[seriesIndex]}">
                <span>${value} - ${name}</span>
            </div>`;
      },
    },
    legend: {
      show: false,
    },
  };

  series = [55, 45, 45];
}
</script>

<style scoped>

</style>
