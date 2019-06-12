/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-11-02 14:39:02
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-06-11 16:47:32
 */

import CryptoJS from 'crypto-js';
import { sortForAscii } from './utils';

// 打包环境
const dev = !process.env.REACT_APP_DES;

const DES_KEY = dev ? 'AAAAAAA' : 'BBBBBBBB';
const DES_IV = dev ? 'CCCCCCC' : 'DDDDDDDD';


// 业务加密
export const DES = (data: any) => {
  return encryptByDES(JSON.stringify(data), DES_KEY, DES_IV);
};

// 业务解密
export const SED = (desString: string) => {
  return decryptByDESModeEBC(desString, DES_KEY, DES_IV);
};

// 请求加密
export const HttpDES = (jsonData: any) => {
  return encryptByDES(jsonData, DES_KEY, DES_IV);
};


// des加密
export const encryptByDES = function (message: string, key: string, iv: string) {
  // 把私钥转换成16进制的字符串
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(iv);
  // 模式为ECB padding为Pkcs7
  // TripleDES
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  // 加密出来是一个16进制的字符串
  return encrypted.toString();
};

// des解密
export const decryptByDESModeEBC = function (ciphertexat: string, key: string, iv: string) {
  // 把私钥转换成16进制的字符串
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(iv);
  // 把需要解密的数据从16进制字符串转换成字符byte数组
  const decrypted = CryptoJS.DES.decrypt(
    // @ts-ignore
    {
      ciphertext: CryptoJS.enc.Base64.parse(ciphertexat)
    },
    keyHex,
    {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );
  // 以utf-8的形式输出解密过后内容
  const result_value = decrypted.toString(CryptoJS.enc.Utf8);
  return result_value;
};

// 这个默认是32位的
export const md5Encode = function (str: any) {
  return CryptoJS.MD5(str).toString();
};

// 签名
export const sign = (obj: object): string => {
  const str = sortForAscii(obj, true);
 
  return md5Encode(str);
};
