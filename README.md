# FoodMo Interface

## Настройка окружения

### NodeJS

Устанавливаем утилиту для скачивания:

    sudo apt install curl

Скачиваем инсталлятор Node Version Manager и запускаем:

    curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

Выбираем нужную версию NodeJS:

    nvm list-remote

Устанавливаем нужную версию NodeJS:

    nvm install v22.12.0

### Angular

Устанавливаем СLI:

    npm install -g @angular/cli

### Приложение

Переходим в каталог репозитория.

Скопируйте каталог `.vscode_template` в `.vscode` и внесите правки,
соответствующие вашему окружению.

Устанавливаем зависимости:

    npm install