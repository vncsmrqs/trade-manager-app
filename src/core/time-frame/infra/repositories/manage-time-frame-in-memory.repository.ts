import { ListTimeFrameRepositoryContract } from "@/core/time-frame/data/contracts/list-time-frame.repository";
import { TimeFrameEntity } from "@/core/time-frame/domain/entities/time-frame.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { v4 as uuid } from "uuid";
import { chunkArray } from "@/common/utils";

const timeFrameList: Record<any, any>[] = generateTimeFrames();

function generateTimeFrames(num = 501): Record<string, any>[] {
  return Array.from(Array(num).keys()).map((i) => ({
    id: uuid(),
    nome: 'TimeFrame ' + (i + 1),
    ativo: true,
    createdAt: '2022-01-01T00:00:00-03',
    updatedAt: '2022-01-01T00:00:00-03',
    userId: '',
  }));
}

export class ManageTimeFrameInMemoryRepository implements
  ListTimeFrameRepositoryContract
{
  list(
    params: ListTimeFrameRepositoryContract.Params
  ): Promise<ActionResult<ListTimeFrameRepositoryContract.Response, any>> {
    return new Promise((resolve) => {
      const itemsPerPage = params.itemsPerPage || timeFrameList.length;
      const items = chunkArray<TimeFrameEntity>(mapTimeFrameListToEntity(timeFrameList), itemsPerPage);
      const page = params.page || 1;
      setTimeout(() => {
        resolve(ActionResult.success({
          items: items[page-1],
          page,
          pageCount: Math.ceil(timeFrameList.length / (itemsPerPage || 1)),
        }));
      }, 3000);
    });
  }
}

const mapTimeFrameToEntity = (timeFrame: Record<string, any>): TimeFrameEntity => {
  return new TimeFrameEntity({
    id: timeFrame.id || uuid(),
    nome: timeFrame.nome,
    createdAt: timeFrame.createdAt,
    updatedAt: timeFrame.updatedAt,
    ativo: timeFrame.ativo,
    userId: timeFrame.userId,
  });
}

const mapTimeFrameListToEntity = (timeFrameList: Record<string, any>[]): TimeFrameEntity[] => {
  return timeFrameList.map(mapTimeFrameToEntity);
}
