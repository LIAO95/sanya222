<!-- 搜索表单 -->
<template>
<div class="ces-search">
    <el-form :size="size" inline :label-position="labelPosition">
        <el-form-item v-for='item in searchForm' :label="item.label" :key='item.prop'>
            <!-- 输入框 -->
            <el-input v-if="item.type==='Input'" v-model="searchData[item.prop]" size="mini" :placeholder="item.placeholder" :prefix-icon="item.prefixIcon"></el-input>
            <!-- 下拉框 -->
            
            <el-select v-if="item.type==='Select'" v-model="searchData[item.prop]" size="mini" @change="item.change(searchData[item.prop])">
                <el-option v-for="op in listTypeInfo[item.options]" :label="op.label" :value="op.value" :key="op.value"></el-option>
            </el-select>

            <!-- 单选 -->
            <el-radio-group v-if="item.type==='Radio'" v-model="searchData[item.prop]">
                <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio>
            </el-radio-group>
            <!-- 单选按钮 -->
            <el-radio-group v-if="item.type==='RadioButton'" v-model="searchData[item.prop]" @change="item.change && item.change(searchData[item.prop])">
                <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio-button>
            </el-radio-group>
            <!-- 复选框 -->
            <el-checkbox-group v-if="item.type==='Checkbox'" v-model="searchData[item.prop]" >
                <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value">{{ch.label}}</el-checkbox>
            </el-checkbox-group>
            <!-- 日期 -->
            <el-date-picker v-if="item.type==='Date'" v-model="searchData[item.prop]" ></el-date-picker>
            <!-- 时间 -->
            <el-time-select v-if="item.type==='Time'" v-model="searchData[item.prop]" type=''></el-time-select>
            <!-- 日期时间 -->
            <el-date-picker v-if="item.type==='DateTime'" type='datetime' v-model="searchData[item.prop]" :disabled="item.disable && item.disable(searchData[item.prop])"></el-date-picker>
            <!-- 滑块 -->
            <!-- <el-slider v-if="item.type==='Slider'" v-model="searchData[item.prop]"></el-slider> -->
            <!-- 开关 -->
            <el-switch v-if="item.type==='Switch'" v-model="searchData[item.prop]" ></el-switch>

            <!-- 信息展示框 -->
              <el-tag v-if="item.type === 'tag'">
                {{ $fn.getDataName({dataList: listTypeInfo[item.options], value: 'value', label: 'label', data: data[item.value]}) || '-' }}
              </el-tag>
        </el-form-item>
    </el-form>
    <el-form inline v-if='isHandle'>
        <el-form-item v-for='item in searchHandle' :key="item.label">
            <el-button :type="item.type" :size="item.size || size" @click='item.handle()'>{{item.label}}</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    props:{
        isHandle:{
            type:Boolean,
            default:true
        },
        labelPosition:{
            type:String,
            labelPosition: 'left'
        },
        size:{
            type:String,
            default:'mini'
        },
        searchForm:{
            type:Array,
            default:[]
        },
        searchHandle:{
            type:Array,
            default:()=>[]
        },
        searchData:{
            type:Object,
            default:{}
        },
        // 相关的列表
        listTypeInfo: {
          type: Object
        },
    },
    data () {
        return {
        };
    },

}

</script>
<style>
.ces-search .el-form{display: inline-block;}
.ces-search .el-form .el-form-item__content{line-height: 0;}
</style>