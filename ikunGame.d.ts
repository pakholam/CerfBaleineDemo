declare namespace ikun {
  /** 游戏音乐管理 */
  export const audio: AudioMgr;
  /** 日志管理 */
  export const log: Logger;
  /** 游戏配置 */
  export const config: Config;
  /** 本地存储 */
  export const storage: StorageMgr;
  /** 资源管理 */
  export let res: ResLoader;
  /** 全局消息 */
  export const message: MessageMgr;
  /** 随机工具 */
  export const random: RandomMgr;
  /** 游戏时间管理 */
  export const timer: TimerMgr;
  /** 二维界面管理 */
  export let gui: LayerManager;
  /** 三维游戏世界管理 */
  export let game: GameManager;
  /** 多语言管理 */
  export let i18n: LanguageManager;
  /** ecs */
  export let ecs: ECSRootSystem;
}

declare enum LogType {
  /** 网络层日志 */
  Net = 1,
  /** 数据结构层日志 */
  Model = 2,
  /** 业务逻辑层日志 */
  Business = 4,
  /** 视图层日志 */
  View = 8,
  /** 配置日志 */
  Config = 16,
  /** 标准日志 */
  Trace = 32,
}

interface ILoggerConsole {
  trace(content: string, color: string): void;
}

interface Logger {
  /** 
    * 设置显示的日志类型，默认值为不显示任何类型日志
    * @example
      ikun.log.setTags(LogType.View|LogType.Business)
    */
  setTags(tag: LogType): void;

  /**
       * 记录开始计时
       * @param describe  标题描述
       * @example
          ikun.log.start();
          ...
          省略N行代码
          ...
          ikun.log.end();
      */
  start(describe: string): void;

  /**
       * 打印范围内时间消耗
       * @param describe  标题描述
       * @example
      ikun.log.start();
      ...
      省略N行代码
      ...
      ikun.log.end();
           */
  end(describe: string): void;

  /**
   * 打印表格
   * @param msg       日志消息
   * @param describe  标题描述
   * @example
      var object:any = {uid:1000, name:"ikun"};
      ikun.log.table(object);
           */
  table(msg: any, describe?: string): void;

  /**
   * 打印标准日志
   * @param msg       日志消息
   */
  trace(msg: any, color: string): void;

  /**
   * 打印网络层日志
   * @param msg       日志消息
   * @param describe  标题描述
   */
  logNet(msg: any, describe?: string): void;

  /**
   * 打印数据层日志
   * @param msg       日志消息
   * @param describe  标题描述
   */
  logModel(msg: any, describe?: string): void;

  /**
   * 打印业务层日志
   * @param msg       日志消息
   * @param describe  标题描述
   */
  logBusiness(msg: any, describe?: string): void;

  /**
   * 打印视图日志
   * @param msg       日志消息
   * @param describe  标题描述
   */
  logView(msg: any, describe?: string): void;

  /** 打印配置日志 */
  logConfig(msg: any, describe?: string): void;
}

interface Config {
  /** 环境常量 */
  btc: BuildTimeConstants;

  /** 游戏配置数据，版本号、支持语种等数据 */
  game: GameConfig;

  /** 浏览器查询参数 */
  query: GameQueryConfig;
}

interface BuildTimeConstants {}

interface GameConfig {
  /** 客户端版本号配置 */
  get version(): string;
  /** 包名 */
  get package(): string;
  /** 游戏每秒传输帧数 */
  get frameRate(): number;
  /** 本地存储内容加密 key */
  get localDataKey(): string;
  /** 本地存储内容加密 iv */
  get localDataIv(): string;
  /** Http 服务器地址 */
  get httpServer(): string;
  /** Http 请求超时时间 */
  get httpTimeout(): number;
  /** 获取当前客户端支持的语言类型 */
  get language(): Array<string>;
  /** 获取当前客户端支持的语言 Json 配置路径 */
  get languagePathJson(): string;
  /** 获取当前客户端支持的语言纹理配置路径 */
  get languagePathTexture(): string;
  /** 默认语言 */
  get languageDefault(): string;
  /** 是否启用远程资源 */
  get bundleEnable(): string;
  /** 远程资源服务器地址 */
  get bundleServer(): string;
  /** 远程资源名 */
  get bundleDefault(): string;
  /** 远程所有资源包配置 */
  get bundlePackages(): string;
  /** 加载界面资源超时提示 */
  get loadingTimeoutGui(): number;
  /** 是否开启移动设备安全区域适配 */
  get mobileSafeArea(): boolean
  /** 游戏配置数据 */
  get data(): any;
}

interface GameQueryConfig {
  /** 调试模式开关 */
  get debug(): string;
  /** 玩家帐号名 */
  get username(): string;
  /** 语言 */
  get lang(): string;
  /** 浏览器地址栏原始参数 */
  get data(): any;
}

