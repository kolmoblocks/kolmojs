go run build_tour.go
rm -rf build
mkdir build
cp src/kolmo.js build/kolmo.js
npm run-script  build
