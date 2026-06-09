@echo off
cd /d "%~dp0"

if not exist "templates\mainstream\_dev-images" (
  mklink /J "templates\mainstream\_dev-images" "%~dp0_dev-images"
)

cd templates\mainstream
npx live-server --host=0.0.0.0 --open=index.html --port=8080
