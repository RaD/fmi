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

## Полезное

Найти, кто держит порт:

    sudo lsof -iTCP -sTCP:LISTEN -n -P | grep 4200

Этот проект сгенерирован с помощью [Angular CLI](https://github.com/angular/angular-cli)
версии 17.0.6 и обновлён до 19-й.

## Сервер разработки

Выполните `ng serve` для запуска сервера разработки. Перейдите по ссылке
`http://localhost:4200/`. Приложение будет автоматически перезагружаться
при внесении любых изменений в исходники.

## Создание структуры кода

Выполните `ng generate component component-name` для создания нового компонента.
Вы можете также использовать `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Сборка

Выполните `ng build` для сборки проекта. Результат сборки будет помещён
в каталог `dist/`.