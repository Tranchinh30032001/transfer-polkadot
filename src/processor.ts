import {lookupArchive} from '@subsquid/archive-registry'
import {
    BatchContext,
    BatchProcessorCallItem,
    BatchProcessorEventItem,
    BatchProcessorItem,
    SubstrateBatchProcessor,
} from '@subsquid/substrate-processor'

export const processor = new SubstrateBatchProcessor()
.setTypesBundle("polkadot")
  .setDataSource({
    archive: "https://polkadot.archive.subsquid.io/graphql",
    chain: "wss://rpc.polkadot.io",
  })
  .setBlockRange({from: 18045389})
    .addEvent('Balances.Transfer', {
        data: {
            event: {
                args: true,
                extrinsic: {
                    hash: true,
                    fee: true,
                },
            },
        },
    } as const)

export type Item = BatchProcessorItem<typeof processor>
export type EventItem = BatchProcessorEventItem<typeof processor>
export type CallItem = BatchProcessorCallItem<typeof processor>
export type ProcessorContext<Store> = BatchContext<Store, Item>
