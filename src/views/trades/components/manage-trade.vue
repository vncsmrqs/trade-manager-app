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
        @deleted="$emit('deleted')"
      ></delete-trade>

      <single-image-viewer
          :show="showImageViewerDialog"
          :src="imageToViewSrc"
          @close="() => { showImageViewerDialog = false; imageToViewSrc = null }"
      ></single-image-viewer>

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
              <v-tab :href="`#${availableTabs.FILTROS}`">Filtros</v-tab>
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
                        <div>{{ formatDateFieldValue(form.dataTrade) }}</div>
                      </div>
                      <v-menu
                          v-else
                          ref="dataTradeDialog"
                          v-model="showDataTradePicker"
                          :close-on-content-click="false"
                          :return-value.sync="form.dataTrade"
                          transition="fade"
                          offset-y
                          min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              :value="formatDateFieldValue(form.dataTrade, false)"
                              label="Data"
                              outlined
                              dense
                              clearable
                              ref="dataTrade"
                              :rules="formRules.dataTrade"
                              required
                              prepend-inner-icon="mdi-calendar"
                              v-bind="attrs"
                              v-on="on"
                              readonly
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="form.dataTrade"
                            no-title
                            color="primary"
                            locale="pt-BR"
                            :max="today"
                            @click:date="$refs.dataTradeDialog.save(form.dataTrade)"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="6" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Hora</div>
                        <div>{{ formatStringFieldValue(form.horaTrade) }}</div>
                      </div>
                      <div v-else>
                        <v-text-field
                            prepend-inner-icon="mdi-clock-time-four-outline"
                            v-model="form.horaTrade"
                            label="Hora"
                            outlined
                            dense
                            type="time"
                            clearable
                            ref="horaTrade"
                            :rules="formRules.horaTrade"
                            required
                        ></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="6" :class="{'py-0': !detailMode}">
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
                          type="number"
                          :min="1"
                          clearable
                          ref="lote"
                          :rules="formRules.lote"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Ativo</div>
                        <div>{{ formatStringFieldValue(form.ativoCodigo) }}</div>
                      </div>
                      <v-select
                          v-else
                          :value="form.ativoId"
                          @change="(obj) => selectItem('ativo', obj, 'Codigo', ativoList)"
                          :items="ativoList"
                          label="Ativo"
                          outlined
                          dense
                          clearable
                          ref="ativoId"
                          :rules="formRules.ativoId"
                          required
                          :loading="isLoadingFilters"
                      ></v-select>
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
                    <v-col cols="12" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Tipo de Stop</div>
                        <div>{{ formatStringFieldValue(form.tipoStopNome) }}</div>
                      </div>
                      <v-combobox
                          v-else
                          :value="form.tipoStopNome"
                          @change="(obj) => selectItem('tipoStop', obj)"
                          :items="tipoStopList"
                          label="Tipo de stop"
                          outlined
                          dense
                          clearable
                          ref="tipoStopId"
                          :rules="formRules.tipoStopId"
                          :loading="isLoadingFilters"
                      >
                        <template v-slot:selection>{{ form.tipoStopNome }}</template>
                      </v-combobox>
                    </v-col>
                    <v-col cols="12" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Local do Stop</div>
                        <div>{{ formatStringFieldValue(form.localStopNome) }}</div>
                      </div>
                      <v-combobox
                          v-else
                          :value="form.localStopNome"
                          @change="(obj) => selectItem('localStop', obj)"
                          :items="localStopList"
                          label="Local do stop"
                          outlined
                          dense
                          clearable
                          ref="localStopId"
                          :rules="formRules.localStopId"
                          :loading="isLoadingFilters"
                      >
                        <template v-slot:selection>{{ form.localStopNome }}</template>
                      </v-combobox>
                    </v-col>
                  </v-row>
                </v-card-text>
            </v-tab-item>

            <v-tab-item :value="availableTabs.FILTROS">
              <v-card-text>
                <v-row>
                  <v-col
                      cols="6"
                      :class="{'py-0': !detailMode}"
                      v-for="filtro in filtroList"
                      :key="filtro.id"
                  >
                    <div v-if="detailMode" class="text-body-1">
                      <div class="font-weight-bold mb-2">{{ filtro.nome }}</div>
                      <div>{{ getValorFiltro(filtro) }}</div>
                    </div>
                    <div v-else>
                      <span class="text-body-1 font-weight-bold">{{ filtro.nome }}</span>
                      <v-radio-group
                          v-model="form.filtros[filtro.id]"
                          column
                      >
                        <v-radio
                            v-for="valor in filtro.valores"
                            :label="valor.nome"
                            :value="valor.id"
                            :key="`${filtro.id}-${valor.id}`"
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
                <v-card-text v-if="show">
                  <v-row>
                    <v-col cols="4" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Saída Parcial</div>
                        <div>{{ formatSaidaFieldValue(form.saidaParcial) }}</div>
                      </div>
                      <div v-else>
                        <v-select
                            :items="tradeSaidaOptionList"
                            item-text="label"
                            item-value="value"
                            label="Saída Parcial"
                            v-model="form.saidaParcial"
                            clearable
                            dense
                            outlined
                        ></v-select>
                      </div>
                    </v-col>
                    <v-col cols="4" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Saída Final</div>
                        <div>{{ formatSaidaFieldValue(form.saidaFinal) }}</div>
                      </div>
                      <div v-else>
                        <v-select
                            :items="tradeSaidaOptionList"
                            item-text="label"
                            item-value="value"
                            label="Saída Final"
                            v-model="form.saidaFinal"
                            dense
                            clearable
                            outlined
                        ></v-select>
                      </div>
                    </v-col>
                    <v-col cols="4" :class="{'py-0': !detailMode}">
                      <div v-if="detailMode" class="text-body-1">
                        <div class="font-weight-bold mb-2">Seguiu o plano?</div>
                        <div>{{ formatBooleanFieldValue(form.seguiuPlano) }}</div>
                      </div>
                      <div v-else>
                        <v-select
                            :items="[{ label: 'Sim', value: true }, { label: 'Não', value: false }]"
                            item-text="label"
                            item-value="value"
                            label="Seguiu o plano?"
                            v-model="form.seguiuPlano"
                            dense
                            clearable
                            outlined
                        ></v-select>
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
                    <v-col v-if="!detailMode" cols="6" class="py-0">
                      <v-money-field
                          label="Pontos"
                          v-model="form.pontuacao"
                          outlined
                          dense
                          ref="pontuacao"
                          :rules="formRules.pontuacao"
                          :validate-on-blur="true"
                          required
                      ></v-money-field>
                    </v-col>
                    <v-col v-if="!detailMode" cols="6" class="py-0">
                      <v-money-field
                          v-model="form.valorResultado"
                          label="Resultado em R$"
                          outlined
                          dense
                          ref="valorResultado"
                          :rules="formRules.valorResultado"
                          :validate-on-blur="true"
                          required
                      ></v-money-field>
                    </v-col>
                    <v-col v-if="detailMode" cols="4" class="text-body-1">
                      <div class="font-weight-bold mb-2">Resultado</div>
                      <div :class="formatResultadoTextColor(form.resultado)">
                        {{ form.resultado ? form.resultado.toUpperCase() : '-' }}
                      </div>
                    </v-col>
                    <v-col v-if="detailMode" cols="4" class="text-body-1">
                      <div class="font-weight-bold mb-2">Pontos</div>
                      <div :class="formatNumberTextColor(form.pontuacao)">
                        {{ form.pontuacao === undefined ? '-' : form.pontuacao.toFixed(2) }}
                      </div>
                    </v-col>
                    <v-col v-if="detailMode" cols="4" class="text-body-1">
                      <div class="font-weight-bold mb-2">Resultado em R$</div>
                      <div :class="formatNumberTextColor(form.valorResultado)">
                        {{ form.valorResultado == undefined ? '-' : 'R$ ' + form.valorResultado.toFixed(2) }}
                      </div>
                    </v-col>
                    <v-col v-if="!detailMode" cols="12">
                      <span class="text-body-1 font-weight-bold">Como se sentiu?</span>
                      <v-row class="mt-2 mb-4">
                        <v-col cols="4">
                          <v-btn
                            style="border-width: 2px; height: 50px;"
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
                            <v-icon large>mdi-emoticon-excited-outline</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="4">
                          <v-btn
                            style="border-width: 2px; height: 50px;"
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
                            <v-icon large>mdi-emoticon-neutral-outline</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="4">
                          <v-btn
                            style="border-width: 2px; height: 50px;"
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
                            <v-icon large>mdi-emoticon-cry-outline</v-icon>
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
                          <span v-else>-</span>
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
                          <v-hover v-if="form.imagemPath">
                            <template v-slot:default="{ hover }">
                              <div style="position: relative; display: inline-block">
                                <v-img
                                    :src="form.imagemUrl"
                                    max-width="200px"
                                    contain
                                ></v-img>
                                <v-fade-transition>
                                  <v-overlay v-if="hover" absolute>
                                    <v-btn
                                        color="white"
                                        @click="() => { showImageViewerDialog = true; imageToViewSrc = form.imagemUrl }"
                                        class="black--text"
                                    >
                                      Ver
                                    </v-btn>
                                  </v-overlay>
                                </v-fade-transition>
                              </div>
                            </template>
                          </v-hover>
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
                            {{ form.imagemPath?.length ? 'Atualizar' : 'Enviar' }} imagem
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
  TradeResultadoType, TradeSaidaEnum, tradeSaidaLabelList, TradeSentimentoType
} from "@/core/trade/domain/entities/trade.entity";
import { ManageTradeState } from "@/core/trade/presentation/states/manage-trade.state";
import { ManageTradeController } from "@/core/trade/presentation/controllers/manage-trade.controller";
import DeleteTrade from "@/views/trades/components/delete-trade.vue";
import { ListTradeFilterController } from "@/core/trade/presentation/controllers/list-trade-filter.controller";
import { ListTradeFilterState } from "@/core/trade/presentation/states/list-trade-filter.state";
import { CampoCustomizavelEntity } from "@/core/campo-customizavel/domain/entities/campo-customizavel.entity";
import SingleImageViewer from "@/common/components/single-image-viewer.vue";
import VMoneyField from "@/common/components/v-money-field.vue";
import { getEnumKeyByValue } from "@/common/utils";
import DateUtils from "@/common/date.utils";

