import { Controller } from "@/core/setup/presentation/controllers/common/controller";
import { Vue } from "vue-property-decorator";
import { VueConstructor } from "vue";

const deepCopy = <S>(data: any) => JSON.parse(JSON.stringify(data)) as S;

type MixinDataType<S> = {
  state: S;
}
export default function useStateControllerMixin<S>(controller: Controller<S>): VueConstructor {
  return Vue.extend({
    data(): MixinDataType<S> {
      return { state: deepCopy<S>(controller.state) };
    },
    methods: {
      stateSubscription(newState: S): void {
        this.state = newState;
      },
    },
    mounted(): void {
      controller.subscribe(this.stateSubscription);
    },
    beforeDestroy(): void {
      controller.unsubscribe(this.stateSubscription);
    },
  });
}
