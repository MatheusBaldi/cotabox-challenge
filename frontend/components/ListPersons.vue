<template>
  <div class="container">
    <div class="table">

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
          <tr @dblclick="removePerson(person.id)" v-for="(person, index) in findPersons" :key="person.id">
            <td>{{ index+1 }}</td>
            <td class="left">{{ person.firstName }}</td>
            <td class="left">{{ person.lastName }}</td>
            <td>{{ person.participation }}%</td>
          </tr>
        </tbody>

      </table>
        
    </div>

    <div class="chart">
      <ch-doughnut :chart-data="dataCollection(findPersons)" :options="chartOptions"/>
    </div> 

  </div>    

</template>

<script>
import palette from 'google-palette';
import findPersons from '../apollo/queries/findPersons.gql';
import removePerson from '../apollo/mutations/removePerson.gql';

export default {

  props: ['update'],

  apollo: {

    findPersons: {
      query: findPersons,
      variables: {limit:0},
      update: data => data.findPersons,
    }

  },

  data() {

    return {
      chartOptions: {

        // Chart config
        maintainAspectRatio: true,        
        responsive: true,

        // Legend config
        legend: {

          display: true,
          position: 'right',
          align: 'center',
          
          labels: {

            boxWidth: 12,
            padding: 20,
            generateLabels(chart){

              let labels = [];
              let labelsText = chart.data.labels;

              for (let key in labelsText) {
                labels.push({
                  text: '  ' + labelsText[key],
                  fillStyle: chart.data.datasets[0].backgroundColor[key],
                  lineCap: 'round',
                  lineWidth: 10,
                  strokeStyle: chart.data.datasets[0].backgroundColor[key],
                  fontColor: chart.data.datasets[0].backgroundColor[key]
                });
              }

              return labels
            }
          }
        }

      }

    }
  },

  methods: {
    

    removePerson(personId){
      this.$apollo.mutate({
        mutation: removePerson,
        variables: {
          id: personId
        }
      });
      this.$apollo.queries.findPersons.refetch();
    },

    

    // Adjust data items to Chatjs' data format
    dataCollection(queryData){
      let data = {
        labels: [],
        datasets: []
      }

      let dataset = {
        label: [],
        backgroundColor: [],
        data: [],
      }

      // One label for each person
      for (let person of queryData) {
        data.labels.push(`${person.firstName} ${person.lastName}`);
        dataset.data.push(person.participation);
      }

      // Get the total participation sum
      let overallParticipation = dataset.data
        .reduce((accumulator, value) => accumulator + value);

      // Apply a color to each label
      dataset.backgroundColor = palette('mpn65', dataset.data.length)
        .map(hex => '#' + hex);

      // Create new label with dark grey background color if participation is lower than 100
      if (overallParticipation < 100) {
        let notAssigned = 100 - overallParticipation;
        
        data.labels.push('Not Assigned');
        dataset.data.push(notAssigned);
        dataset.backgroundColor.push('rgb(90, 90, 90)');
      }      

      data.datasets.push(dataset);

      return data;
    }
  },

  watch: { 
    // Refetch query when on new Person input
    update: function(value, oldValue) { 
      if (value) {
        this.$emit('updated');
        this.$apollo.queries.findPersons.refetch();
      }
    }
  }

}
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 100%;
}
.table, .chart{
  margin-right: 50px;
  margin-left: 50px;
}
.chart{
  height: 300px;
}
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
tr .left {
  text-align: left;
  padding: 10px 100px 10px 13px;
}

</style>
