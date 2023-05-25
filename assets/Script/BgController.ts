const {ccclass, property} = cc._decorator;

@ccclass
export default class BgController extends cc.Component {
    @property({displayName: '播放速度'})
    speed: number = 0;
    @property({displayName: '播放方向 0橫1豎'})
    orient: number = 0;
    @property({displayName: '背景圖', type: cc.Node})
    bgArr: cc.Node[] = [];

    curBg: cc.Node = null;//當前播的背景
    nextBg: cc.Node = null;//即將播的背景
    curIndex: number = 0;//當前背景的索引
    xy: string = 'x'; // x || y
    wh: string = 'w' //寬高
    isPlay: boolean = true;//iPlay?

    start () {
        if (this.bgArr.length == 0) {
            this.isPlay = false
            return;
        }

        console.warn(this.bgArr.length);
        
        //如果只有一張圖,則克隆一個
        if(this.bgArr.length == 1){
            this.bgArr[1] = cc.instantiate(this.bgArr[0]);
            this.bgArr[0].parent.addChild(this.bgArr[1]);
        }

        this.xy = this.orient == 0 ? 'x' :'y';
        this.wh = this.orient == 0 ? 'width' : 'height';

        this.curBg = this.bgArr[this.curIndex];
        this.nextBg = this.bgArr[this.curIndex + 1];

        this.setBgPosition();
    }

    setBgPosition() {
        this.bgArr[this.curIndex][this.xy] = 0;
        this.bgArr[this.curIndex + 1][this.xy] = + (this.curBg[this.wh] / 2 + this.nextBg[this.wh] / 2);
    }

    update(dt) {
        this.bgMove();
    }
    /**
     * @param bgList
     * @param speed
     */
    bgMove() {
        if (this.isPlay) {
            this.curBg[this.xy] -= this.speed;
            this.nextBg[this.xy] -= this.speed;
            
            // if (this.curBg[this.xy] >= this.curBg[this.wh]) {
            //     this.curBg = this.nextBg;
            //     this.nextBg = this.bgArr[this.curIndex ++ % this.bgArr.length];
            //     this.nextBg[this.xy] = this.curBg[this.xy] - this.curBg[this.wh] / 2 - this.nextBg[this.wh] / 2;
                // console.warn(this.wh);
            // }
        }
    }
}
