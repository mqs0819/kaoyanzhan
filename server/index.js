const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')

// 开放静态资源
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(__dirname + '/uploads'))
// 跨域
app.use(require('cors')())
// 处理数据格式
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(require('connect-history-api-fallback')())

app.set('secret', '@4353fews4352')

app.use(session({
	secret: 'moss',
	resave: false,
	saveUninitialized: true,
}))
 
// 挂载路由
require('./routes/web')(app)
require('./routes/admin')(app)

// 连接数据库
require('./utils/db')(app)

app.listen(5003, function () {
	console.log(`http://localhost:5003`);
})