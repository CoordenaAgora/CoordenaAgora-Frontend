<template>
    <div id="estrutura">
        <MenuLateral></MenuLateral>
        <BarraNavegacao></BarraNavegacao>

        <div id="container" v-if="tipoAcesso === 'coordenador'">
            <div class="flex">
                <div class="chats">
                    <div class="flex justify-content-between conversa-item" v-for="conversa in conversas"
                        @click="selecionarConversa(conversa)">
                        <label class="cursor-pointer">{{ conversa.nome }}</label>
                        <label class="cursor-pointer" for="">{{ conversa.dataHora }}</label>
                    </div>
                </div>
                <div class="conversas">
                    <div class="tituloConversa">
                        {{ conversaSelecionada.nome }}
                    </div>
                    <div id="divMensagens" class="mensagens">
                        <div v-for="resposta in historico">
                            <div v-if="resposta.quem_enviou === 'bot' || resposta.quem_enviou === 'coordenador'"
                                class="flex justify-content-end flex-wrap">
                                <label :class="estiloMensagem(resposta)">{{ resposta.texto_mensagem }}</label>
                            </div>

                            <div v-else class="flex justify-content-start flex-wrap">
                                <label :class="estiloMensagem(resposta)">{{ resposta.texto_mensagem }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="enviarMensagem">
                        <InputText type="text" maxlength="200" placeholder="Digite sua mensagem"
                            @keyup.enter="enviarMensagem(mensagem)" v-model="mensagem"
                            :disabled="desabilitado || tipoAcesso === 'coordenador' && botPodeResponder"></InputText>
                        <Button class="botaoEnviar"
                            :disabled="desabilitado || tipoAcesso === 'coordenador' && botPodeResponder"
                            @click="enviarMensagem(mensagem)" label="Enviar" />
                    </div>
                </div>
                <div class="menu" v-if="conversaSelecionada">
                    <Button :class="estiloBotaoAssumirConversa" @click="trocarStatusAssumirConversa()"
                        :label="labelBotaoAssumirConversa" />

                    <!-- <div class="categoriasEncontradas">
                        <label for="lastname1">Indicadores encontrados pelo BOT: </label>
                        <AutoComplete v-model="indicadoresEncontrados" multiple />
                    </div> -->
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
                            <div v-if="resposta.quem_enviou === 'bot' || resposta.quem_enviou === 'coordenador'"
                                class="flex justify-content-start flex-wrap">
                                <label :class="estiloMensagem(resposta)">{{ resposta.texto_mensagem }}</label>
                            </div>

                            <div v-else class="flex justify-content-end flex-wrap">
                                <label :class="estiloMensagem(resposta)">{{ resposta.texto_mensagem }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="enviarMensagem">
                        <InputText type="text" maxlength="200" placeholder="Digite sua mensagem"
                            @keyup.enter="enviarMensagem(mensagem)" v-model="mensagem" :disabled="desabilitado">
                        </InputText>
                        <Button class="botaoEnviar" :disabled="desabilitado" @click="enviarMensagem(mensagem)"
                            label="Enviar" />
                    </div>
                </div>
            </div>
        </div>
        <Toast></Toast>
    </div>

    <Dialog v-model:visible="visible" modal header="" :style="{ width: '25rem' }">
        <span class="p-text-secondary block mb-5" style="text-align: justify;">Desculpe, nosso chatbot encontrou dificuldades
         em ajudá-lo. Foi enviado um email ao setor responsável com a sua solicitação. Verifique seu
          e-mail para mais detalhes.</span>
    </Dialog> 
</template>

<script>
import Estrutura from '@/components/Estrutura.vue';
import MenuLateral from '@/components/MenuLateral.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
import AutoComplete from 'primevue/autocomplete'
import BarraNavegacao from '@/components/BarraNavegacao.vue'
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';



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
        AutoComplete,
        Dialog,
        Accordion,
        AccordionTab,
        AutoComplete,
        Textarea,
        Dropdown

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
                id: 1,
                nome: "Aluno 1",
                dataHora: "14:35"
            },],
            conversaSelecionada: "",
            desabilitado: false,
            indicadoresEncontrados: ["teste"],
            tipoAcesso: null,
            idAluno: null,
            idCoordenador: null,
            labelBotaoAssumirConversa: "Assumir conversa",
            botPodeResponder: null,
            connection: null,
            estiloBotaoAssumirConversa: "assumirConversa",
            contador: 0,
            visible: false,
        };
    },
    methods: {
        enviarMensagem(textoMensagem) {
            if (!textoMensagem) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: "Não foi digitada uma mensagem",
                    life: 3000
                });
                return;
            }

            this.desabilitado = true;
            this.salvarMensagem(textoMensagem);

            this.connection.send(JSON.stringify({
                'message': textoMensagem,
                'quem_enviou': this.tipoAcesso
            }));

            this.desabilitado = false;

            if (this.tipoAcesso === 'aluno') {
                this.verificarStatusBot(this.idAluno);
            } else {
                this.mensagem = null
            }
        },
        selecionarConversa(conversa) {
            if (this.connection) {
                this.connection.onclose = (event) => {
                    console.log("Conexão com o WebSocket fechada", event);
                }
            }

            this.conversaSelecionada = conversa;
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/listar-mensagens-por-aluno",
                params: {
                    id: conversa.id
                },
            }).then(response => {
                this.historico = response.data
            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data.mensagem,
                    life: 3000
                });
            });

            this.conectarWebSocket(this.conversaSelecionada.id);
            this.verificarStatusBot(this.conversaSelecionada.id);
        },
        estiloMensagem(resposta) {
            if (resposta.quem_enviou === 'aluno') {
                return "mensagemAluno"
            } else {
                return "mensagemBot"
            }
        },
        salvarMensagem(textoMensagem, bot) {
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
                    id_aluno: this.idAluno ? this.idAluno : this.conversaSelecionada.id,
                    id_coordenador: idCoordenador
                },
            }).then(response => {
            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data.mensagem,
                    life: 3000
                });
            });
        },
        resgatarHistoricoAluno() {
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/listar-mensagens-por-aluno",
                params: {
                    id: this.idAluno ? this.idAluno : this.idCoordenador
                },
            }).then(response => {
                this.historico = response.data
            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro,
                    life: 3000
                });
            });
        },
        listarTodosAlunos() {
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/listar-todos-alunos",
            }).then(response => {
                //ver depois como pegar a hora
                console.log(response);
                this.conversas = response.data.map(conversa => {
                    return {
                        id: conversa.id,
                        nome: conversa.nome,
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
        trocarStatusAssumirConversa() {
            this.botPodeResponder = !this.botPodeResponder;
            this.labelBotaoAssumirConversa = !this.botPodeResponder ? "Parar de assumir a conversa" : "Assumir conversa"
            this.estiloBotaoAssumirConversa = !this.botPodeResponder ? "assumindoConversa" : "assumirConversa"

            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/mudar-status-bot",
                data: {
                    status: this.botPodeResponder,
                    id_aluno: this.conversaSelecionada.id
                },
            }).then(response => {
                //ver depois como pegar a hora
                console.log(response);

            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data.mensagem,
                    life: 3000
                });
            });
        },
        conectarWebSocket(idAluno) {
            if (!this.connection) {
                this.connection = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${idAluno}/`);

                this.connection.onopen = (event) => {
                    console.log("Conexão com o WebSocket criada com sucesso", event);
                }

                this.connection.onmessage = (event) => {
                    console.log("Mensagem recebida do WebSocket:", event.data);
                    const data = JSON.parse(event.data);
                    const mensagem = {
                        texto_mensagem: data.message,
                        quem_enviou: data.quem_enviou
                    }
                    this.historico.push(mensagem)
                }

                // this.connection.onopen = (event) => {
                //     console.log("Conexão com o WebSocket criada com sucesso", event);
                // }

                // this.connection.onclose = (event) => {
                //     console.log("Conexão com o WebSocket fechada", event);
                // }

                // this.connection.onerror = (event) => {
                //     console.error("Erro no WebSocket", event);
                // }

            }
        },
        verificarStatusBot(idAluno) {
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/verificar-status-bot",
                params: {
                    id_aluno: idAluno ? idAluno : this.conversaSelecionada.id
                },
            }).then(response => {
                this.botPodeResponder = response.data.bot_pode_responder;
                if (this.botPodeResponder && this.tipoAcesso === 'aluno') {
                    this.desabilitado = true;
                    this.enviarMensagemGemini();
                } else {
                    this.mensagem = null;
                    this.labelBotaoAssumirConversa = !this.botPodeResponder ? "Parar de assumir a conversa" : "Assumir conversa"
                    this.estiloBotaoAssumirConversa = !this.botPodeResponder ? "assumindoConversa" : "assumirConversa"
                }

            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro,
                    life: 3000
                });

            });
        },
        enviarMensagemGemini() {
            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/perguntas",
                data: {
                    user: this.idAluno,
                    pergunta: this.mensagem,
                    historico: this.historico,
                    id_aluno: this.idAluno
                },
            }).then(response => {
                this.connection.send(JSON.stringify({
                    'message': response.data.mensagem,
                    'quem_enviou': "bot"
                }));
                this.salvarMensagem(response.data.mensagem, "bot");
                this.desabilitado = false;
                this.mensagem = null;
                if(response.data.mensagem == "A conversa foi finalizada"){
                    this.visible = true;
                }
            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data.mensagem,
                    life: 3000
                });
            });
        },
        realizarEncaminhamento() {
            this.encaminhamento = true;
            this.tituloEncaminhamentoAgendamento = "Encaminhamento"

            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/visualizar-setores/",

            }).then(response => {
                this.setores = response.data;
            }).catch(erro => { });

        },
        realizarAgendamento() {
            this.agendamento = true;
            this.tituloEncaminhamentoAgendamento = "Agendamento"
        },
        voltar() {
            this.encaminhamento = false;
            this.agendamento = false;
            this.tituloEncaminhamentoAgendamento = "O que você gostaria de fazer?"
            this.setorSelecionado = null;
            this.duvida = null;
        },
        enviarEncaminhamento() {
            if (!this.duvida) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Campos não preenchidos',
                    detail: "Não foi preenchido o campo dúvida",
                    life: 3000
                });
                return;
            }
            if (!this.setorSelecionado) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Campos não preenchidos',
                    detail: "Não foi preenchido o campo setor",
                    life: 3000
                });
                return;
            }
            this.carregando = true;
            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/encaminhamento",
                data: {
                    id_aluno: this.idAluno,
                    duvida: this.duvida,
                    setor: this.setorSelecionado,
                },
            }).then(response => {
                this.$toast.add({
                    severity: 'success',
                    summary: 'Encaminhamento',
                    detail: response.data.mensagem,
                    life: 3000
                });
                this.carregando = false;
                this.visible = false;
                this.agendamento = false;
                this.encaminhamento = false;
                this.tituloEncaminhamentoAgendamento = "O que você gostaria de fazer?"
            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data.mensagem,
                    life: 3000
                });
            });
        },
        enviarAgendamento() {
            if (!this.duvida) {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Campos não preenchidos',
                    detail: "Não foi preenchido o campo dúvida",
                    life: 3000
                });
                return;
            }
            this.carregando = true;
            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/agendamento",
                data: {
                    id_aluno: this.idAluno,
                    duvida: this.duvida,
                },
            }).then(response => {
                this.$toast.add({
                    severity: 'success',
                    summary: 'Agendamento',
                    detail: response.data.mensagem,
                    life: 3000
                });
                this.carregando = false;
                this.visible = false;
                this.agendamento = false;
                this.encaminhamento = false;
                this.tituloEncaminhamentoAgendamento = "O que você gostaria de fazer?"
                this.duvida = null;
            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data.mensagem,
                    life: 3000
                });
            });
        },
    },
    computed: {

    },
    mounted() {
        sessionStorage.setItem('contador', Number(0))
        document.getElementById('conversas').classList.toggle('active');
        this.tipoAcesso = localStorage.getItem('tipoAcesso');

        if (this.tipoAcesso === 'aluno') {
            this.idAluno = localStorage.getItem('id');
            this.resgatarHistoricoAluno();
            this.conectarWebSocket(this.idAluno);
        } else {
            this.idCoordenador = localStorage.getItem('id');
            this.listarTodosAlunos();
        }
    },
    destroyed() {
        alert()
        this.connection.onclose = (event) => {
            console.log("Conexão com o WebSocket fechada", event);
        }
    },
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

.conversasAluno {
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
    margin-left: 1rem;
    flex-wrap: wrap;

}

.botaoEnviar {
    background-color: #45A8BF;
    color: white;
}

.categoriasEncontradas {
    margin: 1rem;
    margin-top: 3rem;
    font-family: 'Poppins';
    font-size: 13px;
    color: #6B7C85
}

.assumindoConversa {
    background-color: #fd0000b4;
    color: white;
    display: flex;
    justify-content: center;
    height: 3.5rem;
    width: 75%;
    font-family: 'Poppins';
    font-size: 13px;
    margin-left: 15%;
    margin-top: 1rem;
}

.assumirConversa {
    background-color: #0e810e9c;
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
</style>
