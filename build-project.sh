#!/bin/sh

echo "installing rustup"
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"

echo "installing wasm-pack"
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -y

echo "compiling rust to wasm"
bun run build:wasm

echo "build nextjs"
bun run build
