# fullstack2021-part3
## tips
add gitignore file

`node version >= 14.8.0`

`npm init`

`npm install express`

`npm update # update 所有包`

增加 nodeman避免修改接口后手动重启应用
`npm install --save-dev nodemon` 

package.json
`"start": "node index.js",`

`npm run start`

`"dev": "nodemon index.js",`

安装nodemon之后
`npm run dev` 启动


## express

### get
`app.get(url, (res, req) => {})`

### delete
`app.delete(url, (res, req) => {})`

### post
```
app.use(express.json()) // 事件处理函数可以从request 对象的body 属性访问数据。
app.post('/api/persons', (request, response) => {
  const person = request.body
})
```

### error
```
app.post('/api/persons', (request, response) => {
  return response.status(400).json({
      error: 'name must be unique'
  })
})

```

## cors
`npm install cors`

## heroku 部署
`heroku create   `

Creating app... done, ⬢ safe-eyrie-44754
https://safe-eyrie-44754.herokuapp.com/ | https://git.heroku.com/safe-eyrie-44754.git

`git push https://git.heroku.com/safe-eyrie-44754.git main`

## 移动前端生成到build文件
`cp -r build ../../fullstack2021-part3`

重新 push 到heroku仓库后

访问
https://safe-eyrie-44754.herokuapp.com/

就能看到页面内容

## postman 测试部署后的接口

## mongoose 远程数据库
`npm install mongoose`

## 获取命令行参数
`process.argv` 

## dotenv 环境变量配置
  ```
    require('dotenv').config()
    const express = require('express')
    const app = express()
    const Note = require('./models/note')

    // ..

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  ```
## db 方法
`find()`

`findByIdAndRemove()`

`findByIdAndUpdate()`