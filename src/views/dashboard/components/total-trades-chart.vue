<template>
  <v-card elevation="2" class="rounded-lg" min-height="100%">
    <v-card-title class="mb-0 pb-0">
      Gain / Loss / 0x0
    </v-card-title>
    <v-card-text class="pa-0 d-flex justify-center">
      <apex-chart
          width="250"
          type="pie"
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
export default class TotalTradesChart extends Vue {
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
    labels: ['0x0', 'Loss', 'Gain'],
    colors: ['#FBC02D', '#FF8A80', '#448AFF'],
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -20,
          minAngleToShowLabel: 10
        },
      }
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
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '20px',
        colors: ['#fff'],
      },
      formatter(value, context) {
        const total = context.w.globals.series.reduce((total, v) => total + v, 0);
        return `${(value / total * 100).toFixed(0)}%`;
      },
      dropShadow: {
        enabled: false,
      },
    },
  };

  series = [10, 10, 100];
}
</script>

<style scoped>

</style>
