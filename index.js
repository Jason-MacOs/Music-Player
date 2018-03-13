class MusicPlayer extends CommonService{
    constructor(autoPlay) {
        super();

         // 测试用默认音乐id
        this.id = '33894312';
        this.url = {
            'getMusic': 'http://localhost:3000/music/url?id=' + this.id,
        };
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

    getMusic(url) {
        return CommonService.getPromise('GET', url);
    }

    nextMusic(url = this.url.getMusic) {
        var musicPromise = this.getMusic(url),
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

var musicPlayer = new MusicPlayer(true);
musicPlayer.init();