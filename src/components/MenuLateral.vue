<template>
<nav id="sidebar">
    <div id="sidebar_content">
        <div id="user">
            <!-- <img src="src/images/avatar.jpg" id="user_avatar" alt="Avatar"> -->

            <p id="user_infos">
              
            </p>
        </div>

        <ul id="side_items">
            <li v-if="tipoAcesso != 'aluno'" id="inicio" class="side-item" >
                <router-link to="/dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                    </svg>
                    <span class="item-description">
                        Início
                    </span>
                </router-link>
            </li>

                <li v-if="tipoAcesso != 'aluno'" id="configuracoes" class="side-item">
                <router-link to="/configuracoes">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
                            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
                            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
                    </svg>
                    <span class="item-description">
                        Configurações do Chatbot
                    </span>
                </router-link>
            </li>

                <li v-if="tipoAcesso != 'aluno'" id="pessoas" class="side-item">
                <router-link to="/pessoas-setores">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                    </svg>
                    <span class="item-description">
                        Gerenciamento de pessoas e setores
                    </span>
                </router-link>
            </li>

                <li v-if="tipoAcesso != 'aluno'" id="indicadores" class="side-item">
                <router-link to="/indicadores">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><title>list-box-outline</title><path d="M11 15H17V17H11V15M9 7H7V9H9V7M11 13H17V11H11V13M11 9H17V7H11V9M9 11H7V13H9V11M21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5M19 5H5V19H19V5M9 15H7V17H9V15Z" /></svg>
                    <span class="item-description">
                        Indicadores
                    </span>
                </router-link>
            </li>

            <li id="conversas" class="side-item">
                <router-link to="/conversas">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                    </svg>
                    <span class="item-description">
                        Conversas simultâneas
                    </span>
                </router-link>
            </li>

                <li v-if="tipoAcesso != 'aluno'" id="relatorios" class="side-item">
                <router-link to="/relatorios">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
                            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                    </svg>
                    <span class="item-description">
                        Relatórios
                    </span>
                </router-link>
            </li>
        </ul>

        <button id="open_btn" @click="abrir">
                <i id="open_btn_icon" class="fa-solid fa-chevron-right" ></i>
        </button>
    </div>

    <div id="logout">
        <router-link to="/">
            <button id="logout_btn" @click="sair">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span class="item-description">
                    Sair
                </span>
            </button>
        </router-link>
    </div>
</nav>
</template>




<script>
// import SvgIcon from '@jamescoyle/vue-icon';

import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'

export default {
    components: {

    },
    props: [],
    data() {
        return {
            path: mdiAccount,
            tipoAcesso: null

        };
    },
    methods: {
        abrir() {
            document.getElementById('sidebar').classList.toggle('open-sidebar');
        },
        selecionarItem(item){
            this.deselecionarItem();
            document.getElementById(item).classList.toggle('active');
            document.getElementById('sidebar').classList.toggle('open-sidebar');

        },
        deselecionarItem(){
            document.getElementById('inicio').classList.remove('active');
            document.getElementById('configuracao').classList.remove('active');
            document.getElementById('pessoas').classList.remove('active');
            document.getElementById('conversas').classList.remove('active');
            document.getElementById('relatorios').classList.remove('active');
            document.getElementById('turmas').classList.remove('active');
            document.getElementById('indicadores').classList.remove('active');
        },
        sair(){
            localStorage.setItem('autorizado', false)
            localStorage.setItem('nome', null);
            localStorage.setItem('tipoAcesso', null);
            localStorage.setItem('email', null);
            localStorage.setItem('instituicao', null);
            localStorage.setItem('curso', null);
        }



    },
    computed: {

    },
    mounted() {
        this.tipoAcesso = localStorage.getItem('tipoAcesso');
    }

}
</script>


<style scop>






#sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ffffff;
    height: 100vh;
    position: fixed;
    transition: all .5s;
    min-width: 82px;
    z-index: 1;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

#sidebar_content {
    padding: 12px;
}

#user {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
}

#user_avatar {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 20px;
}

#user_infos {
    display: flex;
    flex-direction: column;
}

#user_infos span:last-child {
    color: #6b6b6b;
    font-size: 12px;
}

#side_items {
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
}

.side-item {
    border-radius: 8px;
    padding: 14px;
    cursor: pointer;
    color: white
}

.side-item.active {
    background-color: #45A8BF;
}

.side-item:hover:not(.active),
#logout_btn:hover {
    background-color: #e3e9f7;
}

.side-item a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
}

.side-item.active a {
    color: #e3e9f7;
}

.side-item a i {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
}

#logout {
    border-top: 1px solid #e3e9f7;
    padding: 12px;
}

#logout_btn {
    border: none;
    padding: 12px;
    font-size: 14px;
    display: flex;
    gap: 20px;
    align-items: center;
    border-radius: 8px;
    text-align: start;
    cursor: pointer;
    background-color: transparent;
}

#open_btn {
    position: absolute;
    top: 20px;
    right: -10px;
    background-color: #45A8BF;
    color: #e3e9f7;
    border-radius: 100%;
    width: 25px;
    height: 25px;
    border: none;
    cursor: pointer;
}

#open_btn_icon {
    transition: transform .3s ease;
    color: white
}

.open-sidebar #open_btn_icon {
    transform: rotate(180deg);
}

.item-description {
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    transition: width .6s;
    height: 0px;
    color: white
}

#sidebar.open-sidebar {
    min-width: 15%;
}

#sidebar.open-sidebar .item-description {
    width: 150px;
    height: auto;
}

#sidebar.open-sidebar .side-item a {
    justify-content: flex-start;
    gap: 14px;
}
</style>
