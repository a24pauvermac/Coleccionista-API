<script>
import "/main.css"
</script>
<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="main-title">
            <span class="main-title-circle"></span>Biblioteca de Libros
          </h1>
          <p class="subtitle">
            Descubre autores y explora tu biblioteca favorita
          </p>
        </div>
      </div>
      <TheNavBar></TheNavBar>
    </header>

    <main class="main-content">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </main>

    <footer class="app-footer">
      <p>&copy; 2024 Biblioteca de Libros. Tu biblioteca digital.</p>
    </footer>
  </div>
</template>
