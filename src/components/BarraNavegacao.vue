<template>
  <header>
    <nav class="nav-bar">

      <div class="flex align-items-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="16" fill="#AEB3BE" />
          <mask id="mask0_65_142" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="16" height="16">
            <rect x="8" y="8" width="16" height="16" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_65_142)">
            <path
              d="M16.0003 16C15.2669 16 14.6392 15.7388 14.1169 15.2166C13.5947 14.6944 13.3336 14.0666 13.3336 13.3333C13.3336 12.6 13.5947 11.9722 14.1169 11.45C14.6392 10.9277 15.2669 10.6666 16.0003 10.6666C16.7336 10.6666 17.3614 10.9277 17.8836 11.45C18.4058 11.9722 18.6669 12.6 18.6669 13.3333C18.6669 14.0666 18.4058 14.6944 17.8836 15.2166C17.3614 15.7388 16.7336 16 16.0003 16ZM10.6669 21.3333V19.4666C10.6669 19.0888 10.7642 18.7416 10.9586 18.425C11.153 18.1083 11.4114 17.8666 11.7336 17.7C12.4225 17.3555 13.1225 17.0972 13.8336 16.925C14.5447 16.7527 15.2669 16.6666 16.0003 16.6666C16.7336 16.6666 17.4558 16.7527 18.1669 16.925C18.878 17.0972 19.578 17.3555 20.2669 17.7C20.5892 17.8666 20.8475 18.1083 21.0419 18.425C21.2364 18.7416 21.3336 19.0888 21.3336 19.4666V21.3333H10.6669Z"
              fill="white" />
          </g>
        </svg>
        <div class="flex flex-column	ml-3">
          <label id="texto-saudacao" for="">Olá, Bem-vindo</label>
          <label id="texto-usuario" for="">Carlos Pereira</label>
        </div>
      </div>



      <div class="mobile-menu-icon">
        <!-- <button onclick="menuShow()"><img class="icon" src="assets/img/menu_white_36dp.svg" alt=""></button> -->
      </div>
    </nav>
    <div class="mobile-menu">
      <ul>
        <li class="nav-item"><a href="#" class="nav-link">Início</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Projetos</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Sobre</a></li>
      </ul>

      <div class="login-button">
        <label for="">Olá, Bem-vindo!</label>
        <label for="">Carlos Pereira</label>
      </div>
    </div>
  </header>



</template>


<script>
import Menubar from 'primevue/menubar';
export default {
  components: {
    Menubar

  },
  props: [],
  data() {
    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home'
        },
        {
          label: 'Features',
          icon: 'pi pi-star'
        },
        {
          label: 'Projects',
          icon: 'pi pi-search',
          items: [
            {
              label: 'Components',
              icon: 'pi pi-bolt'
            },
            {
              label: 'Blocks',
              icon: 'pi pi-server'
            },
            {
              label: 'UI Kit',
              icon: 'pi pi-pencil'
            },
            {
              label: 'Templates',
              icon: 'pi pi-palette',
              items: [
                {
                  label: 'Apollo',
                  icon: 'pi pi-palette'
                },
                {
                  label: 'Ultima',
                  icon: 'pi pi-palette'
                }
              ]
            }
          ]
        },
        {
          label: 'Contact',
          icon: 'pi pi-envelope'
        }
      ]

    };
  },
  methods: {



  },
  computed: {

  },
  mounted() {

  }

}
</script>

<style>
header {
  background-color: white;
  padding-left: calc(82px + 40px);
}

#texto-saudacao {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #AEB3BE;
}

#texto-usuario{
font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 30px;
color: #AEB3BE;
}

.nav-bar {
  display: flex;
  justify-content: end;
  padding: 1.5rem 6rem;
}

.logo {
  display: flex;
  align-items: center;
}

.logo h1 {}

.nav-list {
  display: flex;
  align-items: end;
}

.nav-list ul {
  display: flex;
  justify-content: end;
  list-style: none;
}

.nav-item {
  margin: 0 15px;
}

.nav-link {
  text-decoration: none;
  font-size: 1.15rem;
  font-weight: 400;
}

.login-button button {
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #0187a7;
}

.login-button button a {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  font-size: 1.1rem;
}

.mobile-menu-icon {
  display: none;
}

.mobile-menu {
  display: none;
}

@media screen and (max-width: 730px) {
  .nav-bar {
    padding: 1.5rem 4rem;
  }

  .nav-item {
    display: none;
  }

  .login-button {
    display: none;
  }

  .mobile-menu-icon {
    display: block;
  }

  .mobile-menu-icon button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .mobile-menu ul {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-bottom: 1rem;
  }

  .mobile-menu .nav-item {
    display: block;
    padding-top: 1.2rem;
  }

  .mobile-menu .login-button {
    display: block;
    padding: 1rem 2rem;
  }

  .mobile-menu .login-button button {
    width: 100%;
  }

  .open {
    display: block;
  }
}
</style>
