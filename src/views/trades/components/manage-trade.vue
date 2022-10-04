<template>
    <v-navigation-drawer
        :value="show"
        @close="close"
        width="650px"
        right
        fixed
        temporary
        class="rounded-l-lg"
    >
      <delete-trade
        v-if="!!item"
        :item="item"
        :show="showDeleteDialog"
        @close="closeDeleteDialog"
      ></delete-trade>

      <template v-slot:prepend>
        <v-card-title>
          <span class="text-h5">{{ dialogTitle }}</span>
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
            <v-tabs v-model="tab">
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
              <v-card-text>
                <v-row>
                  <v-col cols="6" :class="{'py-0': !detailMode}">
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">Data</div>
                      <div>{{ formatStringFieldValue(form.dataAbertura) }}</div>
                    </div>
                    <v-text-field
                        v-else
                        v-model="form.dataAbertura"
                        label="Data"
                        outlined
                        dense
                        clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" :class="{'py-0': !detailMode}">
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">Hora</div>
                      <div>{{ formatStringFieldValue(form.horaAbertura) }}</div>
                    </div>
                    <v-text-field
                        v-else
                        v-model="form.horaAbertura"
                        label="Hora"
                        outlined
                        dense
                        clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" :class="{'py-0': !detailMode}">
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">Lote</div>
                      <div>{{ formatStringFieldValue(form.lote) }}</div>
                    </div>
                    <v-text-field
                        v-else
                        v-model="form.lote"
                        label="Lote"
                        outlined
                        dense
                        clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" :class="{'py-0': !detailMode}">
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">Ativo</div>
                      <div>{{ formatStringFieldValue(form.ativoCode) }}</div>
                    </div>
                    <v-combobox
                        v-else
                        v-model="form.ativoId"
                        :items="ativoList"
                        label="Ativo"
                        outlined
                        dense
                        clearable
                    ></v-combobox>
                  </v-col>
                  <v-col cols="4" :class="{'py-0': !detailMode}">
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">Time Frame</div>
                      <div>{{ formatStringFieldValue(form.timeFrameNome) }}</div>
                    </div>
                    <v-combobox
                        v-else
                        v-model="form.timeFrameId"
                        :items="timeFrameList"
                        label="Time Frame"
                        outlined
                        dense
                        clearable
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" :class="{'py-0': !detailMode}">
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">Setup</div>
                      <div>{{ formatStringFieldValue(form.setupNome) }}</div>
                    </div>
                    <v-combobox
                        v-else
                        v-model="form.setupId"
                        :items="setupList"
                        label="Setup"
                        outlined
                        dense
                        clearable
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" :class="{'py-0': !detailMode}">
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">Gatilho</div>
                      <div>{{ formatStringFieldValue(form.gatilhoNome) }}</div>
                    </div>
                    <v-combobox
                        v-else
                        v-model="form.gatilhoId"
                        :items="gatilhoList"
                        label="Gatilho"
                        outlined
                        dense
                        clearable
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" :class="{'py-0': !detailMode}">
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">Tipo de entrada</div>
                      <div>{{ formatStringFieldValue(form.tipoEntradaNome) }}</div>
                    </div>
                    <v-combobox
                        v-else
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
          </v-tab-item>

          <v-tab-item value="localizacao">
            VINICIUS
          </v-tab-item>

          <v-tab-item value="encerramento">
              <v-card-text>
                <v-row>
                  <v-col cols="4" :class="{'py-0': !detailMode}">
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">1 Alvo</div>
                      <div>{{ formatBooleanFieldValue(form.primeiroAlvo) }}</div>
                    </div>
                    <div v-else>
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
                    </div>
                  </v-col>
                  <v-col cols="4" :class="{'py-0': !detailMode}">
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">2 Alvo</div>
                      <div>{{ formatBooleanFieldValue(form.segundoAlvo) }}</div>
                    </div>
                    <div v-else>
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
                    </div>
                  </v-col>
                  <v-col cols="4" :class="{'py-0': !detailMode, 'mb-4': true}">
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">Seguiu o plano?</div>
                      <div>{{ formatBooleanFieldValue(form.seguiuPlano) }}</div>
                    </div>
                    <div v-else>
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
                    </div>
                  </v-col>
                  <v-col v-if="!detailMode" cols="12" class="py-0">
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
                  <v-col v-if="!detailMode" cols="12" class="py-0">
                    <v-text-field
                        v-model="form.pontuacao"
                        label="Pontos"
                        outlined
                        dense
                        type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="detailMode" cols="4" class="text-body-1">
                    <div class="font-weight-bold mb-2">Resultado</div>
                    <div :class="formatResultadoTextColor(form.resultado)">
                      {{ form.resultado ? form.resultado.toUpperCase() : 'Não definido' }}
                    </div>
                  </v-col>
                  <v-col v-if="detailMode" cols="4" class="text-body-1">
                    <div class="font-weight-bold mb-2">Pontos</div>
                    <div :class="formatPontuacaoTextColor(form.pontuacao)">
                      {{ form.pontuacao === undefined ? 'Não definido' : form.pontuacao.toFixed(2) }}
                    </div>
                  </v-col>
                  <v-col v-if="!detailMode" cols="12">
                    <span class="text-body-1 font-weight-bold">Como se sentiu?</span>
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
                            getSentimentoButtonColor('bem', 'green', 'dark-3', true),
                          ]"
                          elevation="0"
                          :color="getSentimentoButtonColor('bem', 'green', 'dark-3')"
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
                  <v-col v-if="detailMode" cols="4">
                    <div  class="text-body-1">
                      <div class="font-weight-bold mb-2">Como se sentiu?</div>
                      <div>
                        <v-icon v-if="form.sentimento" :class="formatSentimentoTextColor(form.sentimento)">
                          {{ formatSentimentoFieldIcon(form.sentimento) }}
                        </v-icon>
                        <span v-else>Não definido</span>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" :class="{'py-0': !detailMode}">
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">Observação</div>
                      <div>{{ formatStringFieldValue(form.observacao)  }}</div>
                    </div>
                    <v-textarea
                        v-else
                        v-model="form.observacao"
                        label="Observação"
                        outlined
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" class="py-0 d-flex justify-end mb-8">
                    <v-row class="mt-2 mb-4" justify="space-between">
                      <v-col cols="6">
                        <v-img v-if="form.imagemUrl" :src="form.imagemUrl"></v-img>
                      </v-col>
                      <v-col v-if="!detailMode" cols="auto">
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
          <v-col v-if="detailMode">
            <v-btn
                color="grey"
                text
                @click="deleteTrade"
                :disabled="isLoading"
            >
              <v-icon left>mdi-delete</v-icon>
              Excluir
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col v-if="!detailMode" cols="auto">
            <v-btn
                color="primary"
                outlined
                @click="goToPreviousTab"
                :disabled="isLoading"
            >
              {{ secodaryButtonText }}
            </v-btn>
          </v-col>
          <v-col v-if="!detailMode" cols="auto">
            <v-btn
                depressed
                color="primary"
                @click="goToNextTab"
                :disabled="isLoading"
            >
              {{ primaryButtonText }}
            </v-btn>
          </v-col>
          <v-col v-if="detailMode" cols="auto">
            <v-btn
                depressed
                outlined
                color="primary"
                @click="editTrade"
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { app, TYPES } from "@/core/common/container";
import {
  TradeEntity,
  TradeEntityProps,
  TradeResultadoType
} from "@/core/trade/domain/entities/trade.entity";
import { ManageTradeState } from "@/core/trade/presentation/states/manage-trade.state";
import { ManageTradeController } from "@/core/trade/presentation/controllers/manage-trade.controller";
import DeleteTrade from "@/views/trades/components/delete-trade.vue";