interface IStorageSecurity {
  decrypt(str: string): string;
  encrypt(str: string): string;
  encryptKey(str: string): string;
}
interface StorageMgr {
  /** 本地存储数据加密方式初始化 */
  init(iis: IStorageSecurity): void;

  /**
   * 设置用户唯一标识
   * @param id
   */
  setUser(id: string): void;

  /**
   * 存储本地数据
   * @param key 存储key
   * @param value 存储值
   * @returns
   */
  set(key: string, value: any): void;

  /**
   * 获取指定关键字的数据
   * @param key          获取的关键字
   * @param defaultValue 获取的默认值
   * @returns
   */
  get(key: string, defaultValue?: any): string;

  /** 获取指定关键字的数值 */
  getNumber(key: string, defaultValue?: number): number;

  /** 获取指定关键字的布尔值 */
  getBoolean(key: string): boolean;

  /** 获取指定关键字的JSON对象 */
  getJson(key: string, defaultValue?: any): any;
  /**
   * 删除指定关键字的数据
   * @param key 需要移除的关键字
   * @returns
   */
  remove(key: string): void;

  /** 清空整个本地存储 */
  clear(): void;
}

type AssetType<T = import("cc").Asset> = import("cc").__private.__types_globals__Constructor<T> | null;
type Paths = string | string[];
type ProgressCallback = ((finished: number, total: number, item: import("cc").AssetManager.RequestItem) => void) | null;
type CompleteCallback = any;
type IRemoteOptions = { [k: string]: any; ext?: string } | null;

interface ILoadResArgs<T extends import("cc").Asset> {
  /** 资源包名 */
  bundle?: string;
  /** 资源文件夹名 */
  dir?: string;
  /** 资源路径 */
  paths: Paths;
  /** 资源类型 */
  type: AssetType<T>;
  /** 资源加载进度 */
  onProgress: ProgressCallback;
  /** 资源加载完成 */
  onComplete: CompleteCallback;
  /** 是否为预加载 */
  preload?: boolean;
}

type Asset = import("cc").Asset;

declare class ResLoader {
  //#region 资源配置数据
  /** 全局默认加载的资源包名 */
  defaultBundleName: string;
  /** 是否使用远程 CDN 资源 */
  cdn: boolean;

  /** 下载时的最大并发数 - 项目设置 -> 项目数据 -> 资源下载并发数，设置默认值；初始值为15 */
  get maxConcurrency(): number;
  set maxConcurrency(value: number);

  /** 下载时每帧可以启动的最大请求数 - 默认值为15 */
  get maxRequestsPerFrame(): number;
  set maxRequestsPerFrame(value: number);

  /** 失败重试次数 - 默认值为0 */
  get maxRetryCount(): number;
  set maxRetryCount(value: number);

  /** 重试的间隔时间，单位为毫秒 - 默认值为2000毫秒 */
  get retryInterval(): number;
  set retryInterval(value: number);
  //#endregion

  init(config: any): void;

  //#region 加载远程资源
  /**
     * 加载远程资源
     * @param url           资源地址
     * @param options       资源参数，例：{ ext: ".png" }
     * @param onComplete    加载完成回调
     * @example
var opt: IRemoteOptions = { ext: ".png" };
var onComplete = (err: Error | null, data: ImageAsset) => {
    const texture = new Texture2D();
    texture.image = data;
    
    const spriteFrame = new SpriteFrame();
    spriteFrame.texture = texture;
    
    var sprite = this.sprite.addComponent(Sprite);
    sprite.spriteFrame = spriteFrame;
}
ikun.res.loadRemote<ImageAsset>(this.url, opt, onComplete);
     */
  loadRemote<T extends Asset>(url: string, options: IRemoteOptions | null, onComplete?: CompleteCallback): void;
  loadRemote<T extends Asset>(url: string, onComplete?: CompleteCallback): void;
  loadRemote<T extends Asset>(url: string, ...args: any): void;
  //#endregion

  //#region 资源包管理
  /**
     * 加载资源包
     * @param url       资源地址
     * @param v         资源MD5版本号
     * @example
var serverUrl = "http://192.168.1.8:8080/";         // 服务器地址
var md5 = "8e5c0";                                  // Cocos Creator 构建后的MD5字符
await ikun.res.loadBundle(serverUrl,md5);
     */
  loadBundle(url: string, v?: string): Promise<import("cc").AssetManager.Bundle>;

  /**
   * 释放资源包与包中所有资源
   * @param bundleName 资源地址
   */
  removeBundle(bundleName: string): void;

  //#endregion

