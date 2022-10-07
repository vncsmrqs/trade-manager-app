<template>
  <v-card elevation="2" class="rounded-lg" min-height="100%">
    <v-card-title class="mb-0 pb-0">
      Dias da semana
    </v-card-title>
    <v-card-text class="pa-0 d-flex justify-center">
      <apex-chart
          width="500"
          type="bar"
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
export default class TradesByDayOfWeekChart extends Vue {
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
    legend: {
      show: false,
    },
    xaxis: {
      categories: ['SEG', 'TER', 'QUA', 'QUI', 'SEX']
    },
    colors: ['#FBC02D', '#FF8A80', '#448AFF'],
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        const value = series[seriesIndex][dataPointIndex];
        const name = w.config.series[seriesIndex].name;
        return `
            <div class="custom-tooltip" style="color: ${w.globals.colors[seriesIndex]}">
                <span>${value} - ${name}</span>
            </div>`;
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
      },
    },
  };

  series = [
    {
      name: '0x0',
      data: [11, 17, 15, 15, 21]
    },
    {
      name: 'LOSS',
      data: [13, 23, 20, 8, 13]
    },
    {
      name: 'GAIN',
      data: [44, 55, 41, 67, 22]
    },
  ];
}
</script>

<style scoped>

</style>
