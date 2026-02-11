# Архитектура проекта AKMO

## Структура (FSD-подобная)

```
src/
├── app/          # Инициализация приложения (App, роутинг при появлении)
├── pages/        # Страницы — собирают виджеты
├── widgets/      # Крупные блоки UI (Header, Hero, Products, About, FeedbackSection, Footer, DocumentsSection)
├── features/     # Фичи с логикой (feedback: форма + валидация + submit)
├── shared/       # Переиспользуемое: ui, hooks, data
│   ├── ui/       # Компоненты (Button, Input, Card, ProductImage, ProductModal, TableModal)
│   ├── hooks/    # useScrollTo
│   └── data/     # products.js, xlsxData.js + xlsxData.json
├── index.css     # Глобальные стили, переменные темы
└── main.jsx      # Точка входа
```

## Зависимости слоёв (всё ок)

- **pages** → только widgets (Home импортирует виджеты).
- **widgets** → shared (ui, hooks, data), features (FeedbackSection → FeedbackForm).
- **features** → только shared (ui). Не импортируют widgets или pages.
- **shared** → не импортирует widgets, features, pages.

Циклических зависимостей нет.

## Алиасы и импорты

- В `vite.config.js` задан алиас `@/` → `src/`.
- Импорты вида `@/shared/ui/...`, `@/widgets/...`, `@/features/...` — корректны.

## Данные

- **Продукция:** `shared/data/products.js` — используется в `widgets/Products`.
- **Таблицы (документы):** `shared/data/xlsxData.js` (читает `xlsxData.json`) — в `widgets/DocumentsSection`.
- **Скрипт обновления:** `scripts/read-xlsx.js` → генерирует `src/shared/data/xlsxData.json` (команда `npm run update-xlsx`).

## Публичные ресурсы

- **Картинки:** `public/products/` — используются в Products и About (пути вида `/products/...`).
- **Папка `public/about/`** — пустая (только `.gitkeep`). Можно удалить или оставить под будущие фото «О компании».

## Доступность

- В `pages/Home.jsx` есть ссылка «Перейти к содержимому» с классом `skipLink`.
- Стили для `.skipLink` и `.skipLink:focus` заданы в `index.css`.

## Итог

Архитектура выстроена правильно: чёткое разделение на слои, зависимости идут сверху вниз (pages → widgets → features/shared), shared не зависит от фич и виджетов. Замечаний по структуре нет.
