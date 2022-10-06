<template>
    <v-navigation-drawer
        :value="show"
        @input="close"
        width="650px"
        right
        fixed
        temporary
        class="rounded-l-lg"
        :permanent="show"
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
              <v-tab :href="`#${availableTabs.DADOS_PRINCIPAIS}`">Dados Principais</v-tab>
              <v-tab :href="`#${availableTabs.LOCALIZACAO}`">Localização</v-tab>
              <v-tab :href="`#${availableTabs.ENCERRAMENTO}`">Encerramento</v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </template>

      <v-form
          ref="form"
          @submit.prevent="saveTrade"
          :disabled="isLoading"
      >

        <v-container class="mt-4">
          <v-tabs-items v-model="tab">
            <v-tab-item :value="availableTabs.DADOS_PRINCIPAIS">
                <v-card-text>
                  <v-row>
                    <v-col cols="6" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Data</div>
                        <div>{{ formatDateFieldValue(form.dataAbertura) }}</div>
                      </div>
                      <v-menu
                          v-else
                          ref="dataAberturaDialog"
                          v-model="showDataAberturaPicker"
                          :close-on-content-click="false"
                          :return-value.sync="form.dataAbertura"
                          transition="fade"
                          offset-y
                          min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              :value="formatDateFieldValue(form.dataAbertura, false)"
                              label="Data"
                              outlined
                              dense
                              clearable
                              ref="dataAbertura"
                              :rules="formRules.dataAbertura"
                              required
                              prepend-inner-icon="mdi-calendar"
                              v-bind="attrs"
                              v-on="on"
                              readonly
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="form.dataAbertura"
                            no-title
                            color="primary"
                            locale="pt-BR"
                            @click:date="$refs.dataAberturaDialog.save(form.dataAbertura)"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="6" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Hora</div>
                        <div>{{ formatStringFieldValue(form.horaAbertura) }}</div>
                      </div>
                      <v-menu
                          v-else
                          ref="horaAberturaDialog"
                          v-model="showHoraAberturaPicker"
                          :close-on-content-click="false"
                          :return-value.sync="form.horaAbertura"
                          transition="fade"
                          offset-y
                          max-width="276px"
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              prepend-inner-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              v-model="form.horaAbertura"
                              label="Hora"
                              outlined
                              dense
                              clearable
                              ref="horaAbertura"
                              :rules="formRules.horaAbertura"
                              required
                          ></v-text-field>
                        </template>
                        <v-time-picker
                            v-if="showHoraAberturaPicker"
                            v-model="form.horaAbertura"
                            format="24hr"
                            locale="pt-BR"
                            @click:minute="$refs.horaAberturaDialog.save(form.horaAbertura)"
                        ></v-time-picker>
                      </v-menu>
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
                          ref="lote"
                          :rules="formRules.lote"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Ativo</div>
                        <div>{{ formatStringFieldValue(form.ativoCodigo) }}</div>
                      </div>
                      <v-combobox
                          v-else
                          :value="form.ativoId"
                          @change="(obj) => selectItem('ativo', obj, 'Codigo')"
                          :items="ativoList"
                          label="Ativo"
                          outlined
                          dense
                          clearable
                          ref="ativoId"
                          :rules="formRules.ativoId"
                          required
                          :loading="isLoadingFilters"
                      >
                        <template v-slot:selection>{{ form.ativoCodigo }}</template>
                      </v-combobox>
                    </v-col>
                    <v-col cols="4" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Time Frame</div>
                        <div>{{ formatStringFieldValue(form.timeFrameNome) }}</div>
                      </div>
                      <v-combobox
                          v-else
                          :value="form.timeFrameId"
                          @change="(obj) => selectItem('timeFrame', obj)"
                          :items="timeFrameList"
                          label="Time Frame"
                          outlined
                          dense
                          clearable
                          ref="timeFrameId"
                          :rules="formRules.timeFrameId"
                          :loading="isLoadingFilters"
                      >
                        <template v-slot:selection>{{ form.timeFrameNome }}</template>
                      </v-combobox>
                    </v-col>
                    <v-col cols="12" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Setup</div>
                        <div>{{ formatStringFieldValue(form.setupNome) }}</div>
                      </div>
                      <v-combobox
                        v-else
                        :value="form.setupId"
                        @change="(obj) => selectItem('setup', obj)"
                        :items="setupList"
                        label="Setup"
                        outlined
                        dense
                        clearable
                        ref="setupId"
                        :rules="formRules.setupId"
                        :loading="isLoadingFilters"
                      >
                        <template v-slot:selection>{{ form.setupNome }}</template>
                      </v-combobox>
                    </v-col>
                    <v-col cols="12" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Gatilho</div>
                        <div>{{ formatStringFieldValue(form.gatilhoNome) }}</div>
                      </div>
                      <v-combobox
                          v-else
                          :value="form.gatilhoId"
                          @change="(obj) => selectItem('gatilho', obj)"
                          :items="gatilhoList"
                          label="Gatilho"
                          outlined
                          dense
                          clearable
                          ref="gatilhoId"
                          :rules="formRules.gatilhoId"
                          :loading="isLoadingFilters"
                      >
                        <template v-slot:selection>{{ form.gatilhoNome }}</template>
                      </v-combobox>
                    </v-col>
                    <v-col cols="12" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Tipo de entrada</div>
                        <div>{{ formatStringFieldValue(form.tipoEntradaNome) }}</div>
                      </div>
                      <v-combobox
                          v-else
                          :value="form.tipoEntradaId"
                          @change="(obj) => selectItem('tipoEntrada', obj)"
                          :items="tipoEntradaList"
                          label="Tipo de entrada"
                          outlined
                          dense
                          clearable
                          ref="tipoEntradaId"
                          :rules="formRules.tipoEntradaId"
                          :loading="isLoadingFilters"
                      >
                        <template v-slot:selection>{{ form.tipoEntradaNome }}</template>
                      </v-combobox>
                    </v-col>
                  </v-row>
                </v-card-text>
            </v-tab-item>

            <v-tab-item :value="availableTabs.LOCALIZACAO">
              <v-card-text>
                <v-row>
                  <v-col
                      cols="6"
                      :class="{'py-0': !detailMode}"
                      v-for="campoCustomizavel in localizacaoList"
                      :key="campoCustomizavel.id"
                  >
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">{{ campoCustomizavel.nome }}</div>
                      <div>{{ getValorLocalizacao(campoCustomizavel.id) }}</div>
                    </div>
                    <div v-else>
                      <span class="text-body-1 font-weight-bold">{{ campoCustomizavel.nome }}</span>
                      <v-radio-group
                          v-model="form.localizacao[campoCustomizavel.id]"
                          column
                      >
                        <v-radio
                            v-for="valorDisponivel in campoCustomizavel.valores"
                            :label="valorDisponivel.nome"
                            :value="valorDisponivel.valor"
                            :key="`${campoCustomizavel.id}-${valorDisponivel.valor}`"
                        ></v-radio>
                      </v-radio-group>
                    </div>
                  </v-col>
                  <template v-if="isLoadingFilters">
                    <v-col cols="6" v-for="i in 4" :key="i">
                      <v-skeleton-loader
                          boilerplate
                          type="article"
                      ></v-skeleton-loader>
                    </v-col>
                  </template>
                </v-row>
              </v-card-text>
            </v-tab-item>

            <v-tab-item :value="availableTabs.ENCERRAMENTO">
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
                          ref="pontuacao"
                          :rules="formRules.pontuacao"
                          required
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
                          ref="observacao"
                          :rules="formRules.observacao"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="py-0 d-flex justify-end mb-8">
                      <v-row class="mt-2 mb-4" justify="space-between">
                        <v-col
                            cols="6"
                            v-if="detailMode || !manageTradeState.isUploadingImage"
                        >
                          <v-img
                            v-if="form.imagemUrl"
                            :src="form.imagemUrl"
                            max-width="200px"
                            contain
                          ></v-img>
                        </v-col>
                        <v-col cols="6" v-if="!detailMode && manageTradeState.isUploadingImage">
                          Enviando imagem...
                          <v-progress-linear
                              :value="manageTradeState.uploadImagePercentage"
                              height="8px"
                              rounded
                          ></v-progress-linear>
                          {{ manageTradeState.uploadImagePercentage }}%
                        </v-col>
                        <v-col v-if="!detailMode" cols="auto">
                          <v-btn
                            color="primary"
                            outlined
                            :disabled="manageTradeState.isUploadingImage"
                            @click="selectImagemUrl"
                          >
                            <v-icon left>mdi-image</v-icon>
                            {{ form.imagemUrl?.length ? 'Atualizar' : 'Enviar' }} imagem
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

      </v-form>

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
import { ListTradeFilterController } from "@/core/trade/presentation/controllers/list-trade-filter.controller";
import { ListTradeFilterState } from "@/core/trade/presentation/states/list-trade-filter.state";
import { CampoCustomizavelEntity } from "@/core/campo-customizavel/domain/entities/campo-customizavel.entity";
import moment from "moment";

