import { TTFFont } from "cc";

/** 框架支持的语言数据类型 */
export enum LanguageDataType {
  /** Json格式配置 */
  Json = "Json",
  /** Excel生成的Json配置 */
  Excel = "Excel",
}

export class LanguageData {
  /** JSON资源目录 */
  static path_json: string = "language/json";
  /** 纹理资源目录 */
  static path_texture: string = "language/texture";
  /** SPINE资源目录 */
  static path_spine: string = "language/spine";

  /** 当前语言 */
  static current: string = "";
  /** 语言数据 */
  static language: Map<string, any> = new Map();
  /** TTF字体 */
  static font: TTFFont = null!;

  /**
   * 通过多语言关键字获取语言文本
   *
   * 注：
   *
   * 1、先获取language/json中的配置数据，如果没有者获取config/game/Language配置表中的多语言数据
   *
   * 2、config/game/Language配置表可选使用，不用时不创建同名配置表即可
   *
   * 3、config/game/Language配置表使用ikun-plugin-excel-to-json插件生成，点击项目根目录下载update-ikun-plugin-framework.bat或update-ikun-plugin-framework.sh脚本下载插件
   */
  public static getLangByID(labId: string): string {
    for (const [key, value] of this.language) {
      const content = value[labId];
      if (content) return content;
    }
    return labId;
  }
}

export const LanguageType = ["LanguageLabel", "LanguageSprite", "LanguageSpine"];
