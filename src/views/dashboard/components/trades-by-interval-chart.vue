<template>
  <v-card elevation="2" class="rounded-lg" min-height="100%">
    <v-card-title class="mb-0 pb-0">
      Registros por intervalo - 30 min
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
                  width="1088px"
                  type="bar"
                  height="1000px"
                  :options="options"
                  :series="series"
              ></apex-chart>
            </template>
            <template v-else>
              <div class="d-flex justify-center">
                <div class="mt-8">Nenhum dado foi encontrado</div>
              </div>
            </template>
          </template>
          <template v-else>
            <div>
              <v-alert dense outlined type="error">{{ error }}</v-alert>
            </div>
          </template>
        </template>
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
export default class TradesByIntervalChart extends Vue {
  private dashboardController = app.make<DashboardController>(TYPES.DashboardController);
  private dashboardState = this.dashboardController.state;

  private readonly availableLabels = [
    'Loss',
    'Gain',
    // '0x0',
  ];

  private readonly availableTimeIntervals = [
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
  ];

  private readonly availableColors = ['#FF8A80', '#448AFF', '#FBC02D'];

  options: ApexOptions = {
    chart: {
      id: 'trades-by-interval-chart',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false,
      },
    },
    labels: this.availableLabels,
    colors: this.availableColors,
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
        colors: this.availableColors,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: this.availableTimeIntervals,
    },
    yaxis: {
      show: true,
      max: (max: number) => max * 1.1,
    },
  };

  get series() {
    return this.availableLabels.map((label) => ({
      data: this.availableTimeIntervals.map((timeInterval) => {
        return this.dashboardState.tradesByInterval.items
            .filter(({ interval }) => interval === timeInterval)
            .map((interval) => interval.items
                .filter((item) => item.name === label.toLowerCase())
                .reduce((total, item) => total + item.value, 0))
            .reduce((total, value) => total + value, 0);
      }),
    }));
  }

  get hasData(): boolean {
    return this.series.some((seriesItem) => seriesItem.data.some((value) => !!value));
  }

  get isLoading() {
    return this.dashboardState.tradesByInterval.loading;
  }

  get hasError() {
    return !!this.dashboardState.tradesByInterval.error;
  }

  get error(): string | null {
    return this.dashboardState.tradesByInterval.error || null;
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
