<template>
  <v-container class="pa-8">

    <filter-trades
        :filter-chips="filterChips"
        :show="showFilterDialog"
        @close="closeFilterDialog"
        @submit="submitFilter"
    ></filter-trades>

    <v-form @submit.prevent="search" :disabled="isLoading">
      <v-row>
        <v-col cols="12" md="auto">
          <div style="height: 40px; width: 48px !important;">
            <v-btn
                class="px-0"
                outlined
                color="primary"
                min-width="0"
                block
                style="height: 100%;"
                :disabled="isLoading"
                @click="openFilterDialog"
            >
              <v-icon>mdi-filter</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="5" md="3">
          <v-menu
              ref="menu"
              v-model="showStartDatePicker"
              :close-on-content-click="false"
              :return-value.sync="filter.startDate"
              transition="fade"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="filter.startDate"
                  label="Data inicial"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  outlined
                  full-width
                  dense
                  v-bind="attrs"
                  v-on="on"
                  hide-details
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="filter.startDate"
                no-title
                scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="primary"
                  @click="showStartDatePicker = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(filter.startDate)"
              >
                Concluir
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-menu
              ref="menu"
              v-model="showEndDatePicker"
              :close-on-content-click="false"
              :return-value.sync="filter.endDate"
              transition="fade"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="filter.endDate"
                  label="Data inicial"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  outlined
                  full-width
                  dense
                  v-bind="attrs"
                  v-on="on"
                  hide-details
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="filter.endDate"
                no-title
                scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="primary"
                  @click="showEndDatePicker = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(filter.endDate)"
              >
                Concluir
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="auto">
          <v-btn
              outlined
              color="primary"
              style="height: 40px"
              @click="search"
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
                style="height: 100%;"
            >
              <v-icon>mdi-upload</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>

    <v-row v-if="filterChips.length">
      <v-col cols="12" sm="6">
        <v-row>
          <v-col
              v-for="chip in filterChips"
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
      <v-col cols="12" sm="4">
        <v-alert
            border="left"
            colored-border
            color="grey lighten-1"
            elevation="2"
            class="py-2"
        >
          <v-row>
            <v-col>
              <div><h2>{{ metadata.totalItems }}</h2></div>
              <span class="text-body-2">Operações</span>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
      <v-col cols="12" sm="4">
        <v-alert
            border="left"
            colored-border
            color="blue accent-1"
            elevation="2"
            class="py-2"
        >
          <v-row>
            <v-col>
              <div><h2>{{ metadata.gainCount }}</h2></div>
              <span class="text-body-2">Gain</span>
            </v-col>
            <v-col class="d-flex align-center justify-end">
              {{ metadata.gainPercentage }}%
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
      <v-col cols="12" sm="4">
        <v-alert
            border="left"
            colored-border
            color="red accent-1"
            elevation="2"
            class="py-2"
        >
          <v-row>
            <v-col>
              <div><h2>{{ metadata.lossCount }}</h2></div>
              <span class="text-body-2">Loss</span>
            </v-col>
            <v-col class="d-flex align-center justify-end">
              {{ metadata.lossPercentage }}%
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>

    <v-col class="mt-8">
      <v-row class="rounded-lg black overflow-hidden elevation-1">
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
                    <div>{{ trade.ativoCode }}</div>
                  </div>

                  <div v-if="header.name === 'data-horario'">
                    <div class="text-body-1">{{ trade.dataAberturaFormatted }}</div>
                    <div class="text-caption">{{ trade.horaAberturaFormatted }}</div>
                  </div>

                  <div v-if="header.name === 'setup-gatilho'">
                    <div class="text-body-1">{{ trade.setupNome }}</div>
                    <div class="text-caption">{{ trade.gatilhoNome }}</div>
                  </div>

                  <div v-if="header.name === 'tipo-entrada-time-frame'">
                    <div class="text-body-1">{{ trade.tipoEntradaNome }}</div>
                    <div class="text-caption">{{ trade.timeFrame }}</div>
                  </div>

                  <div
                      v-if="header.name === 'pontos'"
                      :class="[
                        pointsTextColor(trade.pontos),
                      ]"
                  >
                    <div class="text-body-1 font-weight-bold">
                      {{ trade.pontos * (trade.pontos < 0 ? -1 : 1) }}
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
                    >
                      <v-icon >mdi-image-area</v-icon>
                    </v-btn>
                  </div>

                  <div v-if="header.name === 'acoes'">
                    <v-btn
                      icon
                      elevation="0"
                      :disabled="isLoading"
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
      <v-col cols="12" sm="6" md="4">
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
import { Component, Vue } from "vue-property-decorator";
import { v4 as uuid } from "uuid";
import FilterTrades from "@/views/trades/components/filter-trades.vue";

