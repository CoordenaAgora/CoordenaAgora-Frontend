<template>
<div id="estrutura">
    <MenuLateral></MenuLateral>
    <BarraNavegacao></BarraNavegacao>

    
    <div id="container" v-if="tipoAcesso === 'coordenador'">
        <div class="flex">
            <div class="chats">
                <div class="flex justify-content-between conversa-item" v-for="conversa in conversas" @click="selecionarConversa(conversa)">
                    <label class="cursor-pointer">{{conversa.nome}}</label>
                    <label class="cursor-pointer" for="">{{conversa.dataHora}}</label>
                </div>
            </div>
            <div class="conversas">
                <div class="tituloConversa">
                    {{ conversaSelecionada.nome }}
                </div>
                <div id="divMensagens" class="mensagens">
                    <div v-for="resposta in historico">
                        <div v-if="resposta.quem_enviou === 'bot'" class="flex justify-content-end flex-wrap">
                            <label :class="estiloMensagem(resposta)">{{resposta.texto_mensagem}}</label>
                        </div>

                        <div v-else class="flex justify-content-start flex-wrap">
                            <label :class="estiloMensagem(resposta)">{{resposta.texto_mensagem}}</label>
                        </div>
                    </div>
                </div>
                <div class="enviarMensagem">
                    <InputText type="text" maxlength="200" placeholder="Digite sua mensagem" @keyup.enter="enviarMensagem(mensagem)" v-model="mensagem" :disabled="desabilitado"></InputText>
                    <Button class="botaoEnviar" :disabled="desabilitado" @click="enviarMensagem(mensagem)" label="Enviar" />
                </div>
            </div>
            <div class="menu">
                <Button class="botaoAssumirConversa" @click="trocarStatusAssumirConversa()" :label="labelBotaoAssumirConversa" />

                <div class="categoriasEncontradas">
                    <label for="lastname1">Indicadores encontrados pelo BOT: </label>
                    <AutoComplete v-model="indicadoresEncontrados" multiple />
                </div>
            </div>
        </div>

    </div>

    <div id="container" v-else>
        <div class="flex">
            <div class="conversasAluno">
                <div class="tituloConversa">
                    Chatbot CoordenaAgora
                </div>
                <div class="mensagens ">
                    <div v-for="resposta in historico">
                        <div v-if="resposta.quem_enviou === 'bot'" class="flex justify-content-end flex-wrap">
                            <label :class="estiloMensagem(resposta)">{{resposta.texto_mensagem}}</label>
                        </div>

                        <div v-else class="flex justify-content-start flex-wrap">
                            <label :class="estiloMensagem(resposta)">{{resposta.texto_mensagem}}</label>
                        </div>
                    </div>
                </div>
                <div class="enviarMensagem">
                    <InputText type="text" maxlength="200" placeholder="Digite sua mensagem" @keyup.enter="enviarMensagem(mensagem)" v-model="mensagem" :disabled="desabilitado"></InputText>
                    <Button class="botaoEnviar" :disabled="desabilitado" @click="enviarMensagem(mensagem)" label="Enviar" />
                </div>
            </div>
        </div>
    </div>
    <Toast></Toast>
</div>
</template>

<script>
import Estrutura from '@/components/Estrutura.vue';
import MenuLateral from '@/components/MenuLateral.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import AutoComplete from 'primevue/autocomplete'
import BarraNavegacao from '@/components/BarraNavegacao.vue'

import api from "@/plugins/axios";
import {
    mdiTempleBuddhistOutline
} from '@mdi/js';

