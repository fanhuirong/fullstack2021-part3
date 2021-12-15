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