type FormType = Partial<TradeEntityProps> & {
  horaAbertura?: string;
};

@Component({
  components: { DeleteTrade }
})
export default class ManageTrade extends Vue {
  private detailTradeController = app.make<ManageTradeController>(TYPES.DetailTradeController);
  private detailTradeState = this.detailTradeController.state;

  @Prop() show!: boolean;
  @Prop() item?: TradeEntity;

  tab = 'dados-principais';

  detailMode = false;

  form = this.defaultForm();

  showDeleteDialog = false;

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

  filledForm() {
    return {
      id: 'AA',
      userId: 'aa',
      ativoId: 'aa',
      setupId: 'aa',
      gatilhoId: 'aa',
      tipoEntradaId: 'aa',
      tradeImportacaoId: 'aa',
      timeFrameId: 'aa',
      createdAt: '2022-01-01T00:00:00-03',
      updatedAt: '2022-01-01T00:00:00-03',
      dataAbertura: '2022-01-01T00:00:00-03',
      dataFechamento: '2022-01-01T00:00:00-03',
      lote: '1',
      pontuacao: 100.00,
      resultado: 'gain',
      seguiuPlano: true,
      sentimento: 'bem',
      primeiroAlvo: true,
      segundoAlvo: false,
      imagemUrl: 'undefined',
      observacao: 'Vincius é um cara bonitão. Esta é apenas uma mensagem de teste e não necessariamente representa a realidade',
    };
  }

  get primaryButtonText(): string {
    if (this.item) return 'Salvar';
    if (this.tab === 'encerramento') return 'Finalizar';
    return 'Próximo';
  }

  get secodaryButtonText(): string {
    if (this.item || this.tab === 'encerramento') return 'Cancelar';
    return 'Anterior';
  }

  get dialogTitle() {
    if (this.detailMode) return 'Detalhes do registro';
    if (this.item) return 'Editar registro';
    return 'Novo registro';
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
    return this.detailTradeState.kind === 'DeletingTradeState';
  }

  get hasError(): boolean {
    return this.detailTradeState.kind === 'ErrorDeleteTradeState';
  }

