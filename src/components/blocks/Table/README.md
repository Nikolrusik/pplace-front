

### 1. [`Table`](src/components/blocks/Table/ui.tsx#L15-L239)
**Важно: таблица принимает обязательный параметр `uniqueTableName` - он отвечает за хранение состояния таблицы в памяти, если сильно меняется логика, необходимо СБРОСИТЬ КЭШ брауезера или ИЗМЕНИТЬ НАЗВАНИЯ таблиц**
Это один большой компонент объединяющий все компоненты, перечисленные ниже. 
Данный компонент построен таким образом, чтобы можно было с одинаковой реализцией бэкенда создавать быстро множество таблиц с разными данными и взаимодействующими между собой. 


#### Параметры:
- `className`: Класс CSS для кастомизации стилей.
- `uniqueTableName`: Уникальное имя таблицы для сохранения настроек пользователя.
- `endpoint`, `settings`, `updateSettings`: Параметры и методы для работы с API и управления настройками таблицы.
- `outsideFilters`: Внешние фильтры для загрузки данных.
- `selectedItems`, `setSelectedItems`: Состояния для управления выбранными элементами.
- `openedItem`, `setOpenedItem`: Состояния для управления открытым элементом.
- `defaultPageSize`, `controlPosition`, `controlType`, `hasControl`, `hasInfo`, `hasPaginator`, `hasSearch`: Параметры для управления отображением и поведением элементов управления таблицей.
- `allowMultiSelect`, `allowOneSelect`: Параметры для управления возможностью выбора элементов.


### 2. [`TableMain`](src/components/blocks/Table/blocks/TableMain/ui.tsx#L9-L55)
Объединяет в себе [`TableHead`](src/components/blocks/Table/widgets/TableHead/ui.tsx#L14-L62) и [`TableBody`](src/components/blocks/Table/widgets/TableBody/ui.tsx#L8-L92). Данный элемент является таблицей без доп.функционала


#### Параметры:
- `className`, `data`, `columns`: Для стилизации, данных и столбцов таблицы соответственно.
- `allowMultiSelect`, `allowOneSelect`: Управление возможностью выбора строк.
- `clickItem`, `onChangeCheckbox`: Функции обратного вызова для взаимодействия пользователя с таблицей.
- `openedItem`, `selectedItems`, `settings`: Состояния для управления открытым элементом, выбранными элементами и настройками.
- `setOrdering`, `currentOrdering`, `isLoading`: Для управления сортировкой и состоянием загрузки.


### 3. [`TableHead`](src/components/blocks/Table/widgets/TableHead/ui.tsx#L14-L62) и [`TableBody`](src/components/blocks/Table/widgets/TableBody/ui.tsx#L8-L92)

#### Параметры `TableHead`:
- `className`, `columns`, `settings`: Для стилизации, отображения столбцов и настроек.
- `setOrdering`, `currentOrdering`: Для управления сортировкой.
- `allowMultiSelect`: Управление возможностью множественного выбора.

#### Параметры `TableBody`:
- Аналогичные `TableHead`, плюс `data`, `clickItem`, `onChangeCheckbox`, `openedItem`, `selectedItems`, `isLoading`: Для данных, взаимодействия с элементами, состояния загрузки.

### 4. [`TableControlTop`](src/components/blocks/Table/blocks/TableControlTop/ui.tsx#L12-L79)

#### Параметры:
- `className`, `settings`, `updateSettings`: Для кастомизации стилей и управления настройками.
- `hasInfo`, `hasPaginator`, `hasLimit`, `hasSearch`: Для управления отображением элементов управления.
- `params`, `setParam`: Для управления параметрами запросов (например, пагинацией).
- `total`, `selectedItems`, `setSelectedItems`, `goSearch`: Для отображения информации о данных и управления поиском.
- `fixed`, `limits`: Для управления фиксацией элементов управления и доступными лимитами пагинации.

