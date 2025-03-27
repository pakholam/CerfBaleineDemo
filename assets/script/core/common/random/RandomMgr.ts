export class RandomMgr {
  private static _instance: RandomMgr = null;
  private random: any = null;
  /** 是否运行在客户端 */
  isClient: boolean = true;
  /** 是否为全局为随机 */
  isGlobal: boolean = false;
  private randomName = "default";

  public static get instance(): RandomMgr {
    if (this._instance == null) {
      this._instance = new RandomMgr();
      this._instance.random = Math.random;
    }
    return this._instance;
  }

  private getRandom(): number {
    return this.isGlobal ? Math.random() : this.random();
  }

  /** 设置随机种子 */
  public setSeed(seed: number, name: string = "default") {
    this.randomName = name;
    if (this.isClient) {
      //注：seedrandom.min.js文件在Cocos Creatorz中导入为插件生效
      if (this.isGlobal) {
        // @ts-ignore
        new Math.seedrandom(seed, { global: true });
      } else {
        // @ts-ignore
        this.random = new Math.seedrandom(seed);
      }
    } else {
      var seedrandom = require("seedrandom");
      if (this.isGlobal) {
        new seedrandom(seed, { global: true });
      } else {
        this.random = new seedrandom(seed);
      }
    }
  }

  /**
   * 生成指定范围的随机浮点数
   * @param min   最小值
   * @param max   最大值
   * @param type  类型
   */
  public getRandomFloat(min: number = 0, max: number = 1, flag?: string): number {
    let result = this.getRandom() * (max - min) + min;
    console.log("随机数", this.randomName, result, flag);
    return result;
  }

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
  public getRandomInt(min: number, max: number, type: number = 2): number {
    let result = 0;
    min = Math.ceil(min);
    max = Math.floor(max);
    switch (type) {
      case 1: // [min,max) 得到一个两数之间的随机整数,这个值不小于min（如果min不是整数的话，得到一个向上取整的 min），并且小于（但不等于）max
        result = Math.floor(this.getRandom() * (max - min)) + min;
        break;
      case 2: // [min,max] 得到一个两数之间的随机整数，包括两个数在内,这个值比min大（如果min不是整数，那就不小于比min大的整数），但小于（但不等于）max
        result = Math.floor(this.getRandom() * (max - min + 1)) + min;
        break;
      case 3: // (min,max) 得到一个两数之间的随机整数
        result = Math.floor(this.getRandom() * (max - min - 1)) + min + 1;
        break;
    }

    return result;
  }

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
  public getRandomByMinMaxList(min: number, max: number, n: number): Array<number> {
    var result: Array<number> = [];
    for (let i = 0; i < n; i++) {
      result.push(this.getRandomInt(min, max));
    }
    return result;
  }

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
  public getRandomByObjectList<T>(objects: Array<T>, n: number): Array<T> {
    var temp: Array<T> = objects.slice();
    var result: Array<T> = [];
    for (let i = 0; i < n; i++) {
      let index = this.getRandomInt(0, objects.length, 1);
      result.push(temp.splice(index, 1)[0]);
    }
    return result;
  }

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
  public getRandomByObjectListCp<T>(objects: Array<T>, n: number): Array<T> {
    var temp: Array<T> = objects.slice();
    var result: Array<T> = [];
    for (let i = 0; i < n; i++) {
      /**这里改成了temp.length,上面getRandomByObjectList有地方用了避免出错还是复制一份 */
      let index = this.getRandomInt(0, temp.length, 1);
      result.push(temp.splice(index, 1)[0]);
    }
    return result;
  }

  /**
 * 定和随机分配
 * @param n     随机数量
 * @param sum   随机元素合
 * @example
var c = RandomManager.instance.getRandomBySumList(5, -100);
//console.log("定和随机分配", c);
 */
  public getRandomBySumList(n: number, sum: number): number[] {
    var residue = sum;
    var value = 0;
    var result: Array<number> = [];
    for (let i = 0; i < n; i++) {
      value = this.getRandomInt(0, residue, 3);
      if (i == n - 1) {
        value = residue;
      } else {
        residue -= value;
      }
      result.push(value);
    }
    return result;
  }
}
