<template>
    <v-dialog max-width="600px" v-model="dialog" >
        <template v-slot:activator="{on}">
            <v-btn  class="success" text v-on="on">
                Add new project
            </v-btn>
        </template>
        <v-card>
            <v-card-title>Add new project</v-card-title>
            <v-card-text>
                <v-form ref="form" class="px-3">
                    <v-text-field v-model="title" label="Title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
                    <v-textarea v-model="content" label="Information"  prepend-icon="mdi-pencil" :rules="inputRules"></v-textarea>
                    <v-menu offset-y max-width="290" :close-on-content-click="false">
                        <template v-slot:activator="{on}">
                            <v-text-field v-on="on" label="Pick date" :value="formattedDate" prepend-icon="mdi-calendar" :rules="inputRules"></v-text-field>
                        </template>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>
                    <v-btn text class="success mt-3" :loading="loading" @click.prevent="submit">Add project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import {format,parseISO} from 'date-fns'
import db from '@/db'
import { collection, addDoc } from "firebase/firestore";

export default{
    name,
    data(){
        return{
            title:"",
            content:"",
            due:null,
            inputRules:[
                v => !!v || "is required",
                v => ( v && v.length >=3) || "Minimum length is 3 characters"
            ],
            loading:false,
            dialog:false
        }
    },
    methods:{
         async submit(){
            if(this.$refs.form.validate()){
                this.loading=true;
                 const project={
                    title:this.title,
                    content:this.content,
                    due:format(parseISO(this.due),"do MMM yyyy"),
                    person:"The Net Ninja",
                    status:"ongoing"
                 }

            await addDoc(collection(db, "projects"),project);
                this.loading=false;         
                this.dialog=false;
                this.$emit("projectAdded")
            }
        } 
    },
    computed:{
        formattedDate(){
            return this.due?format(parseISO(this.due),"do MMM yyyy"):""
        }
    }
}
</script>