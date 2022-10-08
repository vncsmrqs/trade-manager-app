import { ActionResult } from "@/core/common/domain/action-result";
import {
  GetTradeSumBySetupUseCaseContract,
  TradeSumBySetupItem
} from "@/core/dashboard/domain/use-cases/get-trade-sum-by-setup.use-case";

export class GetTradeSumBySetupUseCase implements GetTradeSumBySetupUseCaseContract {
  execute(
    params: GetTradeSumBySetupUseCaseContract.Params
  ): Promise<ActionResult<GetTradeSumBySetupUseCaseContract.Response, string>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ActionResult.success({ items: tradeSumBySetup })), 3000);
    });
  }
}

const generateItems = (num = 7): TradeSumBySetupItem[] => {
  return Array.from(Array(num).keys()).map((i) => ({
    position: (i + 1),
    setupNome: 'Setup ' + (i + 1) ,
    items: [
      {
        name: 'gain',
        value: 10 + i,
      },
      {
        name: 'loss',
        value: 10 + i,
      },
      {
        name: '0x0',
        value: 10 + i,
      },
    ],
  }));
}
const tradeSumBySetup = generateItems();