  //#region 预加载资源
  /**
   * 加载一个资源
   * @param bundleName    远程包名
   * @param paths         资源路径
   * @param type          资源类型
   * @param onProgress    加载进度回调
   * @param onComplete    加载完成回调
   */
  preload<T extends Asset>(
    bundleName: string,
    paths: Paths,
    type: AssetType<T>,
    onProgress: ProgressCallback,
    onComplete: CompleteCallback
  ): void;
  preload<T extends Asset>(bundleName: string, paths: Paths, onProgress: ProgressCallback, onComplete: CompleteCallback): void;
  preload<T extends Asset>(bundleName: string, paths: Paths, onComplete?: CompleteCallback): void;
  preload<T extends Asset>(bundleName: string, paths: Paths, type: AssetType<T>, onComplete?: CompleteCallback): void;
  preload<T extends Asset>(paths: Paths, type: AssetType<T>, onProgress: ProgressCallback, onComplete: CompleteCallback): void;
  preload<T extends Asset>(paths: Paths, onProgress: ProgressCallback, onComplete: CompleteCallback): void;
  preload<T extends Asset>(paths: Paths, onComplete?: CompleteCallback): void;
  preload<T extends Asset>(paths: Paths, type: AssetType<T>, onComplete?: CompleteCallback): void;
  preload<T extends Asset>(
    bundleName: string,
    paths?: Paths | AssetType<T> | ProgressCallback | CompleteCallback,
    type?: AssetType<T> | ProgressCallback | CompleteCallback,
    onProgress?: ProgressCallback | CompleteCallback,
    onComplete?: CompleteCallback
  ): void;

  /**
   * 异步加载一个资源
   * @param bundleName    远程包名
   * @param paths         资源路径
   * @param type          资源类型
   */
  preloadAsync<T extends import("cc").Asset>(
    bundleName: string,
    paths: Paths,
    type: AssetType<T>
  ): Promise<import("cc").AssetManager.RequestItem>;
  preloadAsync<T extends import("cc").Asset>(bundleName: string, paths: Paths): Promise<import("cc").AssetManager.RequestItem>;
  preloadAsync<T extends import("cc").Asset>(paths: Paths, type: AssetType<T>): Promise<import("cc").AssetManager.RequestItem>;
  preloadAsync<T extends import("cc").Asset>(paths: Paths): Promise<import("cc").AssetManager.RequestItem>;
  preloadAsync<T extends import("cc").Asset>(
    bundleName: string,
    paths?: Paths | AssetType<T> | ProgressCallback | CompleteCallback,
    type?: AssetType<T> | ProgressCallback | CompleteCallback
  ): Promise<import("cc").AssetManager.RequestItem>;

  /**
   * 预加载文件夹中的资源
   * @param bundleName    远程包名
   * @param dir           文件夹名
   * @param type          资源类型
   * @param onProgress    加载进度回调
   * @param onComplete    加载完成回调
   */
  preloadDir<T extends Asset>(
    bundleName: string,
    dir: string,
    type: AssetType<T>,
    onProgress: ProgressCallback,
    onComplete: CompleteCallback
  ): void;
  preloadDir<T extends Asset>(bundleName: string, dir: string, onProgress: ProgressCallback, onComplete: CompleteCallback): void;
  preloadDir<T extends Asset>(bundleName: string, dir: string, onComplete?: CompleteCallback): void;
  preloadDir<T extends Asset>(bundleName: string, dir: string, type: AssetType<T>, onComplete?: CompleteCallback): void;
  preloadDir<T extends Asset>(dir: string, type: AssetType<T>, onProgress: ProgressCallback, onComplete: CompleteCallback): void;
  preloadDir<T extends Asset>(dir: string, onProgress: ProgressCallback, onComplete: CompleteCallback): void;
  preloadDir<T extends Asset>(dir: string, onComplete?: CompleteCallback): void;
  preloadDir<T extends Asset>(dir: string, type: AssetType<T>, onComplete?: CompleteCallback): void;
  preloadDir<T extends Asset>(
    bundleName: string,
    dir?: string | AssetType<T> | ProgressCallback | CompleteCallback,
    type?: AssetType<T> | ProgressCallback | CompleteCallback,
    onProgress?: ProgressCallback | CompleteCallback,
    onComplete?: CompleteCallback
  ): void;
  //#endregion

