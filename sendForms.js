const message = {
    loading: 'Загрузка...',
    success: 'Сообщение отправлено!',
    failure: 'Ошибка отправки, отправьте сообщение через несколько минут.',
}

export function sendForms(idForm) {   
    let alertMessage = this.querySelector('div.status');
    if (!alertMessage) {
        alertMessage = document.createElement('div');
        alertMessage.classList.add('status');
        this.append(alertMessage);
    } else {
        alertMessage.textContent = '';
    }   
        
    let request = new XMLHttpRequest();

    request.open('POST', 'https://my-json-server.typicode.com/DEnFUrt/json-repo/posts');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    let formData = new FormData(this);

    formData.append('theme', idForm);
    let obj = {};
    formData.forEach( (item, key) => {
        obj[key] = item;
    });

    request.send(JSON.stringify(obj));
    
    request.upload.onprogress = () => {
        alertMessage.textContent = message.loading;
    };
    
    request.onload = () => {
        if (request.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
            alertMessage.textContent = `Ошибка ${request.status}: ${request.statusText}`; // Например, 404: Not Found
        } else { 
            alertMessage.textContent = message.success;
            //console.log(request.response);
            this.reset();
        }
    };
      
    request.onerror = () => { // происходит, только когда запрос совсем не получилось выполнить
        alertMessage.textContent = message.failure;
    };
    
    //вариант с событиями readystatechange
    /* request.addEventListener('readystatechange', () => {
        switch (true) {
            case request.readyState < 4 :
                alertMessage.textContent = message.loading;
                break;
            case request.readyState === 4 :
                alertMessage.textContent = message.success;
                //console.log(request.response);
                this.reset();
                break;
            default:
                alertMessage.textContent = message.failure;
                //console.log(request.response);
                break;
        }
    }); */
};

