<template>
  <v-card elevation="2" class="rounded-lg" min-height="100%">
    <v-card-title class="mb-0 pb-0">
      Registros por intervalo - 30 min
    </v-card-title>
    <v-card-text class="pa-0 d-flex justify-center">
      <apex-chart
          width="1088px"
          type="bar"
          height="1000px"
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
export default class TradesByIntervalChart extends Vue {
  options: ApexOptions = {
    chart: {
      id: 'vuechart-example',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false,
      },
    },
    labels: ['Loss', 'Gain'],
    colors: ['#FF8A80', '#448AFF'],
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: true,
      offsetX: 18,
      style: {
        fontSize: '12px',
        colors: ['#FF8A80', '#448AFF'],
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        '09:00 - 09:30',
        '09:30 - 10:00',
        '10:00 - 10:30',
        '10:30 - 11:00',
        '11:00 - 11:30',
        '11:30 - 12:00',
        '12:00 - 12:30',
        '12:30 - 13:00',
        '13:00 - 13:30',
        '13:30 - 14:00',
        '14:00 - 14:30',
        '14:30 - 15:00',
        '15:00 - 15:30',
        '15:30 - 16:00',
        '16:00 - 16:30',
        '16:30 - 17:00',
        '17:00 - 17:30',
        '17:30 - 18:00',
      ],
    },
  };

  series = [
    {
      data: [44, 55, 41, 64, 22, 43, 21,44, 55, 41, 64, 22, 43, 21,44, 55, 41, 64],
    },
    {
      data: [53, 32, 33, 52, 13, 44, 32,53, 32, 33, 52, 13, 44, 32,53, 32, 33, 52],
    }
  ];
}
</script>

<style scoped>

</style>
