<template>
  <div>
    <ApolloQuery
      :query="findPersons"
      :variables="{ limit: 0 }"
    >
      <template ref="queryElement" v-slot="{ result: { loading, error, data }, query }">
        <div class="container">
          <div class="table">
            <!-- Loading -->
            <div v-if="loading" class="loading apollo">Loading...</div>

            <!-- Error -->
            <div v-else-if="error" class="error apollo">An error occurred</div>

            <!-- Result -->
            <div v-else-if="data" class="result apollo">

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
                  <tr v-for="(person, index) in data.findPersons" :key="person.id">
                    <td>{{ index }}</td>
                    <td class="left">{{ person.firstName }}</td>
                    <td class="left">{{ person.lastName }}</td>
                    <td>{{ person.participation }}%</td>
                  </tr>
                </tbody>

              </table>
              
            </div>

            <!-- No result -->
            <div v-else class="no-result apollo">No result :(</div>
          </div>

          <div class="chart">
            <ch-doughnut :chart-data="dataCollection(data.findPersons)" :options="chartOptions"/>
          </div> 
        
        </div> 
      </template>

    </ApolloQuery>

  </div>
  

</template>

<script>
import palette from 'google-palette';
const findPersons = require('../apollo/queries/findPersons.gql');

export default {
  props: ['update'],
  data() {
    return {
      query: undefined,
      chartOptions: {
        maintainAspectRatio: false,        
        responsive: true,
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

      for (let person of queryData) {
        data.labels.push(`${person.firstName} ${person.lastName}`);
        dataset.data.push(person.participation);
      }

      let overallParticipation = dataset.data
        .reduce((accumulator, value) => accumulator + value);

      dataset.backgroundColor = palette('mpn65', dataset.data.length)
        .map(hex => '#' + hex);

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
    update: function(newVal, oldVal) { 
      if (newVal) {
        this.$emit('update');
        this.$emit('updated');
        alert('updated');

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
}
.table{
  margin-right: 60px;
}
.chart{
  height: 200px;
  margin-right: 60px;
  margin-left: 60px;
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
