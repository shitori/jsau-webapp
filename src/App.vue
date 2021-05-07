<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-left">
      <router-link class="navbar-brand text-danger" to="/"><img src="/images/logo.png" height="60em" width="150em" alt="logo"/></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/enquetes?show=a">Voir toutes les enquêtes</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/enquetes?show=c">Créer une enquête</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="alert alert-success" role="alert"
         v-if="$route.query.message">
      {{$route.query.message}}
    </div>
    <div class="alert alert-danger" role="alert"
         v-if="$route.query.error">
      {{$route.query.error}}
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
