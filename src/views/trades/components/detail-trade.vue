<template>
    <v-navigation-drawer
        v-model="show"
        width="650px"
        right
        fixed
        temporary
        class="rounded-l-lg"
    >
      <template v-slot:prepend>
        <v-card-title>
          <span class="text-h5">Novo registro</span>
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

        <v-row>
          <v-col>
            <v-tabs v-model="tab" centered>
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#dados-principais">Dados Principais</v-tab>
              <v-tab href="#localizacao">Localização</v-tab>
              <v-tab href="#encerramento">Encerramento</v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </template>

      <v-container class="mt-4">
        <v-tabs-items v-model="tab">
          <v-tab-item value="dados-principais">
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="6" class="py-0">
                    <v-text-field
                        v-model="form.dataAbertura"
                        label="Data"
                        outlined
                        dense
                        clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="py-0">
                    <v-text-field
                        v-model="form.horaAbertura"
                        label="Hora"
                        outlined
                        dense
                        clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="py-0">
                    <v-text-field
                        v-model="form.lote"
                        label="Lote"
                        outlined
                        dense
                        clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="py-0">
                    <v-combobox
                        v-model="form.ativoId"
                        :items="ativoList"
                        label="Ativo"
                        outlined
                        dense
                        clearable
                    ></v-combobox>
                  </v-col>
                  <v-col cols="4" class="py-0">
                    <v-combobox
                        v-model="form.timeFrameId"
                        :items="timeFrameList"
                        label="Time Frame"
                        outlined
                        dense
                        clearable
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-combobox
                        v-model="form.setupId"
                        :items="setupList"
                        label="Setup"
                        outlined
                        dense
                        clearable
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-combobox
                        v-model="form.gatilhoId"
                        :items="gatilhoList"
                        label="Gatilho"
                        outlined
                        dense
                        clearable
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-combobox
                        v-model="form.tipoEntradaId"
                        :items="tipoEntradaList"
                        label="Tipo de entrada"
                        outlined
                        dense
                        clearable
                    ></v-combobox>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item value="localizacao">
            VINICIUS
          </v-tab-item>

          <v-tab-item value="encerramento">
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="4" class="py-0">
                    <span class="text-body-1 font-weight-bold">1 Alvo</span>
                    <v-radio-group
                        v-model="form.primeiroAlvo"
                        column
                    >
                      <v-radio
                          label="Sim"
                          :value="true"
                      ></v-radio>
                      <v-radio
                          label="Não"
                          :value="false"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="4" class="py-0">
                    <span class="text-body-1 font-weight-bold">2 Alvo</span>
                    <v-radio-group
                        v-model="form.segundoAlvo"
                        column
                    >
                      <v-radio
                          label="Sim"
                          :value="true"
                      ></v-radio>
                      <v-radio
                          label="Não"
                          :value="false"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="4" class="py-0 mb-4">
                    <span class="text-body-1 font-weight-bold">Seguiu o plano?</span>
                    <v-radio-group
                        v-model="form.seguiuPlano"
                        column
                    >
                      <v-radio
                          label="Sim"
                          :value="true"
                      ></v-radio>
                      <v-radio
                          label="Não"
                          :value="false"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <span class="text-body-1 font-weight-bold">Resultado</span>
                    <v-row class="mt-2 mb-4">
                      <v-col cols="4">
                        <v-btn
                          style="border-width: 2px"
                          @click="() => changeResultado('gain')"
                          v-bind="{
                            [ form.resultado === 'gain' ? 'outlined' : 'tile']: true,
                          }"
                          :class="[
                            getResultadoButtonColor('gain', 'blue', 'accent-1', true),
                          ]"
                          elevation="0"
                          :color="getResultadoButtonColor('gain', 'blue', 'accent-1')"
                          block
                        >GAIN</v-btn>
                      </v-col>
                      <v-col cols="4">
                        <v-btn
                          style="border-width: 2px"
                          @click="() => changeResultado('0x0')"
                          v-bind="{
                            [ form.resultado === '0x0' ? 'outlined' : 'tile']: true,
                          }"
                          :class="[
                            getResultadoButtonColor('0x0', 'yellow', 'darken-1', true),
                          ]"
                          elevation="0"
                          :color="getResultadoButtonColor('0x0', 'yellow', 'darken-1')"
                          block
                        >0x0</v-btn>
                      </v-col>
                      <v-col cols="4">
                        <v-btn
                          style="border-width: 2px"
                          v-bind="{
                            [ form.resultado === 'loss' ? 'outlined' : 'tile']: true,
                          }"
                          elevation="0"
                          :class="[getResultadoButtonColor('loss', 'red', 'accent-1', true)]"
                          @click="() => changeResultado('loss')"
                          :color="getResultadoButtonColor('loss', 'red', 'accent-1')"
                          block
                        >LOSS</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                        v-model="form.pontuacao"
                        label="Pontos"
                        outlined
                        dense
                        type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <span class="text-body-1 font-weight-bold">Como se sentiu? {{ form.sentimento }}</span>
                    <v-row class="mt-2 mb-4">
                      <v-col cols="4">
                        <v-btn
                          style="border-width: 2px; height: 100px;"
                          @click="() => changeSentimento('bem')"
                          v-bind="{
                            [ form.sentimento === 'bem' ? 'outlined' : 'tile']: true,
                          }"
                          :class="[
                            'rounded-lg',
                            getSentimentoButtonColor('bem', 'blue', 'accent-1', true),
                          ]"
                          elevation="0"
                          :color="getSentimentoButtonColor('bem', 'blue', 'accent-1')"
                          block
                        >
                          <v-icon x-large>mdi-emoticon-excited-outline</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="4">
                        <v-btn
                          style="border-width: 2px; height: 100px;"
                          @click="() => changeSentimento('neutro')"
                          v-bind="{
                            [ form.sentimento === 'neutro' ? 'outlined' : 'tile']: true,
                          }"
                          :class="[
                            'rounded-lg',
                            getSentimentoButtonColor('neutro', 'yellow', 'darken-1', true),
                          ]"
                          elevation="0"
                          :color="getSentimentoButtonColor('neutro', 'yellow', 'darken-1')"
                          block
                        >
                          <v-icon x-large>mdi-emoticon-neutral-outline</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="4">
                        <v-btn
                          style="border-width: 2px; height: 100px;"
                          v-bind="{
                            [ form.sentimento === 'mal' ? 'outlined' : 'tile']: true,
                          }"
                          elevation="0"
                          :class="[
                            'rounded-lg',
                            getSentimentoButtonColor('mal', 'red', 'accent-1', true)
                          ]"
                          @click="() => changeSentimento('mal')"
                          :color="getSentimentoButtonColor('mal', 'red', 'accent-1')"
                          block
                        >
                          <v-icon x-large>mdi-emoticon-cry-outline</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-textarea
                        v-model="form.observacao"
                        label="Observação"
                        outlined
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" class="py-0 d-flex justify-end mb-8">
                    <v-row class="mt-2 mb-4" justify="space-between">
                      <v-col cols="4">
                        <v-img v-if="form.imagemUrl" :src="form.imagemUrl"></v-img>
                      </v-col>
                      <v-col cols="4">
                        <v-btn
                          color="primary"
                          outlined
                          @click="selectImagemUrl"
                        >
                          <v-icon left>mdi-image</v-icon>
                          Enviar imagem
                        </v-btn>
                        <input
                          ref="uploader"
                          class="d-none"
                          type="file"
                          accept="image/*"
                          @change="changeImagemUrl"
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-container>

      <template v-slot:append>
        <v-row v-if="hasError" class="pa-6">
          <v-col>
              <v-alert
                  outlined
                  type="error"
                  v-text="error"
                  class="ma-0"
              ></v-alert>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-row class="pa-6">
          <v-col>
            <v-btn
                color="grey"
                text
                @click="close"
                :disabled="isLoading"
            >
              <v-icon left>mdi-delete</v-icon>
              Excluir
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
<!--          <v-col cols="auto">-->
<!--            <v-btn-->
<!--                color="primary"-->
<!--                outlined-->
<!--                @click="close"-->
<!--                :disabled="isLoading"-->
<!--            >-->
<!--              Cancelar-->
<!--            </v-btn>-->
<!--          </v-col>-->
<!--          <v-col cols="auto">-->
<!--            <v-btn-->
<!--                depressed-->
<!--                color="primary"-->
<!--                @click="() => {}"-->
<!--                :disabled="isLoading"-->
<!--            >-->
<!--              Finalizar-->
<!--            </v-btn>-->
<!--          </v-col>-->
          <v-col cols="auto">
            <v-btn
                depressed
                outlined
                color="primary"
                @click="() => {}"
                :disabled="isLoading"
            >
              <v-icon left>mdi-pencil</v-icon>
              Editar
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-navigation-drawer>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { app, TYPES } from "@/core/common/container";
import { DefaultTradeEntityProps, TradeEntity, TradeResultadoType } from "@/core/trade/domain/entities/trade.entity";
import { DetailTradeState } from "@/core/trade/presentation/states/detail-trade.state";
import { DetailTradeController } from "@/core/trade/presentation/controllers/detail-trade.controller";

