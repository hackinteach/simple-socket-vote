<template>
    <v-app>
        <v-container>
            <v-layout column pa-3 mb-2>
                <v-container grid-list-lg>
                    <v-layout wrap>
                        <template v-for="(vote,answer) in sample">
                            <v-flex :key="answer" d-flex>
                                <v-card class="elevation-3" max-width="300">
                                    <v-card-title primary align="center" class="title grey text-truncate">{{answer}}</v-card-title>
                                    <v-card-text class="headline text-truncate" align="center">{{vote}}</v-card-text>
                                </v-card>
                            </v-flex>
                        </template>
                    </v-layout>
                    <v-layout row >
                        <v-flex d-flex xs12>
                            <v-btn dark @click="reset"
                            >RESET</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
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
                sample: {}
            })
        },
        methods: {
          reset() {
              this.socketio.emit('reset', {})
          }
        },
        mounted(){
            this.socketio.on("result", (data) => {
                this.sample = data
            })

            this.socketio.on("connect", (data) => {
                this.sample = data
            })
        },
    }
</script>

<style scoped>

</style>
