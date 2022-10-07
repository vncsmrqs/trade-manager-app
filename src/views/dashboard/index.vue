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
        <ranking-of-setup></ranking-of-setup>
      </v-col>
      <v-col cols="12" md="6">
        <trades-by-day-of-week-chart></trades-by-day-of-week-chart>
      </v-col>
      <v-col cols="12" md="4">
        <total-trades-chart></total-trades-chart>
      </v-col>
      <v-col cols="12" md="4">
        <morning-trades-chart></morning-trades-chart>
      </v-col>
      <v-col cols="12" md="4">
        <evening-trades-chart></evening-trades-chart>
      </v-col>
      <v-col cols="12">
        <trades-by-interval-chart></trades-by-interval-chart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import RankingOfSetup from "@/views/dashboard/components/ranking-of-setup.vue";
import TradesByWeekdayChart from "@/views/dashboard/components/trades-by-weekday-chart.vue";
import TotalTradesChart from "@/views/dashboard/components/total-trades-chart.vue";
import MorningTradesChart from "@/views/dashboard/components/morning-trades-chart.vue";
import EveningTradesChart from "@/views/dashboard/components/evening-trades-chart.vue";
import TradesByIntervalChart from "@/views/dashboard/components/trades-by-interval-chart.vue";
import { DashboardController } from "@/core/dashboard/presentation/controller/dashboard.controller";
import { app, TYPES } from "@/core/common/container";
import { DashboardState } from "@/core/dashboard/presentation/state/dashboard.state";

@Component({
  components: {
    TradesByIntervalChart,
    EveningTradesChart,
    MorningTradesChart,
    TotalTradesChart,
    TradesByDayOfWeekChart: TradesByWeekdayChart,
    RankingOfSetup,
  }
})
export default class DashboardView extends Vue {
  private dashboardController = app.make<DashboardController>(TYPES.DashboardController);
  private dashboardState = this.dashboardController.state;

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
    this.dashboardController.search(this.filter);
  }

  mounted(): void {
    this.search();
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
