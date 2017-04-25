import Homepage from './module/homepage/Homepage.vue'
import RoleList from './module/role/List.vue'
import Member from './module/role/Member.vue'
import Fun from './module/function/index.vue'
import FunList from './module/function/list.vue'
export default [{
    path: '/rolelist',component:RoleList
  },{
    path: '/member',component:Member
  },{
    path: '/fun',component:Fun
  },{
    path: '/funlist',component:FunList
  },{
    path: '/homepage',component:Homepage
  }
]