type FormType = Partial<TradeEntityProps> & {
  horaAbertura?: string;
  localizacao: Record<string, string>;
};

@Component({
  components: { DeleteTrade }
})
export default class ManageTrade extends Vue {
  private manageTradeController = app.make<ManageTradeController>(TYPES.DetailTradeController);
  private manageTradeState = this.manageTradeController.state;

  private listTradeFilterController = app.make<ListTradeFilterController>(TYPES.ListTradeFilterController);
  private listTradeFilterState = this.listTradeFilterController.state;

  private readonly availableTabs = {
    DADOS_PRINCIPAIS: '1',
    LOCALIZACAO: '2',
    ENCERRAMENTO: '3',
  };

  @Prop() show!: boolean;
  @Prop() item?: TradeEntity;

  tab = this.availableTabs.DADOS_PRINCIPAIS;

  detailMode = false;

  form = this.defaultForm();

  showDeleteDialog = false;
  showDataAberturaPicker = false;
  showHoraAberturaPicker = false;

  formIsValid = false;

  formRules = {
    ativoId: [
      (ativoId) => !!ativoId || 'Ativo obrigatório',
    ],
    setupId: [],
    gatilhoId: [],
    tipoEntradaId: [],
    timeFrameId: [],
    dataAbertura: [
      (dataAbertura) => !!dataAbertura || 'Data obrigatória',
    ],
    horaAbertura: [
      (horaAbertura) => !!horaAbertura || 'Hora obrigatória',
    ],
    lote: [
      (lote) => !!lote || 'Lote obrigatório',
    ],
    pontuacao: [
      (pontuacao) => (pontuacao !== undefined && pontuacao !== null) || 'Pontuação obrigatória',
    ],
    resultado: [],
    observacao: [],
  }

