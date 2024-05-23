#!/bin/bash
git pull
npm install
npm run build
rm -rf ./build
cp -r ./dist ./build
systemctl restart RonanPlugins-FRONTEND.service