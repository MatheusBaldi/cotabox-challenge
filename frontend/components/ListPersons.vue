<template>
  
<table>
  <thead>
    <tr>
      <th></th>
      <th class="left">First Name</th>
      <th class="left">Last Name</th>
      <th>Participation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td class="left">Carlos</td>
      <td class="left">Moura</td>
      <td>5%</td>
    </tr>
  </tbody>
</table>

</template>

<script>
export default {
  asyncData(){
    return{

    }
  },
  created(){
  
  }
}
</script>


<style scoped>
table {
  border-collapse: collapse;
}
table, th, td {
  padding: 10px 13px 10px 13px;
  border: 1px solid black;
  border-color: #b5b5b5;
  color: #707070;
  font-size: 14px;
  text-align: center;
}
tr .left{
  text-align: left;
  padding: 10px 100px 10px 13px;
}
</style>
