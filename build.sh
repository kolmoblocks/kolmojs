go run build_tour.go
mkdir -p build
cp src/kolmo.js build/kolmo.js
cp src/kolmo.css build/kolmo.css
npm run-script  build
cp figures/* build
