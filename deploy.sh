#!/bin/bash

rm -rf dist
mkdir -p dist

(
    cd wasm_go && GOOS=js GOARCH=wasm go build -o ../dist/wasm_go.wasm
)

(
    cd wasm_rust && cargo build --target wasm32-unknown-unknown --release
)



cp -R web/* dist/
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" dist/

cp wasm_rust/target/wasm32-unknown-unknown/release/wasm_rust.wasm dist/
wasm-gc dist/wasm_rust.wasm


http-server dist --cors -c-1 --log-ip -p 0

