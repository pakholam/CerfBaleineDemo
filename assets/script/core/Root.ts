import { _decorator, Component, director, Game, game, JsonAsset, Node, screen, sys } from "cc";
import { BuildTimeConstants } from "../module/config/BuildTimeConstants";
import { GameConfig } from "../module/config/GameConfig";
import { GameQueryConfig } from "../module/config/GameQueryConfig";
import { AudioMgr } from "./common/audio/AudioMgr";
import { EventMessage } from "./common/event/EventMessage";
import { message } from "./common/event/MessageMgr";
import { resLoader } from "./common/loader/ResLoader";
import { Logger } from "./common/log/Logger";
import { RandomMgr } from "./common/random/RandomMgr";
import { storage } from "./common/storage/StorageMgr";
import { StorageSecuritySimple } from "./common/storage/StorageSecuritySimple";
import { StorageSecurityCrypto } from "./common/storage/StorageSecurityCrypto";
import { TimerMgr } from "./common/timer/TimerMgr";
import { GameManager } from "./game/GameManager";
import { LayerManager } from "./gui/layer/LayerManager";
import { LanguageManager } from "../libs/gui/language/Language";

const { property } = _decorator;

let isInited = false;
/** 框架版本号 */
let version: string = "1.0.0";

/** 框架显示层根节点 */
export class Root extends Component {
  /** 游戏层节点 */
  @property({
    type: Node,
    tooltip: "游戏层",
  })
  game: Node = null!; // 可使用多摄像机自定义二维或三维游戏场景

  /** 界面层节点 */
  @property({
    type: Node,
    tooltip: "界面层",
  })
  gui: Node = null!;

  /** 框架常驻节点 */
  private persist: Node = null!;

  onLoad() {
    if (!isInited) {
      isInited = true; // 注：这里是规避cc3.8在编辑器模式下运行时，关闭游戏会两次初始化报错

      console.log(`Ikun Framework v${version}`);
      this.enabled = false;
      this.iniStart();
      this.loadConfig().then();
    }
  }

  private async loadConfig() {
    // 创建持久根节点
    this.persist = new Node("IkunFrameworkPersistNode");
    director.addPersistRootNode(this.persist);

    const config_name = "config";
    const config = await resLoader.loadAsync(config_name, JsonAsset);
    if (config) {
      window.ikun = {
        log: Logger.instance,
        config: {
          btc: null,
          game: null,
          query: null
        },
        storage: storage,
        res: resLoader,
        message: message,
        random: RandomMgr.instance,
        timer: this.persist.addComponent(TimerMgr)!,
        audio: this.persist.addComponent(AudioMgr),
        gui: null,
        game: null,
        i18n: new LanguageManager(),
        
        /** ----------可选模块---------- */
        
        /** HTTP */
        // static http: HttpRequest = new HttpRequest();           // 使用流程文档可参考、简化与服务器对接、使用新版API体验，可进入下面地址获取新版本，替换network目录中的内容(https://store.cocos.com/app/detail/5877)
        /** WebSocket */
        // static tcp: NetManager = new NetManager();              // 使用流程文档可参考、简化与服务器对接、使用新版API体验，可进入下面地址获取新版本，替换network目录中的内容(https://store.cocos.com/app/detail/5877)
        /** ECS */
        // static ecs: ECSRootSystem = new ecs.RootSystem();
        /** MVVM */
        // static mvvm = VM;
        /** 对象池 */
        // static pool = EffectSingleCase.instance;
        };
        
      ikun.config.btc = new BuildTimeConstants(),
      ikun.config.game = new GameConfig(config),
      ikun.config.query = new GameQueryConfig(),
      // 设置默认资源包
      ikun.res.defaultBundleName = ikun.config.game.bundleDefault;
      ikun.res.init(ikun.config.game.data.bundle);

      // ikun.storage.init(new StorageSecuritySimple);
      ikun.storage.init(new StorageSecurityCrypto());

      ikun.audio.load();

      ikun.game = new GameManager(this.game),
      ikun.gui = new LayerManager(),
      // 游戏界面管理
      ikun.gui.mobileSafeArea = ikun.config.game.mobileSafeArea;
      ikun.gui.initLayer(this.gui, config.json.gui);
      // // 网络模块
      // ikun.http.server = ikun.config.game.httpServer;                                      // Http 服务器地址
      // ikun.http.timeout = ikun.config.game.httpTimeout;                                    // Http 请求超时时间

      game.frameRate = ikun.config.game.frameRate; // 初始化每秒传输帧数

      this.enabled = true;
      this.init();
      this.run();

      ikun.res.release(config_name);
    } else {
      this.loadConfig().then();
    }
  }

  update(dt: number) {
    // ikun.ecs.execute(dt);
  }

  /** 初始化开始 */
  protected iniStart() {}

  /** 初始化游戏界面 */
  protected initGui() {}

  /** 初始化游戏业务模块 */
  protected initEcsSystem() {}

  /** 加载完引擎配置文件后执行 */
  protected run() {}

  private init() {
    this.initGui();
    this.initEcsSystem();
    // ikun.ecs.init();

    // 游戏显示事件
    game.on(Game.EVENT_SHOW, this.onShow, this);
    // 游戏隐藏事件
    game.on(Game.EVENT_HIDE, this.onHide, this);

    // 游戏尺寸修改事件
    if (!sys.isMobile) {
      screen.on(
        "window-resize",
        () => {
          ikun.message.dispatchEvent(EventMessage.GAME_RESIZE);
        },
        this
      );

      screen.on(
        "fullscreen-change",
        () => {
          ikun.message.dispatchEvent(EventMessage.GAME_FULL_SCREEN);
        },
        this
      );
    }

    screen.on(
      "orientation-change",
      () => {
        ikun.message.dispatchEvent(EventMessage.GAME_ORIENTATION);
      },
      this
    );
  }

  private onShow() {
    ikun.timer.load(); // 处理回到游戏时减去逝去时间
    ikun.audio.resumeAll(); // 恢复所有暂停的音乐播放
    director.resume(); // 恢复暂停场景的游戏逻辑，如果当前场景没有暂停将没任何事情发生
    game.resume(); // 恢复游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效
    ikun.message.dispatchEvent(EventMessage.GAME_SHOW);
  }

  private onHide() {
    ikun.timer.save(); // 处理切到后台后记录切出时间
    ikun.audio.pauseAll(); // 暂停所有音乐播放
    director.pause(); // 暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应。 如果想要更彻底得暂停游戏，包含渲染，音频和事件
    game.pause(); // 暂停游戏主循环。包含：游戏逻辑、渲染、输入事件派发（Web 和小游戏平台除外）
    ikun.message.dispatchEvent(EventMessage.GAME_HIDE);
  }
}
