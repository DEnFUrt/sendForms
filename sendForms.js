const message = {
    loading: 'Загрузка...',
    success: 'Сообщение отправлено!',
    failure: 'Ошибка отправки, отправьте сообщение через несколько минут.',
}

const postData = (objFormData) => {
    return new Promise( (resolve, reject) => {
        let request = new XMLHttpRequest();
        
        request.open('POST', 'https://my-json-server.typicode.com/DEnFUrt/json-repo/posts');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        request.upload.onprogress = () => {
            resolve();
        };
        
        request.onload = () => {
            if (request.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                reject(new Error(`Ошибка ${request.status}: ${request.statusText}`));
            } else { 
                resolve();
            }
        };
          
        request.onerror = () => { // происходит, только когда запрос совсем не получилось выполнить
            reject(new Error(message.failure));
        };

        request.send(JSON.stringify(objFormData));
    });
};

export function sendForms(idForm) {   
    let alertMessage = this.querySelector('div.status');
    
    if (!alertMessage) {
        alertMessage = document.createElement('div');
        alertMessage.classList.add('status');
        this.append(alertMessage);
    } else {
        alertMessage.textContent = '';
    }  
    
    let formData = new FormData(this);

    formData.append('theme', idForm);
    
    let objFormData = {};
    formData.forEach( (item, key) => {
        objFormData[key] = item;
    });
    
    postData(objFormData)
        .then( () => alertMessage.textContent = message.loading)
        .then( () => {
            alertMessage.textContent = message.success;
            this.reset();
        })
        .catch(error => alertMessage.textContent = error.message);


    //вариант с событиями readystatechange
    /* request.addEventListener('readystatechange', () => {
        switch (true) {
            case request.readyState < 4 :
                resolve();
                break;
            case request.readyState === 4 :
                resolve();
                //console.log(request.response);
            default:
                alertMessage.textContent = message.failure;
                reject(new Error(`Ошибка ${request.status}: ${request.statusText}`));
                //console.log(request.response);
                break;
        }
    }); */
};
