/**
 * 鉴权中间件
 * @param {配置} options 
 */
module.exports = options => {
	const assert = require('http-assert')
	const jwt = require('jsonwebtoken')
	const User = require('../models/User')

	return async (req, res, next) => {
		try { 
			// 1. 解析请求头携带token令牌
			const token = String(req.headers.authorization || '').split(' ').pop()
			assert(token, 401, '未登录')
			// 2. 校验token令牌是否合法
			const { id } = jwt.verify(token, req.app.get('secret'))
			assert(id, 401, '未登录')
			// 3. 查找数据库用户是否存在
			req.user = await User.findById(id)
			assert(req.user, 401, '用户不存在1')
			// 校验完成
			await next()
		} catch (err) {
			await next(err)
		}
	}
}