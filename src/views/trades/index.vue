<template>
  <v-container class="pa-8">

    <filter-trades
        :filter-chips="filterFormAsList"
        :show="showFilterDialog"
        @close="closeFilterDialog"
        @submit="submitFilter"
    ></filter-trades>

    <manage-trade
        :item="itemToManage"
        :show="showManageTradeDialog"
        @close="closeManageTradeDialog"
        @deleted="handleTradeDeleted"
        @saved="handleTradeSaved"
    ></manage-trade>

    <import-trade
        :show="showImportTradeDialog"
        @close="closeImportTradeDialog"
    ></import-trade>

    <single-image-viewer
        :show="showImageViewerDialog"
        :src="imageToViewSrc"
        @close="() => { showImageViewerDialog = false; imageToViewSrc = null }"
    ></single-image-viewer>

    <v-form @submit.prevent="() => search()" :disabled="isLoading">
      <v-row>
        <v-col cols="12" md="auto">
          <div style="height: 40px; width: 48px !important;">
            <v-btn
                class="px-0"
                outlined
                color="primary"
                min-width="0"
                block
                style="height: 100%; background-color: white"
                :disabled="isLoading"
                @click="openFilterDialog"
            >
              <v-icon>mdi-filter</v-icon>
            </v-btn>
          </div>
        </v-col>
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
        <v-spacer></v-spacer>
        <v-col col="12" sm="auto" class="d-flex mb-8 mb-sm-0">
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              style="height: 40px"
              @click="createItem"
              block
          >
            <v-icon left>mdi-plus</v-icon>
            <span>Novo</span>
          </v-btn>
        </v-col>
        <v-col cols="12" md="auto">
          <div style="height: 40px; width: 48px !important;">
            <v-btn
                class="px-0"
                outlined
                color="primary"
                min-width="0"
                block
                style="height: 100%; background-color: white"
                @click="importTrade"
            >
              <v-icon>mdi-upload</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>

    <v-row v-if="filterFormAsList.length">
      <v-col cols="12" sm="6">
        <v-row>
          <v-col
              v-for="chip in filterFormAsList"
              :key="chip.value"
              cols="auto"
              class="pr-0 pb-0"
          >
            <v-chip
                close
                small
                @click:close="() => removeFilter(chip)"
                :disabled="isLoading"
            >
              {{ chip.text }}
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12" sm="3">
        <v-alert
            border="left"
            colored-border
            color="grey lighten-1"
            elevation="2"
            class="py-2"
        >
          <v-row>
            <v-col>
              <div><h2>{{ listTradeState.metadata.totalItems }}</h2></div>
              <span class="text-body-2">Operações</span>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
      <v-col cols="12" sm="3">
        <v-alert
            border="left"
            colored-border
            color="blue accent-1"
            elevation="2"
            class="py-2"
        >
          <v-row>
            <v-col>
              <div><h2>{{ listTradeState.metadata.gainCount }}</h2></div>
              <span class="text-body-2">Gain</span>
            </v-col>
            <v-col class="d-flex align-center justify-end">
              {{ listTradeState.metadata.gainPercentage.toFixed(2) }}%
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
      <v-col cols="12" sm="3">
        <v-alert
            border="left"
            colored-border
            color="yellow darken-1"
            elevation="2"
            class="py-2"
        >
          <v-row>
            <v-col>
              <div><h2>{{ listTradeState.metadata.drawCount }}</h2></div>
              <span class="text-body-2">0x0</span>
            </v-col>
            <v-col class="d-flex align-center justify-end">
              {{ listTradeState.metadata.drawPercentage.toFixed(2) }}%
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
      <v-col cols="12" sm="3">
        <v-alert
            border="left"
            colored-border
            color="red accent-1"
            elevation="2"
            class="py-2"
        >
          <v-row>
            <v-col>
              <div><h2>{{ listTradeState.metadata.lossCount }}</h2></div>
              <span class="text-body-2">Loss</span>
            </v-col>
            <v-col class="d-flex align-center justify-end">
              {{ listTradeState.metadata.lossPercentage.toFixed(2) }}%
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>

    <v-col class="mt-8">
      <v-row class="rounded-lg overflow-hidden elevation-1">
        <v-col cols="12" class="pa-0 ">
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr class="grey lighten-2" style="">
                <th
                    v-for="(header) in headers"
                    :key="header.name"
                    :class="['text-'+header.align, 'text-uppercase']"
                    :style="{ 'width': header.width, 'height': '28px', border: '0 !important' }"
                >
                  {{ header.title }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(trade, i) in items"
                  :key="trade.id"
              >
                <td
                    v-for="(header) in headers"
                    :key="header.name"
                    :class="[
                        'text-' + header.align,
                        (i % 2 === 0 ? 'grey lighten-4' : ''),
                        'pa-4',
                    ]"
                    :style="{
                      'width': header.width,
                      'border': 0,
                    }"
                >
                  <div v-if="header.name === 'lote'">
                    <div>{{ trade.lote }}</div>
                    <div>{{ trade.ativoCodigo }}</div>
                  </div>

                  <div v-if="header.name === 'data-horario'">
                    <div class="text-body-1">{{ trade.dataTradeFormatted }}</div>
                    <div class="text-caption">{{ trade.horaTrade }}</div>
                  </div>

                  <div v-if="header.name === 'setup-gatilho'">
                    <div class="text-body-1">{{ trade.setupNome }}</div>
                    <div class="text-caption">{{ trade.gatilhoNome }}</div>
                  </div>

                  <div v-if="header.name === 'entrada-stop'">
                    <div class="text-body-1">{{ trade.tipoEntradaNome }}</div>
                    <div class="text-caption">
                      <span v-if="trade.tipoStopNome">{{ trade.tipoStopNome }}</span>
                      <span v-if="trade.tipoStopNome && trade.localStopNome"> | </span>
                      <span v-if="trade.localStopNome">{{ trade.localStopNome }}</span>
                    </div>
                  </div>

                  <div v-if="header.name === 'origem'">
                    <div class="text-body-1">{{ trade.tipoImportacaoLabel }}</div>
                  </div>

                  <div
                      v-if="header.name === 'pontos'"
                      :class="[
                        pointsTextColor(trade.resultado),
                      ]"
                  >
                    <div class="text-body-1 font-weight-bold">
                      {{ trade.pontuacao * (trade.pontuacao < 0 ? -1 : 1) }}
                    </div>
                    <div class="text-caption font-weight-light text-capitalize">
                      {{ trade.resultado }}
                    </div>
                  </div>

                  <div v-if="header.name === 'imagem'">
                    <v-btn
                      v-if="trade.imagemUrl?.length"
                      icon
                      :disabled="isLoading"
                      @click="() => { showImageViewerDialog = true; imageToViewSrc = trade.imagemUrl}"
                    >
                      <v-icon >mdi-image-area</v-icon>
                    </v-btn>
                  </div>

                  <div v-if="header.name === 'acoes'">
                    <v-btn
                      icon
                      elevation="0"
                      :disabled="isLoading"
                      @click="() => manageTrade(trade)"
                    >
                      <v-icon large>mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-col>

    <v-row v-if="showPagination" align="center" class="mt-2">
      <v-col
          v-if="isLoading"
          class="d-flex align-center justify-center justify-sm-start"
          cols="12" sm="6" md="auto"
      >
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <span class="ml-4">Buscando...</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4" class="d-flex justify-end pr-0">
        <v-pagination
            :disabled="isLoading"
            :value="pagination.page"
            @input="changePage"
            :length="pagination.pageCount"
        ></v-pagination>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import FilterTrades from "@/views/trades/components/filter-trades.vue";
