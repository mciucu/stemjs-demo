#!/bin/bash

npm update
sudo npm install -g rollup

cd src
rollup -c
