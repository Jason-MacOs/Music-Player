class CommonService{
    static getPromise(method, url, params = null) {
        var p = new Promise(function(resolve, reject){
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.send(params);
            xhr.onreadystatechange = function(res) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    }else {
                        reject();
                    }
                }
            }
        });

        return p;
    }
}

var HOST = 'http://localhost:3000',
    URLLIST = {
        getLogin(formData) {
            return HOST + '/login/cellphone' + '?phone=' + formData.get('phone') + '&password=' + formData.get('password');
        },
    };

var Global = {
    USERINFO: null
}

var bodyDoc = document.body;
bodyDoc.addEventListener('click', () => {
    Event.trigger('bodyClick');
});