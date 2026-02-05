import { createComparison, defaultRules } from "../lib/compare.js";

// #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  //— заполнить выпадающие списки опциями
  Object.keys(indexes) // Получаем ключи из объекта
    .forEach((elementName) => {
      // Перебираем по именам
      elements[elementName].append(
        // в каждый элемент добавляем опции
        ...Object.values(indexes[elementName]) // формируем массив имён, значений опций
          .map((name) => {
            // используйте name как значение и текстовое содержимое
            //  создать и вернуть тег опции
            const option = document.createElement("option");

            option.setAttribute("value", name);
            option.textContent = name;

            return option;
          }),
      );
    });

  return (data, state, action) => {
    // — обработать очистку поля
    const ceDate = document.querySelector('input[name="date"]');
    const ceCustomer = document.querySelector('input[name="customer"]');

    if (action)
      switch (action.name) {
        case "clear":
          if (action.getAttribute("data-field") == "date") {
            ceDate.value = "";
          } else {
            ceCustomer.value = "";
          }

          break;
      }

    //  — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}
