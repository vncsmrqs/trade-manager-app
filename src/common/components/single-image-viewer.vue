<template>
  <v-dialog
    :value="show"
    @input="close"
    width="100vw"
    content-class="elevation-0"
    transition="none"
    persistent
  >
    <v-btn
      @click="close"
      color="white"
      icon
      large
      fixed
      right
      top
    >
      <v-icon>mdi-close-circle</v-icon>
    </v-btn>

    <v-container max-width="80vw">
      <v-row no-gutters align="center" justify="center">
        <v-img
            :src="src"
            :lazy-src="src"
            max-width="80vw"
            max-height="80vh"
            contain
            aspect-ratio="2"
        >
          <template v-slot:placeholder>
            <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
            >
              <v-progress-circular
                  indeterminate
                  color="blue"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class SingleImageViewer extends Vue {
  @Prop() show!: boolean;
  @Prop() src!: string;

  close() {
    this.$emit('close');
  }
}
</script>

<style scoped>

</style>
