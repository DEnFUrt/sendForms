# sendForms
Sending a request using XMLHttpRequest

Модуль отправки формы обратной связи с использованием технологии
XMLHttpRequest и FormData.
Можно отправлять запросы с нескольких форм на странице.
Для этого необходимо передавать контекст исполнения при вызове функции 
`function sendForms()` 

Буду рад замечаниям и предложениям по доработке модуля.

## Installation

Для установки скопируйте файл в каталог с проектом, например "./static/js/"
Для подключения к проекту используйте динамический импорт, например:

```const submitForm = (nameForm, idForm) => { 
        import('../js/sendForms.js')
            .then(module => {
                sendForm = module.sendForms.call(nameForm, idForm);
            })
            .catch(err => {
                console.log(err.message);
            });
   };
```

## Usage

1. Для использвания модуля отправки формы обратной связи необходимо получить 
в переменные формы размещенные в вёрстке, например на странице используется 
две формы обратной связи:  
```js
    const firstForm = document.querySelector('.main-form'),
        secondForm = document.querySelector('#form');
    
```
2. Создать функцию для импорта модуля и вызова функции отправки формы.
Для примера:
```js
    const submitForm = (nameForm, idForm) => { 
        import('../js/sendForms.js')
            .then(module => {
                sendForm = module.sendForms.call(nameForm, idForm);
            })
            .catch(err => {
                console.log(err.message);
            });
    };
    //nameForm - форма данные из которой надо отправить
    //idForm - идентификатор формы текстовой или цифровой для логирования данных 
```
3. В строке
```js
    request.open('POST', 'URL'); //URL, куда отправляется запрос: строка или объект URL.
```
укажите свой адрес для отправки данных, например 'send.php'

4. Вызов функции
```js
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        submitForm(firstForm, 'callback form');
    });
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

v. 1.0.0

## License

MIT
