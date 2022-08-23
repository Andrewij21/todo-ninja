<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    <v-container class="my-5">
    <v-row class="mb-3">
      <v-col>
         <v-tooltip top color="green">
            <template v-slot:activator="{on}">
              <v-btn @click="sortBy('title')" v-on="on" text small color="grey">
                <v-icon small left>mdi-folder</v-icon>
                <span class="caption text-lowercase">By project name</span>
              </v-btn>
            </template>
            <span>Sorts projects by name</span>
        </v-tooltip>
        <v-tooltip top color="green">
          <template v-slot:activator="{on}">
              <v-btn @click="sortBy('person')" v-on="on" text small color="grey">
                <v-icon small left>mdi-account</v-icon>
                <span class="caption text-lowercase">By person</span>
              </v-btn>
          </template>
          <span>Sorts projects by person</span>
        </v-tooltip>
             
      </v-col>
    </v-row>

    <v-card flat :class="`pa-3 mb-1 project ${project.status}`" v-for="project in projects" :key="project.title">
       <v-row>
        <v-col cols="12" md="6">
          <v-card-subtitle class="grey--text">Project title</v-card-subtitle>
          <v-card-text>{{project.title}}</v-card-text>
        </v-col>
        <v-col cols="6" sm="4" md="2" >
          <v-card-subtitle class="grey--text">Person</v-card-subtitle>
          <v-card-text>{{project.person}}</v-card-text>
        </v-col>
        <v-col cols="6" sm="4" md="2">
          <v-card-subtitle class="grey--text">Due by</v-card-subtitle>
          <v-card-text>{{project.due}}</v-card-text>
        </v-col>
        <v-col cols="6" sm="4" md="2">
           <div class="text-center">
            <v-chip :class="`${project.status} white--text my-7 subtitle-2`" small>{{project.status}}</v-chip>
           </div>
        </v-col>
       </v-row>
    </v-card>
    
</v-container>
  </div>
</template>

<script>
import { collection, query, onSnapshot } from "firebase/firestore";
import db from '@/db'
  export default {
    name: 'Home-vue',
    data(){
      return{
        projects: []
      }
    },
    methods:{
      sortBy(prop){
        this.projects.sort((a,b)=>a[prop].toLowerCase() < b[prop].toLowerCase()?-1:1)
      }
    },
    created(){
        const q = query(collection(db, "projects"));
         onSnapshot(q,(querySnapshot) => {
          querySnapshot.docChanges().forEach((doc) => {
              if(doc.type=="added"){
                this.projects.push({...doc.doc.data(),id:doc.doc.id});
              }
          });
        });
     
    }
  }
</script>

<style scoped>
  .project.complete{
    border-left:4px solid #3cd1c2;
  }
  .project.ongoing{
    border-left:4px solid orange;
  }
  .project.overdue{
    border-left:4px solid tomato;
  }
  .v-chip.v-chip--no-color.theme--light.complete{
    background:#3cd1c2;
  }
  .v-chip.v-chip--no-color.theme--light.ongoing{
    background: orange;
  }
  .v-chip.v-chip--no-color.theme--light.overdue{
    background: tomato;
  }
</style>