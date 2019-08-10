<template>
  <div class="header">
    <div class="container">
        <input  placeholder="First name" v-model="firstName"/>
        <input  placeholder="Last name" v-model="lastName"/>
        <input  placeholder="Participation" v-model="participation"/>
        <button @submit.prevent="" class="btn" plain>SEND</button>
    </div> 
  </div>
</template>

<script>
export default {


  // apollo: {
  //   createPerson: {
      
  //   }
  // },
  data(){
    return {
      firstName: '',
      lastName: '',
      participation: ''
    }
  },
  // methods: {
  //   async addPerson() {
  //     const result = await this.$apollo.mutate({
  //       mutation: createPerson,
  //       variables: {
  //         firstName: this.firstName,
  //         lastName: this.lastName,
  //         participation: this.participation
  //       }
  //     })
  //   }
  // }

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
.header {
  width: 100%;
}
input, button {
  border-radius: 3px;
  padding: 15px;
  margin: 10px;
}
.header, button {
  background-color: #00b8e2;
}
.header {
  width: 100%;
  padding-top: 45px;
  padding-bottom: 30px;
}
@media only screen and (min-width: 0px) {
  input {width: 90%}
  button {width: 60%; font-size: 14px; padding: 10px;}
}
@media only screen and (min-width: 220px) {
  input {width: 90%}
  button {width: 40%; font-size: 14px; padding: 10px;}
}
@media only screen and (min-width: 350px) {
  input {width: 90%}
  button {width: 25%; font-size: 14px; padding: 10px;}
}
@media only screen and (min-width: 860px) {
  input {width: 25%}
  button {width: 20%; font-size: 18px;}
}
@media only screen and (min-width: 1000px) {
  input {width: 16%}
  button {width: 8%; font-size: 18px;}
}
@media only screen and (min-width: 1920px) {
  input {width: 16%}
  button {width: 8%; font-size: 18px;}
}
input {
  color: rgb(80, 75, 75);
  background-color: #fff;
  font-size: 14px;
  border-width: 0px;
}
button {
  color: #fff;
  font-weight: bold;
  border-color: #fff;
  border-width: 2px;
  border-style: solid;
}
</style>