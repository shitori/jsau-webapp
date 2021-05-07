<template>
  <div class="container">
    <h1>{{enquete.titre}}</h1>
    <h2>{{enquete.description}}</h2>
    <form method="post">
      <div v-for="question in questions" v-bind:key="question.id"
           class="form-group">
        <label v-bind:for="question.id">{{question.titre}}</label>
        <input v-if="question.reponse.type === 'number'" v-bind:id="question.id"
               class="form-control " type="number"
               v-model="reponses[question.id]" required
               v-bind:name="question.id"/>
        <input v-else-if="question.reponse.type === 'text'" v-bind:id="question.id"
               class="form-control " type="text"
               v-model="reponses[question.id]" required
               v-bind:name="question.id"/>
        <div v-else-if="question.reponse.type === 'choix'">
          <select v-bind:id="question.id" class="form-control "
                  v-bind:name="question.id"
                  v-model="reponses[question.id]" required>
            <option v-for="(choix,index) in question.reponse.choix" v-bind:key="index">{{choix}}</option>
          </select>
        </div>
        <textarea v-bind:id="question.id" class="form-control "
                  rows="3" v-bind:name="question.id"
                  v-model="reponses[question.id]" required
                  v-else></textarea>
      </div>
      <button class="btn btn-outline-success" type="button"
              v-on:click="postResult">Valider
      </button>
    </form>
    <hr/>
    <p>
      <button class="btn btn-warning" data-target="#admin"
              data-toggle="collapse" type="button"
              aria-expanded="false" aria-controls="admin">
        Administrateur ?
      </button>
    </p>
    <div class="collapse" id="admin">
      <div class="card card-body">
        <div class="row">
          <div class="col">
            <h3>Modification de l'enquête: </h3>
            <form class="text-left" method="post">
              <div class="form-group">
                <label>Titre</label>
                <input v-model="enquete.titre"
                       class="form-control" name="titre"
                       type="text"/>
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" class="form-control"
                          rows="3"
                          name="description" v-model="enquete.description"></textarea>
              </div>
              <div class="form-group">
                <label>Mot de passe de confirmation</label>
                <input v-model="secret"
                       class="form-control" name="secret"
                       type="password"/>
              </div>
              <button class="btn btn-outline-warning" type="button"
                      v-on:click="putEnquete">Modifier
              </button>
            </form>
          </div>
          <div class="col">
            <h3>Ajout d'une question: </h3>
            <form class="text-left" method="post">
              <div class="form-group">
                <label>Titre de la question</label>
                <input v-model="titre"
                       class="form-control" name="titre"
                       type="text"/>
              </div>
              <div class="form-group">
                <label>Type de réponses attendues</label>
                <select v-model="reponse"
                        class="form-control" name="reponse">
                  <option value="number" selected>Nombre ou chiffre</option>
                  <option value="text">Phrase courte ou mot</option>
                  <option value="libre">Libre</option>
                </select>
              </div>
              <div class="form-group">
                <label>Mot de passe de confirmation</label>
                <input v-model="secret"
                       class="form-control" name="secret"
                       type="password"/>
              </div>
              <button class="btn btn-outline-success" type="button"
                      v-on:click="postQuestion">Ajouter à l'enquête
              </button>
            </form>
          </div>
          <div class="col">
            <h3>Suppression de l'enquête: </h3>
            <form class="text-left" method="post">
              <div class="form-group">
                <label>Mot de passe de confirmation</label>
                <input v-model="secret"
                       class="form-control" name="secret"
                       type="password"/>
              </div>
              <button class="btn btn-outline-danger" type="button"
                      value="send" v-on:click="deleteEnquete">
                Supprimer l'enquête
              </button>
            </form>
          </div>
        </div>
        <div v-for="question in questions" v-bind:key="question.id">
          <hr/>
          <h3>Question n°{{question.id}}:</h3>
          <div class="row">
            <div class="col">
              <h4>Modification</h4>
              <form class="text-left" method="post">
                <div class="form-group">
                  <label>Titre</label>
                  <input v-model="question.titre"
                         class="form-control" name="titre"
                         type="text"/>
                </div>
                <div class="form-group">
                  <label>Type de réponses attendues</label>
                  <select v-model="question.reponse.type"
                          class="form-control" name="reponse">
                    <option v-bind:selected="question.reponse.type==='number'" value="number">Nombre ou chiffre</option>
                    <option v-bind:selected="question.reponse.type==='text'" value="text">Phrase courte ou mot</option>
                    <option v-bind:selected="question.reponse.type==='libre' " value="libre">Libre</option>
                    <option disabled v-bind:selected="question.reponse.type==='choix' "
                            value="choix">Choix
                    </option>
                  </select>
                  <div class="form-group">
                    <label>Mot de passe de confirmation</label>
                    <input v-model="secret"
                           class="form-control" name="secret"
                           type="password"/>
                  </div>
                </div>
                <button class="btn btn-outline-warning" type="button"
                        v-on:click="putQuestion(question.id)">Modifier
                </button>
              </form>
            </div>
            <div class="col">
              <h4>Suppression</h4>
              <form class="text-left" method="post">
                <div class="form-group">
                  <label>Mot de passe de confirmation</label>
                  <input v-model="secret"
                         class="form-control" name="secret"
                         type="password"/>
                </div>
                <button class="btn btn-outline-danger" type="button"
                        v-on:click="deleteQuestion(question.id)">
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
    name: 'enquete',
    data() {
        return {
            enquete: {},
            questions: {},
            reponses: {},
            secret: null,
            titre: null,
            reponse: null
        }
    },
    beforeMount() {
        this.getEnquete()
    },
    methods: {
        async getEnquete() {
            const res = await fetch('http://localhost:3000/enquetes/' + this.$route.params.id)
            const trueData = await res.json()
            if (trueData.error) {
                this.$router.push('/enquetes?error=' + trueData.error).catch(() => {
                })
            } else {
                this.enquete = trueData.enq
                this.questions = trueData.quest
                for (const question of this.questions) {
                    this.reponses[question.id] = null
                }
            }
        },
        postResult() {
            const keys = Object.keys(this.reponses)
            const body = {
                res: []
            }
            for (const key of keys) {
                body.res.push({
                    id_questions: key,
                    resultat: this.reponses[key]
                })
            }
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            }
            let newUrl = ''
            fetch('http://localhost:3000/enquetes/' + this.$route.params.id + '/resultats', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        newUrl = '/enquetes/' + this.$route.params.id + '/resultats?message=' + data.status
                    } else {
                        newUrl = '/enquetes/' + this.$route.params.id + '?error=' + data.error
                    }
                    this.$router.push(newUrl).catch(() => {
                    })
                })
        },
        putEnquete() {
            const body = {
                titre: this.enquete.titre,
                description: this.enquete.description,
                secret: this.secret
            }
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            }
            let newUrl = ''
            fetch('http://localhost:3000/enquetes/' + this.$route.params.id, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        newUrl = '/enquetes/' + this.$route.params.id + '?message=' + data.status
                    } else {
                        newUrl = '/enquetes/' + this.$route.params.id + '?error=' + data.error
                    }
                    this.getEnquete()
                    this.$router.push(newUrl).catch(() => {
                    })
                })
        },
        postQuestion() {
            const body = {
                secret: this.secret,
                qst: {
                    titre: this.titre,
                    reponse: {
                        type: this.reponse
                    }
                }
            }
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            }
            let newUrl = ''
            fetch('http://localhost:3000/enquetes/' + this.$route.params.id + '/question', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        newUrl = '/enquetes/' + this.$route.params.id + '?message=' + data.status
                    } else {
                        newUrl = '/enquetes/' + this.$route.params.id + '?error=' + data.error
                    }
                    this.getEnquete()
                    this.$router.push(newUrl).catch(() => {
                    })
                })
        },
        deleteEnquete() {
            const body = {
                secret: this.secret
            }
            const requestOptions = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            }
            let newUrl = ''
            fetch('http://localhost:3000/enquetes/' + this.$route.params.id, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        newUrl = '/enquetes/?message=' + data.status
                    } else {
                        newUrl = '/enquetes/?error=' + data.error
                    }
                    this.$router.push(newUrl).catch(() => {
                    })
                })
        },
        putQuestion(id) {
            for (const question of this.questions) {
                if (question.id === id) {
                    const body = {
                        secret: this.secret,
                        titre: question.titre,
                        reponse: question.reponse.type

                    }
                    const requestOptions = {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(body)
                    }
                    let newUrl = ''
                    fetch('http://localhost:3000/enquetes/' + this.$route.params.id + '/question/' + id, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            if (data.status) {
                                newUrl = '/enquetes/' + this.$route.params.id + '?message=' + data.status
                            } else {
                                newUrl = '/enquetes/' + this.$route.params.id + '?error=' + data.error
                            }
                            this.$router.push(newUrl).catch(() => {
                            })
                        })
                }
            }
        },
        deleteQuestion(id) {
            for (const question of this.questions) {
                if (question.id === id) {
                    const body = {
                        secret: this.secret
                    }
                    const requestOptions = {
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(body)
                    }
                    let newUrl = ''
                    fetch('http://localhost:3000/enquetes/' + this.$route.params.id + '/question/' + id, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            if (data.status) {
                                newUrl = '/enquetes/' + this.$route.params.id + '?message=' + data.status
                            } else {
                                newUrl = '/enquetes/' + this.$route.params.id + '?error=' + data.error
                            }
                            this.getEnquete()
                            this.$router.push(newUrl).catch(() => {
                            })
                        })
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
