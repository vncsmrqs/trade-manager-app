<template>
    <v-dialog
        :value="show"
        @input="close"
        max-width="640px"
        persistent
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Importar registros</span>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              icon
              @click="close"
              :disabled="isUploading || isSaving"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="mt-6">

          <div v-if="isInitialState">
            <div class="mb-4 text-body-1 black--text">
              Baixe a <a class="text-decoration-underline">planilha modelo</a> e preencha com os registros a serem importados.
            </div>

            <div
                class="d-flex justify-center align-center flex-column blue--text pa-12 upload-area"
                @click="selectFile"
                @drop.prevent="handleDropFile($event)"
                @dragover.prevent="dragover = true"
                @dragenter.prevent="dragover = true"
                @dragleave.prevent="dragover = false"
            >
              <input
                  ref="fileUploader"
                  class="d-none"
                  type="file"
                  :accept="importFileTradeState.filesTypesAcceptable.join(', ')"
                  @change="handleSelectFile"
              >
              <div>
                <v-icon x-large color="blue">mdi-file-upload</v-icon>
              </div>
              <div v-if="!dragover">Clique aqui ou arraste e solte o arquivo.</div>
              <div v-else>Solte o seu arquivo aqui</div>
            </div>
          </div>

          <div v-if="isUploading">
            <div class="mb-4 text-body-1 font-weight-bold black--text">Aguarde enquanto a planinlha é enviada...</div>
            <div>
              <div class="text-body-2 black--text">{{ importFileTradeState.fileName }}</div>
              <div class="my-2">
                <v-progress-linear :value="importFileTradeState.uploadProgress" height="8px" rounded></v-progress-linear>
              </div>
              <div class="caption">{{ fileSizeFormatted }}</div>
            </div>
          </div>

          <div v-if="isUploaded">
            <div class="mb-4 text-body-1 font-weight-bold black--text">
              Deseja importar {{ importFileTradeState.totalItems }} registro(s)?
            </div>
            <v-row>
              <v-col cols="auto" class="pr-0">
                <v-icon x-large color="blue">mdi-file-excel-outline</v-icon>
              </v-col>
              <v-col cols="auto">
                <div class="text-body-2 black--text">{{ importFileTradeState.fileName }}</div>
                <div class="caption">{{ fileSizeFormatted }}</div>
              </v-col>
            </v-row>
          </div>

          <v-alert
            v-if="hasError"
            outlined
            type="error"
            v-text="error"
            class="ma-0"
          ></v-alert>

        </v-card-text>

        <v-card-actions v-if="isUploaded">
          <div v-if="isSaving">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <span class="ml-4">Importando...</span>
          </div>
          <v-spacer></v-spacer>
          <div class="mb-4 mr-2">
            <v-btn
                color="blue darken-1"
                text
                @click="close"
                :disabled="isSaving"
            >
              Cancelar
            </v-btn>
            <v-btn
                depressed
                color="primary"
                @click="saveFile"
                :disabled="isSaving"
            >
              Confirmar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { ImportFileTradeController } from "@/core/trade/presentation/controllers/import-trade.controller";
import { ImportFileTradeState } from "@/core/trade/presentation/states/import-trade.state";

@Component({})
export default class ImportTrade extends Vue {
  private importFileTradeController = app.make<ImportFileTradeController>(TYPES.ImportFileTradeController);
  private importFileTradeState = this.importFileTradeController.state;

  private notificationController = app.make<NotificationController>(TYPES.NotificationController);

  @Prop() show!: boolean;

  dragover = false;

  get fileSizeFormatted(): string {
    return (this.importFileTradeState.fileSize / 1024 / 1024).toFixed(2) + 'mb';
  }

  async saveFile() {
    await this.importFileTradeController.saveFile();
    if (!this.hasError) {
      this.close();
    }
  }

  get isInitialState(): boolean {
    return this.importFileTradeState.kind === 'InitialImportFileTradeState';
  }

  get isUploading(): boolean {
    return this.importFileTradeState.kind === 'UploadingImportFileTradeState';
  }

  get isUploaded(): boolean {
    return (
        this.importFileTradeState.kind === 'UploadedImportFiledTradeState' ||
        this.isSaving
    );
  }

  get isSaving(): boolean {
    return this.importFileTradeState.kind === 'SavingImportFileTradeState';
  }

  get hasError(): boolean {
    return this.importFileTradeState.kind === 'ErrorImportFileTradeState';
  }

  get error(): string | null {
    return this.importFileTradeState.error || null;
  }

  selectFile() {
    this.$refs.fileUploader.click();
  }

  handleSelectFile(event) {
    const files = event.target.files;
    this.uploadFile(files);
  }

  handleDropFile(e) {
    this.dragover = false;
    const files = e.dataTransfer.files;
    this.uploadFile(files);
  }

  uploadFile(files: File[]): void {
    if (!files || !files.length || files.length > 1) {
      this.notificationController.push({
        type: 'error',
        message: 'Selecione apenas um planinha para importar',
        timeout: 3000,
      });
      return;
    }
    this.importFileTradeController.uploadFile(files[0]);
  }

  @Watch('show')
  changeShow() {
    setTimeout(() => {
      this.reset();
    }, 500);
  }

  reset() {
    this.dragover = false;
    this.importFileTradeController.resetState();
    if (this.$refs.fileUploader) {
      this.$refs.fileUploader.value = null;
    }
  }

  close() {
    if (this.isUploading) {
      return;
    }
    this.$emit('close');
  }

  changeState(state: ImportFileTradeState) {
    this.importFileTradeState = state;
  }

  created() {
    this.importFileTradeController.subscribe(this.changeState);
  }

  beforeDestroy() {
    this.importFileTradeController.unsubscribe(this.changeState);
  }
}
</script>

<style scoped lang="scss">
  .upload-area {
    border: 2px #2196F3 dashed !important;
    border-radius: 16px;
    margin-top: 16px;
    background-color: #F5F5F5;
  }
</style>
