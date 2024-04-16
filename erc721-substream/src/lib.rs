mod abi;
mod pb;
use anyhow::{anyhow, Error};
use pb::contract::v1 as contract;
use substreams::Hex;
use substreams_ethereum::pb::eth::v2 as eth;
use substreams_ethereum::Event;

#[allow(unused_imports)]
use num_traits::cast::ToPrimitive;

substreams_ethereum::init!();

fn is_address_valid(address: &String) -> bool {
    // An address is always 40 hexadecimal characters (or 2 more character with 0x prefix)
    if address.len() != 40 && address.len() != 42 {
        return false;
    }

    return true;
}

fn verify_parameter(address: &String) -> Result<(), Error> {
    if !is_address_valid(&address) {
        return Err(anyhow!("Contract address ({}) is not valid", address));
    }

    Ok(())
}

fn map_erc721_transfers(
    blk: &eth::Block,
    contract_address: Vec<u8>,
    events: &mut contract::Transfers,
) {
    events.transfers.append(
        &mut blk
            .receipts()
            .flat_map(|view| {
                view.receipt
                    .logs
                    .iter()
                    .filter(|log| log.address.to_vec() == contract_address)
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
fn map_transfers(
    contract_address: String,
    blk: eth::Block,
) -> Result<contract::Transfers, substreams::errors::Error> {
    verify_parameter(&contract_address)?;

    let decoded_contract_address = Hex::decode(&contract_address).expect("already validated");

    let mut events: contract::Transfers = contract::Transfers::default();
    map_erc721_transfers(&blk, decoded_contract_address, &mut events);
    Ok(events)
}
