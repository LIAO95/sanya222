<template>
	<div class="customs show">
		 <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" size="mini" label-width="100px" class="demo-dynamic">
		  <el-form-item
		    v-for="(domain, index) in dynamicValidateForm.domains"
		    :label="'条件' + (index+1)"
		    :key="domain.key"
		    :prop="'domains.' + index + '.selectData'"
		  >
		    <el-select v-model="domain.selectData" @change="selectQuestionNumber($event)"  placeholder="请选择" >
			    <el-option
			      v-for="(item,index) in domain.options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
        <el-select v-model="domain.selectData2"  placeholder="请选择" style="margin: 0 15px;">
          <el-option
            v-for="item in domain.options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
		  </el-form-item>
		  <el-form-item>
		   <!--  <el-button type="primary" @click="submitForm('dynamicValidateForm')">查询</el-button> -->
        <el-button type="primary" @click="getecharts">查询</el-button>
		    <el-button @click="addDomain(add)">新增条件</el-button>
		    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        <el-button class="ondDownload" type="primary"  size="mini" @click="ondDownload" style=" margin-bottom: 20px;">数据下载</el-button>
		  </el-form-item>
		</el-form>
		<!-- <show-echarts></show-echarts> -->
    <div class="Echarts">
      <el-row :gutter="10">
        <el-col  :sm="24" :md="12">
           <div id="Bar" style="width: 600px;height:400px;"></div>
        </el-col>
        <el-col  :sm="24" :md="12">
           <div id="pie" style="width: 600px;height:400px;"></div>
        </el-col>
      </el-row>
     </div>

	</div>
</template>
<script>
// import ShowEcharts from './Echarts'
import echarts from 'echarts'
import axios from 'axios'
export default {
    // components: {ShowEcharts},
    data() {
      return {
        dynamicValidateForm: {
          domains: [{
            key:'q1',
            selectData: '',
            options:[], 
            selectData2: '',
            options2:[],            
          }],
        },
        add:[] 
	  }

},
  created() { 	
	  this.getoptions();
	},
  // mounted() {
  //   this.getecharts();
  // },
    methods: {
      myEcharts(arr1,arr2,arr3){
      var barChart = this.$echarts.init(document.getElementById('Bar'));
      var pieChart = this.$echarts.init(document.getElementById('pie'));
      var BarOption = {

        tooltip: {},
        xAxis: {
          data: arr1
        },
        yAxis: {},
        series: [{
          type: 'bar',
          data: arr2
        }]
      };
      var pieOption = {
          legend:{
            left:'right',
          },
        series : [
                    {
                        type: 'pie',
                        radius: '50%',
                        itemStyle: {
                      normal: {
                          shadowBlur: 200,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  },
                        data:arr3
                    }
                ]
      };
      barChart.setOption(BarOption);
      pieChart.setOption(pieOption);
      },
      ondDownload() {
        window.open('http://192.168.0.185:8090/questionnaire/api/result/downloadExcelByCustomise')
      },
      getecharts(){

        const domainsData=this.dynamicValidateForm.domains

        const SelectDomainsData=[];


        for (var i = 0; i < domainsData.length; i++) {

          const d = {}

          d["answerCom1"]=domainsData[i].selectData;
          d["answerCom2"]=domainsData[i].selectData2;
          SelectDomainsData.push(d)

          console.log("answerCom1",domainsData[i].selectData)
          console.log("answerCom2",domainsData[i].selectData2)
        }

          console.log("SelectDomainsData",SelectDomainsData)

          axios({
            method: 'post',
            url:'http://192.168.0.185:8090/questionnaire/api/result/findExcelByCustomise',
            data:SelectDomainsData,
            headers: {'Content-Type': 'application/json'}
          }).then((res) => {
            //请求成功
            console.log("返回值",res.data)



            
            for (var i = 0; i < Things.length; i++) {
              Things[i]
            }


            

           //  res.data.forEach(function(item, index) {
           //  console.log("item",item)
           // })
            const arr1 = []
            const arr2 = []
            const arr3 = []

            for (var i = 0; i < res.data.length; i++) {
              arr1[i]=res.data[i].answer_content
              arr2[i]=res.data[i].pick_num

              const m = {};
              m["value"]=res.data[i].pick_num
              m["name"]=res.data[i].answer_content               
              arr3.push(m);
            } 
            this.myEcharts(arr1,arr2,arr3);           
                  
          }).catch((err) => {
            //请求失败
            console.log("请求失败",err)
          })
      },
      ondDownload() {
        window.open('http://192.168.0.185:8090/questionnaire/api/result/downloadExcel')
      },
      getoptions(){              
		      axios({
			      method: 'get',
			      url:'http://192.168.0.185:8090/questionnaire/api/result/getQuestionAll',
			      headers: {'Content-Type': 'application/json'}
			    }).then((res) => {
			      //请求成功
            const  add= []       
			      for (var i = 0; i < res.data.length; i++) {                 
              const m={};
              m['value']=res.data[i].question_number
              m['label']=res.data[i].question_content
              add.push(m)                       
			      }                    
                this.add=add
                const domainsList = this.dynamicValidateForm.domains
                for (var i = 0; i < domainsList.length; i++) {
                  this.dynamicValidateForm.domains[i].options = add 
                }        		      
			    }).catch((err) => {
			      //请求失败
			      console.log("请求失败",err)
			    })
      },
      selectQuestionNumber(val){
         //console.log("val:",val)
         if(val != null && val != '' && val != undefined){
          //selectGoodsByGroupId(val)
          axios({
            method: 'get',
            //url:'http://192.168.0.170:8090/questionnaire/api/result/getQuestionAll',
            url:'http://192.168.0.185:8090/questionnaire/api/result/getAnswerByQuestionNumber',
            params:{
              questionNumber:val,
            },
            headers: {'Content-Type': 'application/json'}
          })
            .then(res => {
              console.log(val,"答案：",res.data)
              const options=[];
              
            for (var i = 0; i < res.data.length; i++) {                 
                    const m={};
                    m['value']=res.data[i].answer_content
                    m['label']=res.data[i].answer_content
                    options.push(m)
            }
              const domainsList = this.dynamicValidateForm.domains
                for (var i = 0; i < domainsList.length; i++) {
                  this.dynamicValidateForm.domains[i].options2=options
                } 
            })
        }
      },
      resetForm(formName) {
      	alert('resetFields!');
        this.$refs[formName].resetFields();

        const domainsList = this.dynamicValidateForm.domains
        for (var i = 0; i < domainsList.length; i++) {
          this.dynamicValidateForm.domains[i].selectData2='';
        }
      },
      removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index >=1) {
              this.dynamicValidateForm.domains.splice(index, 1)
              return ;
            }else{
              alert('请至少保留一个');
            }       
      },
        addDomain(add = []) {
        const domainsLength = this.dynamicValidateForm.domains.length

        if (domainsLength<=3) {
          this.dynamicValidateForm.domains.push({
          selectData: '',
          options:this.add,
          key: Date.now()
        });
          return ;
        }else{
          alert('最多只允许4个查询条件');
        }    
      console.log("添加domains:",this.dynamicValidateForm.domains)
      console.log(this.dynamicValidateForm.domains.length)

      },
    }
}
</script>
<style>
  .customs{max-width: 1024px; margin: 0 auto;padding-top: 20px;}
</style>