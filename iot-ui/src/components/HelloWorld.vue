<template>
  <v-container fill-height>
    <v-layout column>
      <v-flex xs12 text-xs-center>
        <table>
          <thead>
          <tr>
            <template v-for="h in headers">
              <td :key="`${h}-header`">{{h}}</td>
            </template>
          </tr>
          </thead>
          <tbody>
          <template v-for="(v,k) in votes">
            <tr :key="`row-${k}`">
              <template v-for="(lst, ans) in v">
                <td :key="`${ans}-${k}`">
                  {{lst.length}}
                </td>
              </template>
            </tr>
          </template>
          </tbody>
        </table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import io from 'socket.io-client';
  import _ from 'lodash';

  export default {
    mounted() {
      this.socket = io.connect('http://localhost:1234')
      this.socket.on('connect', () => {
        console.log('Connected');
      })
      this.socket.on('init', (payload) => {
        this.votes = payload
        console.log('init',payload)
      })
      this.socket.on('summary', (payload) => {
        const {sender, answer} = payload
        console.log('payload', payload)
        if (this.votes[answer]) {
          this.votes[answer].push(sender)
        } else {
          this.votes[answer] = [sender]
        }
        this.headers = _.keys(this.votes)
        console.log('votes', this.votes)
      })
    },
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data() {
      return {
        headers: [],
        socket: null,
        votes: [],
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
