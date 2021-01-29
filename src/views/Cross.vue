<template>
  <div class="cross">
    <el-form :model="dynamicValidateForm" ref="domainForm"  size="mini" label-width="80px" class="demo-dynamic">
     <el-row>
     	<el-col :span="12">
     		<p style="font-size: 14px;margin-left:80px;">自变量 X（例如性别，年龄等。限2题）</p>
     		<el-form-item
			    v-for="(domain, index) in dynamicValidateForm.domainsX"
			    :key="domain.key"
			    :prop="'domainsX.' + index + '.selectDataX'"
          :rules="{
                    required: true, message: '变量不能为空', trigger: 'change'
                  }"
			  >  
			     <el-select v-model="domain.selectDataX"  placeholder="请选择" style="margin-right: 10px;">
				    <el-option
				      v-for="(item,index) in domain.options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			    <el-button @click.prevent="removeDomainX(domain)">删除</el-button>
			</el-form-item>
			<el-form-item>
				<el-button @click="addDomainX">新增条件</el-button>
			</el-form-item>
			
     	</el-col>
     	<el-col :span="12">
     		<p style="font-size: 14px;margin-left:80px;">自变量 Y（您要分析的目标题目，限10题）</p>
     		<el-form-item
			    v-for="(domain, index) in dynamicValidateForm.domainsY"
			    :key="domain.key"
			    :prop="'domainsY.' + index + '.selectDataY'"
          :rules="{
                    required: true, message: '变量不能为空', trigger: 'change'
                  }"
			  >  
			     <el-select v-model="domain.selectDataY"   placeholder="请选择" style="margin-right: 10px;">
				    <el-option
				      v-for="(item,index) in domain.options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
			    <el-button @click.prevent="removeDomainY(domain)">删除</el-button>
			</el-form-item>
			<el-form-item>
				<el-button @click="addDomainY">新增条件</el-button>
			</el-form-item>
     	</el-col>
     </el-row>
	  
	  <el-form-item>
	    <el-button type="primary" @click="CrossEcharts('domainForm')">交叉分析</el-button>
      <el-button class="ondDownload" type="primary"   @click="ondDownload('domainForm')" style=" margin-bottom: 20px;">数据下载</el-button>
	  </el-form-item>
	</el-form>

    <div class="Echarts" refs="Chart">
      <el-row :gutter="10" >
        <el-col  :sm="24" :md="12" >
           <div id="crossBar" class="Bar" style="width: 900px;height:600px;" ></div>
        </el-col>

        <el-col  :sm="24" :md="12" >
           <div id="crossBar" class="Bar" style="width: 900px;height:600px;" ></div>
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
        dynamicValidateForm: {
          domainsX: [{
            selectDataX: '',
            options:[],          
          }],
          domainsY: [{
            selectDataY: '',
            options:[],          
          }],
        },
        add:[]
	  }

    },
    created() { 	
	  this.getoptions();
	},
  // watch:{
  //   'dynamicValidateForm.domainsX':{
  //     handler:function (val) {
         
  //       const arr =[]

  //       for (var i = 0; i < val.length; i++) {

  //             let value = val[i].selectDataX

  //             if (arr.indexOf(value==-1)) {
  //                arr.push(value)
  //             } 
  //       }
  //       for (var i = 0; i < val.length; i++) {
  //         console.log(val[i].options.value)
  //       }
  //       console.log("arr",arr)
  //     },
  //     deep:true
  //   }
  // },

    methods: {
      ondDownload(formName){

        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            const crossData={"xLists":'',"yLists":''}
            const xLists= [];
            const yLists= [];
            const domainsX = this.dynamicValidateForm.domainsX
            const domainsY = this.dynamicValidateForm.domainsY
            for (var i = 0; i < domainsX.length; i++) {
              const d={}
              d["xValue"]=domainsX[i].selectDataX
              xLists.push(d)   
            }
            for (var i = 0; i < domainsY.length; i++) {
              const d={}
              d["yValue"]=domainsY[i].selectDataY
              yLists.push(d)   
            }
            
            crossData.xLists = xLists
            crossData.yLists = yLists
            console.log("下载Data",crossData)
             axios({
                method: 'post',
                name:'name',
                responseType: 'blob',
                url:'http://192.168.0.199:8091/single-questionnaire/api/result/downloadCrossAnalysis',
                data:crossData,
                header: {'Content-Type': 'application/xls'},　
              }).then((res) => {
                //请求成功
                     //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
              　　　　let blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
              　　　　let downloadElement = document.createElement('a');
                     let href = window.URL.createObjectURL(blob);
                     downloadElement.href = href;
              　　　　downloadElement.download = '交叉分析.xls';　　　　　　　　　　// xxx.xls/xxx.xlsx
                     document.body.appendChild(downloadElement);
                     downloadElement.click();
                     document.body.removeChild(downloadElement);
                     window.URL.revokeObjectURL(href);

              }).catch((err) => {
                //请求失败
                console.log("请求失败",err)
              })

          } else {
            console.log('error submit!!');
            return false;
          }
        });

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
                const domainsList = this.dynamicValidateForm.domainsX
                for (var i = 0; i < domainsList.length; i++) {
                  this.dynamicValidateForm.domainsX[i].options = add 
                }
                const domainsListY = this.dynamicValidateForm.domainsY
                for (var i = 0; i < domainsListY.length; i++) {
                  this.dynamicValidateForm.domainsY[i].options = add 
                } 

			    }).catch((err) => {
			      //请求失败
			      console.log("请求失败",err)
			    })
      },


      myEcharts(arr1,result){
      var barChart = this.$echarts.init(document.getElementById('crossBar'));
      var BarOption = {

        color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        dataZoom: [{
            type: 'inside'
        }, {
            type: 'slider'
        }],
        grid: {
            bottom: 90
        },
        xAxis: {
          data: arr1,
          axisLabel: {
            interval: 0,
            rotate: -20
          }
        },
        yAxis: {},
        series: result
      };
      barChart.setOption(BarOption);
      },

      CrossEcharts(formName){



        this.$refs[formName].validate((valid) => {
          if (valid) {
              const crossData={"xLists":'',"yLists":''}
              const xLists= [];
              const yLists= [];
              const domainsX = this.dynamicValidateForm.domainsX
              const domainsY = this.dynamicValidateForm.domainsY
              for (var i = 0; i < domainsX.length; i++) {
                const d={}
                d["xValue"]=domainsX[i].selectDataX
                xLists.push(d)   
              }
              for (var i = 0; i < domainsY.length; i++) {
                const d={}
                d["yValue"]=domainsY[i].selectDataY
                yLists.push(d)   
              }
              
              crossData.xLists = xLists
              crossData.yLists = yLists
              console.log("crossData",crossData)

              axios({
                  method: 'post',
                  url:'http://192.168.0.5:8891/single-questionnaire/api/result/getPercentageByCondition',
                  data:crossData,
                  headers: {'Content-Type': 'application/json'}
                }).then((res) => {
                  //请求成功
                  console.log("返回all值：",res.data)
                  const resData = res.data.data
                  const arr1=[]
                  let result = []

               // resData.forEach(i => {Object.keys(i).map(key => key.indexOf('answer') !== -1).forEach((c, index) => arr22 = [ ...arr22, { name:  c, data: 'bar', data: i[index][`answer${index}`]} ])  })

                 for (var i = 0; i < resData.length; i++) {
                   for (var j = 0; j < resData[i].length; j++) {
                    Object.keys(resData[i][j]).filter(k => {
                      if (k.indexOf('answer') !== -1) { return k }
                    }).forEach((c,index) => {
                      
                      if (result[index]?.index === index) {
                        // result[index].name += resData[i][j][`title${ index + 1 }`] || ''
                        result[index].data = [
                          ...result[index].data,
                          resData[i][j][c],
                        ]
                      } else {
                        result = [...result, {
                          name: resData[i][0][`title${ index + 1 }`],
                          type: 'bar',
                          index,
                          data: [
                            resData[i][j][c]
                          ]
                        }]
                      }
                    })
                    
                   }
                  console.log("result",result)
                 
                 }

                  for (var i = 0; i < resData.length; i++) { 
                    for (var j = 1; j < resData[i].length; j++) {
                      arr1.push(resData[i][j].xy)
                    }
                  }
                  this.myEcharts(arr1,result);
                }).catch((err) => {
                  //请求失败
                  console.log("请求失败",err)
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

        
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      removeDomainX(item) {

        var index = this.dynamicValidateForm.domainsX.indexOf(item)
            if (index >=1) {
              this.dynamicValidateForm.domainsX.splice(index, 1)
              return ;
            }else{
              alert('请至少保留一个');
            } 
      },

       removeDomainY(item) {
         var index = this.dynamicValidateForm.domainsY.indexOf(item)
            if (index >=1) {
              this.dynamicValidateForm.domainsY.splice(index, 1)
              return ;
            }else{
              alert('请至少保留一个');
            }
      },
      addDomainX(add = []) {
        const domainsLength = this.dynamicValidateForm.domainsX.length

        if (domainsLength<=1) {
          this.dynamicValidateForm.domainsX.push({
          selectDataX: '',
          options:this.add,
          key: Date.now()
        });
          return ;
        }else{
          alert('最多选择两个自变量X');
        }    
      console.log("添加domainX:",this.dynamicValidateForm.domainsX)

      },

      addDomainY(add = []) {
        const domainsLength = this.dynamicValidateForm.domainsY.length

        if (domainsLength<=9) {
          this.dynamicValidateForm.domainsY.push({
          selectDataX: '',
          options:this.add,
          key: Date.now()
        });
          return ;
        }else{
          alert('最多选择十个自变量Y');
        }    
      console.log("添加domainY:",this.dynamicValidateForm.domainsY)

      },
    }
  }
</script>
<style>
  .cross{
    max-width: 1024px;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    margin-top: 90px;    
    }

</style>
