<template>
  <v-container class="pa-8">
    <v-row class="mb-4">
      <v-col cols="12" sm="5" md="3">
        <v-menu
            ref="startDate"
            v-model="showStartDatePicker"
            :close-on-content-click="false"
            :return-value.sync="filter.startDate"
            transition="fade"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                :value="formatDateFieldValue(filter.startDate)"
                label="Data inicial"
                prepend-inner-icon="mdi-calendar"
                readonly
                outlined
                full-width
                dense
                v-bind="attrs"
                v-on="on"
                hide-details
                style="background-color: white"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="filter.startDate"
              no-title
              color="primary"
              locale="pt-BR"
              :max="today"
              @click:date="$refs.startDate.save(filter.startDate)"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-menu
            ref="endDate"
            v-model="showEndDatePicker"
            :close-on-content-click="false"
            :return-value.sync="filter.endDate"
            transition="fade"
            offset-y
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                :value="formatDateFieldValue(filter.endDate)"
                label="Data inicial"
                prepend-inner-icon="mdi-calendar"
                readonly
                outlined
                full-width
                dense
                v-bind="attrs"
                v-on="on"
                hide-details
                style="background-color: white"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="filter.endDate"
              no-title
              color="primary"
              locale="pt-BR"
              :min="filter.startDate"
              :max="today"
              @click:date="$refs.endDate.save(filter.endDate)"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" sm="auto">
        <v-btn
            outlined
            color="primary"
            style="height: 40px; background-color: white"
            @click="() => search()"
            block
            :disabled="isLoading"
        >
          <v-icon left>mdi-magnify</v-icon>
          <span>Buscar</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="2" class="rounded-lg" min-height="100%">
          <v-card-title>
            Ranking por setup
          </v-card-title>
          <v-card-text class="">
            <v-simple-table dense class="v-sheet--outlined">
              <template v-slot:default>
                <tbody>
                <tr v-for="(item, i) in rankingOfSetups.items" :key="i">
                  <td class="text-left font-weight-bold">{{ item.position }}</td>
                  <td class="text-left">{{ item.setupNome }}</td>
                  <td class="text-center blue--text font-weight-bold">{{ item.gainCount }}</td>
                  <td class="text-center red--text text--accent-1 font-weight-bold">{{ item.lossCount }}</td>
                  <td class="text-right">{{ item.gainPercentage }}%</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card elevation="2" class="rounded-lg" min-height="100%">
          <v-card-title class="mb-0 pb-0">
            Dias da semana
          </v-card-title>
          <v-card-text class="pa-0 d-flex justify-center">
            <apex-chart
                width="500"
                type="bar"
                height="250px"
                :options="weekdaysChart.options"
                :series="weekdaysChart.series"
            ></apex-chart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="2" class="rounded-lg" min-height="100%">
          <v-card-title class="mb-0 pb-0">
            Gain / Loss / 0x0
          </v-card-title>
          <v-card-text class="pa-0 d-flex justify-center">
            <apex-chart
                width="250"
                type="pie"
                height="250px"
                :options="gainLossOrDrawChart.options"
                :series="gainLossOrDrawChart.series"
            ></apex-chart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="2" class="rounded-lg" min-height="100%">
          <v-card-title class="mb-0 pb-0">
            Gain / Loss - Manhã
          </v-card-title>
          <v-card-text class="pa-0 d-flex justify-center">
            <apex-chart
                width="250"
                type="donut"
                height="250px"
                :options="gainLossMorningChart.options"
                :series="gainLossMorningChart.series"
            ></apex-chart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="2" class="rounded-lg" min-height="100%">
          <v-card-title class="mb-0 pb-0">
            Gain / Loss - Tarde
          </v-card-title>
          <v-card-text class="pa-0 d-flex justify-center">
            <apex-chart
                width="250"
                type="donut"
                height="250px"
                :options="gainLossEveningChart.options"
                :series="gainLossEveningChart.series"
            ></apex-chart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card elevation="2" class="rounded-lg" min-height="100%">
          <v-card-title class="mb-0 pb-0">
            Registros por intervalo - 30 min
          </v-card-title>
          <v-card-text class="pa-0 d-flex justify-center">
            <apex-chart
                width="1088px"
                type="bar"
                height="1000px"
                :options="tradesByIntervalChart.options"
                :series="tradesByIntervalChart.series"
            ></apex-chart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueApexCharts from 'vue-apexcharts';
import { ApexOptions } from "apexcharts";
import moment from "moment";

@Component({ VueApexCharts })
export default class DashboardView extends Vue {
  filter = {
    startDate: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  }

  showStartDatePicker = false;
  showEndDatePicker = false;

  formatDateFieldValue(date: string): string {
    return moment(date).format('DD/MM/YYYY');
  }

  get today(): string {
    return moment().format('YYYY-MM-DD');
  }

  get isLoading(): boolean {
    return false;
  }

  search(): void {

  }

  rankingOfSetups = {
    items: [
      {
        position: 1,
        setupNome: 'Movimento - Clássico Perto',
        gainCount: 23,
        lossCount: 7,
        gainPercentage: 76.67,
      },
      {
        position: 2,
        setupNome: 'Movimento - Clássico Perto',
        gainCount: 23,
        lossCount: 7,
        gainPercentage: 76.67,
      },
      {
        position: 3,
        setupNome: 'Movimento - Clássico Perto',
        gainCount: 23,
        lossCount: 7,
        gainPercentage: 76.67,
      },
      {
        position: 4,
        setupNome: 'Movimento - Clássico Perto',
        gainCount: 23,
        lossCount: 7,
        gainPercentage: 76.67,
      },
      {
        position: 5,
        setupNome: 'Movimento - Clássico Perto',
        gainCount: 23,
        lossCount: 7,
        gainPercentage: 76.67,
      },
      {
        position: 6,
        setupNome: 'Movimento - Clássico Perto',
        gainCount: 23,
        lossCount: 7,
        gainPercentage: 76.67,
      },
      {
        position: 7,
        setupNome: 'Movimento - Clássico Perto',
        gainCount: 23,
        lossCount: 7,
        gainPercentage: 76.67,
      },
    ],
  };

  weekdaysChart = {
    options: {
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
    } as ApexOptions,
    series: [
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
    ],
  }

  gainLossOrDrawChart = {
    options: {
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
    } as ApexOptions,
    series: [10, 10, 100],
  }

  gainLossMorningChart = {
    options: {
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
    } as ApexOptions,
    series: [55, 45, 45],
  }

  gainLossEveningChart = {
    options: {
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
    } as ApexOptions,
    series: [55, 45, 45],
  }

  tradesByIntervalChart = {
    options: {
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
    } as ApexOptions,
    series: [
      {
        data: [44, 55, 41, 64, 22, 43, 21,44, 55, 41, 64, 22, 43, 21,44, 55, 41, 64],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32,53, 32, 33, 52, 13, 44, 32,53, 32, 33, 52],
      }
    ],
  };
}
</script>

<style>
.custom-tooltip, .custom-tooltip:after, .custom-tooltip:before {
  padding: 2px 4px !important;
  font-weight: bold;
  text-transform: capitalize !important;
  background: white;
  border: solid transparent !important;
}

.apexcharts-tooltip:has(.custom-tooltip) {
  border: solid white !important;
}

</style>
