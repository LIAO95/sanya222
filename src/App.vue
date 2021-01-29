<template>
  <div id="app" class="app">
    <div class="nav">
      <router-link to="/">当前问题分析</router-link> |
<!--       <router-link to="/customs">自定义分析</router-link>| -->
      <router-link to="/cross">交叉分析</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

html,body{height: 100%;width: 100%;}
body{margin: 0;padding: 0px;}


.nav{margin: 0px auto;
    text-align: center;
    position: fixed;
    width: 100%;
    line-height: 60px;
    border-bottom: 1px solid #eee;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
    background: #fff;
    z-index: 1;}
.nav a{text-decoration: none;line-height: 60px;height: 60px;display: inline-block;color: #000;}
.router-link-exact-active.router-link-active{
      border-top: 3px solid #419efe;
}
</style>
