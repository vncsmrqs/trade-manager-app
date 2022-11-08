<template>
    <v-dialog
        :value="show"
        @input="close"
        max-width="600px"
        persistent
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Excluir registro?</span>
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
            Tem certeza que deseja excluir esse registro?
          </div>

          <v-alert
            v-if="hasError"
            outlined
            type="error"
            v-text="error"
            class="ma-0 mt-4"
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
import { DeleteTradeController } from "@/core/trade/presentation/controllers/delete-trade.controller";
import { TradeEntity } from "@/core/trade/domain/entities/trade.entity";
import { DeleteTradeState } from "@/core/trade/presentation/states/delete-trade.state";

@Component({})
export default class DeleteTrade extends Vue {
  private controller = app.make<DeleteTradeController>(TYPES.DeleteTradeController);
  private localState = this.controller.state;

  @Prop() show!: boolean;
  @Prop() item!: TradeEntity;

  async confirmDelete() {
    await this.controller.deleteTrade(this.item.id);
    if (!this.hasError) {
      this.close();
      this.$emit('deleted');
    }
  }

  get isDeleting(): boolean {
    return this.localState.kind === 'DeletingTradeState';
  }

  get hasError(): boolean {
    return this.localState.kind === 'ErrorDeleteTradeState';
  }

  get error(): string | null {
    return this.localState.error || null;
  }

  close() {
    if (this.isDeleting) {
      return;
    }
    this.$emit('close');
    this.controller.resetState();
  }

  @Watch('show')
  resetState() {
    this.controller.resetState();
  }

  changeState(state: DeleteTradeState) {
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
