# mpegts Player

Плеер, работающий на технологии __Websocket+MSE__. Воспроизводит __LIVE__ поток __mpegts__ видео.
Плеер создан на основании стороннего открытого продукта https://github.com/xqq/mpegts.js

## Local launch 

Клонируем репозиотрий
```
git clone git@gitlab.video.htz.atmo.video:video/cdn/research-and-development-group/player-ws-mpegts.git
```

Устанавливаем необходимые npm пакеты
```
npm install
```

Запускаем проект локально на порту :8083
```
npm run dev
```

## Build
```
npm run build
```

## WebSocket

На данном этапе url __Websocket__ записывается напрямую в файле __index.js__
При необходимости перед сборкой поменять
```
url: 'ws://[path]'
```