  //#region 资源加载、获取、释放
  /**
     * 加载一个资源
     * @param bundleName    远程包名
     * @param paths         资源路径
     * @param type          资源类型
     * @param onProgress    加载进度回调
     * @param onComplete    加载完成回调
     * @example
ikun.res.load("spine_path", sp.SkeletonData, (err: Error | null, sd: sp.SkeletonData) => {

});
     */
  load<T extends Asset>(
    bundleName: string,
    paths: Paths,
    type: AssetType<T>,
    onProgress: ProgressCallback,
    onComplete: CompleteCallback
  ): void;
  load<T extends Asset>(bundleName: string, paths: Paths, onProgress: ProgressCallback, onComplete: CompleteCallback): void;
  load<T extends Asset>(bundleName: string, paths: Paths, onComplete?: CompleteCallback): void;
  load<T extends Asset>(bundleName: string, paths: Paths, type: AssetType<T>, onComplete?: CompleteCallback): void;
  load<T extends Asset>(paths: Paths, type: AssetType<T>, onProgress: ProgressCallback, onComplete: CompleteCallback): void;
  load<T extends Asset>(paths: Paths, onProgress: ProgressCallback, onComplete: CompleteCallback): void;
  load<T extends Asset>(paths: Paths, onComplete?: CompleteCallback): void;
  load<T extends Asset>(paths: Paths, type: AssetType<T>, onComplete?: CompleteCallback): void;
  load<T extends Asset>(
    bundleName: string,
    paths?: Paths | AssetType<T> | ProgressCallback | CompleteCallback,
    type?: AssetType<T> | ProgressCallback | CompleteCallback,
    onProgress?: ProgressCallback | CompleteCallback,
    onComplete?: CompleteCallback
  ): void;

  /**
   * 异步加载一个资源
   * @param bundleName    远程包名
   * @param paths         资源路径
   * @param type          资源类型
   */
  loadAsync<T extends Asset>(bundleName: string, paths: Paths, type: AssetType<T>): Promise<T>;
  loadAsync<T extends Asset>(bundleName: string, paths: Paths): Promise<T>;
  loadAsync<T extends Asset>(paths: Paths, type: AssetType<T>): Promise<T>;
  loadAsync<T extends Asset>(paths: Paths): Promise<T>;
  loadAsync<T extends Asset>(
    bundleName: string,
    paths?: Paths | AssetType<T> | ProgressCallback | CompleteCallback,
    type?: AssetType<T> | ProgressCallback | CompleteCallback
  ): Promise<T>;

  /**
     * 加载文件夹中的资源
     * @param bundleName    远程包名
     * @param dir           文件夹名
     * @param type          资源类型
     * @param onProgress    加载进度回调
     * @param onComplete    加载完成回调
     * @example
// 加载进度事件
var onProgressCallback = (finished: number, total: number, item: any) => {
    console.log("资源加载进度", finished, total);
}

// 加载完成事件
var onCompleteCallback = () => {
    console.log("资源加载完成");
}
ikun.res.loadDir("game", onProgressCallback, onCompleteCallback);
     */
  loadDir<T extends Asset>(
    bundleName: string,
    dir: string,
    type: AssetType<T>,
    onProgress: ProgressCallback,
    onComplete: CompleteCallback
  ): void;
  loadDir<T extends Asset>(bundleName: string, dir: string, onProgress: ProgressCallback, onComplete: CompleteCallback): void;
  loadDir<T extends Asset>(bundleName: string, dir: string, onComplete?: CompleteCallback): void;
  loadDir<T extends Asset>(bundleName: string, dir: string, type: AssetType<T>, onComplete?: CompleteCallback): void;
  loadDir<T extends Asset>(dir: string, type: AssetType<T>, onProgress: ProgressCallback, onComplete: CompleteCallback): void;
  loadDir<T extends Asset>(dir: string, onProgress: ProgressCallback, onComplete: CompleteCallback): void;
  loadDir<T extends Asset>(dir: string, onComplete?: CompleteCallback): void;
  loadDir<T extends Asset>(dir: string, type: AssetType<T>, onComplete?: CompleteCallback): void;
  loadDir<T extends Asset>(
    bundleName: string,
    dir?: string | AssetType<T> | ProgressCallback | CompleteCallback,
    type?: AssetType<T> | ProgressCallback | CompleteCallback,
    onProgress?: ProgressCallback | CompleteCallback,
    onComplete?: CompleteCallback
  ): void;

  /**
   * 通过资源相对路径释放资源
   * @param path          资源路径
   * @param bundleName    远程资源包名
   */
  release(path: string, bundleName?: string): void;

  /**
   * 通过相对文件夹路径删除所有文件夹中资源
   * @param path          资源文件夹路径
   * @param bundleName    远程资源包名
   */
  releaseDir(path: string, bundleName?: string): void;

  /**
   * 获取资源
   * @param path          资源路径
   * @param type          资源类型
   * @param bundleName    远程资源包名
   */
  get<T extends Asset>(path: string, type?: AssetType<T>, bundleName?: string): T | null;
  //#endregion

  /** 打印缓存中所有资源信息 */
  dump(): void;
}

/**
 * 全局事件监听方法
 * @param event      事件名
 * @param args       事件参数
 */
type ListenerFunc = (event: string, ...args: any) => void;

