<template>
  <div class="container">
    <div class="jumbotron mt-5 border border-dark">
      <h1 class="display-4">Bienvenue sur InvestApp !</h1>
      <p class="lead">InvestApp est une application permettant de répondre à des enquêtes et d'en créer.</p>
      <hr class="my-4"/>
      <p>Commencez dès maintenant !</p>
      <p>
        <button class="btn btn-outline-primary btn-lg" type="button"
                data-toggle="collapse"
                data-target="#createEnq"
                aria-expanded="false" aria-controls="createEnq">
          Créer une nouvelle enquête ?
        </button>
      </p>
      <div class="mb-5 collapse" id="createEnq"
           v-bind:class="{ 'show' : $route.query.show === 'c'}">
        <div class="card card-body">
          <h2>Créer une nouvelle enquête : </h2>
          <form class="text-left" method="post">
            <div class="form-group">
              <label for="titre">Titre</label>
              <input required type="text"
                     class="form-control" id="titre"
                     name="titre" v-model="titre"
                     placeholder="Titre de votre enquête"/>
            </div>
            <div class="form-group">
              <label for="secret">Mot de passe</label>
              <input required type="password"
                     class="form-control" id="secret"
                     name="secret" v-model="secret"/>
              <label for="confirmSecret">Confirmer le mot de passe</label>
              <input required type="password"
                     class="form-control" id="confirmSecret"
                     name="confirmSecret"
                     v-model="confirmSecret"/>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" id="description"
                        rows="3" name="description"
                        v-model="description"></textarea>
            </div>
            <button type="button" v-on:click="postEnquete"
                    class="btn btn-outline-success">Valider</button>
          </form>
        </div>
      </div>
      <p>
        <button class="btn btn-outline-primary btn-lg" type="button"
                data-toggle="collapse"
                data-target="#AllEnq"
                aria-expanded="false" aria-controls="AllEnq">
          Voir toutes les enquetes !
        </button>
      </p>
      <div class="collapse" id="AllEnq"
           v-bind:class="{ 'show' : $route.query.show === 'a'}">
        <h2 class="mb-2">Toutes les enquêtes :</h2>
        <div class="row">
          <div v-for="enquete in enquetes" v-bind:key="enquete.id"
               class="card mx-auto mb-5" style="width: 18rem;">
            <div class="card-body">
              <p class="card-text text-muted">{{enquete.id}}</p>
              <h4 class="card-title">{{enquete.titre}}</h4>
              <h5 class="card-text">{{enquete.description}}</h5>
              <div class="list-group-horizontal">
                <router-link class="btn btn-outline-success mr-1" v-bind:to="/enquetes/+''+enquete.id+''">Répondre</router-link>
                <router-link class="btn btn-outline-info" v-bind:to="/enquetes/+''+enquete.id+''+'/resultats'">Résultats</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'enquetes',
    data() {
        return {
            enquetes: {},
            titre: null,
            secret: null,
            confirmSecret: null,
            description: null
        }
    },
    beforeMount() {
        this.getEnquetes()
    },
    mounted() {

    },
    methods: {
        async getEnquetes() {
            try {
                const res = await fetch('http://localhost:3000/enquetes')
                this.enquetes = await res.json()
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e)
            }

        },
        postEnquete() {
            const body = {
                enq: {
                    secret: this.secret,
                    titre: this.titre,
                    description: this.description
                },
                ques: []
            }

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            }

            let newUrl = ''
            fetch('http://localhost:3000/enquetes', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        newUrl = '/enquetes/' + data.id_enquete + '?message=' + data.message
                    } else {
                        newUrl = '/enquetes?error=' + data.error
                    }
                    this.getEnquetes()
                    this.$router.push(newUrl).catch(() => {
                    })
                })
        }
    }
}
</script>

<style scoped>

</style>
np
