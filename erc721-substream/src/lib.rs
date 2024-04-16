mod abi;
mod pb;
use hex_literal::hex;
use pb::contract::v1 as contract;
use substreams::Hex;
use substreams_ethereum::pb::eth::v2 as eth;
use substreams_ethereum::Event;

#[allow(unused_imports)]
use num_traits::cast::ToPrimitive;

substreams_ethereum::init!();

const ERC721_TRACKED_CONTRACT: [u8; 20] = hex!("bc4ca0eda7647a8ab7c2061c2e118a18a936f13d");

fn map_erc721_transfers(blk: &eth::Block, events: &mut contract::Transfers) {
    events.transfers.append(
        &mut blk
            .receipts()
            .flat_map(|view| {
                view.receipt
                    .logs
                    .iter()
                    .filter(|log| log.address == ERC721_TRACKED_CONTRACT)
                    .filter_map(|log| {
                        if let Some(event) = abi::erc721::events::Transfer::match_and_decode(log) {
                            return Some(contract::Transfer {
                                tx_hash: Hex(&view.transaction.hash).to_string(),
                                index: log.block_index,
                                block_time: Some(blk.timestamp().to_owned()),
                                block_number: blk.number,
                                from: event.from,
                                to: event.to,
                                token_id: event.token_id.to_string(),
                            });
                        }
                        None
                    })
            })
            .collect(),
    );
}

#[substreams::handlers::map]
fn map_transfers(blk: eth::Block) -> Result<contract::Transfers, substreams::errors::Error> {
    let mut events: contract::Transfers = contract::Transfers::default();
    map_erc721_transfers(&blk, &mut events);
    Ok(events)
}
