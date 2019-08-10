<template>
  <div class="header">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="4">
        <input  placeholder="First name" v-model="firstName"></input>
      </el-col>
      <el-col :span="4">
        <input  placeholder="Last name" v-model="lastName"></input>
      </el-col>
      <el-col :span="4">
        <input  placeholder="Participation" v-model="participation"></input>
      </el-col>
      <el-col :span="2">
        <button class="btn" plain>SEND</button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  asyncData(){
    return {
      firstName,
      lastName,
      participation
    }
  }

}
</script>

<style scoped>
.header, input, button{
  height: 100%;
  width: 100%;
}
input, button{
  border-radius: 3px;
}
.header, button{
  background-color: #00b8e2;
}
.header{
  padding-top: 60px;
  padding-bottom: 50px;
}
input{
  color: rgb(80, 75, 75);
  background-color: #fff;
  font-size: 14px;
  padding: 20px;
  border-width: 0px;
}
button{
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  border-color: #fff;
  border-width: 2px;
  border-style: solid;
}
</style>