<template>
<div id="estrutura">
    <MenuLateral></MenuLateral>

    <div id="container">

    </div>

    <div id="chat-container">
        <h1>Coordena Agora Chatbot</h1>
        <div id="chat-history" v-for="resposta in historico">

            {{ resposta }} <br>

        </div>
        <div id="chat-form">
            <input type="text" id="user-input" placeholder="Enter your message" v-model="mensagem">
            <button type="submit" @click="enviarMensagem">Send</button>
        </div>
    </div>

    <!-- <BarraNavegacao></BarraNavegacao> -->
</div>
</template>

<script>
import Estrutura from '@/components/Estrutura.vue';
import MenuLateral from '@/components/MenuLateral.vue'
import InputText from 'primevue/inputtext'
import api from "@/plugins/axios";

export default {
    components: {
        Estrutura,
        MenuLateral,
        InputText

    },
    props: [],
    data() {
        return {
            mensagem: null,
            historico: [],

        };
    },
    methods: {
        enviarMensagem() {
            this.historico.push(this.mensagem)

            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/perguntas",
                data: {
                    user: "teste",
                    pergunta: this.mensagem,
                },
            }).then(response => {
                console.log(response);
                this.historico.push(response.data.mensagem)
            }).catch(erro => {});
            this.mensagem = null

        }

    },
    computed: {

    },
    mounted() {
        document.getElementById('conversas').classList.toggle('active');

    }

}
</script>

<style scoped>
#estrutura {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background-color: #F4F8F9;
    display: flex;
}

#container {
    margin-left: calc(82px + 50px);
    margin-top: 4rem;
    margin-right: 2rem;
    margin-bottom: 6rem;
    background-color: white;
    z-index: -1;
    padding: 2rem;
}

#chat-container {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
}

#chat-history {
    height: 100px;
    overflow-y: auto;
}

.user-message {
    text-align: right;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 10px;
    margin-bottom: 5px;
}

.bot-message {
    text-align: left;
    padding: 10px;
    background-color: #e0f0e0;
    border-radius: 10px;
    margin-bottom: 5px;
}

input {
    flex-grow: 1;
    margin-right: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