export default {
    components: {
        Estrutura,
        MenuLateral,
        InputText,
        BarraNavegacao,
        Button,
        Toast,
        AutoComplete

    },
    props: [],
    data() {
        return {
            mensagens: {
                texto: null,
                quemEnviou: ""
            },
            mensagem: "",
            historico: [],
            conversas: [{
                    nome: "Aluno 1",
                    dataHora: "14:35"
                },
                {
                    nome: "Aluno 2",
                    dataHora: "11:05"
                },
            ],
            conversaSelecionada: "",
            desabilitado: false,
            indicadoresEncontrados: ["teste"],
            tipoAcesso: null,
            idAluno: null,
            idCoordenador: null,
            labelBotaoAssumirConversa: "Assumir conversa",
            assumirConversa: false,
            connection: null

        };
    },
    methods: {
        enviarMensagem(textoMensagem) {

            // const messageData = {
            //     message: this.newMessage,
            // };
            // this.connection.send(JSON.stringify(messageData));
            // this.newMessage = '';

            if (!textoMensagem) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: "Não foi enviado uma mensagem",
                    life: 3000
                });
                return;
            }
            this.desabilitado = true;
            this.salvarMensagem(textoMensagem);
            let contador = localStorage.getItem('contador');
            localStorage.setItem('contador', contador++);


            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/perguntas",
                data: {
                    //mudar para id
                    user: "teste",
                    pergunta: this.mensagem,
                },
            }).then(response => {
                this.salvarMensagem(response.data.mensagem, "bot");
                this.resgatarHistoricoAluno();

                this.desabilitado = false;
            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data.mensagem,
                    life: 3000
                });
            });
            this.mensagem = null;

        },
        selecionarConversa(conversa) {
            this.conversaSelecionada = conversa
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/listar-mensagens-por-aluno",
                params: {
                    id: conversa.id
                },
            }).then(response => {
                this.historico = response.data
                var divMensagens = document.getElementById("divMensagens");
                divMensagens.scrollTop = divMensagens.scrollHeight;


            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data.mensagem,
                    life: 3000
                });
            });
        },
        estiloMensagem(resposta) {
            if (resposta.quem_enviou === 'aluno') {
                return "mensagemAluno"
            } else {
                return "mensagemBot"
            }
        },
        salvarMensagem(textoMensagem, bot){
            const data = new Date();
            const quemEnviou = bot ? bot : this.tipoAcesso;
            const idCoordenador = bot ? null : this.idCoordenador;
            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/salvar-mensagem",
                data: {
                    texto_mensagem: textoMensagem,
                    data_hora: data,
                    quem_enviou: quemEnviou,
                    id_aluno: this.idAluno,
                    id_coordenador: idCoordenador
                },
            }).then(response => {
                this.resgatarHistoricoAluno();

            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data.mensagem,
                    life: 3000
                });
            });
        },
        resgatarHistoricoAluno(){
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/listar-mensagens-por-aluno",
                params: {
                    id: this.idAluno ? this.idAluno : this.idCoordenador
                },
            }).then(response => {
                this.historico = response.data
                var divMensagens = document.getElementById("divMensagens");
                divMensagens.scrollTop = divMensagens.scrollHeight;
            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data.mensagem,
                    life: 3000
                });
            });
        },
        listarTodosAlunos(){
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/listar-todos-alunos",
            }).then(response => {
                //ver depois como pegar a hora
                this.conversas = response.data.map(conversa => {
                    return {
                        id: conversa.id,
                        nome: conversa.nome,
                        dataHora: "15:00"
                    }
                })

            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data.mensagem,
                    life: 3000
                });
            });
        },
        trocarStatusAssumirConversa(){
            this.assumirConversa = !this.assumirConversa;
            this.labelBotaoAssumirConversa = this.assumirConversa ? "Assumindo conversa" : "Assumir conversa"
        }
    },
    computed: {

    },
    mounted() {
        localStorage.setItem('contador', 0)
        document.getElementById('conversas').classList.toggle('active');
        this.tipoAcesso = localStorage.getItem('tipoAcesso');
        if(this.tipoAcesso === 'aluno'){
            this.idAluno = localStorage.getItem('id');
            this.resgatarHistoricoAluno();
        } else {
            this.idCoordenador = localStorage.getItem('id');
            this.listarTodosAlunos();
        }

        console.log("Iniciando conexão com o web socket");
        this.connection = new WebSocket(`ws://127.0.0.1:8000/ws/chat/teste/`);

        this.connection.onmessage = (event) => {
            console.log("Mensagem recebida do WebSocket:", event.data);
            const data = JSON.parse(event.data);
            this.historico.push(data.message);
        }

        this.connection.onopen = (event) => {
            console.log("Conexão com o WebSocket criada com sucesso", event);
        }

        this.connection.onclose = (event) => {
            console.log("Conexão com o WebSocket fechada", event);
        }

        this.connection.onerror = (event) => {
            console.error("Erro no WebSocket", event);
        }
    }
}
</script>

<style scoped>
#estrutura {
    margin: 0;
    padding: 0;
    font-family: 'Poppins';
    min-height: 100vh;
    background-color: #F4F8F9;
    overflow: auto;
}

#container {
    margin-left: calc(82px + 50px);
    margin-top: 1rem;
    margin-right: 2rem;
    background-color: white;
    z-index: -1;
    padding: 0.5rem;
}

#chat-container {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 9px 46px 8px rgba(0, 0, 0, 0.12), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 11px 15px rgba(0, 0, 0, 0.2);
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

.chats {
    width: 20%;
    height: 30rem;
    border: 1.75px solid #E9EDEF;

}

.conversas {
    background-color: #F4F8F9;
    height: 30rem;
    width: 60%;
    position: relative;
    border: 1px solid #E9EDEF;
}

.conversasAluno{
    background-color: #F4F8F9;
    height: 30rem;
    width: 100%;
    position: relative;
}

.menu {
    height: 30rem;
    width: 15%;
    border: 1.75px solid #E9EDEF;
    display: flex;
    flex-direction: column;
    justify-content: start;

}

.conversa-item {
    border-bottom: 1px solid #E9EDEF;
    padding: 1.7rem;
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 16px;
    letter-spacing: -0.025em;
    color: #6B7C85;
    cursor: pointer;
    flex-wrap: wrap;
}

.tituloConversa {
    background-color: #F0F2F5;
    height: 5rem;
    width: 100%;
    align-items: center;
    padding: 1.5rem;
    font-family: 'Poppins';
    font-size: 18px;
    letter-spacing: -0.025em;
    color: #6B7C85;
    font-weight: 400;

}

.enviarMensagem {
    background-color: #F0F2F5;
    height: 5rem;
    width: 100%;
    height: 90px;
    background: #F0F2F5;
    position: absolute;
    bottom: 1px;
    align-items: center;
    display: flex;
    padding: 1rem;

}

.mensagens {
    width: 100%;
    height: 60%;
    margin-bottom: 30%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

}

.mensagemAluno {
    background-color: white;
    color: black;
    border-radius: 10px;
    padding: 1rem;
    margin-top: 5%;
    margin: 1rem;
    flex-wrap: wrap;
    width: 30rem;
}

.mensagemBot {
    background-color: #45A8BF;
    color: white;
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    justify-content: end;
    width: 30rem;
    flex-wrap: wrap;
    margin-top: 1rem;
    margin-right: 1rem;
    flex-wrap: wrap;

}

.botaoEnviar {
    background-color: #45A8BF;
    color: white;
}

.botaoAssumirConversa {
    background-color: #45A8BF;
    color: white;
    display: flex;
    justify-content: center;
    height: 3rem;
    width: 50%;
    font-family: 'Poppins';
    font-size: 13px;
    margin-left: 25%;
    margin-top: 1rem;
}

.categoriasEncontradas {
    margin: 1rem;
    margin-top: 3rem;
    font-family: 'Poppins';
    font-size: 13px;
    color: #6B7C85
}
</style>
