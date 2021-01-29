<template>
  <div class="question">
  	<div>
  		<el-form :inline="true" :model="form" size="mini">
		  <el-form-item>
		    <el-select v-model="form.value" placeholder="请选择">
			    <el-option
			      v-for="item in form.options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="getecharts">查询</el-button>
		    <el-button class="ondDownload" type="primary"   @click="ondDownload" style=" margin-bottom: 20px;">数据下载</el-button>
		  </el-form-item>
		</el-form> 	

		
	
  	</div>
  	<div class="Echarts" refs="Chart">
	  	<el-row :gutter="10" >
	  		<el-col  :sm="24" :md="12" >
	  			 <div id="Bar" class="Bar" style="width: 600px;height:400px;" ></div>
	  		</el-col>
	  		<el-col  :sm="24" :md="12">
	  			 <div id="pie" class="pie"  style="width: 600px;height:400px;"></div>
	  		</el-col>
	  	</el-row>
	  </div>
  </div>

</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
export default {

  data() {
      return {
      	form:{
      		options: [],
	        value: ''
      	}
        
      }
    },
 
  name: 'Echarts',
  methods:{
  	  ondDownload() {
        window.open('http://192.168.0.185:8090/questionnaire/api/result/downloadExcel')
      },
	  myEcharts(arr1,arr2,arr3){
		  var barChart = this.$echarts.init(document.getElementById('Bar'));
		  var pieChart = this.$echarts.init(document.getElementById('pie'));
		  var BarOption = {
              color: ['#003366', '#006699', '#4cabce', '#e5323e'],
			  tooltip: {
			    trigger: 'item'
			  },
			  legend: {
			  	left:'right',
				  
			  },
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

              color: ['#003366', '#006699', '#4cabce', '#e5323e'],
		  	  tooltip: {
			    trigger: 'item'
			  },
		  	  
			  series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        itemStyle: {
			                normal: {
			                    shadowBlur: 200,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            },
                        data:arr3,
                    }
                ]
		  };
		  barChart.setOption(BarOption);
		  pieChart.setOption(pieOption);
		  },
		  getoptions(){              
		      axios({
			      method: 'get',
			      url:'http://192.168.0.185:8090/questionnaire/api/result/getQuestionAll',
			      headers: {'Content-Type': 'application/json'}
			    }).then((res) => {
			      //请求成功
			      console.log(res.data)
                  
                  const options = []
			      for (var i = 0; i < res.data.length; i++) {                 
		              const m={};
		              m['value']=res.data[i].question_number
		              m['label']=res.data[i].question_content
		              options.push(m)                       
			      }

			      this.form.options=options;
                   
                		      
			    }).catch((err) => {
			      //请求失败
			      console.log("请求失败",err)
			    })

        },
          getecharts(){
		      axios({
			      method: 'get',
			      url:'http://192.168.0.185:8090/questionnaire/api/result/getPerByQuestionNumber',
			      params:{
			        question_number:this.form.value,
			      },
			      headers: {'Content-Type': 'application/json'}
			    }).then((res) => {
			      //请求成功
			      console.log(res.data)
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


			     console.log("arr3:",arr3)

			      this.myEcharts(arr1,arr2,arr3);			      
                  
			    }).catch((err) => {
			      //请求失败
			      console.log("请求失败",err)
			    })
          },
          

  },
  mounted() {
  	this.getoptions();
  }
}
</script>

<style>
.question{max-width: 1024px; margin: 0 auto;position: absolute;left: 0;right: 0;margin-top: 85px;}
p{margin: 0;margin-bottom: 10px;}

.Bar,.pie{width: 100%;height: 100%;}
</style>
