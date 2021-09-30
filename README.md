# mpegts Player

## Запуск проекта локально

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

## Сборка
```
npm run build
```

## WebSocket

На данном этапе url __Websocket__ записывается напрямую в файле __index.js__
При необходимости перед сборкой поменять
```
url: 'ws://[path]'
```