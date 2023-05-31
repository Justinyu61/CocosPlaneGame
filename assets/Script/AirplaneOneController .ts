const { ccclass, property } = cc._decorator;

@ccclass
export default class AirplaneOneController extends cc.Component {
  @property({ displayName: "播放速度" })
  time: number = 0;
  @property({ displayName: "圖片", type: [cc.SpriteFrame] })
  spriteFrames: cc.SpriteFrame[] = [];
  @property({ displayName: "飛行速度"})
  flySpeed: number = 100;

  private isMovingUP: boolean = false;
  private isMovingDown: boolean = false;
  private isMovingRight: boolean = false;
  private isMovingLeft: boolean = false;

  start() {
    const frames: cc.SpriteFrame[] = [];
    
    for (let i = 0; i < this.spriteFrames.length; i++) {
      const spriteFrame = this.spriteFrames[i];
        frames.push(spriteFrame);
    }

    if (frames.length > 0) {
      const animation = this.node.getComponent(cc.Animation);
      
      const clip = cc.AnimationClip.createWithSpriteFrames(frames, this.time)
      clip.wrapMode = cc.WrapMode.Loop;
      animation.addClip(clip, 'airplaneOneClip');
      animation.play('airplaneOneClip');
    }
  }

  onKeyDown(event: cc.Event.EventKeyboard){
    console.warn(event.keyCode);
    
    switch (event.keyCode) {
      case cc.macro.KEY.w:
        this.isMovingUP = true;
        console.warn(this.isMovingUP);
        break;
      case cc.macro.KEY.s:
        this.isMovingDown = true;
        console.warn(this.isMovingDown);
        break;
      case cc.macro.KEY.d:
        this.isMovingRight = true;
        console.warn(this.isMovingRight);
        break;
      case cc.macro.KEY.a:
        this.isMovingLeft = true;
        console.warn(this.isMovingLeft);
        break;
    }
  }

  onKeyUp(event: cc.Event.EventKeyboard){
    switch (event.keyCode) {
      case cc.macro.KEY.w:
        this.isMovingUP = false;
        console.warn(this.isMovingUP);
        break;
      case cc.macro.KEY.s:
        this.isMovingDown = false;
        console.warn(this.isMovingDown);
        break;
      case cc.macro.KEY.d:
        this.isMovingRight = false;
        console.warn(this.isMovingRight);
        break;
      case cc.macro.KEY.a:
        this.isMovingLeft = false;
        console.warn(this.isMovingLeft);
        break;
    }
  }

  update(dt: number) {
    if (this.isMovingUP) {
      this.node.y += this.flySpeed * dt;
    }
    if (this.isMovingDown) {
      this.node.y -= this.flySpeed * dt;
      
    }
    if (this.isMovingRight) {
      this.node.x += this.flySpeed * dt;
    }
    if (this.isMovingLeft) {
      this.node.x -= this.flySpeed * dt;
    }
  }

  onLoad(){
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent
  }

  // onDestroy(){
  //   cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
  //   cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  // }
}
