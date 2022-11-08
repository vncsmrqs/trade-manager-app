<template>
  <v-card elevation="2" class="rounded-lg" min-height="100%">
    <v-card-title class="mb-0 pb-0">
      Gain / Loss - Manhã
    </v-card-title>
    <v-card-text class="pa-0 d-flex justify-center" style="min-height: 100px">
      <v-fade-transition>
        <v-overlay color="white" absolute v-if="isLoading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-overlay>
        <template v-else>
          <template v-if="!hasError">
            <template v-if="hasData">
              <apex-chart
                  width="250"
                  type="pie"
                  height="250px"
                  :options="options"
                  :series="series"
              ></apex-chart>
            </template>
            <template v-else>
              <div class="mt-8">Nenhum dado foi encontrado</div>
            </template>
          </template>
          <div v-else>
            <v-alert dense outlined type="error">{{ error }}</v-alert>
          </div>
        </template>
      </v-fade-transition>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ApexOptions } from "apexcharts";
import { DashboardState } from "@/core/dashboard/presentation/state/dashboard.state";
import { app, TYPES } from "@/core/common/container";
import { DashboardController } from "@/core/dashboard/presentation/controller/dashboard.controller";

@Component({})
export default class MorningTradesChart extends Vue {
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
      return this.dashboardState.morningTrades.items
          .filter((item) => item.name === label.toLowerCase())
          .reduce((total, item) => total + item.value, 0);
    });
  }

  get hasData(): boolean {
    return this.series.some((value) => !!value);
  }

  get isLoading() {
    return this.dashboardState.morningTrades.loading;
  }

  get hasError() {
    return !!this.dashboardState.morningTrades.error;
  }

  get error(): string | null {
    return this.dashboardState.morningTrades.error || null;
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
