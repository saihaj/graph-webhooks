A parameterized ERC721 Substream allows us to pass in an address to be used to filter events for a particular contract.

Example to read transfers for [Webb Land collection](https://opensea.io/collection/worldwidewebbland)

```bash
substreams run -e mainnet.eth.streamingfast.io:443 -s 13707413 -t +100 ./erc-721-v0.1.0.spkg map_transfers -p map_transfers=0xA1D4657e0E6507D5a94d06DA93E94dC7C8c44b51
```
