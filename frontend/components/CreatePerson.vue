<template>
  <div class="header">


      <ApolloMutation
        :mutation="require('../apollo/mutations/addPerson.gql')"
        :variables="{
          firstName,
          lastName,
          participation
        }"
        @done="onDone()"
      >

        <template :disabled="loading" v-slot="{ mutate, loading, error }">
          
          <div @keypress.enter="send(mutate)" class="container">

              <div class="form-group" :class="{ 'form-group--error': $v.firstName.$error }">
                
                <!-- First Name Input -->
                <input  class="form_input" placeholder="First name" v-model.lazy="$v.firstName.$model" required/>
                
                <!-- Required error -->
                <div class="error" v-if="!$v.firstName.required && $v.firstName.$error">First name is required</div>
                
                <!-- Min characters error -->
                <div class="error" v-if="!$v.firstName.minLength && $v.firstName.$error">Name must have at least {{$v.firstName.$params.minLength.min}} letters.</div>
                
                <!-- Max characters error -->
                <div class="error" v-if="!$v.firstName.maxLength && $v.firstName.$error">Name must have less than {{$v.firstName.$params.maxLength.max}} letters.</div>
              
              </div>  
              

              <div class="form-group" :class="{ 'form-group--error': $v.lastName.$error }">
              
                <!-- Last Name Input -->
                <input class="form_input" placeholder="Last name" v-model.lazy="$v.lastName.$model" required/>
                
                <!-- Required error -->
                <div class="error" v-if="!$v.lastName.required && $v.lastName.$error">
                  Last name is required
                </div>

                <!-- Min characters error -->
                <div class="error" v-if="!$v.lastName.minLength && $v.lastName.$error">
                  Name must have at least {{$v.lastName.$params.minLength.min}} letters.
                </div>

                <!-- Max characters error -->
                <div class="error" v-if="!$v.lastName.maxLength && $v.lastName.$error">
                  Name must have less than {{$v.lastName.$params.maxLength.max}} letters.
                </div>

              </div>  


              <div class="form-group" :class="{ 'form-group--error': $v.participation.$error }">
                
                <!-- Participation Input -->
                <input class="form_input" placeholder="Participation" v-model.number.lazy="$v.participation.$model" required/>
                
                <!-- Required error -->
                <div class="error" v-if="!$v.participation.required && $v.participation.$error">
                  Participation is required
                </div>
                
                <!-- Default min and max values error -->
                <div class="error" v-if="(!$v.participation.between || !$v.participation.integer) && $v.participation.$error">
                  Participation must be an integer between {{$v.participation.$params.between.min}} and {{$v.participation.$params.between.max}}.
                </div>

                <!-- Dynamic max value error -->
                <div class="error" v-if="!$v.participation.maxValue && $v.participation.$error">
                  Total participation is currently {{ overallParticipation }}%, please insert a value under {{ 100 - overallParticipation }}.
                </div>

              </div>

              <div class="form-control">
                <button 
                  :disable="$v.firstName.$invalid || $v.lastName.$invalid || $v.participation.$invalid" 
                  @click.prevent="send(mutate)" 
                  class="btn" 
                  plain
                >
                  SEND
                </button>
              </div>
          </div> 

          <div class="error">{{ error }}</div>

        </template>

      </ApolloMutation>


  </div>
</template>

<script>
import { required, integer, maxValue, minLength, maxLength, between } from 'vuelidate/lib/validators'

export default {
  props: [
    'overallParticipation'
  ],

  // Local state
  data() {
    return {
      firstName: '',
      lastName: '',
      participation: '',
    }
  },

  // Vuelidate rules
  validations() {
    return {
      firstName: {
        required,
        maxLength: maxLength(30),
        minLength: minLength(1)
      },
      lastName: {
        required,
        maxLength: maxLength(30),
        minLength: minLength(1)
      },
      participation: {
        required,
        integer,
        between: between(0, 100),
        maxValue: maxValue(100 - this.$props.overallParticipation)
      }
    }
  },
  methods: {
    // Control input fields validation
    send(mutate){
      if (!this.$v.firstName.$invalid || !this.$v.lastName.$invalid || !this.$v.participation.$invalid){
        mutate();
        this.firstName = '';
        this.lastName = '';
        this.participation = '';
        this.$v.firstName.$reset();
        this.$v.lastName.$reset();
        this.$v.participation.$reset();
        
      }      
    },
    // Send event to CreatePerson parent for done event on ApolloMutation component
    onDone(){
      this.$emit('done');
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
.header {
  width: 100%;
}
input, button {
  border-radius: 3px;
  width: 100%;
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
  .form-group {width: 90%}
  .form-control {width: 60%;}
  button {font-size: 14px; padding: 16px}
}
@media only screen and (min-width: 220px) {
  .form-group {width: 90%}
  .form-control{width: 40%;}
  button {font-size: 14px; padding: 16px}
}
@media only screen and (min-width: 350px) {
  .form-group {width: 90%}
  .form-control{width: 25%;}
  button {font-size: 14px; padding: 16px}
}
@media only screen and (min-width: 860px) {
  .form-group {width: 25%}
  .form-control{width: 15%;}
  button {font-size: 17px; padding: 14px}
}
@media only screen and (min-width: 1000px) {
  .form-group {width: 18%}
  .form-control{width: 8%;}
  button {font-size: 17px; padding: 14px}
}
@media only screen and (min-width: 1920px) {
  .form-group {width: 16%}
  .form-control{width: 8%;}
  button {font-size: 17px; padding: 14px}
}
input {
  color: rgb(80, 75, 75);
  background-color: #fff;
  font-size: 14px;
  border-width: 0px;
  padding: 18px;
}
button {
  color: #fff;
  font-weight: bold;
  border-color: #fff;
  border-width: 2px;
  border-style: solid;
}
.form-group, .form-control{
  margin: 10px;
}
.error {
  padding: 5px;
  font-size: 13px;
  font-weight: bold;
  color: rgb(255, 248, 145);
}

</style>