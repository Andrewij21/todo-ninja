<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Projects</h1>
    <v-container class="my-5">
         <v-expansion-panels>
          <v-expansion-panel v-for="project in myProject" :key="project.title">
            <v-expansion-panel-header>{{project.title}}</v-expansion-panel-header>
            <v-expansion-panel-content class="grey--text">
              <div class="font-weight-bold">{{project.due}}</div>
              <div>{{project.content}}</div>
            </v-expansion-panel-content>
          </v-expansion-panel>
         </v-expansion-panels>
    </v-container>
  </div>
</template>
<script>
import db from '@/db'
import { collection, query, onSnapshot } from "firebase/firestore";
export default{
  name,
  computed:{
    myProject(){
      return this.projects.filter(project=>project.person=="The Net Ninja")
    }
  },
  data(){
    return{
        projects: []
    }
  },
  async created(){
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
