import * as buildTimeConstants from 'cc/env';

const keys = (Object.keys(buildTimeConstants) as (keyof typeof buildTimeConstants)[]).sort();

/* 游戏运行环境 */
export class BuildTimeConstants {
    constructor() {
        const keyNameMaxLen = keys.reduce((len, key) => Math.max(len, key.length), 0);
        const enviroment = `${keys.map((key) => {
            const value = buildTimeConstants[key];
            const valueRep = typeof value === 'boolean' ? (value ? 'true' : 'false') : value;
            return `\n${key.padStart(keyNameMaxLen, ' ')} : ${valueRep}`;
        })}`;

        console.log(enviroment);
    }
}