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

      <v-col cols="3">
        <v-select
            class="white"
            v-model="filter.ativoId"
            :items="listTradeFilterController.ativoList"
            label="Ativo"
            outlined
            dense
            clearable
            ref="ativoId"
            required
            hide-details
            :loading="listTradeFilterState.ativoList?.loading"
        ></v-select>
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
import { Component, Vue, Watch } from "vue-property-decorator";
import RankingOfSetup from "@/views/dashboard/components/ranking-of-setup.vue";
import TradesByWeekdayChart from "@/views/dashboard/components/trades-by-weekday-chart.vue";
import TotalTradesChart from "@/views/dashboard/components/total-trades-chart.vue";
import MorningTradesChart from "@/views/dashboard/components/morning-trades-chart.vue";
import EveningTradesChart from "@/views/dashboard/components/evening-trades-chart.vue";
import TradesByIntervalChart from "@/views/dashboard/components/trades-by-interval-chart.vue";
import { DashboardController } from "@/core/dashboard/presentation/controller/dashboard.controller";
import { app, TYPES } from "@/core/common/container";
import { DashboardState } from "@/core/dashboard/presentation/state/dashboard.state";
import DateUtils from "@/common/date.utils";
import { ListTradeFilterController } from "@/core/trade/presentation/controllers/list-trade-filter.controller";
import { ListTradeFilterState } from "@/core/trade/presentation/states/list-trade-filter.state";

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
  private dashboardState: DashboardState = this.dashboardController.state;

  private listTradeFilterController = app.make<ListTradeFilterController>(TYPES.ListTradeFilterController);
  private listTradeFilterState: ListTradeFilterState = this.listTradeFilterController.state;

  filter = Object.assign({}, this.dashboardState.searchParams);

  showStartDatePicker = false;
  showEndDatePicker = false;

  formatDateFieldValue(value?: string, showUndefined = true): string {
    return DateUtils.formatDateFieldValue(value, showUndefined);
  }

  get today(): string {
    return DateUtils.formatToISODateString(new Date());
  }

  get isLoading(): boolean {
    return this.dashboardState.kind === 'LoadingDashboardState';
  }

  @Watch('filter.startDate')
  changeStarDate(startDate: string) {
    if (startDate > this.filter.endDate) {
      this.filter.endDate = startDate;
    }
  }

  search(): void {
    this.dashboardController.search(this.filter);
  }

  mounted(): void {
    this.search();
    this.listTradeFilterController.loadAtivoList();
  }

  private updateDashboardState(newState: DashboardState) {
    this.dashboardState = newState;
  }

  private updateListTradeFilterState(newState: ListTradeFilterState) {
    this.listTradeFilterState = newState;
  }

  private created() {
    this.dashboardController.subscribe(this.updateDashboardState);
    this.dashboardController.subscribe(this.updateListTradeFilterState);
  }

  private beforeDestroy() {
    this.dashboardController.unsubscribe(this.updateDashboardState);
    this.dashboardController.unsubscribe(this.updateListTradeFilterState);
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
