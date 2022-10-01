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
            ></v-combobox>

            <v-combobox
                v-model="form.gatilhoId"
                :items="gatilhoList"
                label="Gatilho"
                outlined
                dense
                clearable
                :multiple="Array.isArray(form.gatilhoId)"
            ></v-combobox>

            <v-combobox
                v-model="form.tipoEntradaId"
                :items="tipoEntradaList"
                label="Tipo de entrada"
                outlined
                dense
                clearable
                :multiple="Array.isArray(form.tipoEntradaId)"
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

  private localState = {};

  form: FormType = this.defaultForm();

  defaultForm(): FormType {
    return {
      setupId: null,
      ativoId: null,
      gatilhoId: null,
      tipoEntradaId: null,
      resultado: null,
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
    return [
      {
        value: 'id-setup-1',
        text: 'Setup 1',
      },
      {
        value: 'id-setup-2',
        text: 'Setup 2',
      },
    ];
  }

  get gatilhoList() {
    return [
      {
        value: 'id-gatilho-1',
        text: 'Gatilho 1',
      },
      {
        value: 'id-gatilho-2',
        text: 'Gatilho 2',
      },
    ];
  }

  get tipoEntradaList() {
    return [
      {
        value: 'id-tipo-entrada-1',
        text: 'Tipo Entrada 1',
      },
      {
        value: 'id-tipo-entrada-2',
        text: 'Tipo Entrada 2',
      },
    ];
  }

  get resultadoList() {
    return [
      {
        value: 'id-resultado-1',
        text: 'Resultado 1',
      },
      {
        value: 'id-resultado-2',
        text: 'Resultado 2',
      },
    ];
  }

  get ativoList() {
    return [
      {
        value: 'id-ativo-1',
        text: 'Ativo 1',
      },
      {
        value: 'id-ativo-2',
        text: 'Ativo 2',
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
    if (value && this.filterChips.length) {
      this.fillForm(this.filterChips);
    }
  }

  get isLoading(): boolean {
    return this.localState.kind === 'SavingGatilhoState';
  }

  get hasError(): boolean {
    return this.localState.kind === 'ErrorSavingGatilhoState';
  }

  get error(): string | null {
    if (this.hasError) {
      return this.localState.error;
    }
    return null;
  }

  close() {
    this.$emit('close');
  }

  changeState(state) {
    this.localState = state;
  }

  created() {
    // this.controller.subscribe(this.changeState);
  }

  beforeDestroy() {
    // this.controller.unsubscribe(this.changeState);
  }
}
</script>

<style scoped>

</style>
