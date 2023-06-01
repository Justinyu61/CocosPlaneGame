const { ccclass, property } = cc._decorator;

const MAX_X = 50;
const MIN_X = -50;
const MAX_Y = 150;
const MIN_Y = -10;

@ccclass
export default class AirplaneOneController extends cc.Component {
  @property({ displayName: "播放速度" })
  time: number = 0;
  @property({ displayName: "圖片", type: [cc.SpriteFrame] })
  spriteFrames: cc.SpriteFrame[] = [];
  @property({ displayName: "飛行速度"})
  flySpeed: number = 0;
  @property({ displayName: "初始位置"})
  initialPosition: cc.Vec3 = cc.Vec3.ZERO;

  private isMovingUP: boolean = false;
  private isMovingDown: boolean = false;
  private isMovingRight: boolean = false;
  private isMovingLeft: boolean = false;

  start() {
    this.node.position = this.initialPosition;
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

  handleKeyCode(event: cc.Event.EventKeyboard, isTap: boolean){
    switch (event.keyCode) {
      case cc.macro.KEY.w:
      case cc.macro.KEY.up:
        this.isMovingUP = isTap;
        break;
      case cc.macro.KEY.s:
      case cc.macro.KEY.down:
        this.isMovingDown = isTap;
        break;
      case cc.macro.KEY.d:
      case cc.macro.KEY.right:
        this.isMovingRight = isTap;
        break;
      case cc.macro.KEY.a:
      case cc.macro.KEY.left:
        this.isMovingLeft = isTap;
        break;
    }
  }

  onKeyDown(event: cc.Event.EventKeyboard){
    this.handleKeyCode(event, true)
  }

  onKeyUp(event: cc.Event.EventKeyboard){
    this.handleKeyCode(event, false)
  }

  update(dt: number) {
    if (this.isMovingUP) {
      if (this.node.y < MAX_Y) {
        this.node.y += this.flySpeed * dt;
      }
    }
    if (this.isMovingDown) {
      if (this.node.y > MIN_Y) {
        this.node.y -= this.flySpeed * dt;
      }
    }
    if (this.isMovingRight) {
      if (this.node.y < MAX_X) {
        this.node.x += this.flySpeed * dt;
      }
    }
    if (this.isMovingLeft) {
      if (this.node.y > MIN_X) {
        this.node.x -= this.flySpeed * dt;
      }
    }
  }

  onLoad(){
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }

  onDestroy(){
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }
}
