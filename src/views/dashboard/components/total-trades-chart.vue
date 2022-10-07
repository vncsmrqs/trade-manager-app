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
import { app, TYPES } from "@/core/common/container";
import { DashboardController } from "@/core/dashboard/presentation/controller/dashboard.controller";
import { DashboardState } from "@/core/dashboard/presentation/state/dashboard.state";

@Component({})
export default class TotalTradesChart extends Vue {
  private dashboardController = app.make<DashboardController>(TYPES.DashboardController);
  private dashboardState = this.dashboardController.state;

  private readonly availableLabels = ['0x0', 'Loss', 'Gain'];
  options: ApexOptions = {
    chart: {
      id: 'total-trades-chart',
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
    labels: this.availableLabels,
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
      formatter(value) {
        return `${parseInt(value).toFixed(0)}%`;
      },
      dropShadow: {
        enabled: false,
      },
    },
  };

  get series(): number[] {
    return this.availableLabels.map((label) => {
      return this.dashboardState.totalTrades.items
          .filter((item) => item.name === label.toLowerCase())
          .reduce((total, item) => total + item.value, 0);
    });
  }

  private updateState(newState: DashboardState) {
    this.dashboardState = newState;
  }

  private created() {
    this.dashboardController.subscribe(this.updateState);
    this.dashboardController.resetState();
  }

  private beforeDestroy() {
    this.dashboardController.unsubscribe(this.updateState);
  }
}
</script>

<style scoped>

</style>
