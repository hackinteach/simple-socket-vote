<template>
    <v-app>
        <v-container>
            <v-layout align-center justify-space-around row fill-height pa-3 mb-2>
                <v-flex d-flex xs12 sm6 md4>
                    <v-card color="green" dark>
                        <v-card-title primary class="title">YES</v-card-title>
                        <v-card-text>{{YES}}</v-card-text>
                    </v-card>
                </v-flex>


                <v-flex d-flex xs12 sm6 md4>
                    <v-card color="red" dark>
                        <v-card-title primary class="title">NO</v-card-title>
                        <v-card-text>{{NO}}</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-footer absolute class="pa-3">
            <v-spacer></v-spacer>
            <div>&copy; {{ new Date().getFullYear() }}</div>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        name: "Vote",
        data() {
            return ({
                YES: 0,
                NO: 0,
            })
        },
        mounted(){
            this.socketio.on("result", ({NO, YES}) => {
                this.YES = (YES || 0)
                this.NO = (NO || 0)
            })
        },
    }
</script>

<style scoped>

</style>
