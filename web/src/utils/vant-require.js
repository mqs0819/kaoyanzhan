import 'vant/lib/index.css';
import Vue from 'vue'
import { DatetimePicker, Popup, CountDown, Uploader, Tag, Cell, CellGroup, List, Divider, Image as VanImage, NavBar, Button, Form, Field, Row, Col, Tabbar, TabbarItem, Search, Icon, Swipe, SwipeItem, Grid, GridItem } from 'vant'

Vue
	.use(Button).use(Form).use(Field).use(Row).use(Col)
	.use(Tabbar).use(TabbarItem).use(Search).use(Icon)
	.use(Swipe).use(SwipeItem).use(Grid).use(GridItem)
	.use(NavBar).use(VanImage).use(Divider).use(List)
	.use(Cell).use(CellGroup).use(Tag).use(Uploader)
	.use(CountDown).use(Popup).use(DatetimePicker)
