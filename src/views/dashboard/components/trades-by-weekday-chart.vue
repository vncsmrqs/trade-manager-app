<template>
  <v-card elevation="2" class="rounded-lg" min-height="100%" height="100%">
    <v-card-title class="mb-0 pb-0">
      Dias da semana
    </v-card-title>
    <v-card-text class="pa-0 d-flex justify-center" style="min-height: 100px">
      <v-fade-transition>
        <v-overlay color="white" absolute v-if="isLoading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-overlay>
        <div v-if="!isLoading && !hasError && series.length">
          <apex-chart
              width="500"
              type="bar"
              height="250px"
              :options="options"
              :series="series"
          ></apex-chart>
        </div>
        <div v-if="!isLoading && hasError">
          <v-alert dense outlined type="error">{{ error }}</v-alert>
        </div>
      </v-fade-transition>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ApexOptions } from "apexcharts";
import { app, TYPES } from "@/core/common/container";
import { DashboardController } from "@/core/dashboard/presentation/controller/dashboard.controller";
import { DashboardState, WeekdayEnum } from "@/core/dashboard/presentation/state/dashboard.state";

@Component({})
export default class TradesByWeekdayChart extends Vue {
  private dashboardController = app.make<DashboardController>(TYPES.DashboardController);
  private dashboardState = this.dashboardController.state;

  private readonly weekdaysAvailable: WeekdayEnum[] = [
    WeekdayEnum.SEG,
    WeekdayEnum.TER,
    WeekdayEnum.QUA,
    WeekdayEnum.QUI,
    WeekdayEnum.SEX,
  ];

  options: ApexOptions = {
    chart: {
      id: 'trades-by-weekday-chart',
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
      categories: this.weekdaysAvailable,
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

  get series() {
    return [
      {
        name: '0x0',
        data: this.weekdaysAvailable.map((weekday) => {
          const sum = this.dashboardState.tradesByWeekday.items
              .filter((w) => w.weekday === weekday)
              .map((weekday) => weekday.items
                  .filter((item) => item.name === '0x0')
                  .reduce((total, item) => total + item.value, 0))
              .reduce((total, value) => total + value, 0);
          return sum || 0;
        }),
      },
      {
        name: 'Loss',
        data: this.weekdaysAvailable.map((weekday) => {
          const sum = this.dashboardState.tradesByWeekday.items
              .filter((w) => w.weekday === weekday)
              .map((weekday) => weekday.items
                  .filter((item) => item.name === 'loss')
                  .reduce((total, item) => total + item.value, 0))
              .reduce((total, value) => total + value, 0);
          return sum || 0;
        }),
      },
      {
        name: 'Gain',
        data: this.weekdaysAvailable.map((weekday) => {
          const sum = this.dashboardState.tradesByWeekday.items
              .filter((w) => w.weekday === weekday)
              .map((weekday) => weekday.items
                  .filter((item) => item.name === 'gain')
                  .reduce((total, item) => total + item.value, 0))
              .reduce((total, value) => total + value, 0);
          return sum || 0;
        }),
      },
    ];
  }

  get isLoading() {
    return this.dashboardState.tradesByWeekday.loading;
  }

  get hasError() {
    return !!this.dashboardState.tradesByWeekday.error;
  }

  get error(): string | null {
    return this.dashboardState.tradesByWeekday.error || null;
  }

  private updateState(newState: DashboardState) {
    this.dashboardState = newState;
  }

  private created() {
    this.dashboardController.subscribe(this.updateState);
  }

  private beforeDestroy() {
    this.dashboardController.unsubscribe(this.updateState);
  }
}
</script>

<style scoped>

</style>
