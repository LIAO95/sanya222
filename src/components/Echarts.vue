<template>
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
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
export default {
  name: 'Echarts',
  methods:{
	  myEcharts(arr1,arr2,arr3){
		  var barChart = this.$echarts.init(document.getElementById('Bar'));
		  var pieChart = this.$echarts.init(document.getElementById('pie'));
		  var BarOption = {

			  tooltip: {},
			  legend: {
			  	left:'right',
				  data:['性别']
			  },
			  xAxis: {
				  data: arr1
			  },
			  yAxis: {},
			  series: [{
				  name: '性别',
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
                        name: '访问来源',
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

          getecharts(){
		      axios({
			      method: 'get',
			      url:'http://192.168.0.170:8090/questionnaire/api/result/getPerByQuestionNumber',
			      params:{
			        question_number:'q2',
			      },
			      headers: {'Content-Type': 'application/json'}
			    }).then((res) => {
			      //请求成功
			      //console.log(res.data)
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
          }

  },
  mounted() {
  	this.getecharts();
  }
}
</script>

<style>

</style>
