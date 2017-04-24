<template>
  <div id="homepage">
    <div class="pagePad">
    	<el-row :gutter="20">
        <el-col :span="5">
          <div class="part bg-white" id="workApply">
            <div class="part-head clearfix">
              <div class="clearfix">
                <div class="title f-l">业务申请</div>
                <a href="javascript:;" class="more f-r">更多>></a>
              </div>
            </div>
            <div class="part-body">
              <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <!-- <el-submenu index="1">
                  <template slot="title"><i class="el-icon-message"></i>导航一</template>
                  <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu> -->
                <el-menu-item index="1"><i class="el-icon-menu"></i>合同审查</el-menu-item>
                <el-menu-item index="2"><i class="el-icon-menu"></i>隔离墙名单管理</el-menu-item>
                <el-menu-item index="3"><i class="el-icon-setting"></i>签报流程</el-menu-item>
                <el-menu-item index="4"><i class="el-icon-setting"></i>反洗钱大额</el-menu-item>
                <el-menu-item index="5"><i class="el-icon-setting"></i>员工证券投资行为审查</el-menu-item>
                <el-menu-item index="6"><i class="el-icon-setting"></i>合规检测</el-menu-item>
              </el-menu>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <!-- <div class="bg-white">
            <el-row>
              <el-col :span="12">
                <div class="part" id="KPI">
                  <div class="part-head clearfix">
                    <div class="clearfix">
                      <div class="title f-l">营业KPI</div>
                    </div>
                  </div>
                  <div class="part-body">
                    <div class="clearfix kpiBox" v-model="kpiScoreData">
                      <div class="kpiItem">
                        <div class="kpiScoreBox">
                          <span class="kpiScore">{{kpiScoreData.kpi_jgcf}}</span>分
                        </div>
                        <div>主管机关处罚</div>
                      </div>
                      <div class="kpiItem">
                        <div class="kpiScoreBox">
                          <span class="kpiScore">{{kpiScoreData.kpi_nbgk}}</span>分
                        </div>
                        <div>内部管控</div>
                      </div>
                      <div class="kpiItem">
                        <div class="kpiScoreBox">
                          <span class="kpiScore">{{kpiScoreData.kpi_tsjf}}</span>分
                        </div>
                        <div>投诉与纠纷</div>
                      </div>
                      <div class="kpiItem">
                        <div class="kpiScoreBox">
                          <span class="kpiScore">{{kpiScoreData.kpi_fmyx}}</span>分
                        </div>
                        <div>媒体负面影响</div>
                      </div>
                      <div class="kpiItem">
                        <div class="kpiScoreBox">
                          <span class="kpiScore">{{kpiScoreData.kpi_fxsj}}</span>分
                        </div>
                        <div>合规风险事件</div>
                      </div>
                    </div>
                    <div>
                      <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                          prop="date"
                          label="日期"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          prop="address"
                          label="地址">
                        </el-table-column>
                      </el-table>
                      <div class="rankBox clearfix">
                        <div class="rankBt f-l"><i class="el-icon-arrow-up"></i></div>
                        <div class="clearfix rankDetail">
                          <div class="f-l"><i class="el-icon-menu"></i><span>排名详情</span></div>
                          <div class="f-r">
                            全国所有营业厅排第<span class="rankNum">20</span>名
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="part" id="map">
                  <div class="part-body">
                    <div class="sellBox clearfix">
                      <el-input
                        placeholder="输入营业厅名称"
                        icon="search"
                        v-model="sellSea"
                        :on-icon-click="sellSeaClick">
                      </el-input>
                    </div>
                    <div class="chinaMap-bg"></div>
                  </div>
                </div>
                <div class="part" id="emControl">
                  <div class="part-head">
                    <div class="clearfix">
                      <div class="title f-l">员工开户监控</div>
                      <a href="javascript:;" class="more f-r">更多>></a>
                    </div>
                  </div>
                  <div class="part-body"></div>
                </div>
              </el-col>
            </el-row>
          </div> -->
          <div class="bannerBox">
            <el-carousel height="465px">
              <el-carousel-item>
                <img src="./images/banner1.png" alt="">
                <div class="text">这是一张图片</div>
              </el-carousel-item>
              <el-carousel-item>
                <img src="./images/banner2.png" alt="">
              </el-carousel-item>
              <el-carousel-item>
                <img src="./images/banner3.png" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="part bg-white" id="msgNotice">
            <div class="part-head clearfix">
              <div class="clearfix">
                <div class="title f-l">信息公告</div>
                <a href="javascript:;" class="more f-r">更多>></a>
              </div>
            </div>
            <div class="part-body">
              <div style="padding:20px 0;">
                <ul class="ver-newsUl">
                  <li>
                    <div class="new-head">2017年2月经纪业务异地监管信息简报</div>
                    <div class="new-body">法律合规部</div>
                    <div class="new-foot">2017-04-20</div>
                  </li>
                  <li>
                    <div class="new-head">法律法规准则追踪动态简报</div>
                    <div class="new-body">法律合规部</div>
                    <div class="new-foot">2017-04-20</div>
                  </li>
                  <li>
                    <div class="new-head">《风险控制月度简报》2012年1月总第93期</div>
                    <div class="new-body">法律合规部</div>
                    <div class="new-foot">2017-04-20</div>
                  </li>
                  <li>
                    <div class="new-head">月度经营简报2017年2月份总第208期</div>
                    <div class="new-body">法律合规部</div>
                    <div class="new-foot">2017-04-20</div>
                  </li>
                  <li>
                    <div class="new-head">第五届董事会</div>
                    <div class="new-body">法律合规部</div>
                    <div class="new-foot">2017-04-20</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="bg-white">
            <el-row>
              <el-col :span="12">
                <div class="part" id="KPI">
                  <div class="part-head clearfix">
                    <div class="clearfix">
                      <div class="title f-l">营业KPI</div>
                    </div>
                  </div>
                  <div class="part-body">
                    <div class="clearfix kpiBox" v-model="kpiScoreData">
                      <div class="kpiItem">
                        <div class="kpiScoreBox">
                          <span class="kpiScore">{{kpiScoreData.kpi_jgcf}}</span>分
                        </div>
                        <div>主管机关处罚</div>
                      </div>
                      <div class="kpiItem">
                        <div class="kpiScoreBox">
                          <span class="kpiScore">{{kpiScoreData.kpi_nbgk}}</span>分
                        </div>
                        <div>内部管控</div>
                      </div>
                      <div class="kpiItem">
                        <div class="kpiScoreBox">
                          <span class="kpiScore">{{kpiScoreData.kpi_tsjf}}</span>分
                        </div>
                        <div>投诉与纠纷</div>
                      </div>
                      <div class="kpiItem">
                        <div class="kpiScoreBox">
                          <span class="kpiScore">{{kpiScoreData.kpi_fmyx}}</span>分
                        </div>
                        <div>媒体负面影响</div>
                      </div>
                      <div class="kpiItem">
                        <div class="kpiScoreBox">
                          <span class="kpiScore">{{kpiScoreData.kpi_fxsj}}</span>分
                        </div>
                        <div>合规风险事件</div>
                      </div>
                    </div>
                    <div class="tbBox">
                      <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                          prop="date"
                          label="日期"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          prop="address"
                          label="地址">
                        </el-table-column>
                      </el-table>
                      <div class="rankBox clearfix">
                        <div class="rankBt f-l"><i class="el-icon-arrow-up"></i></div>
                        <div class="clearfix rankDetail">
                          <div class="f-l"><i class="el-icon-menu"></i><span>排名详情</span></div>
                          <div class="f-r">
                            全国所有营业厅排第<span class="rankNum">20</span>名
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="part" id="map">
                  <div class="part-body">
                    <div class="sellBox clearfix">
                      <el-input
                        placeholder="输入营业厅名称"
                        icon="search"
                        v-model="sellSea"
                        :on-icon-click="sellSeaClick">
                      </el-input>
                    </div>
                    <div class="chinaMap-bg"></div>
                  </div>
                </div>
                <div class="part" id="emControl">
                  <div class="part-head">
                    <div class="clearfix">
                      <div class="title f-l">员工开户监控</div>
                      <a href="javascript:;" class="more f-r">更多>></a>
                    </div>
                  </div>
                  <div class="part-body">
                    <div class="clearfix" style="padding:20px 0;">
                      <div class="f-l" style="font-size:22px;">二月</div>
                      <div class="f-r" style="color:#aaa;">2017年2月23日</div>
                    </div>
                    <div class="monthDate">
                      <div class="bt bt-prev"><i class="el-icon-arrow-left"></i></div>
                      <div class="bt bt-next"><i class="el-icon-arrow-right"></i></div>
                      <div class="dateBox">
                        <ul class="clearfix">
                          <li>
                            <div class="dateNum">1</div>
                            <div class="dateState">正常</div>
                          </li>
                          <li>
                            <div class="dateNum">2</div>
                            <div class="dateState">正常</div>
                          </li>
                          <li>
                            <div class="dateNum">3</div>
                            <div class="dateState">正常</div>
                          </li>
                          <li>
                            <div class="dateNum">4</div>
                            <div class="dateState">正常</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top:20px;">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="part bg-white" id="lawTrend">
                  <div class="part-head clearfix">
                    <div class="clearfix">
                      <div class="title f-l">法规动态</div>
                      <a href="javascript:;" class="more f-r">更多>></a>
                    </div>
                  </div>
                  <div class="part-body">
                    <div>
                      <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="全部" name="first">
                          <div>
                            <ul class="hori-newsUl">
                              <li>
                                <div class="f-r new-right">最新</div>
                                <div class="f-r new-mid">2017-04-12</div>
                                <div class="new-left"><div class="ellipsis">会计监管风险提示第5号——上市公司股权交易资产评估</div></div>
                              </li>
                              <li>
                                <div class="f-r new-right">最热</div>
                                <div class="f-r new-mid">2017-04-12</div>
                                <div class="new-left"><div class="ellipsis">上市公司并购重组审核工作规程（2016年3月25日修订）</div></div>
                              </li>
                              <li>
                                <div class="f-r new-right"></div>
                                <div class="f-r new-mid">2017-04-12</div>
                                <div class="new-left"><div class="ellipsis">公开发行证券公司信息披露编报规则第15号——财务报告的一般规定</div></div>
                              </li>
                              <li>
                                <div class="f-r new-right"></div>
                                <div class="f-r new-mid">2017-04-12</div>
                                <div class="new-left"><div class="ellipsis">财务信息披露解释性公告第1号——非经常性损益（2008）</div></div>
                              </li>
                              <li>
                                <div class="f-r new-right"></div>
                                <div class="f-r new-mid">2017-04-12</div>
                                <div class="new-left"><div class="ellipsis">会计监管风险提示第5号——上市公司股权交易资产评估</div></div>
                              </li>
                            </ul>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="行政法规" name="second">行政法规</el-tab-pane>
                        <el-tab-pane label="自律规则" name="third">自律规则</el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="part bg-white" id="lawTeach">
                  <div class="part-head clearfix">
                    <div class="clearfix">
                      <div class="title f-l">法规教育</div>
                      <a href="javascript:;" class="more f-r">更多>></a>
                    </div>
                  </div>
                  <div class="part-body">
                    <el-tabs v-model="activeName2" @tab-click="handleClick">
                      <el-tab-pane label="培训信息" name="trainMsg">
                        <div>
                          <ul class="hori-newsUl">
                            <li>
                              <div class="f-r new-right">最新</div>
                              <div class="f-r new-mid">2017-04-12</div>
                              <div class="new-left"><div class="ellipsis">上海证券交易上海证券交易上海证券交易上海证券交易</div></div>
                            </li>
                            <li>
                              <div class="f-r new-right">最热</div>
                              <div class="f-r new-mid">2017-04-12</div>
                              <div class="new-left"><div class="ellipsis">上海证券交易上海证券交易上海证券交易上海证券交易</div></div>
                            </li>
                            <li>
                              <div class="f-r new-right"> </div>
                              <div class="f-r new-mid">2017-04-12</div>
                              <div class="new-left"><div class="ellipsis">上海证券交易上海证券交易上海证券交易上海证券交易</div></div>
                            </li>
                            <li>
                              <div class="f-r new-right"> </div>
                              <div class="f-r new-mid">2017-04-12</div>
                              <div class="new-left"><div class="ellipsis">上海证券交易上海证券交易上海证券交易上海证券交易</div></div>
                            </li>
                            <li>
                              <div class="f-r new-right"> </div>
                              <div class="f-r new-mid">2017-04-12</div>
                              <div class="new-left"><div class="ellipsis">上海证券交易上海证券交易上海证券交易上海证券交易</div></div>
                            </li>
                          </ul>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="培训资料" name="trainData">培训资料</el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import 'common/css/reset2.css';
	export default {
  	name: 'homepage',
  	data(){
  		return{
  			kpiScoreData : {
          kpi_jgcf:9,
          kpi_nbgk:2,
          kpi_tsjf:101,
          kpi_fmyx:9,
          kpi_fxsj:9
        },
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
        activeName:"first",
        activeName2:"trainMsg",
        sellSea:""
  		}
  	},
  	methods:{
  		exit(){
        window.localStolage["isLogin"]="";
        location.href="module/login.html";
      },
      sellSeaClick(){
        
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  	}
	}
</script>

<style>
  /*----------public-----------*/
  a,a:focus{
    text-decoration: none;
  }
  ul,li{
    list-style: none;
  }
  .clearfix:after{
    content: "";
    display: table;
    clear: both;
  }
  .f-l{
    float: left;
  }
  .f-r{
    float: right;
  }
  .bg-white{
    background-color: #fff;
  }
  .ellipsis{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .part{
    padding: 0 20px;
  }
  /*----------content-----------*/
  .el-carousel{
    overflow: hidden;
  }
  .pagePad{
    padding:10px 20px;
  }
  .pagePad>.el-row{
    margin: 10px 0;
  }
  .part-head>div{
    padding: 18px 0 12px 0;
    border-bottom: 1px solid #e2e2e2;
  }
  .part-head .title{
    padding-left: 20px;
    font-size: 18px;
    border-left: 4px solid #d4b886;
  }
  .more{
    color:#d4b886;
  }
  .bannerBox img{
    display: block;
    height: 465px;
    border:0;
    margin:0;
    padding: 0;
  }
  .el-carousel__item .text{
    position: absolute;
    top:100px;
    left: 50px;
    font-size: 30px;
    color: #fff;
  }
  #workApply .part-body>.el-menu{
    background-color: #fff;
  }
  #workApply .part-body>.el-menu>.el-menu-item{
    border-top: 1px solid #e2e2e2;
    border-left: 6px solid #b5cdec;
  }
  #workApply .part-body>.el-menu>.el-menu-item:first-child{
    border-top: 0;
  }
  #workApply .el-menu-item,#workApply .el-submenu__title{
    height: 70px;
    line-height: 70px;
  }
  .kpiBox{
    margin: 10px 0;
  }
  .kpiItem{
    display: inline-block;
    margin:10px 20px;
  }
  .kpiItem .kpiScoreBox{
    text-align: center;
    color: #619ef1;
    border-bottom: 1px solid #619ef1;
    margin-bottom: 5px;
  }
  .kpiItem .kpiScore{
    font-size: 36px;
  }
  #KPI .tbBox{
    margin-top: 40px;
  }
  .sellBox{
    margin-top: 24px;
    margin-bottom: 4px;
  }
  .sellBox>.el-input{
    float: right;
    width: 220px;
  }
  .rankBt{
    width: 32px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background-color: #ba9c68;
    color: #fff;
  }
  .rankDetail{
    margin-left: 32px;
    line-height: 44px;
    padding: 0 10px;
    color: #eee;
    background-color: #d4b886;
  }
  .rankDetail .el-icon-menu{
    margin:0 5px;
  }
  .rankDetail .rankNum{
    padding: 0 10px;
    font-size: 30px;
  }
  .chinaMap-bg{
    width: 475px;
    height: 344px;
    background: url(./images/chinaMap.png);
    margin:5px auto;
  }
  .monthDate{
    position: relative;
    padding: 0 50px;
  }
  .monthDate>.bt{
    position: absolute;
    width: 30px;
    height: 50px;
    line-height: 50px;
    top:50%;
    margin-top: -25px;
    text-align: center;
    background-color: #ccc;
    color:#fff;
    cursor: pointer;
  }
  .monthDate>.bt-prev{
    left: 0;
  }
  .monthDate>.bt-next{
    right: 0;
  }
  .monthDate .dateBox{
    overflow: hidden;
  }
  .monthDate .dateBox ul{
    padding: 20px 0;
  }
  .monthDate .dateBox li{
    margin: 0 10px;
    color:#518bd3;
    float: left;
  }
  .monthDate .dateBox li.error{
    color:#fd1533;
  }
  .monthDate .dateBox .dateNum{
    font-size: 28px;
    line-height: 30px;
  }
  .monthDate .dateBox .dateState{
    line-height: 20px;
  }
  .ver-newsUl>li{
    padding:5px 0;
  }
  .ver-newsUl .new-head{
    line-height: 22px;
    font-weight: bold;
  }
  .ver-newsUl .new-body{
    line-height: 16px;
    color:#666;
  }
  .ver-newsUl .new-foot{
    line-height: 22px;
    color:#666;
  }
  .hori-newsUl>li{
    height: 30px;
    line-height: 30px;
  }
  .hori-newsUl .new-right{
    width: 60px;
    min-height: 2px;
    text-align: center;
    color:#c00;
  }
  .hori-newsUl .new-mid{
    width: 100px;
    text-align: center;
  }
  .hori-newsUl .new-left{
    margin-right: 180px;
  }
  .hori-newsUl .text>div{
    width: 100%;
  }
</style>
