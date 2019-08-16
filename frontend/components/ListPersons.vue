<template>
  <div class="container">
    <div class="table-container">

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
          <tr 
            @dblclick="removePerson(person.id)" 
            v-for="(person, index) in findPersons" 
            :key="person.id"
          >
            <td>{{ index+1 }}</td>
            <td class="left">{{ person.firstName }}</td>
            <td class="left">{{ person.lastName }}</td>
            <td>{{ person.participation }}%</td>
            
          </tr>
        </tbody>
          
      </table>
      <div class="wrapper">
        <span v-if="numPersons>0" class="slide">Double-click to remove person</span>
        <span v-if="numPersons===0" class="slide">Empty database, please insert new persons</span>
      </div>
    </div>

    <div class="chart-container">

      <!-- Chart component -->
      <ch-doughnut 
        :styles="myStyles" 
        :chart-data="handleQueryData(findPersons)" 
        :options="chartOptions"
      />

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

      overallParticipation: 0,
      numPersons: 0,
      numLabels: 0,

      // Initial chart values
      chart: {
        height: 265,
        width: 600,
      },

      chartOptions: {

        // Chart config
        maintainAspectRatio: false,        
        responsive: true,
        hover: {
          mode: 'single'
        },

        // Legend config
        legend: {

          display: true,
          position: 'right',
          
          labels: {

            boxWidth: 15,
            padding: 20,
            fontSize: 15,

            generateLabels(chart){

              let labels = [];
              let labelsText = chart.data.labels;
              for (let i in labelsText) {
                let meta = chart.getDatasetMeta(0);

                labels.push({
                  text: '  ' + labelsText[i],
                  fillStyle: chart.data.datasets[0].backgroundColor[i],
                  lineCap: 'round',
                  lineWidth: 10,
                  lineJoin: 'round',
                  strokeStyle: chart.data.datasets[0].backgroundColor[i],
                  hidden: isNaN(chart.data.datasets[0].data[i]) || meta.data[i].hidden,

                  index: i
                });
              }

              return labels
            }
            
          },
          onClick: function(e, legendItem) {
            let index = legendItem.index;
            let chart = this.chart;
            let i, ilen, meta;

            for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
              meta = chart.getDatasetMeta(i);
              // toggle visibility of index if exists
              if (meta.data[index]) {
                meta.data[index].hidden = !meta.data[index].hidden;
              }
            }

            chart.update();
          }
        }

      }

    }
  },

  methods: {

    // Remove person, refetch findPersons query and emit a 'remove' event
    async removePerson(personId){
      await this.$apollo.mutate({
        mutation: removePerson,
        variables: {
          id: personId
        }
      });
      this.$apollo.queries.findPersons.refetch();
      this.$emit('remove');
    },

    // Adjust query data items to Chatjs' data format and set update some local variables
    // This method is called on every time findPersons query loads
    handleQueryData(queryData){
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

      let overallParticipation;
      // Handle empty database
      try {
        // Get the total participation
        overallParticipation = dataset.data
          .reduce((accumulator, value) => accumulator + value);
      } catch (e) {
        overallParticipation = 0;
      }
      
      // Apply a color to each label
      dataset.backgroundColor = palette('mpn65', dataset.data.length)
        .map(hex => '#' + hex);

      this.numPersons = dataset.data.length;

      // Create new label with dark grey background color if participation is lower than 100
      if (overallParticipation < 100) {

        // Remaining participation
        let notAssigned = 100 - overallParticipation;
        
        data.labels.push('Not Assigned');
        dataset.data.push(notAssigned);
        dataset.backgroundColor.push('rgb(90, 90, 90)');
      }

      this.numLabels = dataset.data.length;
      this.overallParticipation = overallParticipation;

      // Send overallParticipation value to parent component
      this.$emit('queryLoaded', overallParticipation);

      data.datasets.push(dataset);

      return data;
    },

    // Control chart width and height values
    handleResize() {
      // Width
      if (window.innerWidth > 1280){
        this.chart.width = 450;
      } else if (window.innerWidth <= 600 && window.innerWidth >= 300 ) {
        this.chart.width = window.innerWidth;
      }

      // Height: 
      if (this.numLabels > 7){
        this.chart.height = 265 + 35*(this.numLabels - 7);
      }
    }
  },

  computed: {
    // Styling object passed to chart component
    myStyles () {
      return {
        height: `${this.chart.height}px`,
        width: `${this.chart.width}px`,
        position: 'relative'
      }
    }
  },

  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  watch: { 
    // Refetch query when on new Person input
    update: async function(value, oldValue) { 
      if (value) {
        await this.$apollo.queries.findPersons.refetch();
        this.handleResize();
        this.$emit('updated');
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
.table-container, .chart-container{
  margin-right: 60px;
  margin-left: 60px;
  margin-top: 60px;
}
table {
  border-collapse: collapse;
}
table, th, td {
  padding: 10px 13px 10px 13px;

  color: #707070;
  font-size: 14px;
  text-align: center;
}
td, th{
  border: 1px solid black;
  border-color: #b5b5b5;
}
tr .left {
  text-align: left;
  padding: 10px 100px 10px 13px;
}
@media only screen and (min-width: 520px) {
  table {width: 500px}
}
@media only screen and (min-width: 860px) {
  table {width: 550px}
}

.wrapper {
    position: relative;
    overflow: hidden;
    align-content: center;
    width: 0 auto;
    margin: 0 15px 0 15px;
    height: 25px; 
}

.slide {
    position: absolute;
    top: -100px;
    width: 100%;
    height: 100%;
    transition: 1s ease-in;
    padding: 4px;
    background-color:rgb(105, 105, 105);
    border-radius: 0px 0px 5px 5px;
    align-content: center;
    text-align: center;
    font-weight: 200;
    font-size: 14px;
    color: hsla(0, 0%, 100%, 0.97);
    vertical-align: center;
}

.table-container:hover .slide {
    transition: .1s;
    top: 0;
}
</style>
