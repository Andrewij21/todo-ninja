<template>
    <nav>
        <!-- flat sama seperti text dan  app di gunakan untuk fixed position  -->
        <v-snackbar v-model="snackbar" color="success" :timeout="4000" top transition="scroll-y-transition">
            <span>You added new project !</span>
            <template v-slot:action="{attrs}" >
                <v-btn color="white" text v-bind="attrs"  @click="snackbar = false">
                    close
                </v-btn>
            </template>
        </v-snackbar>
        <v-app-bar  flat app>
            <v-app-bar-nav-icon class="grey--text" @click="toggleDrawer"></v-app-bar-nav-icon>
            <v-app-bar-title class="grey--text text-uppercase">
                <span class="font-weight-light">Todo</span>
                <span>Ninja</span>
            </v-app-bar-title>
            <v-spacer></v-spacer>

            <v-menu offset-y>
                <template v-slot:activator="{on}">
                    <v-btn text color="grey" v-on="on">
                        <v-icon left>mdi-chevron-down</v-icon>
                        <span>Menu</span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="link in links" :key="link.text" :to="link.route" color="primary">
                        <v-list-item-content>
                            <v-list-item-title>{{link.text}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-btn text color="grey">
                <span>Sign Out</span>
                <v-icon right>mdi-logout</v-icon>    
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer app v-model="drawer" class="primary">
            <v-row>
                <v-col class="mt-5 text-center" >
                    <v-avatar size="100">
                        <v-img src="/avatar-1.png"></v-img>
                    </v-avatar>
                    <p class="white--text subtitle mt-1">The Net Ninja</p>
                </v-col>
                <v-col class="mb-8 mt-2 text-center">
                    <Popup @projectAdded="showSnackBar" />
                </v-col>
            </v-row>
            <v-list>
                <v-list-item v-for="(link,i) in links" :key="i" :to="link.route">
                    <v-list-item-action>
                        <v-icon color="white">{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import Popup from '@/components/Popup.vue'
export default{
    name:"Navbar-vue",
    components:{Popup},
    data(){
        return{
            drawer:false,
            links:[
                {icon:"mdi-view-dashboard",text:"Dashboard",route:"/"},
                {icon:"mdi-folder",text:"My Project",route:"/projects"},
                {icon:"mdi-account",text:"Team",route:"/team"},
            ],
            snackbar:false   
        }
    },
    methods:{
        toggleDrawer(){
            this.drawer = !this.drawer
        },
        showSnackBar(){
            this.snackbar = !this.snackbar 
        } 
    }
}
</script>