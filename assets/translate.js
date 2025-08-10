// 引入配置文件
const crypto = require('crypto-js');
const config = require('../utils/config.js').tencentcloud;


function sha256(message, key, encoding = "hex") {
  return crypto.HmacSHA256(message, key)
}

function getHash(message, encoding = "hex") {
  return crypto.SHA256(message)
}

function getDate(timestamp) {
  const date = new Date(timestamp * 1000)
  const year = date.getUTCFullYear()
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2)
  const day = ("0" + date.getUTCDate()).slice(-2)
  return `${year}-${month}-${day}`
}

// 生成签名
function generateSignature(params, timestamp) {

  const payload = JSON.stringify(params);

  // ************* 步骤 1：拼接规范请求串 *************
  const signedHeaders = "content-type;host"
  const hashedRequestPayload = getHash(payload)
  const httpRequestMethod = "POST"
  const canonicalUri = "/"
  const canonicalQueryString = ""
  const canonicalHeaders =
    "content-type:application/json; charset=utf-8\n" + "host:" + config.host + "\n"
  const canonicalRequest =
    httpRequestMethod +
    "\n" +
    canonicalUri +
    "\n" +
    canonicalQueryString +
    "\n" +
    canonicalHeaders +
    "\n" +
    signedHeaders +
    "\n" +
    hashedRequestPayload

  const dateStr = getDate(timestamp);

  // ************* 步骤 2：拼接待签名字符串 *************
  const algorithm = "TC3-HMAC-SHA256"
  const hashedCanonicalRequest = getHash(canonicalRequest)
  const credentialScope = dateStr + "/" + config.service + "/" + "tc3_request"
  const stringToSign =
    algorithm +
    "\n" +
    timestamp +
    "\n" +
    credentialScope +
    "\n" +
    hashedCanonicalRequest

  // ************* 步骤 3：计算签名 *************
  const kDate = sha256(dateStr, "TC3" + config.secretKey)
  const kService = sha256(config.service, kDate)
  const kSigning = sha256("tc3_request", kService)
  const signature = sha256(stringToSign, kSigning, "hex")


  // ************* 步骤 4：拼接 Authorization *************
const authorization =
  algorithm +
  " " +
  "Credential=" +
  config.secretId +
  "/" +
  credentialScope +
  ", " +
  "SignedHeaders=" +
  signedHeaders +
  ", " +
  "Signature=" +
  signature
  
  return authorization;
}

// 翻译函数
function translate(params) {
  return new Promise((resolve, reject) => {
    const timestamp = Math.floor(Date.now() / 1000);
    
    // 构建请求参数
    const requestParams = {
      SourceText: params.SourceText,
      Source: params.Source || 'en',
      Target: params.Target || 'zh',
      ProjectId: params.ProjectId || 0
    };
    
    // 生成签名
    const authorization = generateSignature(requestParams, timestamp);
    
    // 构建请求头 - 注意：头部名称必须与签名中的signedHeaders一致
    const headers = {
      Authorization: authorization,
      "Content-Type": "application/json; charset=utf-8",
      Host: config.host,
      "X-TC-Action": config.action,
      "X-TC-Timestamp": timestamp,
      "X-TC-Version": config.version,
    }

    if (config.region) {
      headers["X-TC-Region"] = config.region
    }
    
    console.log('请求头:', headers);
    console.log('请求参数:', requestParams);
    
    // 发送请求
    wx.request({
      url: 'https://' + config.host,
      method: 'POST',
      data: requestParams,
      header: headers,
      success: (res) => {
        console.log('响应状态:', res.statusCode);
        console.log('响应数据:', res.data);
        if(res.data.Response.Error) {
          reject(new Error(`API错误: ${res.data.Response.Error.Message}`));
        }
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`请求失败: ${res.statusCode}, 响应: ${JSON.stringify(res.data)}`));
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        reject(err);
      }
    });
  });
}

module.exports = {
  translate
};