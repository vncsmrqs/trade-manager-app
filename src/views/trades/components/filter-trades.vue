<template>
    <v-dialog
        :value="show"
        @input="close"
        max-width="600px"
        persistent
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Filtrar registros</span>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              icon
              @click="close"
              :disabled="isLoading"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="mt-8">
          <v-form ref="form" @submit.prevent="submitForm" :disabled="isLoading">

            <v-combobox
                v-model="form.setupId"
                :items="setupList"
                label="Setup"
                outlined
                dense
                clearable
                :multiple="Array.isArray(form.setupId)"
                :loading="isLoading"
            ></v-combobox>

            <v-combobox
                v-model="form.gatilhoId"
                :items="gatilhoList"
                label="Gatilho"
                outlined
                dense
                clearable
                :multiple="Array.isArray(form.gatilhoId)"
                :loading="isLoading"
            ></v-combobox>

            <v-combobox
                v-model="form.tipoEntradaId"
                :items="tipoEntradaList"
                label="Tipo de entrada"
                outlined
                dense
                clearable
                :multiple="Array.isArray(form.tipoEntradaId)"
                :loading="isLoading"
            ></v-combobox>

            <v-row>
              <v-col cols="6">
                <v-combobox
                    v-model="form.resultado"
                    :items="resultadoList"
                    label="Resultado"
                    outlined
                    dense
                    clearable
                    :multiple="Array.isArray(form.resultado)"
                    :loading="isLoading"
                ></v-combobox>
              </v-col>
              <v-col cols="6">
                <v-combobox
                    v-model="form.ativoId"
                    :items="ativoList"
                    label="Ativo"
                    outlined
                    dense
                    clearable
                    :multiple="Array.isArray(form.ativoId)"
                    :loading="isLoading"
                ></v-combobox>
              </v-col>
            </v-row>
          </v-form>

          <v-alert
            v-if="hasError"
            outlined
            type="error"
            v-text="error"
            class="ma-0"
          ></v-alert>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="mb-4 mr-2">
            <v-btn
                @click.stop="clearForm"
                :disabled="isLoading"
                color="primary"
                outlined
                class="mr-4"
            >
              <v-icon left>mdi-eraser-variant</v-icon>
              Limpar
            </v-btn>
            <v-btn
                depressed
                color="primary"
                @click="submitForm"
                :disabled="isLoading"
            >
              <v-icon left>mdi-filter</v-icon>
              Filtrar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { app, TYPES } from "@/core/common/container";
import { ListTradeFilterController } from "@/core/trade/presentation/controllers/list-trade-filter.controller";
import { ListTradeFilterState } from "@/core/trade/presentation/states/list-trade-filter.state";

type FormType = {
  setupId: undefined | string | string[],
  ativoId: undefined | string | string[],
  gatilhoId: undefined | string | string[],
  tipoEntradaId: undefined | string | string[],
  resultado: undefined | string | string[],
};

@Component({})
export default class FilterTrades extends Vue {
  @Prop() show!: boolean;
  @Prop() filterChips!: Record<string, any>[];

  private listTradeFilterController = app.make<ListTradeFilterController>(TYPES.ListTradeFilterController);
  private listTradeFilterState = this.listTradeFilterController.state;

  form: FormType = this.defaultForm();

  defaultForm(): FormType {
    return {
      setupId: undefined,
      ativoId: undefined,
      gatilhoId: undefined,
      tipoEntradaId: undefined,
      resultado: undefined,
    };
  }

  private fillForm(filterChips: any) {
    const mapField = (baseItem, newItem) => {
      if (Array.isArray(baseItem)) {
        baseItem.push({
          text: newItem.text,
          value: newItem.value,
        });
        return baseItem;
      }
      return {
        text: newItem.text,
        value: newItem.value,
      };
    };
    this.form = filterChips.reduce((newForm, item) => {
      return {
        ...newForm,
        [item.field]: mapField(newForm[item.field], item),
      }
    }, this.defaultForm());
  }

  get setupList() {
    return this.listTradeFilterController.setupList;
  }

  get gatilhoList() {
    return this.listTradeFilterController.gatilhoList;
  }

  get tipoEntradaList() {
    return this.listTradeFilterController.tipoEntradaList;
  }

  get ativoList() {
    return this.listTradeFilterController.ativoList;
  }

  get resultadoList() {
    return [
      {
        value: 'gain',
        text: 'GAIN',
      },
      {
        value: '0x0',
        text: '0x0',
      },
      {
        value: 'loss',
        text: 'LOSS',
      },
    ];
  }

  clearForm(): void {
    this.form = this.defaultForm();
  }

  async submitForm() {
    this.$emit('submit', this.form);
  }

  @Watch('show')
  changeShow(value: boolean) {
    this.form = this.defaultForm();
    if (value) {
      this.listTradeFilterController.loadAllFilterList();
      if (this.filterChips.length) {
        this.fillForm(this.filterChips);
      }
    }
  }

  get isLoading(): boolean {
    return this.listTradeFilterState.kind === "LoadingListTradeFilterState";
  }

  get hasError(): boolean {
    return this.listTradeFilterState.kind === "ErrorListTradeFilterState";
  }

  get error(): string | null {
    return this.listTradeFilterState.error || null;
  }

  close() {
    this.$emit('close');
  }

  changeListTradeFilterState(state: ListTradeFilterState) {
    this.listTradeFilterState = state;
  }

  created() {
    this.listTradeFilterController.subscribe(this.changeListTradeFilterState);
  }

  beforeDestroy() {
    this.listTradeFilterController.unsubscribe(this.changeListTradeFilterState);
  }
}
</script>

<style scoped>

</style>
