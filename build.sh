go run build_tour.go
rm -rf build
mkdir build
cp src/kolmo.js build/kolmo.js
cp src/kolmo.css build/kolmo.css
npm run-script  build
