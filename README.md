# hybrid-base

> VueJs with Webpack in Cordova project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```

# build android project
1.  npm install -g cordova
2.  cordova platform add android
3.  cordova build android
4.  find apk in /platforms/android/app/build/outputs/apk/debug

# open in android studio
0.  make changes to src
1.  npm run build
2.  cordova build android
3.  open platforms/android/app in android studio and run, debug, or create apk


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
