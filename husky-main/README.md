# husky

1. Добавив не використану змінну, щоб спрацювало правило "no-unused-vars" в файлі main.js

2. Змінив налаштування в файлі package.json, щоб не перевіряло всі файли а тільки з заданими розширеннями
бо до цього перевіряло і html файли також, які були в папці src/.

*До*
```json
    "lint-staged": {
    "./src/**/*": [
      "eslint --ext .ts,.js,.jsx --fix",
      "prettier --write --ignore-unknown"
    ]
  },
```
*Після*
```json
    "lint-staged": {
        "./src/*.(ts|js|jsx)": [
          "eslint . --fix",
          "prettier --write --ignore-unknown"
        ]
      },
```
3. Якщо потрібно проігнорувати два правила в рядку приклад на 7 рядку коментар in main.js
