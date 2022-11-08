<template>
    <v-dialog
        :value="show"
        @input="close"
        max-width="600px"
        persistent
    >
      <v-card v-if="show">
        <v-card-title>
          <span class="text-h5">Excluir importação?</span>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              icon
              @click="close"
              :disabled="isDeleting"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="mt-8">

          <div>
            Tem certeza que deseja excluir esta importação?
            Todas as {{ item.tradeCount }} operações cadastradas pelo arquivo serão removidas permanentemente.
          </div>

          <v-alert
            v-if="hasError"
            outlined
            type="error"
            v-text="error"
            class="ma-0"
          ></v-alert>

        </v-card-text>

        <v-card-actions>
          <div v-if="isDeleting">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <span class="ml-4">Excluindo...</span>
          </div>
          <v-spacer></v-spacer>
          <div class="mb-4 mr-2">
            <v-btn
                color="blue darken-1"
                text
                @click="close"
                :disabled="isDeleting"
            >
              Cancelar
            </v-btn>
            <v-btn
                depressed
                color="primary"
                @click="confirmDelete"
                :disabled="isDeleting"
            >
              Excluir
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { app, TYPES } from "@/core/common/container";
import { DeleteImportacaoController } from "@/core/importacao/presentation/controllers/delete-importacao.controller";
import { ImportacaoEntity } from "@/core/importacao/domain/entities/importacao.entity";
import { DeleteImportacaoState } from "@/core/importacao/presentation/states/delete-importacao.state";

@Component({})
export default class DeleteImportacao extends Vue {
  private deleteImportacaoController = app.make<DeleteImportacaoController>(TYPES.DeleteImportacaoController);
  private deleteImportacaoState = this.deleteImportacaoController.state;

  @Prop() show!: boolean;
  @Prop() item!: ImportacaoEntity;

  async confirmDelete() {
    await this.deleteImportacaoController.deleteImportacao(this.item.id);
    if (!this.hasError) {
      this.close();
    }
  }

  get isDeleting(): boolean {
    return this.deleteImportacaoState.kind === 'DeletingImportacaoState';
  }

  get hasError(): boolean {
    return this.deleteImportacaoState.kind === 'ErrorDeleteImportacaoState';
  }

  get error(): string | null {
    return this.deleteImportacaoState.error || null;
  }

  close() {
    if (this.isDeleting) {
      return;
    }
    this.$emit('close');
  }

  @Watch('show')
  resetState() {
    this.deleteImportacaoController.resetState();
  }

  changeState(state: DeleteImportacaoState) {
    this.deleteImportacaoState = state;
  }

  created() {
    this.deleteImportacaoController.subscribe(this.changeState);
  }

  beforeDestroy() {
    this.deleteImportacaoController.unsubscribe(this.changeState);
  }
}
</script>

<style scoped>

</style>
