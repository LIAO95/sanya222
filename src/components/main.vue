<template>
  <div class="main">
  	<div class="main-form">
      <h3>三亚免税店游客调查问卷</h3>
      <form-data
          :data="data"
          :field-list="fieldList"
          :rules="rules"
          :list-type-info="listTypeInfo"
          ref="myFormref"      
      ></form-data>
        <el-button class="btn_submitForm btn_s" size="mini" type="primary" @click="submitForm()">提交问卷</el-button> 
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import FormData from './form'

export default {
    components: {FormData},
    data() {
       // const label15 ='您在离开前是否会通过网上免税商城购买免税商品'
       
       // for (let i = 0; i < label15.length; i++) {
       //   console.log("chazhao",label15[i])
       //   if (label15[i] === "前") {
              
       //       const a =label15[i].fontcolor("Red");

       //       console.log("样式：",a)

       //   }

       // }

       // var str = "abcd";function HightLight(e){　　var reg = new RegExp(e, "g")    　　
       //  str = str.replace(reg, function(v){　　　　return v.fontcolor("Red")　　});}HightLight("bc")
       //  console.log("str",str)

       const validateSelect = (rule, value, callback) => {

          console.log('显示无值请选择',value.length)
         console.log("数组",this.fieldList[12])

          if (this.fieldList[12].vshow) {

            if (!value.length) {
              console.log('显示无值请选择')
              callback(new Error('你本次没有购买免税商品的主要原因（最大可选三项）'))
            }else {
              console.log('有值放行')
              callback()
            }
          }else {
              console.log('隐藏不校验')
              callback()
            }                  
        }

      return {
          data:{
            q1:'',//省
            q2:'',//年龄
            q3:'',//性别
            q4:'',//第几次来到三亚
            q5:'',
            q6:'',
            q7:'',
            q8:[],
            q9:'',
            q10:'',
            q11:[],
            q12:[],
            q13:[],
            q14:'',
            q15:'',
            q16:'',
            q17:''
          },
          fieldList: [
           { label: '您来自于哪个省份？', value: 'q1', type: 'select', list: 'q1List', vshow:1,handle:row=>""},
           { label: '您的年龄是', value: 'q2', type: 'Radio', list: 'q2List',vshow:true,handle:row=>""},
           { label: '您的性别是', value: 'q3', type: 'Radio', list: 'q3List',vshow:true,handle:row=>""},
           { label: '这次是您第几次来到三亚购买免税商品？', value: 'q4', type: 'Radio', list: 'q4List',vshow:true,handle:row=>""},  
           { label: '您来三亚是专门为了购买免税商品吗？', value: 'q5', type: 'Radio', list: 'q5List',vshow:true,handle:row=>""},
           { label: '你此次三亚之行是否购买了免税商品', value: 'q6', type: 'Radio', list: 'q6List',vshow:true,handle:this.q6click},


           { label: '您此次购买免税商品的主要方式是？', value: 'q7', type: 'Radio', list: 'q7List', prop:'prop',handle:row=>""},
           { label: '您本次购买了哪类产品？（最大可选三项）', value: 'q8', type: 'checkbox', list: 'q8List' },
           { label: '您本次购买免税商品的花费是', value: 'q9', type: 'Radio', list: 'q9List',handle:row=>"" },
           { label: '您本次购买免税商品的花费是否低于您来之前的购物预算', value: 'q10', type: 'Radio', list: 'q10List',handle:this.q10click },
           { label: '本次购物花费低于预算的主要原因是?（最大可选三项）', value: 'q11', type: 'checkbox', list: 'q11List',},
           { label: '超过预算的主要原因是', value: 'q12', type: 'checkbox', list: 'q12List' },

           { label: '你本次没有购买免税商品的主要原因（最大可选三项）', value: 'q13', type: 'checkbox', list: 'q13List',},

           { label: '您本次在免税店停留了多长时间？', value: 'q14', type: 'Radio', list: 'q14List' ,vshow:true,handle:row=>""},
           { label: '您在离开三亚前是否会通过网上免税商城购买免税商品', value: 'q15', type: 'Radio', list: 'q15List',vshow:true,handle:row=>""},
           { label: '您在离开三亚后是否会通过网上免税商城购买免税商品', value: 'q16', type: 'Radio', list: 'q16List',vshow:true,handle:row=>"" },
           { label: '您是否会推荐您的亲朋好友来三亚购买免税商品', value: 'q17', type: 'Radio', list: 'q17List' ,vshow:true,handle:row=>""}, 
          ],

         listTypeInfo: {
            q1List:[
              {label: '安徽', value: '安徽' },
              {label: '北京', value: '北京' },
              {label: '重庆', value: '重庆' },
              {label: '福建', value: '福建' },
              {label: '甘肃', value: '甘肃' },
              {label: '广东', value: '山西省' },
              {label: '广西', value: '广西' },
              {label: '贵州', value: '贵州' },
              {label: '海南', value: '海南' },
              {label: '河北', value: '河北' },
              {label: '黑龙江', value: '黑龙江' },
              {label: '河南', value: '河南' },
              {label: '香港', value: '香港' },
              {label: '湖北', value: '湖北' },
              {label: '湖南', value: '湖南' },
              {label: '江苏', value: '江苏' },
              {label: '江西', value: '江西' },
              {label: '吉林', value: '吉林' },
              {label: '辽宁', value: '辽宁' },
              {label: '宁夏', value: '宁夏' },
              {label: '青海', value: '青海' },
              {label: '山东', value: '山东' },
              {label: '上海', value: '上海' },
              {label: '山西', value: '山西' },
              {label: '陕西', value: '陕西' },
              {label: '四川', value: '四川' },
              {label: '台湾', value: '台湾' },
              {label: '天津', value: '天津' },
              {label: '新疆', value: '新疆' },
              {label: '西藏', value: '西藏' },
              {label: '云南', value: '云南' },
              {label: '浙江', value: '浙江' },
              {label: '海外', value: '海外' },
            ], 
            q2List: [
              { label: '18~28岁', value: '18~28岁' },
              { label: '29~40岁', value: '29~40岁' }, 
              { label: '41~55岁', value: '41~55岁' },
              { label: '56~65岁', value: '56~65岁' },
              { label: '56~66岁及以上', value: '56~66岁及以上' }
                 
            ],
            q3List: [
              { label: '男', value: '男'},
              { label: '女', value: '女'}, 
            ],
            q4List: [
              { label: '第1次', value: "第1次" },
              { label: '第2次', value: "第2次" },
              { label: '第3次', value: "第3次" },
              { label: '4次及以上', value: "4次及以上" },
            ],
            q5List: [
              { label: '是', value: '是' },
              { label: '否', value: '否' }, 
            ],
            q6List: [
              { label: '是', value: '是' },
              { label: '否', value: '否' }, 
            ],
            q7List: [
              { label: '线上官方商城为主', value: '线上官方商城为主' },
              { label: '线下实体店为主', value: '线下实体店为主' },
              { label: '两者都有', value: '两者都有' },
            ],
            q8List: [
              { label: '美妆', value: '美妆' },
              { label: '香水', value: '香水' },
              { label: '腕表', value: '腕表' },
              { label: '箱包', value: '箱包' },
              { label: '鞋帽', value: '鞋帽' },
              { label: '服装服饰 ', value: '服装服饰 ' },
              { label: '电子设备 ', value: '电子设备 ' },
              { label: '其他 ', value: '其他 ' },
            ],
            q9List: [
              { label: '1000以下', value: '1000以下' },
              { label: '1000~3000元', value: '1000~3000元' },
              { label: '3000~5000元', value: '3000~5000元' },
              { label: '5000~8000元', value: '5000~8000元' },
              { label: '8000~10000元', value: '8000~10000元' },
              { label: '10000~20000元', value: '10000~20000元' },
              { label: '20000元以上', value: '20000元以上' },
            ],
            q10List: [
              { label: '是，低于我的预算', value: '是，低于我的预算' },
              { label: '否，高于我的预算', value: '否，高于我的预算' },
              { label: '跟我的预算相符', value: '跟我的预算相符' },
            ],
            q11List: [
              { label: '优惠力度不大', value: '优惠力度不大' },
              { label: '品类不丰富', value: '品类不丰富' },
              { label: '购物环境不舒服', value: '购物环境不舒服' },
              { label: '结账排队人太多', value: '结账排队人太多' },
              { label: '服务人员态度及业务技能差', value: '服务人员态度及业务技能差' },
              { label: '免税购物城休闲设施不齐全', value: '免税购物城休闲设施不齐全' },
              { label: '其他 ', value: '其他 ' },
            ],
            q12List: [
              { label: '优惠力度大', value: '优惠力度大' },
              { label: '价格便宜', value: '价格便宜' },
              { label: '品类丰富', value: '品类丰富' },
              { label: '购物环境舒服', value: '购物环境舒服' },
              { label: '服务人员态度好', value: '服务人员态度好' },
              { label: '免税购物城各类设施齐全', value: '免税购物城各类设施齐全' },
              { label: '其他 ', value: '其他 ' },
            ],

            q13List: [
              { label: '没打算买，进来看看', value: '没打算买，进来看看' },
              { label: '优惠力度不大', value: '优惠力度不大' }, 
              { label: '价格不便宜', value: '价格不便宜' },
              { label: '品类不丰富', value: '品类不丰富' },
              { label: '购物环境嘈杂、不舒服', value: '购物环境嘈杂、不舒服' },
              { label: '排队人太多、结账太耗时', value: '排队人太多、结账太耗时' },
              { label: '服务人员态度及业务技能差', value: '服务人员态度及业务技能差' },
              { label: '免税购物城休闲设施不齐全', value: '免税购物城休闲设施不齐全' },
              { label: '其他 ', value: '其他 ' },
              //{ label: '其他', value: '其他',type:'other' },
            ],
            q14List: [
              { label: '30分钟以下', value: '30分钟以下' },
              { label: '30分钟~60分钟', value: '30分钟~60分钟' },
              { label: '60分钟~90分钟', value: '60分钟~90分钟' },
              { label: '大于90分钟', value: '大于90分钟' }
            ],
            q15List: [
              { label: '会', value: '会' },
              { label: '不会', value: '不会' },
              { label: '不一定', value: '不一定' }
            ],
            q16List: [
              { label: '会', value: '会' },
              { label: '不会', value: '不会' },
              { label: '不一定', value: '不一定' }
            ],
            q17List: [
              { label: '会', value: '会' },
              { label: '不会', value: '不会' },
            ],

          },
         rules: {
          q1: [
            {required: true, message: '请选择您来自于哪个省份？', trigger: 'change' }
          ],
          q2: [
            {required: true, message: '请选择您的年龄段', trigger: 'change' }
          ],
          q3: [
            {required: true, message: '请选择您的性别', trigger: 'change' }
          ],
          q4: [
            {required: true, message: '请选择这次是您第几次来到三亚购买免税商品？', trigger: 'change' }
          ],
          q5: [
            {required: true, message: '请选择您来三亚是专门为了购买免税商品吗？', trigger: 'change' }
          ],
          q6: [
            {required: true, message: '请选择你此次三亚之行是否购买了免税商品', trigger: 'change' }
          ],
          q7: [
            {required: true, message: '请选择您此次购买免税商品的主要方式是？', trigger: 'change' }
          ],
          q8: [
            {required: true, message: '请选择您本次购买了哪类产品？', trigger: 'change' }
          ],
          q9: [
            {required: true, message: '请选择您本次购买免税商品的花费是', trigger: 'change' }
          ],
          q10: [
            {required: true, message: '请选择您本次购买免税商品的花费是否低于您来之前的购物预算', trigger: 'change' }
          ],
          q11: [
            {required: true, message: '请选择本次购物花费低于预算的主要原因是', trigger: 'change',}
          ],
          q12: [
            {required: true, message: '请选择超过预算的主要原因是', trigger: 'change',}
          ],
          q13: [
            {required: true, trigger: 'change',validator: validateSelect,}
          ],
          q14: [
            {required: true, message: '请选择您本次在免税店停留了多长时间？', trigger: 'change',}
          ],
          q15: [
            {required: true, message: '请选择您在离开三亚前是否会通过网上免税商城购买免税商品', trigger: 'change',}
          ],
          q16: [
            {required: true, message: '请选择您在离开三亚后是否会通过网上免税商城购买免税商品', trigger: 'change',}
          ],
          q17: [
            {required: true, message: '请选择您是否会推荐您的亲朋好友来三亚购买免税商品', trigger: 'change',}
          ],
         },   
      }

   },
   computed: {
    dateRange () {
      const { q6, q10 } = this.data
      return {
        q6,
        q10
      }
    }
  },

   watch: { 
      dateRange (val) {
      console.log('监听',val)

      if(val.q6 === '否') 
        // { this.fieldList[6].show = true }
        {
          const rule = [ 12]         
          this.fieldList.forEach((c, i) => { rule.includes(i) && ( c.vshow = true ) })
        }else{
          const rule = [ 12]         
          this.fieldList.forEach((c, i) => { rule.includes(i) && ( c.vshow = false ) })
        }

        if(val.q6 === '是') 
        {
          const rule = [ 6,7,8,9,10,11,]         
          this.fieldList.forEach((c, i) => { rule.includes(i) && ( c.vshow = true ) })
        }else{
          const rule = [ 6,7,8,9,10,11]          
          this.fieldList.forEach((c, i) => { rule.includes(i) && ( c.vshow = false ) })
        }


        if (val.q6 === '是' && val.q10 === '是，低于我的预算') {
          const rule = [10]         
          this.fieldList.forEach((c, i) => { rule.includes(i) && ( c.vshow = true ) })
        }else{
          const rule = [10]         
          this.fieldList.forEach((c, i) => { rule.includes(i) && ( c.vshow = false ) })
        }

        if (val.q6 === '是' && val.q10 === '否，高于我的预算') {
          const rule = [11]         
          this.fieldList.forEach((c, i) => { rule.includes(i) && ( c.vshow = true ) })
        }else{
          const rule = [11]         
          this.fieldList.forEach((c, i) => { rule.includes(i) && ( c.vshow = false ) })
        }
    }

  },
  // mounted() {
    
  //   this.labelBold()

  // },
   methods:{

    dataForamt(data) { 
      let newData = {} 

       for(let i in data){
         if(data[i].length > 0 || data[i] ) { 
          newData[i] = data[i]  
         } 
       }  return newData 
     },

    // check(){ 
    //    let flag;
    //    for ( let key in this.data )
    //     { 
    //       if(!this.data[key] || this.data.length === 0) { 
    //         flag = ture 
    //       }  
    //       if(flag){
    //        return  
    //       }
    //     }  
    //         return flag 
    // },

    q6click(){
      console.log("点击6")
      this.data.q7 = '';
      this.data.q9 = '';
      this.data.q10 = '';
      this.data.q8 = [];
      this.data.q13 = [];
    },
    q10click(){
      console.log("点击10")
      this.data.q11 = [];
      this.data.q12 = [];
    },

    submitForm(){ 

      console.log("过滤",this.dataForamt(this.data))
      this.$refs['myFormref'].$refs['ruleForm'].validate((valid) => {

          if (valid) {
            //alert('submit!');
        axios({
          method: 'post',
          url:'http://followme.tpddns.cn:18091/single-questionnaire/api/result/saveResult',
          //url: 'http://192.168.0.170:8090/questionnaire/api/result/saveResult',
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          data: this.dataForamt(this.data)
        })
          .then((res) => {
            console.log(res)           

            if (res.data.message=='success') {
                alert("提交成功")
               //window.location.reload();
               this.$router.push('/complete')
            }

          })
          .catch((err) => {
            console.log(err)
          });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
         
      }
    },
  
}
</script>

<style lang="scss">
html,body{padding: 0;margin: 0;font-size: 16px;}
body{background: #f5f5f5;}
.main{max-width: 992px;margin: 0 auto;margin-bottom: 50px;}
.main-form{    background: #fff; margin: 0 10px;padding: 0px 15px 15px 15px;}
.main h3{text-align: center; margin: 15px auto;  padding-top: 15px;}
.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{ display: nome!important;   content: '*';color: #F56C6C;margin-right: 4px;}
.el-button.btn_s{  width: 120px;font-size: 16px;  margin: 0 auto;text-align: center;display: block;}
.el-form-item__label .el-form-item{font-size: 16px!important;}
</style>