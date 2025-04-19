Область хранения данных:

- база данных на json-server
- BFF
- редакс стор

Сущности приложения:

- пользователь: БД (список пользователей), BFF(сессия текущего), стор(отображение в
  браузере)
- роль пользователя: БД (список ролей), BFF(сессия пользователя с ролью), стор (
  использование на клиенте)
- кроссовки: БД (список кроссовки), стор (отображение в браузере)
- отзывы: БД (список отзывов), стор (отображение в браузере)

Таблицы БД:

- пользователи - users: id / login / password / registed_at / role_id
- роли - roles: id / name
- кроссовки - products: id / name / image_url / content / published_at
- комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):

- user: id / login / roleId
- products: массив product: id / name / price / category / gender / imageUrl / amount / brand
  reviewCount
- product: id / name / price / category / gender / imageUrl / amount / reviews: массив
  review: id / author / content / publishedAt
- users: массив user: id / login / registeredAt / role
