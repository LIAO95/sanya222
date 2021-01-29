<template>
	<div class="show">
		
		 <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" size="mini" label-width="100px" class="demo-dynamic">
		  <el-form-item
		    v-for="(domain, index) in dynamicValidateForm.domains"
		    :label="'条件' + (index+1)"
		    :key="domain.key"
		    :prop="'domains.' + index + '.selectData'||'domains.' + index + '.selectData2'"
		  >

		    <el-select v-model="domain.selectData" @change="selectGoodsByGroupId($event)"  placeholder="请选择" >
			    <el-option
			      v-for="(item,index) in domain.options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
        <el-select v-model="domain.selectData2"  placeholder="请选择" >
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
		    <el-button type="primary" @click="submitForm('dynamicValidateForm')">查询</el-button>
		    <el-button @click="addDomain(add)">新增条件</el-button>
		    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
		  </el-form-item>
		</el-form>
		<show-echarts></show-echarts>
	</div>
</template>
<script>

import ShowEcharts from './Echarts'
import axios from 'axios'

export default {
    components: {ShowEcharts},
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
    methods: {
      ondDownload() {
        window.open('http://192.168.0.170:8090/questionnaire/api/result/downloadExcel')
      },

      getoptions(){              
		      axios({
			      method: 'get',
			      url:'http://192.168.0.170:8090/questionnaire/api/result/getQuestionAll',
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
                  //console.log("do:",this.dynamicValidateForm.domains[i])
                }    
                		      
			    }).catch((err) => {
			      //请求失败
			      console.log("请求失败",err)
			    })

      },

      selectGoodsByGroupId(val){

         //console.log("val:",val)

         if(val != null && val != '' && val != undefined){
          //selectGoodsByGroupId(val)

          axios({
            method: 'get',
            //url:'http://192.168.0.170:8090/questionnaire/api/result/getQuestionAll',
            url:'http://192.168.0.170:8090/questionnaire/api/result/getAnswerByQuestionNumber',
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
                  //console.log("do:",this.dynamicValidateForm.domains[i])
                } 
              //this.dynamicValidateForm.domains[0].options2=options
            })
        }

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