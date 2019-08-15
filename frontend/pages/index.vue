<template>
  <div class="container">
    
    <CreatePerson :overallParticipation="overallParticipation" @done="updateQuery(true)"/>

    <h1>DATA</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

    <ListPerson 
      @updated="updateQuery(false)"
      @remove="updateQuery(true)"
      @queryLoaded="childToParent"
      :update="update"
    />

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
  asyncData(){
    return {
      update: false,
      overallParticipation: 0
    }
  },
  methods: {
    // Receive child data and handle it
    childToParent(data){
      this.overallParticipation = data;
    },

    // Set update value
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

</style>
