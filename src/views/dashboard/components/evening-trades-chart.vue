<template>
  <v-card elevation="2" class="rounded-lg" min-height="100%">
    <v-card-title class="mb-0 pb-0">
      Gain / Loss - Tarde
    </v-card-title>
    <v-card-text class="pa-0 d-flex justify-center" style="min-height: 100px">
      <v-fade-transition>
      <v-overlay color="white" absolute v-if="isLoading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-overlay>
      <div v-if="!isLoading && !hasError && series.length">
        <apex-chart
            width="250"
            type="donut"
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
import { DashboardState } from "@/core/dashboard/presentation/state/dashboard.state";

@Component({})
export default class EveningTradesChart extends Vue {
  private dashboardController = app.make<DashboardController>(TYPES.DashboardController);
  private dashboardState = this.dashboardController.state;

  private readonly availableLabels = ['0x0', 'Loss', 'Gain'];

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
    labels: this.availableLabels,
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

  get series(): number[] {
    return this.availableLabels.map((label) => {
      return this.dashboardState.eveningTrades.items
          .filter((item) => item.name === label.toLowerCase())
          .reduce((total, item) => total + item.value, 0);
    });
  }

  get isLoading() {
    return this.dashboardState.eveningTrades.loading;
  }

  get hasError() {
    return !!this.dashboardState.eveningTrades.error;
  }

  get error(): string | null {
    return this.dashboardState.eveningTrades.error || null;
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