  getValorLocalizacao(localizacao: CampoCustomizavelEntity, valor: string): string {
    const valorCampoCustomizavel = localizacao.valores?.find((v) => v.valor === valor);
    return valorCampoCustomizavel ? valorCampoCustomizavel.nome : 'Não definido';
  }

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
      localizacao: {},
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
    if (this.tab === this.availableTabs.ENCERRAMENTO) return 'Finalizar';
    return 'Próximo';
  }

  get secodaryButtonText(): string {
    if (this.item || this.tab === this.availableTabs.DADOS_PRINCIPAIS) return 'Cancelar';
    return 'Anterior';
  }

  get dialogTitle() {
    if (this.detailMode) return 'Detalhes do registro';
    if (this.item) return 'Editar registro';
    return 'Novo registro';
  }

  selectItem(field: string, item?: any, suffix = 'Nome') {
    if (item) {
      this.form[field + 'Id'] = item.value;
      this.form[field + suffix] = item.text;
      return;
    }
    this.form[field + 'Id'] = undefined;
    this.form[field + suffix] = undefined;
  }

  get setupList() {
    return this.listTradeFilterState.setupList.map((item) => ({
      text: item.nome,
      value: item.id,
    }));
  }

  get gatilhoList() {
    return this.listTradeFilterState.gatilhoList.map((item) => ({
      text: item.nome,
      value: item.id,
    }));
  }

  get tipoEntradaList() {
    return this.listTradeFilterState.tipoEntradaList.map((item) => ({
      text: item.nome,
      value: item.id,
    }));
  }

  get ativoList() {
    return this.listTradeFilterState.ativoList.map((item) => ({
      text: item.codigo,
      value: item.id,
    }));
  }

  get timeFrameList() {
    return this.listTradeFilterState.timeFrameList.map((item) => ({
      text: item.nome,
      value: item.id,
    }));
  }

  get localizacaoList() {
    return this.listTradeFilterState.localizacaoList;
  }

  get isLoading(): boolean {
    return this.manageTradeState.kind === 'DeletingTradeState' || this.isLoadingFilters;
  }

  get isLoadingFilters(): boolean {
    return this.listTradeFilterState.kind === 'LoadingListTradeFilterState';
  }

  get hasError(): boolean {
    return this.manageTradeState.kind === 'ErrorDeleteTradeState';
  }

  get error(): string | undefined {
    if (this.hasError) {
      return this.manageTradeState.error;
    }
    return undefined;
  }

  formatBooleanFieldValue(value?: boolean): string {
    if (value === undefined) {
      return 'Não definido';
    }
    return value ? 'Sim' : 'Não';
  }

  formatDateFieldValue(value?: string, showUndefined = true): string {
    if (value === undefined) {
      return showUndefined ? 'Não definido' : '';
    }
    return moment(value).format('DD/MM/YYYY');
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
    if (this.tab === this.availableTabs.ENCERRAMENTO) {
      this.tab = this.availableTabs.LOCALIZACAO;
      return;
    }
    if (this.tab === this.availableTabs.LOCALIZACAO) {
      this.tab = this.availableTabs.DADOS_PRINCIPAIS;
      return;
    }
    this.close();
  }

  goToNextTab() {
    if (this.item) {
      this.saveTrade();
      return;
    }
    if (this.tab === this.availableTabs.DADOS_PRINCIPAIS) {
      this.tab = this.availableTabs.LOCALIZACAO;
      return;
    }
    if (this.tab === this.availableTabs.LOCALIZACAO) {
      this.tab = this.availableTabs.ENCERRAMENTO;
      return;
    }
    this.saveTrade();
  }

  async saveTrade(): Promise<void> {
    const isValid = this.validateForm();
    console.log(isValid, this.form);
    if (isValid) {
      this.close();
    }
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

  async changeImagemUrl(e: any) {
    const fileSelected = e.target.files[0] as File;
    const result = await this.manageTradeController.uploadImage(fileSelected);
    if (result.successful) {
      this.form.imagemUrl = result.value;
    }
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
  changeShow(show: boolean) {
    this.reset();
    if (this.item) {
      this.detailMode = true;
      this.fillForm(this.item);
    }
    if (show) {
      this.listTradeFilterController.loadFilterList();
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
      ativoCodigo: item.ativoCodigo,
      timeFrameNome: item.timeFrameNome,
      localizacao: item.localizacao,
      horaAbertura: item.horaAbertura,
    };
  }

  validateForm() {
    const isValid = this.$refs.form.validate();

    if (isValid) return true;

    const fields = [
      "ativoId",
      "setupId",
      "gatilhoId",
      "tipoEntradaId",
      "tradeImportacaoId",
      "timeFrameId",
      "dataAbertura",
      "horaAbertura",
      "lote",
      "pontuacao",
      "resultado",
      "observacao",
    ];

    const fieldTab = {
      ativoId: this.availableTabs.DADOS_PRINCIPAIS,
      setupId: this.availableTabs.DADOS_PRINCIPAIS,
      gatilhoId: this.availableTabs.DADOS_PRINCIPAIS,
      tipoEntradaId: this.availableTabs.DADOS_PRINCIPAIS,
      timeFrameId: this.availableTabs.DADOS_PRINCIPAIS,
      dataAbertura: this.availableTabs.DADOS_PRINCIPAIS,
      horaAbertura: this.availableTabs.DADOS_PRINCIPAIS,
      lote: this.availableTabs.DADOS_PRINCIPAIS,
      pontuacao: this.availableTabs.ENCERRAMENTO,
      resultado: this.availableTabs.ENCERRAMENTO,
      observacao: this.availableTabs.ENCERRAMENTO,
    };

    const fieldWithError = fields.find((field) => {
      return this.$refs?.[field]?.hasError;
    });

    if (fieldWithError) {
      this.tab = fieldTab[fieldWithError];
    }

    return isValid && !fieldWithError;
  }

  reset() {
    this.$refs.form.resetValidation();
    this.tab = this.availableTabs.DADOS_PRINCIPAIS;
    this.detailMode = false;
    this.form = this.defaultForm();
  }

  close() {
    if (this.isLoading) {
      return;
    }
    this.$emit('close');
  }

  changeDetailTradeState(state: ManageTradeState) {
    this.manageTradeState = state;
  }

  changeListTradeFilterState(state: ListTradeFilterState) {
    this.listTradeFilterState = state;
  }

  created() {
    this.manageTradeController.subscribe(this.changeDetailTradeState);
    this.listTradeFilterController.subscribe(this.changeListTradeFilterState);
  }

  beforeDestroy() {
    this.manageTradeController.unsubscribe(this.changeState);
    this.listTradeFilterController.unsubscribe(this.changeListTradeFilterState);
  }
}
</script>

<style>

</style>
