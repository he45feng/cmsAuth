import Dialog from './components//Dialog.vue'
import RoleList from './module/role/List.vue'
import Fun from './module/function/index.vue'
import FunList from './module/function/list.vue'
export default [{
    path: '/rolelist',component:RoleList,
    children: [
    	{path: '',component:Dialog}
    ]
  },{
    path: '/fun',component:Fun
  },{
    path: '/funlist',component:FunList
  }
]