type FormType = Partial<DefaultTradeEntityProps> & {
  horaAbertura?: string;
};

@Component({})
export default class DetailTrade extends Vue {
  private controller = app.make<DetailTradeController>(TYPES.DetailTradeController);
  private localState = this.controller.state;

  @Prop() show!: boolean;
  @Prop() item!: TradeEntity;

  tab = 'dados-principais';

  form = this.defaultForm();

  defaultForm(): FormType {
    return {
      id: undefined,
      userId: undefined,
      ativoId: undefined,
      setupId: undefined,
      gatilhoId: undefined,
      tipoEntradaId: undefined,
      tradeImportacaoId: undefined,
      timeFrameId: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      dataAbertura: undefined,
      dataFechamento: undefined,
      lote: undefined,
      pontuacao: undefined,
      resultado: undefined,
      seguiuPlano: undefined,
      sentimento: undefined,
      primeiroAlvo: undefined,
      segundoAlvo: undefined,
      imagemUrl: undefined,
      observacao: undefined,
    };
  }

  get setupList() {
    return [];
  }

  get gatilhoList() {
    return [];
  }

  get tipoEntradaList() {
    return [];
  }

  get ativoList() {
    return [];
  }

  get timeFrameList() {
    return [];
  }

  get isLoading(): boolean {
    return this.localState.kind === 'DeletingTradeState';
  }

