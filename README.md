# Сайт деревообрабатывающего производства

Одностраничный лендинг на React (Vite): продукция, информация о компании, форма обратной связи. Стилистика «дерево», лаконичная цветовая гамма, анимации (Framer Motion).

## Запуск

```bash
npm install
npm run dev
```

Сборка: `npm run build`. Превью сборки: `npm run preview`.

## Структура

- `src/app` — корневой App
- `src/pages` — страница Home
- `src/widgets` — блоки: Header, Hero, Products, About, FeedbackSection, Footer
- `src/features/feedback` — форма обратной связи (валидация zod, отправка-заглушка)
- `src/shared` — UI (Button, Input, Card, ProductImage), хуки, данные
- `src/shared/data/products.js` — массив продукции (при необходимости заменить на запрос к API)

## Куда загружать фотографии продукции

**Папка:** `public/products/`

Положите в неё файлы с такими именами (или измените пути в `src/shared/data/products.js`):

| Продукт                    | Имя файла      |
|---------------------------|----------------|
| Жалюзийные дверки         | `blinds.jpg`   |
| Мебельный щит             | `panel.jpg`    |
| Сращенная дверная коробка | `door-frame.jpg` |
| Сращенный наличник        | `trim.jpg`     |
| Сращенный брусок          | `bar.jpg`      |

Если файла нет, в карточке показывается плейсхолдер «Фото продукции». Вместо локальных файлов можно использовать внешние URL в `src/shared/data/products.js` (поле `image`).

## Обратная связь

Форма отправки — заглушка (`src/features/feedback/submitFeedback.js`). Для реальной отправки замените вызов на запрос к вашему API.
# akmo-site
