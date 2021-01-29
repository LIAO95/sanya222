<template>
  <el-form
    hide-required-asterisk  
    ref="ruleForm"
    class="page-form"
    :class="className"
    :model="data"
    :rules="rules"
    label-position="top"
    size="mini"
  >

   <template 
      v-for="(item, index) in fieldList"
      >
    <el-form-item
      :key="item.value"
      :hide-requied-aterisk="false"
      :prop="item.value" 
      :label="(index+1+'、')+item.label"
      :class="item.className"
      v-if="item.vshow == 1"
    
    >
<!-- :label="(index+1+'、')+item.label[item.label.indexOf('前')].fontWeight('red')" -->
<!-- :label="(index+1+'、')+item.label" -->

    <!-- <el-form-item
     :hide-requied-aterisk="false"
      v-for="(item, index) in fieldList"
      :key="index"
      :prop="item.value" 
      :label="(index+1+'、')+item.label"
      :class="item.className"
      v-if="item.vshow"
    > -->

    <!-- :label="item.label" -->
     <!-- :label="(index+1+'、')+item.label" -->
        <!-- v-show="item.show" -->
      <!-- 普通输入框 -->
      <el-input
        v-if="item.type === 'input' || item.type === 'password'"
        v-model="data[item.value]"
        :type="item.type"
        :disabled="item.disabled"

      />

      <el-checkbox-group
        v-if="item.type==='checkbox'" 
        v-model="data[item.value]"
        :max="3"
      >
        <el-checkbox
          v-for="(childItem, childIndex) in listTypeInfo[item.list]" 
          :key="childIndex"
          :label="childItem.label"
          :value="childItem.value"
        >{{childItem.label}}

        <el-input v-if="childItem.type==='other'"   v-model="childItem.otherValue" placeholder="请输入"></el-input>

       </el-checkbox>
      </el-checkbox-group>

      <el-radio-group 
       v-if="item.type==='Radio'"
        v-model="data[item.value]"
        @change="item.handle()"
        >
          <el-radio 
              style="display: block;"
              v-for="(childItem, childIndex) in listTypeInfo[item.list]" 
              :label="childItem.value" 
              :key="childIndex"
              >
              {{childItem.label}}
          </el-radio>
       </el-radio-group>


      <!-- 选择框 -->
      <el-select
        v-if="item.type === 'select'"
        v-model="data[item.value]"
        :disabled="item.disabled"

      >
        <el-option
          v-for="(childItem, childIndex) in listTypeInfo[item.list]"
          :key="childIndex"
          :label="childItem.label"
          :value="childItem.value"
        />
      </el-select>

      <!-- 信息展示框 -->
      <el-tag v-if="item.type === 'tag'">
        {{ $fn.getDataName({dataList: listTypeInfo[item.list], value: 'value', label: 'label', data: data[item.value]}) || '-' }}
      </el-tag>

    </el-form-item>
    </template>

<!--         <el-button v-for='item in searchHandle' :type="item.type"  @click="item.handle()">{{item.label}}</el-button>
 -->
   <!--  <el-button class="btn_submitForm" size="mini" type="primary" @click="submitForm('data')">提交</el-button> -->

  </el-form>



</template>

<script>
export default {
  name: 'PageForm',
  props: {
    // 自定义类名
    className: {
      type: String
    },
    // 表单数据
    data: {
      type: Object
    },
    // 相关字段
    fieldList: {
      type: Array
    },
    // 验证规则
    rules: {
      type: Object
    },
    // 相关的列表
    listTypeInfo: {
      type: Object
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '120px'
    },
    refObj: {
      type: Object
    },
    searchHandle:{
            type:Array,
            default:()=>[]
        },
  },
  data () {
    return {
    }
  },
  watch: {
    data: {
      handler: function (val) {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
      },
      deep: true // 深度监听
    }
  },
  mounted () {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
  },
  methods: {
    // 获取字段列表
    // getConfigList () {
    //   return this.fieldList.filter(item => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show))
    // },
    // 得到placeholder的显示
    // getPlaceholder (row) {
    //   let placeholder
    //   if (row.type === 'input' || row.type === 'textarea') {
    //     placeholder = '请输入' + row.label
    //   } else if (row.type === 'select' || row.type === 'time' || row.type === 'date') {
    //     placeholder = '请选择' + row.label
    //   } else {
    //     placeholder = row.label
    //   }
    //   return placeholder
    // },
    // 绑定的相关事件






    handleEvent (evnet) {
      this.$emit('handleEvent', evnet)
    },
    // 派发按钮点击事件
    handleClick (event, data) {
      this.$emit('handleClick', event, data)
    }
  }
}
</script>

<style lang="scss" scoped>


</style>
