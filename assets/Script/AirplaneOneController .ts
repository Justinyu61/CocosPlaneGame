const { ccclass, property } = cc._decorator;

@ccclass
export default class AirplaneOneController extends cc.Component {
  @property({ displayName: "播放速度" })
  time: number = 0;
  @property({ displayName: "圖片", type: [cc.SpriteFrame] })
  spriteFrames: cc.SpriteFrame[] = [];

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
}
