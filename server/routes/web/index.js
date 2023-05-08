module.exports = app => {
	const express = require('express')
	const jwt = require('jsonwebtoken')
	const bcrypt = require('bcryptjs')
	const authMiddeware = require('../../middleware/auth')

	const User = require('../../models/User')
	const Category = require('../../models/Category')


	const router = express.Router({
		mergeParams: true
	})

	const School = require('../../models/School')
	// 获取学校列表
	router.get('/schools', authMiddeware(), async (req, res) => {
		// $$('.yz-yxklist-item').map(el => {return {affiliated: $$('.yxk-msg .value', el)[1].innerText,address: $$('.yxk-msg .value',el)[0].innerText,name: $$('.title', el)[0].innerText,logoUrl: $$('img', el)[0].src}})
		const data = await School.find({})
		res.send(data)
	})

	// 获取学校信息
	router.get('/schools/detail', authMiddeware(), async (req, res) => {
		const { name } = req.query
		const data = await School.findOne({ name })
		res.send(data)
	})

	// 查找院校接口
	router.get('/search', async (req, res) => {
		if (req.query.q === "") {
			return res.send(await School.find({}))
		}
		res.send(await School.find({ name: req.query.q }))

	})

	// 更新用户数据
	router.put('/users', async (req, res) => {
		const { username } = req.body
		const data = await User.updateOne({ username })
		res.send(data)
	})

	// 用户登录接口
	router.post('/users', async (req, res) => {
		const { username, password } = req.body
		// 1.校验用户名
		const user = await User.findOne({ username }).select('+password')
		if (!user) { return res.status(422).send({ message: '用户不存在2' }) }
		// 2.校验密码
		const isValid = bcrypt.compareSync(password, user.password)
		if (!isValid) { return res.status(422).send({ message: '密码错误' }) }
		req.session.username = username
		// 3.签发token
		const token = jwt.sign({ id: user._id }, req.app.get('secret'))
		res.send({ token })
	})

	const Ad = require('../../models/Ad')
	router.get('/rest/home/ads', async (req, res) => {
		const items = await Ad.find({ name: '首页轮播图' })
		res.send(items)
	})

	const Article = require('../../models/Article')

	// 新闻列表接口
	router.get('/news/list', async (req, res) => {
		// const parent = await Category.findOne({
		//   name: '新闻分类'
		// }).populate({
		//   path: 'children',
		//   populate: {
		//     path: 'newsList'
		//   }
		// }).lean()
		const parent = await Category.findOne({
			name: '新闻分类'
		})
		const cats = await Category.aggregate([
			{ $match: { parent: parent._id } },
			{
				$lookup: {
					from: 'articles',
					localField: '_id',
					foreignField: 'categories',
					as: 'newsList'
				}
			},
			{
				$addFields: {
					newsList: { $slice: ['$newsList', 5] }
				}
			}
		])
		const subCats = cats.map(v => v._id)
		cats.unshift({
			name: '热门',
			newsList: await Article.find().where({
				categories: { $in: subCats }
			}).populate('categories').limit(5).lean()
		})

		cats.map(cat => {
			cat.newsList.map(news => {
				news.categoryName = (cat.name === '热门')
					? news.categories[0].name : cat.name
				return news
			})
			return cat
		})
		res.send(cats)

	})

	// 导入新闻数据
	router.get('/news/init', async (req, res) => {
		const parent = await Category.findOne({
			name: '新闻分类'
		})
		const cats = await Category.find().where({
			parent: parent
		}).lean()
		const newsTitles = ["夏日新版本“稷下星之队”即将6月上线", "王者荣耀携手两大博物馆 走进稷下学宫", "王者大陆第一学院【稷下】档案", "跨界合作丨控油神装登场，唤醒无限护肤力量！", "像素游戏时代“老四强”重聚《魂斗罗：归来》，新版本、新英雄燃爆两周年庆", "6月11日全服不停机更新公告", "【已修复】王者大陆的端午宝藏活动页面异常问题说明", "6月7日体验服停机更新公告", "6月4日全服不停机更新公告", "关于2019年KPL春季赛总决赛 RNG.M vs eStarPro 补赛、赛果及世界冠军杯安排公告", "活力夏日活动周 王者峡谷好礼多", "王者大陆的端午宝藏活动公告", "峡谷庆端午 惊喜礼不断", "【场里场外，一起开黑】感恩礼包放送", "KPL总决赛来临之际 场里场外一起开黑/观赛活动开启！", "【6月15日 再战西安 · 2019年KPL春季赛总决赛重启公告】", "王者荣耀世界冠军杯荣耀来袭，KPL赛区选拔赛谁能突围而出？", "【关于2019年KPL春季赛总决赛门票退换及异地用户现场观赛补贴公告】", "KRKPL：还在用庄周打辅助？JY边路庄周带你越塔莽！", "世冠KPL赛区战队出征名单公布 王者，无惧挑战！"]
		const newsList = newsTitles.map(title => {
			const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
			return {
				categories: randomCats.slice(0, 2),
				title: title
			}
		})
		await Article.deleteMany({})
		await Article.insertMany(newsList)
		res.send(newsList)
	})

	// 文章列表
	router.get('/articles', async (req, res) => {
		const items = await Article.find()
		res.send(items)
	})

	app.use('/web/api', router)
}