declare class MessageMgr {
  /**
   * 注册全局事件
   * @param event      事件名
   * @param listener   处理事件的侦听器函数
   * @param object     侦听函数绑定的作用域对象
   */
  on(event: string, listener: ListenerFunc, object: object): void;

  /**
   * 监听一次事件，事件响应后，该监听自动移除
   * @param event     事件名
   * @param listener  事件触发回调方法
   * @param object    侦听函数绑定的作用域对象
   */
  once(event: string, listener: ListenerFunc, object: object): void;

  /**
   * 移除全局事件
   * @param event     事件名
   * @param listener  处理事件的侦听器函数
   * @param object    侦听函数绑定的作用域对象
   */
  off(event: string, listener: Function, object: object): void;

  /**
   * 触发全局事件
   * @param event      事件名
   * @param args       事件参数
   */
  dispatchEvent(event: string, ...args: any): void;
}

type AudioSource = import("cc").AudioSource;
type AudioClip = import("cc").AudioClip;
type Component = import("cc").Component;
type ccNode = import("cc").Node;
type ccCamera = import("cc").Camera;

interface AudioMusic extends AudioSource {
  /** 背景音乐开关 */
  switch: boolean;
  /** 背景音乐播放完成回调 */
  onComplete: Function | null;
  // private onAudioStarted() { }
  /** 获取音乐播放进度 */
  get progress(): number;
  /**
   * 设置音乐当前播放进度
   * @param value     进度百分比0到1之间
   */
  set progress(value: number);
  /**
   * 加载音乐并播放
   * @param url          音乐资源地址
   * @param callback     加载完成回调
   * @param bundleName   资源包名
   */
  load(url: string, callback?: Function, bundleName?: string): Promise<void>;

  /** 释放当前背景音乐资源 */
  release(): void;
}

interface AudioEffectPool {
  get switch(): boolean;
  set switch(value: boolean);
  /** 所有音效音量 */
  get volume(): number;
  set volume(value: number);

  /**
   * 加载与播放音效
   * @param url                  音效资源地址与音效资源
   * @param bundleName           资源包名
   * @param onPlayComplete       播放完成回调
   * @returns
   */
  load(url: string | AudioClip, bundleName?: string, onPlayComplete?: Function): Promise<number>;
  /**
   * 回收音效播放器
   * @param aeid          播放器编号
   * @param url           音效路径
   * @param bundleName    资源包名
   */
  put(aeid: number, url: string | AudioClip, bundleName?: string): void;

  /** 释放所有音效资源与对象池中播放器 */
  release(): void;

  /** 停止播放所有音效 */
  stop(): void;

  /** 恢复所有音效 */
  play(): void;

  /** 暂停所有音效 */
  pause(): void;
}

interface AudioMgr extends Component {
  /** 背景音乐管理对象 */
  music: AudioMusic;
  /** 音效管理对象 */
  effect: AudioEffectPool;

  /**
   * 设置背景音乐播放完成回调
   * @param callback 背景音乐播放完成回调
   */
  setMusicComplete(callback: Function | null): void;

  /**
   * 播放背景音乐
   * @param url        资源地址
   * @param callback   音乐播放完成事件
   * @param bundleName 资源包名
   */
  playMusic(url: string, callback?: Function, bundleName?: string): void;

  /** 循环播放背景音乐 */
  playMusicLoop(url: string, bundleName?: string): void;

  /** 停止背景音乐播放 */
  stopMusic(): void;

  /**
   * 获取背景音乐播放进度
   */
  get progressMusic(): number;

  /**
   * 设置背景乐播放进度
   * @param value     播放进度值
   */
  set progressMusic(value: number);

  /**
   * 获取背景音乐音量
   */
  get volumeMusic(): number;

  /**
   * 设置背景音乐音量
   * @param value     音乐音量值
   */
  set volumeMusic(value: number);
  /**
   * 获取背景音乐开关值
   */
  get switchMusic(): boolean;

  /**
   * 设置背景音乐开关值
   * @param value     开关值
   */
  set switchMusic(value: boolean);

  /**
   * 播放音效
   * @param url        资源地址
   * @param callback   加载完成回调
   * @param bundleName 资源包名
   */
  playEffect(url: string | AudioClip, bundleName?: string, onPlayComplete?: Function): Promise<number>;

  /** 回收音效播放器 */
  putEffect(aeid: number, url: string | AudioClip, bundleName?: string): void;

  /** 获取音效音量 */
  get volumeEffect(): number;
  /**
   * 设置获取音效音量
   * @param value     音效音量值
   */
  set volumeEffect(value: number);

  /** 获取音效开关值 */
  get switchEffect(): boolean;

  /**
   * 设置音效开关值
   * @param value     音效开关值
   */
  set switchEffect(value: boolean);

  /** 恢复当前暂停的音乐与音效播放 */
  resumeAll(): void;