import { app, TYPES } from "@/core/common/container";
import {
  FilterFormComplete,
  FilterFormObject,
  ListTradeController
} from "@/core/trade/presentation/controllers/list-trade.controller";
import { ListTradeFilter, ListTradeState } from "@/core/trade/presentation/states/list-trade.state";
import { TradeEntity, TradeResultadoType } from "@/core/trade/domain/entities/trade.entity";
import ManageTrade from "@/views/trades/components/manage-trade.vue";
import moment from "moment";
import ImportTrade from "@/views/trades/components/import-trade.vue";
import SingleImageViewer from "@/common/components/single-image-viewer.vue";
import DateUtils from "@/common/date.utils";

@Component({
  components: { SingleImageViewer, ImportTrade, ManageTrade, FilterTrades }
})
export default class ListTrade extends Vue {
  private listTradeController = app.make<ListTradeController>(TYPES.ListTradeController);
  private listTradeState = this.listTradeController.state;

  filter: ListTradeFilter = Object.assign({}, this.listTradeState.filter);
  showStartDatePicker = false;
  showEndDatePicker = false;
  showFilterDialog = false;
  showImageViewerDialog = false;

  get filterFormAsList(): FilterFormComplete[] {
    return this.listTradeState.filterAsList;
  }

  set filterFormAsList(filterAsList: FilterFormComplete[]): void {
    this.listTradeController.setFilterFormAsList(filterAsList);
  }

  get today(): string {
    return DateUtils.formatToISODateString(new Date());
  }

  imageToViewSrc?: string = null;
  itemToManage?: TradeEntity = null;
  showManageTradeDialog = false;
  showImportTradeDialog = false;