type FormType = Partial<TradeEntityProps>;

@Component({
  components: { SingleImageViewer, DeleteTrade, VMoneyField }
})
export default class ManageTrade extends Vue {
  private manageTradeController = app.make<ManageTradeController>(TYPES.ManageTradeController);
  private manageTradeState = this.manageTradeController.state;

  private listTradeFilterController = app.make<ListTradeFilterController>(TYPES.ListTradeFilterController);
  private listTradeFilterState = this.listTradeFilterController.state;

  private readonly availableTabs = {
    DADOS_PRINCIPAIS: '1',
    FILTROS: '2',
    ENCERRAMENTO: '3',
  };

  @Prop() show!: boolean;
  @Prop() item?: TradeEntity;

  tab = this.availableTabs.DADOS_PRINCIPAIS;

  detailMode = false;

  form = this.defaultForm();

  showDeleteDialog = false;
  showDataTradePicker = false;
  showImageViewerDialog = false;

  imageToViewSrc?: string | null = null;

  formIsValid = false;

  formRules = {
    ativoId: [
      (ativoId: any) => !!ativoId || 'Ativo obrigatório',
    ],
    setupId: [],
    gatilhoId: [],
    tipoEntradaId: [],
    dataTrade: [
      (dataTrade: any) => !!dataTrade || 'Data obrigatória',
    ],
    horaTrade: [
      (horaTrade: any) => !!horaTrade || 'Hora obrigatória',
    ],
    lote: [
      (lote: any) => !!lote || 'Lote obrigatório',
    ],
    pontuacao: [
      (pontuacao: any) => (pontuacao !== undefined && pontuacao !== null) || 'Pontuação obrigatória',
      this.validatePontuacao,
    ],
    valorResultado: [
      (valorResultado: any) => (valorResultado !== undefined && valorResultado !== null) || 'Resultado em R$ obrigatório',
      this.validateValorResultado,
    ],
    resultado: [],
    observacao: [],
  }