  /** 暂停当前音乐与音效的播放 */
  pauseAll(): void;

  /** 停止当前音乐与音效的播放 */
  stopAll(): void;

  /** 保存音乐音效的音量、开关配置数据到本地 */
  save(): void;

  /** 本地加载音乐音效的音量、开关配置数据并设置到游戏中 */
  load(): void;
}

interface RandomMgr {
  /** 是否运行在客户端 */
  isClient: boolean;
  /** 是否为全局为随机 */
  isGlobal: boolean;

  /** 设置随机种子 */
  setSeed(seed: number, name?: string): void;

  /**
   * 生成指定范围的随机浮点数
   * @param min   最小值
   * @param max   最大值
   * @param type  类型
   */
  getRandomFloat(min?: number, max?: number, flag?: string): number;

  /**
* 生成指定范围的随机整数
* @param min   最小值
* @param max   最大值
* @param type  类型
* @example
var min = 1;
var max = 10;
// [min,max) 得到一个两数之间的随机整数,这个值不小于min（如果min不是整数的话，得到一个向上取整的 min），并且小于（但不等于）max  
RandomManager.instance.getRandomInt(min, max, 1);

// [min,max] 得到一个两数之间的随机整数，包括两个数在内,这个值比min大（如果min不是整数，那就不小于比min大的整数），但小于（但不等于）max
RandomManager.instance.getRandomInt(min, max, 2);

// (min,max) 得到一个两数之间的随机整数
RandomManager.instance.getRandomInt(min, max, 3);
*/
  getRandomInt(min?: number, max?: number, type?: number): number;

  /**
* 根据最大值，最小值范围生成随机数数组
* @param min   最小值
* @param max   最大值
* @param n     随机个数
* @param type  类型
* @example
var a = RandomManager.instance.getRandomByMinMaxList(50, 100, 5)
//console.log("随机的数字", a);
*/
  getRandomByMinMaxList(min: number, max: number, n: number): Array<number>;

  /**
* 获取数组中随机对象
* @param objects 对象数组
* @param n 随机个数
* @example
var b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var r = RandomManager.instance.getRandomByObjectList(b, 5);
//console.log("原始的对象", b);
//console.log("随机的对象", r);
*/
  getRandomByObjectList<T>(objects: Array<T>, n: number): Array<T>;

  /**
* 获取数组中随机对象
* @param objects 对象数组
* @param n 随机个数
* @example
var b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var r = RandomManager.instance.getRandomByObjectList(b, 5);
//console.log("原始的对象", b);
//console.log("随机的对象", r);
*/
  getRandomByObjectListCp<T>(objects: Array<T>, n: number): Array<T>;

  /**
* 定和随机分配
* @param n     随机数量
* @param sum   随机元素合
* @example
var c = RandomManager.instance.getRandomBySumList(5, -100);
//console.log("定和随机分配", c);
*/
  getRandomBySumList(n: number, sum: number): number[];
}

interface TimerMgr extends Component {
  /**
     * 在指定对象上注册一个倒计时的回调管理器
     * @param object        注册定时器的对象
     * @param field         时间字段
     * @param target        触发事件的对象
     * @param onSecond      每秒事件
     * @param onComplete    倒计时完成事件
     * @returns 
     * @example
    export class Test extends Component {
        private timeId!: string;
        
        start() {
            // 在指定对象上注册一个倒计时的回调管理器
            this.timeId = oops.timer.register(this, "countDown", this.onSecond, this.onComplete);
        }
        
        private onSecond() {
            console.log("每秒触发一次");
        }

        private onComplete() {
            console.log("倒计时完成触发");
        }
    }
     */
    register(object: any, field: string, target: object, onSecond: Function, onComplete: Function): string;

    /** 
       * 在指定对象上注销一个倒计时的回调管理器 
       * @param id         时间对象唯一表示
       * @example
      export class Test extends Component {
          private timeId!: string;
  
          start() {
              this.timeId = oops.timer.register(this, "countDown", this.onSecond, this.onComplete);
          }
  
          onDestroy() {
              // 在指定对象上注销一个倒计时的回调管理器
              oops.timer.unRegister(this.timeId);
          }
      }
       */
    unRegister(id: string): void;

  /**
   * 服务器时间与本地时间同步
   * @param value   服务器时间刻度
   */
  setServerTime(value: number): void;

  /** 获取写服务器同步的时间刻度 */
  getServerTime(): number;

  /** 获取服务器时间对象 */
  getServerDate(): Date;

  /** 获取本地时间刻度 */
  getClientTime(): number;

  /** 获取本地时间对象 */
  getClientDate(): Date;

  /** 获取游戏开始到现在逝去的时间 */
  getTime(): number;

  /** 游戏最小化时记录时间数据 */
  save(): void;