  headers = [
    {
      title: 'Lote',
      name: 'lote',
      align: 'center',
      width: '5%',
    },
    {
      title: 'Data - Horário',
      name: 'data-horario',
      align: 'left',
      width: '15%',
    },
    {
      title: 'Setup - Gatilho',
      name: 'setup-gatilho',
      align: 'left',
      width: '32%',
    },
    {
      title: 'Entrada - Stop',
      name: 'entrada-stop',
      align: 'left',
      width: '23%',
    },
    {
      title: 'Origem',
      name: 'origem',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Pontos',
      name: 'pontos',
      align: 'left',
      width: '5%',
    },
    {
      title: '',
      name: 'imagem',
      align: 'left',
      width: '5%',
    },
    {
      title: '',
      name: 'acoes',
      align: 'left',
      width: '5%',
    },
  ];

  @Watch('filter.startDate')
  changeStarDate(startDate: string) {
    if (startDate > this.filter.endDate) {
      this.filter.endDate = startDate;
    }
  }

  formatDateFieldValue(value?: string): string {
    return DateUtils.formatDateFieldValue(value);
  }

  get isLoading(): boolean {
    return this.listTradeState.kind === "LoadingListTradeState";
  }

  createItem() {
    this.itemToManage = null;
    this.showManageTradeDialog = true;
  }

  get showPagination(): boolean {
    return this.pagination.pageCount > 1;
  }

  get pagination() {
    return {
      page: this.listTradeState.page,
      pageCount: this.listTradeState.pageCount,
      itemsPerPage: this.listTradeState.itemsPerPage,
    };
  }

  get items(): TradeEntity[] {
    return this.listTradeState.items;
  }

  async changePage(page: number): Promise<void> {
    await this.listTradeController.goToPage(page);
  }

  async search(page = 1): Promise<void> {
    await this.listTradeController.loadTradeList(this.filter, page);
  }

  generateForm(): Required<ListTradeFilter> {
    return {
      startDate: moment().subtract(1, "month").format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      setupId: [],
      gatilhoId: [],
      tipoEntradaId: [],
      ativoId: [],
      resultado: [],
    };
  }

  manageTrade(item: TradeEntity): void {
    this.itemToManage = item;
    this.showManageTradeDialog = true;
  }

  closeManageTradeDialog(): void {
    this.itemToManage = null;
    this.showManageTradeDialog = false;
  }

  handleTradeDeleted(): void {
    this.closeManageTradeDialog();

    if (this.listTradeState.items.length === 1) {
      this.search(this.listTradeState.page - 1);
      return;
    }

    this.search(this.listTradeState.page);
  }

  handleTradeSaved(): void {
    this.closeManageTradeDialog();
    this.search(this.listTradeState.page);
  }

  importTrade(): void {
    this.showImportTradeDialog = true;
  }

  closeImportTradeDialog(): void {
    this.showImportTradeDialog = false;
  }

  closeFilterDialog() {
    this.showFilterDialog = false;
  }

  async submitFilter(filter: FilterFormObject): Promise<void> {
    this.filterFormAsList = ListTradeController.mapFilterObjectToFilterList(filter);
    this.closeFilterDialog();
    this.fillForm(this.filterFormAsList);
    return await this.search(1);
  }

  private fillForm(filterChips: FilterFormComplete[]): void {
    const filterFields = [
      'ativoId',
      'setupId',
      'resultado',
      'gatilhoId',
      'tipoEntradaId',
    ];

    const newFilter: Record<string, any[]> = {};

    filterFields.forEach((field) => {
      newFilter[field] = filterChips
        .filter((f) => f.field === field)
        .map((f) => f.value);
    });

    this.filter = {
      ...this.filter,
      ...newFilter,
    }
  }

  removeFilter(item: FilterFormComplete): void {
    this.filterFormAsList = this.filterFormAsList.filter((filter) => {
      return filter.value !== item.value && item.field !== filter.field;
    });

    const field = this.filter[item.field];

    if (field) {
      this.filter[item.field] = field.filter((f: string) => f !== item.value);
    }

    // this.search();
  }

  openFilterDialog() {
    this.showFilterDialog = true;
  }

  pointsTextColor(resultado: TradeResultadoType): string {
    if (resultado === 'gain') return 'blue--text text--accent-1';
    if (resultado === 'loss') return 'red--text text--accent-1';
    return 'yellow--text text--darken-1'
  }

  mounted() {
    this.search(1);
  }

  private updateState(newState: ListTradeState) {
    this.listTradeState = newState;
  }

  private created() {
    this.listTradeController.subscribe(this.updateState);
  }

  private beforeDestroy() {
    this.listTradeController.unsubscribe(this.updateState);
  }
}
</script>

<style scoped>

</style>
