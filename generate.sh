#!/bin/sh
cd src
yarn
cd ..
node src/fetch.js > mdbs.csv