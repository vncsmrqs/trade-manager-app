<template>
    <v-dialog
        :value="show"
        @input="close"
        max-width="600px"
        persistent
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Apagar tipo de entrada</span>
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
            Deseja realmente apagar esse tipo de entrada? Esta ação não pode ser desfeita.
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
            <span class="ml-4">Apagando...</span>
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
              Apagar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { app, TYPES } from "@/core/common/container";
import { CreateOrUpdateTipoEntradaState } from "@/core/tipo-entrada/presentation/states/create-or-update-tipo-entrada.state";
import { DeleteTipoEntradaController } from "@/core/tipo-entrada/presentation/controllers/delete-tipo-entrada.controller";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";

@Component({})
export default class DeleteTipoEntrada extends Vue {
  private controller = app.make<DeleteTipoEntradaController>(TYPES.DeleteTipoEntradaController);
  private localState: CreateOrUpdateTipoEntradaState = this.controller.state;

  @Prop() show!: boolean;
  @Prop() item!: TipoEntradaEntity;

  async confirmDelete() {
    await this.controller.deleteTipoEntrada(this.item.id);
    this.close();
  }

  get isDeleting(): boolean {
    return this.localState.kind === 'DeletingTipoEntradaState';
  }

  get hasError(): boolean {
    return this.localState.kind === 'ErrorDeleteTipoEntradaState';
  }

  get error(): string | null {
    if (this.hasError) {
      return this.localState.error;
    }
    return null;
  }

  close() {
    if (this.isDeleting) {
      return;
    }
    this.$emit('close');
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