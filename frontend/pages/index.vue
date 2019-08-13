<template>
  <div class="container">
    <CreatePerson @done="updateQuery(true)"/>
    <h1>DATA</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <el-row :gutter="20" type="flex" justify="center"><ListPerson @updated="updateQuery(false)" :update="update"/></el-row>
  </div>
</template>

<script>
import CreatePerson from '@/components/CreatePerson';
import ListPerson from '@/components/ListPersons';

export default {
  components: {
    CreatePerson,
    ListPerson
  },
  data(){
    return {
      update: false
    }
  },
  methods: {
    updateQuery(value){
      this.update = value;
    }
  }
}
</script>

<style scoped>
h1, p{
  text-align: center;
  color: #394b50;
}
h1{
  margin: 50px auto 20px auto;
}
p{
  margin-bottom: 60px;
}
</style>