  validatePontuacao(pontuacao: any): boolean | string {
    if (this.form.resultado) {
      if (this.form.resultado === 'gain') {
        return pontuacao > 0 || 'A pontuação deve ser maior que 0 para resultado GAIN';
      }
      if (this.form.resultado === 'loss') {
        return pontuacao < 0 || 'A pontuação deve ser menor que 0 para resultado LOSS';
      }
      return pontuacao === 0 || 'A pontuação deve ser 0 para resultado 0x0';
    }
    return true;
  }

  validateValorResultado(valorResultado: any): boolean | string {
    if (this.form.resultado) {
      if (this.form.resultado === 'gain') {
        return valorResultado > 0 || 'O resultado em R$ deve ser maior que 0 para resultado GAIN';
      }
      if (this.form.resultado === 'loss') {
        return valorResultado < 0 || 'A resultado em R$ deve ser menor que 0 para resultado LOSS';
      }
      return valorResultado === 0 || 'A resultado em R$ deve ser 0 para resultado 0x0';
    }
    return true;
  }

  get today() {
    return DateUtils.formatToISODateString(new Date());
  }

  getValorFiltro(filtro: CampoCustomizavelEntity): string {
    const valorSelecionadoId = this.form?.filtros?.[filtro.id];
    const valorCampoCustomizavel = filtro.valores?.find((v) => v.id === valorSelecionadoId);
    return valorCampoCustomizavel ? valorCampoCustomizavel.nome : '-';
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
      createdAt: undefined,
      updatedAt: undefined,
      dataTrade: undefined,
      horaTrade: undefined,
      lote: undefined,
      pontuacao: undefined,
      valorResultado: undefined,
      resultado: undefined,
      seguiuPlano: undefined,
      sentimento: undefined,
      saidaParcial: undefined,
      saidaFinal: undefined,
      imagemPath: undefined,
      imagemUrl: undefined,
      observacao: undefined,
      filtros: {},
    };
  }

  get tradeSaidaOptionList() {
    return Object.keys(tradeSaidaLabelList).map((name) => ({
      value: TradeSaidaEnum[name],
      label: tradeSaidaLabelList[name],
    }));
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

  selectItem(field: string, item?: any, suffix = 'Nome', list: Record<string, any> = []) {
    if (item) {
      if (typeof item === "string") {
        const obj = list.find((i) => i.value === item);
        if (!obj) {
          this.form[field + 'Id'] = item;
          return;
        }
        item = obj;
      }
      this.form[field + 'Id'] = item.value;
      this.form[field + suffix] = item.text;
      return;
    }
    this.form[field + 'Id'] = undefined;
    this.form[field + suffix] = undefined;
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

  get tipoStopList() {
    return this.listTradeFilterController.tipoStopList;
  }

  get localStopList() {
    return this.listTradeFilterController.localStopList;
  }

  get filtroList() {
    return this.listTradeFilterController.filtroList;
  }

  get isLoading(): boolean {
    return this.manageTradeState.kind === 'LoadingManageTradeState' || this.isLoadingFilters;
  }

  get isLoadingFilters(): boolean {
    return this.listTradeFilterState.kind === 'LoadingListTradeFilterState';
  }

  get hasError(): boolean {
    return this.manageTradeState.kind === 'ErrorManageTradeState';
  }

  get error(): string | null {
    return this.manageTradeState.error || null;
  }

  formatBooleanFieldValue(value?: boolean): string {
    if (value == undefined) {
      return '-';
    }
    return value ? 'Sim' : 'Não';
  }

  formatDateFieldValue(value?: string, showUndefined = true): string {
    return DateUtils.formatDateFieldValue(value, showUndefined);
  }

  formatStringFieldValue(value?: any): string {
    if (value == undefined) {
      return '-';
    }
    return value;
  }

  formatSaidaFieldValue(value?: TradeSaidaEnum) {
    if (value == undefined) {
      return '-';
    }
    return tradeSaidaLabelList[getEnumKeyByValue<TradeSaidaEnum>(TradeSaidaEnum, value)];
  }

  formatSentimentoFieldIcon(value?: string): string {
    if (value === undefined) {
      return '-';
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

  formatNumberTextColor(value?: number): string {
    if (value == undefined) return '';
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
      this.tab = this.availableTabs.FILTROS;
      return;
    }
    if (this.tab === this.availableTabs.FILTROS) {
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
      this.tab = this.availableTabs.FILTROS;
      return;
    }
    if (this.tab === this.availableTabs.FILTROS) {
      this.tab = this.availableTabs.ENCERRAMENTO;
      return;
    }
    this.saveTrade();
  }

  async saveTrade(): Promise<void> {
    const isValid = this.validateForm();
    if (isValid) {
      await this.manageTradeController.createOrUpdateTrade(new TradeEntity(this.form));
      if (!this.hasError) {
        this.$emit('saved');
      }
    }
  }

  getSentimentoButtonColor(sentimento: string, color: string, modifier: string, text?: boolean) {
    if (sentimento === this.form.sentimento) {
      return `${color}${text ?  '--text' : ''} ${modifier}`;
    }
    return `grey${text ?  '--text' : ''} lighten-4`;
  }

  changeSentimento(sentimento: TradeSentimentoType) {
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
      this.form.imagemPath = result.value.filePath;
      this.form.imagemUrl = result.value.imageUrl;
    }
    this.$refs.uploader.value = null;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = false;
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
      this.listTradeFilterController.loadAllFilterList();
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
      tradeImportacaoId: item.tradeImportacaoId,
      tipoStopId: item.tipoStopId,
      localStopId: item.localStopId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      dataTrade: item.dataTrade,
      horaTrade: item.horaTrade,
      lote: item.lote,
      pontuacao: item.pontuacao,
      valorResultado: item.valorResultado,
      resultado: item.resultado,
      seguiuPlano: item.seguiuPlano,
      sentimento: item.sentimento,
      saidaParcial: item.saidaParcial,
      saidaFinal: item.saidaFinal,
      imagemPath: item.imagemPath,
      imagemUrl: item.imagemUrl,
      observacao: item.observacao,
      userNome: item.userNome,
      ativoNome: item.ativoNome,
      setupNome: item.setupNome,
      gatilhoNome: item.gatilhoNome,
      tipoEntradaNome: item.tipoEntradaNome,
      tipoStopNome: item.tipoStopNome,
      localStopNome: item.localStopNome,
      ativoCodigo: item.ativoCodigo,
      filtros: item.filtros,
    };
  }

  validateForm() {
    //@ts-ignore
    const isValid = this.$refs.form.validate();

    if (isValid) return true;

    const fields = [
      "ativoId",
      "setupId",
      "gatilhoId",
      "tipoEntradaId",
      "tipoStopId",
      "localStopId",
      "tradeImportacaoId",
      "dataTrade",
      "horaTrade",
      "lote",
      "pontuacao",
      "valorResultado",
      "resultado",
      "observacao",
    ];

    const fieldTab = {
      ativoId: this.availableTabs.DADOS_PRINCIPAIS,
      setupId: this.availableTabs.DADOS_PRINCIPAIS,
      gatilhoId: this.availableTabs.DADOS_PRINCIPAIS,
      tipoEntradaId: this.availableTabs.DADOS_PRINCIPAIS,
      tipoStopId: this.availableTabs.DADOS_PRINCIPAIS,
      localStopId: this.availableTabs.DADOS_PRINCIPAIS,
      dataTrade: this.availableTabs.DADOS_PRINCIPAIS,
      horaTrade: this.availableTabs.DADOS_PRINCIPAIS,
      lote: this.availableTabs.DADOS_PRINCIPAIS,
      pontuacao: this.availableTabs.ENCERRAMENTO,
      valorResultado: this.availableTabs.ENCERRAMENTO,
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

<style lang="scss">
input[type="time"] {
  &::-webkit-calendar-picker-indicator {
    background: none;
  }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
