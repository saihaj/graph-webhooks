
.PHONY: build
build: protogen
	cargo build --target wasm32-unknown-unknown --release

.PHONY: run
run: build
	substreams run substreams.yaml $(if $(MODULE),$(MODULE),map_events) $(if $(START_BLOCK),-s $(START_BLOCK)) $(if $(STOP_BLOCK),-t $(STOP_BLOCK))

.PHONY: gui
gui: build
	substreams gui substreams.yaml $(if $(MODULE),$(MODULE),map_events) $(if $(START_BLOCK),-s $(START_BLOCK)) $(if $(STOP_BLOCK),-t $(STOP_BLOCK))

.PHONY: protogen
protogen:
	substreams protogen ./substreams.yaml --exclude-paths="sf/substreams,google"

.PHONY: pack
pack: build
	substreams pack substreams.yaml