  get hasError(): boolean {
    return this.localState.kind === 'ErrorDeleteTradeState';
  }

  get error(): string | undefined {
    if (this.hasError) {
      return this.localState.error;
    }
    return undefined;
  }

  getResultadoButtonColor(resultado: TradeResultadoType, color: string, modifier: string, text: boolean) {
    if (resultado === this.form.resultado) {
      return `${color}${text ?  '--text' : ''} ${modifier}`;
    }
    return `grey${text ?  '--text' : ''} lighten-4`;
  }

  changeResultado(resultado: TradeResultadoType) {
    this.form.resultado = resultado;
  }

  getSentimentoButtonColor(sentimento: string, color: string, modifier: string, text: boolean) {
    if (sentimento === this.form.sentimento) {
      return `${color}${text ?  '--text' : ''} ${modifier}`;
    }
    return `grey${text ?  '--text' : ''} lighten-4`;
  }

  changeSentimento(sentimento: string) {
    this.form.sentimento = sentimento;
  }

  selectImagemUrl() {
    //@ts-ignore
    this.$refs.uploader.click();
  }

  changeImagemUrl(e: any) {
    const fileSelected = e.target.files[0] as File;
    console.log({ fileSelected });
  }

  close() {
    if (this.isLoading) {
      return;
    }
    this.$emit('close');
  }

  changeState(state: DetailTradeState) {
    this.localState = state;
  }

  created() {
    this.controller.subscribe(this.changeState);
  }

  beforeDestroy() {
    this.controller.unsubscribe(this.changeState);
  }
}
</script>

<style>

</style>
