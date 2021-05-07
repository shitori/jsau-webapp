<template>
  <div class="container">
    <h1>{{enquete.titre}}</h1>
    <h2>{{enquete.description}}</h2>
    <div class="row mb-5">
      <div class="mx-auto col " v-for="question in qsts"
           v-bind:key="question.id">
        <h3>{{question.titre}}</h3>
        <div v-if="question.reponse.type !== 'libre'">
          <ul class="list-group">
            <li class="list-group-item active">Meilleurs résultats</li>
            <div v-for="(r,index) in resnmb" v-bind:key="index">
              <div v-if="r[0]===question.id">
                <li class="list-group-item" v-for="(rr,i) in r[1]"
                    v-bind:key="i">{{rr.resultat}} : {{rr.nb}}</li>
              </div>
            </div>
          </ul>
        </div>
        <ul class="list-group" v-else>
          <li class="list-group-item active">Touts les résultats</li>
          <div v-for="r in res" v-bind:key="r.id">
            <li class="list-group-item" v-if="r.id_questions === question.id">{{r.resultat}}</li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'resultat',
    data() {
        return {
            enquete: {},
            qsts: {},
            res: {},
            resnmb: {}
        }
    },
    mounted() {
        this.getEnquete()
        this
    },
    methods: {
        async getEnquete() {
            const res = await fetch('http://localhost:3000/enquetes/' + this.$route.params.id + '/resultats')
            const trueData = await res.json()
            if (trueData.error) {
                this.$router.push('/enquetes?error=' + trueData.error).catch(() => {
                })
            } else {
                this.enquete = trueData.enquete
                this.qsts = trueData.qsts
                this.res = trueData.res
                this.resnmb = Object.entries(trueData.resnmb)
                for (const array of this.resnmb) {
                    array[1].sort((a, b) => {
                        return a.nb - b.nb
                    }).reverse()
                }

            }
        }
    }
}

</script>

<style scoped>

</style>
