 <template>
    <div>
     <div class="box">
           <span class="inner">
            <div>
               <i class="el-icon-success"></i>
            </div>
            
            <p>已提交</p>
            <font>感谢参与!</font>
              
           </span>
      </div>
      
    </div>
     
  </template>
  
  <script>
  export default {
    name: "ThankYou",
    
 }
 </script>
<style>

.box {
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center;     /* 垂直居中 */
      max-width: 1024px;
      height: 80vh;
      margin: 0 auto;
  }
  .inner {
      width: 300px;
      height: 200px;
      text-align: center;
  }

.el-icon-success{color:#67C23A;font-size: 60px;}



 </style>