  /** 游戏最大化时回复时间数据 */
  load(): void;
}

/*** 界面回调参数对象定义 */
interface UICallbacks {
  /**
   * 节点添加到层级以后的回调
   * @param node   当前界面节点
   * @param params 外部传递参数
   */
  onAdded?: (node: ccNode, params: any) => void;

  /**
   * 窗口节点 destroy 之后回调
   * @param node   当前界面节点
   * @param params 外部传递参数
   */
  onRemoved?: (node: ccNode | null, params: any) => void;

  /**
   * 如果指定onBeforeRemoved，则next必须调用，否则节点不会被正常删除。
   *
   * 比如希望节点做一个FadeOut然后删除，则可以在`onBeforeRemoved`当中播放action动画，动画结束后调用next
   * @param node   当前界面节点
   * @param next   回调方法
   */
  onBeforeRemove?: (node: ccNode, next: Function) => void;

  /** 网络异常时，窗口加载失败回调 */
  onLoadFailure?: () => void;
}

/** 本类型仅供gui模块内部使用，请勿在功能逻辑中使用 */
interface ViewParams {
  /** 界面配置 */
  config: UIConfig;
  /** 传递给打开界面的参数 */
  params: any;
  /** 窗口事件 */
  callbacks: UICallbacks;
  /** 是否在使用状态 */
  valid: boolean;
  /** 界面根节点 */
  node: ccNode;
}

/** 屏幕适配类型 */
declare enum ScreenAdapterType {
  /** 自动适配 */
  Auto,
  /** 横屏适配 */
  Landscape,
  /** 竖屏适配 */
  Portrait,
}

declare enum LayerType {
  /** 二维游戏层 */
  Game = "LayerGame",
  /** 主界面层 */
  UI = "LayerUI",
  /** 弹窗层 */
  PopUp = "LayerPopUp",
  /** 模式窗口层 */
  Dialog = "LayerDialog",
  /** 系统触发模式窗口层 */
  System = "LayerSystem",
  /** 滚动消息提示层 */
  Notify = "LayerNotify",
  /** 新手引导层 */
  Guide = "LayerGuide",
}

/** 
 * 界面配置结构体
 * @help    https://gitee.com/dgflash/ikun-framework/wikis/pages?sort_id=12037986&doc_id=2873565
 * @example
// 界面唯一标识
export enum UIID {
    Loading = 1,
    Window,
    Netinstable
}

// 打开界面方式的配置数据
export var UIConfigData: { [key: number]: UIConfig } = {
    [UIID.Loading]: { layer: LayerType.UI, prefab: "loading/prefab/loading", bundle: "resources" },
    [UIID.Netinstable]: { layer: LayerType.PopUp, prefab: "common/prefab/netinstable" },
    [UIID.Window]: { layer: LayerType.Dialog, prefab: "common/prefab/window" }
}
 */
interface UIConfig {
  /** -----公共属性----- */
  /** 远程包名 */
  bundle?: string;
  /** 窗口层级 */
  layer: LayerType;
  /** 预制资源相对路径 */
  prefab: string;
  /** 是否自动施放（默认不自动释放） */
  destroy?: boolean;

  /** -----弹窗属性----- */
  /** 是否触摸非窗口区域关闭（默认关闭） */
  vacancy?: boolean;
  /** 是否打开窗口后显示背景遮罩（默认关闭） */
  mask?: boolean;
  /** 是否启动真机安全区域显示 */
  safeArea?: boolean;
  /** 界面弹出时的节点排序索引 */
  siblingIndex?: number;
}

interface LayerManager {
  /** 界面根节点 */
  root: ccNode;
  /** 界面摄像机 */
  camera: ccCamera;
  /** 游戏界面特效层 */
  game: ccNode;
  /** 新手引导层 */
  guide: ccNode;

  /** 窗口宽高比例 */
  windowAspectRatio: number;
  /** 设计宽高比例 */
  designAspectRatio: number;
  /** 是否开启移动设备安全区域适配 */
  mobileSafeArea: boolean;
  /**
   * 初始化界面层
   * @param root 界面根节点
   * @param config 
   * @returns 
   */
  initLayer(root: ccNode, config: any): void;
  /**
   * 初始化所有UI的配置对象
   * @param configs 配置对象
   */
  init(configs: { [key: number]: UIConfig }): void;

  /**
   * 设置窗口打开失败回调
   * @param callback  回调方法
   */
  setOpenFailure(callback: Function): void;

  /**
   * 渐隐飘过提示
   * @param content 文本表示
   * @param useI18n 是否使用多语言
   * @example
   * ikun.gui.toast("提示内容");
   */
  toast(content: string, useI18n?: boolean): void;
  /** 打开等待提示 */
  waitOpen(): void;

  /** 关闭等待提示 */
  waitClose(): void;

