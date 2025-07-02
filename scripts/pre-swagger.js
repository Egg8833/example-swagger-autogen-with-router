// scripts/pre-swagger.js
// 用於將 controller 內的 /* ${SwaggerUserDocs.xxx()} */ 動態展開為靜態註解

const fs = require('fs')
const path = require('path')
const { SwaggerUserDocs } = require('../src/swaggerDocs/user.docs')

const SRC = path.join(__dirname, '../src/controllers/ApiRoute1.js')
const DEST = path.join(__dirname, '../src/controllers/ApiRoute1.swagger.js')

let content = fs.readFileSync(SRC, 'utf8')

// 替換所有 /* ${SwaggerUserDocs.xxx()} */ 為實際註解內容
content = content.replace(/\/\* \$\{SwaggerUserDocs\.(\w+)\(\)\} \*\//g, (match, fn) => {
  if (SwaggerUserDocs[fn]) {
    return SwaggerUserDocs[fn]()
  }
  return match
})

fs.writeFileSync(DEST, content)
console.log('Swagger 註解已展開到', DEST)
