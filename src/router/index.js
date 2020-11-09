import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/home.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    {  path:'/', redirect:'/login' },
    {  path:'/Login', component: Login },
    {  path:'/Home', component: Home }
  ]
})
router.beforeEach((to, from, next)=>{
  //to  将要访问的路径
  //from 跳转前的路径
  //next 放行路径
if(to.path == '/login') return next();
const tokenStr = window.sessionStorage.getItem("token")
if( !tokenStr) return next('/login')
next();

})
export default router;