  get error(): string | undefined {
    if (this.hasError) {
      return this.detailTradeState.error;
    }
    return undefined;
  }

  formatBooleanFieldValue(value?: boolean): string {
    if (value === undefined) {
      return 'Não definido';
    }
    return value ? 'Sim' : 'Não';
  }

  formatStringFieldValue(value?: string): string {
    if (value === undefined) {
      return 'Não definido';
    }
    return value;
  }

  formatSentimentoFieldIcon(value?: string): string {
    if (value === undefined) {
      return 'Não definido';
    }

    const mappedValues: Record<string, string> = {
      'bem': 'mdi-emoticon-excited-outline',
      'neutro': 'mdi-emoticon-neutral-outline',
      'mal': 'mdi-emoticon-cry-outline',
    };

    return mappedValues[value];
  }

  formatSentimentoTextColor(value?: string): string {
    if (value === undefined) {
      return 'grey--text';
    }

    const mappedValues: Record<string, string> = {
      'bem': 'green--text',
      'neutro': 'yellow--text text--darken-1',
      'mal': 'red--text',
    };

    return mappedValues[value];
  }

  formatResultadoTextColor(value?: string): string {
    if (value === undefined) {
      return '';
    }

    const mappedValues: Record<string, string> = {
      'gain': 'blue--text',
      '0x0': 'yellow--text text--darken-1',
      'loss': 'red--text',
    };

    return mappedValues[value];
  }

  formatPontuacaoTextColor(value?: number): string {
    if (value === undefined) return '';
    if (value > 0) return 'blue--text';
    if (value < 0) return 'red--text';
    return 'yellow--text text--darken-1';
  }

  getResultadoButtonColor(resultado: TradeResultadoType, color: string, modifier: string, text?: boolean) {
    if (resultado === this.form.resultado) {
      return `${color}${text ?  '--text' : ''} ${modifier}`;
    }
    return `grey${text ?  '--text' : ''} lighten-4`;
  }

  changeResultado(resultado: TradeResultadoType) {
    this.form.resultado = resultado;
  }

  goToPreviousTab() {
    if (this.item) {
      this.close();
      return;
    }
    if (this.tab === 'encerramento') {
      this.tab = 'localizacao';
      return;
    }
    if (this.tab === 'localizacao') {
      this.tab = 'dados-principais';
      return;
    }
    this.close();
  }

  goToNextTab() {
    if (this.item) {
      this.saveTrade();
      return;
    }
    if (this.tab === 'dados-principais') {
      this.tab = 'localizacao';
      return;
    }
    if (this.tab === 'localizacao') {
      this.tab = 'encerramento';
      return;
    }
    this.saveTrade();
  }

  async saveTrade(): Promise<void> {
    console.log(this.form);
    this.close();
  }

  getSentimentoButtonColor(sentimento: string, color: string, modifier: string, text?: boolean) {
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

  closeDeleteDialog(deleted?: boolean) {
    this.showDeleteDialog = false;
    if (deleted) this.close();
  }

  deleteTrade() {
    this.showDeleteDialog = true;
  }

  editTrade() {
    this.detailMode = false;
  }

  @Watch('show')
  changeShow() {
    this.reset();
    if (this.item) {
      this.detailMode = true;
      this.fillForm(this.item);
    }
  }

  fillForm(item: TradeEntity) {
    this.form = {
      ...this.defaultForm(),
      id: item.id,
      userId: item.userId,
      ativoId: item.ativoId,
      setupId: item.setupId,
      gatilhoId: item.gatilhoId,
      tipoEntradaId: item.tipoEntradaId,
      tradeImportacaoId: item.timeFrameId,
      timeFrameId: item.timeFrameId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      dataAbertura: item.dataAbertura,
      dataFechamento: item.dataFechamento,
      lote: item.lote,
      pontuacao: item.pontuacao,
      resultado: item.resultado,
      seguiuPlano: item.seguiuPlano,
      sentimento: item.sentimento,
      primeiroAlvo: item.primeiroAlvo,
      segundoAlvo: item.segundoAlvo,
      imagemUrl: item.imagemUrl,
      observacao: item.observacao,
      userNome: item.userNome,
      ativoNome: item.ativoNome,
      setupNome: item.setupNome,
      gatilhoNome: item.gatilhoNome,
      tipoEntradaNome: item.tipoEntradaNome,
      ativoCode: item.ativoCode,
      timeFrameNome: item.timeFrameNome,
    };
  }

  reset() {
    this.tab = 'dados-principais';
    this.detailMode = false;
    this.form = this.defaultForm();
  }

  close() {
    if (this.isLoading) {
      return;
    }
    this.$emit('close');
  }

  changeState(state: ManageTradeState) {
    this.detailTradeState = state;
  }

  created() {
    this.detailTradeController.subscribe(this.changeState);
  }

  beforeDestroy() {
    this.detailTradeController.unsubscribe(this.changeState);
  }
}
</script>

<style>

</style>
