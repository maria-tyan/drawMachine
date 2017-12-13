# DrawMachine

* Данная рисовалка выполнена в рамках лабораторной работы *

## Возможности рисовалки:

Ниже перечислены все возможные активности рисовалки. Для каждой из них реализован метод отправки ланных на сервер через emit библиотеки Socket.IO. 
Однако, для pen и erraser таких методов нет, так как их работа основана на активности типа line, а дальнейшая обработка подобных событий ведется на клиентской сторне.

** action = 'rectangle' ** - позволяет рисовать прямоугольники 
** action = 'arrow' ** - позволяет рисовать стрелки, направленные от начального положения курсора к конечному
** action = 'circle' ** - позволяет рисовать круги
** action = 'line' ** - позволяет рисовать прямые линии
** action = 'pen' ** - позволяет рисовать произольные линии, кривая будет следовать за движением пользовательского манипулятора
** action = 'erraser' ** - позволяет стирать все, что было нарисованно, кривая будет следовать за движением пользовательского манипулятора
** action = 'text' ** - позволяет писать текст

Так же в рисовалке реализован выбор различных цветов для рисования и изменения тощины кисти.

***

## Список использванных технологий:

** ЯП: ** JavaScript
** Сборка проекта: ** Gulp
** Шаблонизатор: ** Pug
** Фреймворки: ** Node.js, JQuery

### Использованные библиотеки:
**jCanvas ** - jQuery-based library for the HTML5 Canvas API
** jsColor ** - JavaScript Color Picker (Palette) with touch support
** Socket.IO ** - enables real-time bidirectional event-based communication
