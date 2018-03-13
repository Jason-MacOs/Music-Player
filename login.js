var common = CommonService,
    loginBtn = document.getElementById('login-btn'),
    loginModal = document.getElementById('login-modal'),
    loginForm = document.getElementById('login-form'),
    submit = document.querySelector('#login-modal button[name=submit]'),
    userImg = document.querySelector('#top-bar .m-info img');

// 点击登录按钮，显示模态框
loginBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    loginModal.style.display = 'block';
});

// 提交登录模态框
submit.addEventListener('click', () => {
    var formData = new FormData(loginForm),
        loginPromise = common.getPromise('GET', URLLIST.getLogin(formData), formData);
    loginPromise.then((res) => {
        if (res.code === 200) {
            console.log(res)
            Global.USERINFO = res;
            Event.trigger('login');
        }
    }).catch((e) => {
        throw e;
    });

});

loginModal.addEventListener('click', (event) => {
    event.stopPropagation();
});

// 登录状态机
// var FSM = {
//     login: {

//     },
//     logout: {

//     }
// }


/***************************** 订阅事件 ******************************/
// body 点击订阅
Event.listen('bodyClick', () => {
    loginModal.style.display = 'none';
});

// 登录订阅
Event.listen('login', () => {
    loginModal.style.display = 'none';
    loginBtn.style.display = 'none';
    userImg.setAttribute('src', Global.USERINFO.profile.avatarUrl);
});











