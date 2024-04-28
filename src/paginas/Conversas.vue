<template>
<div id="estrutura">
    <MenuLateral></MenuLateral>
    <BarraNavegacao></BarraNavegacao>

    <div id="container">
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
                <div class="mensagens ">
                    <div v-for="resposta in historico">
                        <div v-if="resposta.quemEnviou === 'bot'" class="flex justify-content-end flex-wrap">
                            <label :class="estiloMensagem(resposta)">{{resposta.texto}}</label>
                        </div>

                        <div v-else class="flex justify-content-start flex-wrap">
                            <label :class="estiloMensagem(resposta)">{{resposta.texto}}</label>
                        </div>
                    </div>
                </div>
                <div class="enviarMensagem">
                    <InputText type="text" maxlength="200" placeholder="Digite sua mensagem" @keyup.enter="enviarMensagem(mensagem)" v-model="mensagem" :disabled="desabilitado"></InputText>
                    <Button class="botaoEnviar" :disabled="desabilitado" @click="enviarMensagem(mensagem)" label="Enviar" />
                </div>
            </div>
            <div class="menu">
                <Button class="botaoAssumirConversa" @click="assumirConversa" label="Assumir conversa" />

                <div class="categoriasEncontradas">
                    <label for="lastname1">Indicadores encontrados pelo BOT: </label>
                    <AutoComplete v-model="indicadoresEncontrados" multiple />
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
            indicadoresEncontrados: ["teste"]

        };
    },
    methods: {
        enviarMensagem(textoMensagem) {
            if (!textoMensagem) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: "Não foi enviado uma mensagem",
                    life: 3000
                });
                return;
            }
            const mensagem = {
                quemEnviou: "aluno",
                texto: textoMensagem
            }
            this.historico.push(mensagem)
            this.desabilitado = true;

            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/perguntas",
                data: {
                    user: "teste",
                    pergunta: this.mensagem,
                },
            }).then(response => {
                console.log(response);
                this.historico.push({
                    texto: response.data.mensagem,
                    quemEnviou: "bot"
                })
                this.desabilitado = false;
            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data,
                    life: 3000
                });
            });
            this.mensagem = null;

        },
        selecionarConversa(conversa) {
            this.conversaSelecionada = conversa
        },
        estiloMensagem(resposta) {
            if (resposta.quemEnviou === 'aluno') {
                return "mensagemAluno"
            } else {
                return "mensagemBot"
            }
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
    font-family: 'Poppins';
    min-height: 100vh;
    background-color: #F4F8F9;
    overflow: auto;
}

#container {
    margin-left: calc(82px + 50px);
    margin-top: 2rem;
    margin-right: 2rem;
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

.chats {
    width: 20%;
    height: 45rem;
    border: 1px solid #E9EDEF;

}

.conversas {
    background-color: #F4F8F9;
    height: 45rem;
    width: 60%;
    position: relative;

}

.menu {
    height: 45rem;
    width: 15%;
    border: 1px solid #E9EDEF;
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
    height: 33.5rem;
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
