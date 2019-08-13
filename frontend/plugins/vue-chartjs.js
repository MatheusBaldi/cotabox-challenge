
import Vue from 'vue';
import { Doughnut, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

Vue.component('ch-doughnut', {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['options'],
  styles: {
    height: '250px',
    position: 'relative'
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
});