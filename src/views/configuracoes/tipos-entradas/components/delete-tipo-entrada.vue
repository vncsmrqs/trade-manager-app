<template>
    <v-dialog
        :value="show"
        @input="close"
        max-width="600px"
        persistent
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Excluir tipo de entrada?</span>
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
            Tem certeza que deseja excluir esse tipo de entrada?
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
import { DeleteTipoEntradaController } from "@/core/tipo-entrada/presentation/controllers/delete-tipo-entrada.controller";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";

@Component({})
export default class DeleteTipoEntrada extends Vue {
  private controller = app.make<DeleteTipoEntradaController>(TYPES.DeleteTipoEntradaController);
  private localState = this.controller.state;

  @Prop() show!: boolean;
  @Prop() item!: TipoEntradaEntity;

  async confirmDelete() {
    await this.controller.deleteTipoEntrada(this.item.id);
    if (!this.hasError) {
      this.close();
    }
  }

  get isDeleting(): boolean {
    return this.localState.kind === 'DeletingTipoEntradaState';
  }

  get hasError(): boolean {
    return this.localState.kind === 'ErrorDeleteTipoEntradaState';
  }

  get error(): string | null {
    return this.localState.error || null;
  }

  close() {
    if (this.isDeleting) {
      return;
    }
    this.$emit('close');
  }

  @Watch('show')
  resetState() {
    this.controller.resetState();
  }

  changeState(state) {
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

<style scoped>

</style>
