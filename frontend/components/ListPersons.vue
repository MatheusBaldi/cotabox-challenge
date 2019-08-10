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
    <tr v-for="(person, index) in findPersons" :key="person.id">
      <td>{{ index }}</td>
      <td class="left">{{ person.firstName }}</td>
      <td class="left">{{ person.lastName }}</td>
      <td>{{ person.participation }}</td>
    </tr>
  </tbody>
</table>

</template>

<script>
import gql from 'graphql-tag';
export default {
  apollo: {
    findPersons: gql`
      query {
        findPersons {
          id
          firstName
          lastName
          participation
        }
      }
    `
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
