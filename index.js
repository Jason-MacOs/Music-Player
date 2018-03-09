class MusicPlayer {
    constructor(autoPlay) {
         // 测试用默认音乐id
        this.id = 33894312;
        this.imageAddress = {
            'play': 'images/play.png',
            'stop': 'images/stop.png',
        };
        this.isPlay = autoPlay || false;
        this.musicInfo = null;

        this.playImgDoc = document.getElementById('play-stop');
        this.audioPlayserDoc = document.getElementById('audio-player');
    } 

    playOrStop() {
        // 点击播放按钮按钮
        var _setSrc = ((this.playImgDoc.getAttribute("src") === this.imageAddress.play) ? this.imageAddress.stop : this.imageAddress.play);
        this.playImgDoc.setAttribute('src', _setSrc);
        this.isPlay = !this.isPlay;

        // 广播:状态切换
        Event.trigger('changeStatus');
    }

    changeStatus() {
       this.isPlay === true ? this.audioPlayserDoc.play() : this.audioPlayserDoc.pause(); 
    }

    nextMusic(id = this.id) {
        var musicPromise = getMusic(id),
        self = this;
        musicPromise.then(function(res) {
           
            console.log(res)
            if (res.code === 200) {
                self.musicInfo = res.data.shift();

                // 广播：歌曲切换
                Event.trigger('changeMusic');
            }
        }).catch(function(e) {
            throw e;
        });
    }

    switchAudioSrc() {
        this.audioPlayserDoc.setAttribute('src', this.musicInfo.url);
    }

    bind() {
        var self = this;

        this.playImgDoc.addEventListener('click', function(){
            self.playOrStop();
        });
    }

    init() {
        this.playImgDoc.setAttribute('src', this.isPlay ? this.imageAddress.stop : this.imageAddress.play);
       
        // 订阅事件
        Event.bindObj = this;
        Event.listen('changeStatus', this.changeStatus);
        Event.listen('changeMusic', this.switchAudioSrc);    

        this.bind();
        this.nextMusic()
    }
}


function getMusic(id) {
    var musicPromise = new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/music/url?id=' + id, true);
        xhr.send();
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

    return musicPromise;
}

var musicPlayer = new MusicPlayer(true);
musicPlayer.init();