  /**
   * 设置界面配置
   * @param uiId   要设置的界面id
   * @param config 要设置的配置
   */
  setConfig(uiId: number, config: UIConfig): void;

  /**
   * 同步打开一个窗口
   * @param uiId          窗口唯一编号
   * @param uiArgs        窗口参数
   * @param callbacks     回调对象
   * @example
  var uic: UICallbacks = {
      onAdded: (node:ccNode, params: any) => {
          var comp = node.getComponent(LoadingViewComp) as ecs.Comp;
      }
      onRemoved:(node:ccNode | null, params: any) => {
                  
      }
  };
  ikun.gui.open(UIID.Loading, null, uic);
   */
  open(uiId: number, uiArgs?: any, callbacks?: UICallbacks): void;

  /**
   * 异步打开一个窗口
   * @param uiId          窗口唯一编号
   * @param uiArgs        窗口参数
   * @example
   * var node = await ikun.gui.openAsync(UIID.Loading);
   */
  openAsync(uiId: number, uiArgs?: any): Promise<ccNode | null>;

  /**
   * 场景替换
   * @param removeUiId  移除场景编号
   * @param openUiId    新打开场景编号
   * @param uiArgs      新打开场景参数
   */
  replace(removeUiId: number, openUiId: number, uiArgs: any): void;

  /**
   * 异步场景替换
   * @param removeUiId  移除场景编号
   * @param openUiId    新打开场景编号
   * @param uiArgs      新打开场景参数
   */
  replaceAsync(removeUiId: number, openUiId: number, uiArgs: any): Promise<ccNode | null>;

  /**
   * 缓存中是否存在指定标识的窗口
   * @param uiId 窗口唯一标识
   * @example
   * ikun.gui.has(UIID.Loading);
   */
  has(uiId: number): boolean;

  /**
   * 缓存中是否存在指定标识的窗口
   * @param uiId 窗口唯一标识
   * @example
   * ikun.gui.has(UIID.Loading);
   */
  get(uiId: number): ccNode;

  /**
   * 移除指定标识的窗口
   * @param uiId         窗口唯一标识
   * @param isDestroy    移除后是否释放
   * @example
   * ikun.gui.remove(UIID.Loading);
   */
  remove(uiId: number, isDestroy?: boolean): void;

  /**
   * 删除一个通过this框架添加进来的节点
   * @param node          窗口节点
   * @param isDestroy     移除后是否释放资源
   * @example
   * ikun.gui.removeByNode(cc.Node);
   */
  removeByNode(node: ccNode, isDestroy?: boolean): void;

  /**
   * 清除所有窗口
   * @param isDestroy 移除后是否释放
   * @example
   * ikun.gui.clear();
   */
  clear(isDestroy?: boolean): void;
}

interface GameManager {
  /** 界面根节点 */
  root: ccNode;
  /** 设置游戏动画速度 */
  setTimeScale(scale: number): void;
  /** 获取游戏动画速度 */
  getTimeScale(): number;
}

interface LanguagePack {
  /**
   * 刷新语言文字
   * @param lang
   */
  updateLanguage(lang: string): void;

  /**
   * 下载对应语言包资源
   * @param lang 语言标识
   * @param callback 下载完成回调
   */
  loadLanguageAssets(lang: string, callback: Function): Promise<void>;

  /**
   * 释放某个语言的语言包资源包括json
   * @param lang
   */
  releaseLanguageAssets(lang: string): void;
}

interface LanguageManager {
  /** 支持的多种语言列表 */
  get languages(): string[];
  set languages(languages: Array<string>);

  /** 设置的当前语言列表中没有配置时，使用默认语言 */
  set default(lang: string);

  /** 获取当前语种 */
  get current(): string;

  /** 语言包 */
  get pack(): LanguagePack;
  /**
   * 是否存在指定语言
   * @param lang  语言名
   * @returns 存在返回true,则否false
   */
  isExist(lang: string): boolean;

  /** 获取下一个语种 */
  getNextLang(): string;

  /**
   * 改变语种，会自动下载对应的语种
   * @param language 语言名
   * @param callback 多语言资源数据加载完成回调
   */
  setLanguage(language: string, callback?: (success: boolean) => void): void;

  /**
   * 根据data获取对应语种的字符
   * @param labId
   * @param arr
   */
  getLangByID(labId: string): string;

  /**
   * 下载语言包素材资源
   * 包括语言json配置和语言纹理包
   * @param lang
   * @param callback
   */
  loadLanguageAssets(lang: string, callback: Function): void;

  /**
   * 释放不需要的语言包资源
   * @param lang
   */
  releaseLanguageAssets(lang: string): void;
}

interface ECSRootSystem {
  add(system: any): any;
  init(): void;

  execute(dt: number): void;

  clear(): void;
}