function generateTrades(num = 10): Record<string, any>[] {
  return Array.from(Array(num).keys()).map((i) => {
      const par = i % 2 === 0;
      const multiploDeTres =  i % 3 === 0;
      const pontos = multiploDeTres ? 0 : (i * 100 * (par ? 1 : -1));
      const resultado = (pontos) => {
        if (pontos > 0) return 'gain';
        if (pontos < 0) return 'loss';
        return '0x0'
      };
      return {
        id: uuid(),
        nome: 'Registro ' + (i + 1),
        userId: '',
        setupId: '',
        setupNome: 'Setup ' + (i + 1),
        tipoEntradaId: '',
        tipoEntradaNome: 'Tipo Entrada ' + (i + 1),
        gatilhoId: '',
        gatilhoNome: 'Gatilho ' + (i + 1),
        ativo: true,
        lote: '1',
        ativoId: '',
        ativoCode: 'WIN',
        createdAt: '2022-01-01T00:00:00-03',
        updatedAt: '2022-01-01T00:00:00-03',
        imagemUrl: par ? 'url' : '',
        pontos,
        resultado: resultado(pontos),
        timeFrame: '5 minutos',
        dataAberturaFormatted: '01/01/2022',
        horaAberturaFormatted: '00:00',
    }
  });
}

@Component({
  components: { FilterTrades }
})
export default class ListTrade extends Vue {
  filter = this.generateForm();

  generateForm() {
    return {
      startDate: '2020-01-01',
      endDate: '2020-01-01',
      setupId: [],
      gatilhoId: [],
      tipoEntradaId: [],
      ativoId: [],
      resultado: [],
    };
  }

  filterChips = [];

  isLoading = false;

  search() {
    this.fakeLoad();
  }

  get metadata() {
    return {
      totalItems: 100,
      lossCount: 10,
      gainCount: 10,
      lossPercentage: 10,
      gainPercentage: 10,
    };
  }

  createItem() {
    console.log('createItem');
  }

  get showPagination(): boolean{
    return this.pagination.pageCount > 1;
  }

  get pagination() {
    return {
      page: 1,
      pageCount: 10,
      itemsPerPage: 10,
    };
  }

  changePage() {
    this.fakeLoad();
  }

  fakeLoad() {
    this.isLoading = true;
    console.log({ filter: this.filter });
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  showStartDatePicker = false;
  showEndDatePicker = false;
  showFilterDialog = false;

  closeFilterDialog() {
    this.showFilterDialog = false;
  }

  submitFilter(filter: any) {
    this.filterChips = Object.keys(filter)
        .filter((field) => !!filter[field] || (Array.isArray(filter[field]) && filter[field].length))
        .reduce((filterList, field) => {
          const chip = filter[field];

          if (Array.isArray(chip)) {
            return [
                ...filterList,
                ...chip.map((c) => ({ field, ...c }))
            ];
          }

          return [
            ...filterList,
            { field, ...chip }
          ];
        }, []);
    this.closeFilterDialog();
    this.fillForm(this.filterChips);
    this.fakeLoad();
  }

  private fillForm(filterChips: Record<string, any>[]): void {
    const filterFields = [
      'ativoId',
      'setupId',
      'resultado',
      'gatilhoId',
      'tipoEntradaId',
    ];

    filterFields.forEach((field) => {
      this.filter[field] = filterChips
        .filter((f) => f.field === field)
        .map((f) => f.value);
    });
  }

  removeFilter(item: any): void {
    this.filterChips = this.filterChips.filter((chip) => {
      return chip.value !== item.value && chip.item !== chip.field
    });
    const field = this.filter[item.field];
    if (field) {
      this.filter[item.field] = field.filter((f) => f !== item.value);
    }
  }

  openFilterDialog() {
    this.showFilterDialog = true;
  }

  pointsTextColor(pontos: number): string {
    if (pontos > 0) return 'blue--text text--accent-1';
    if (pontos < 0) return 'red--text text--accent-1';
    return 'grey--text text--lighter-2'
  }

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
      title: 'Setup - Complemento',
      name: 'setup-gatilho',
      align: 'left',
      width: '37%',
    },
    {
      title: 'Tipo de entrada - Time Frame',
      name: 'tipo-entrada-time-frame',
      align: 'left',
      width: '25%',
    },
    {
      title: 'Pontos',
      name: 'pontos',
      align: 'left',
      width: '8%',
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
  ]

  items = generateTrades();
}
</script>

<style scoped>

</style>
