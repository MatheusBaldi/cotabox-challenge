<template>
  <div>

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
          <td>{{ person.participation }}%</td>
        </tr>
      </tbody>
    </table>

    <ch-doughnut :chart-data="dataCollection"/>

  </div>
  

</template>

<script>
// import gql from 'graphql-tag';
import findPersons from '../apollo/queries/findPersons.gql';

export default {
  apollo: {
    findPersons: {
      query: findPersons,
      variables: {limit:5},
      update: data => data.findPersons
    }
  },
  methods: {
    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  },
  // mounted(){

  //   this.datacollection = this.dataCollection();
  //   console.log(this.datacollection);
  // },
  computed:{
    dataCollection(){
      let data = {
        labels: [],
        datasets: []
      }
      let dataset = {
          backgroundColor: [],
          data: []
      }
      for (let person of this.findPersons) {
        data.labels.push(`${person.firstName} ${person.lastName}`);
        dataset.backgroundColor.push(this.getRandomColor());
        dataset.data.push(person.participation);
      }

      data.datasets.push(dataset);
      console.log(data);
      return data;
    }
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
