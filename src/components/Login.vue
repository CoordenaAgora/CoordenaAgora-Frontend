<template>
<Menubar>
    <template #start>
        <img src="/public/logo-e-nome.png" height="80px" style="margin-left: 15px;" alt="">
    </template>
</Menubar>
<div class="flex flex-col md:flex-row">
    <div id="container" class="w-full md:w-1/2">
        <Card class="card">
            <template #title>Bem vindo!</template>
            <template #content>
                <h1>Login</h1>
                <p class="m-0">
                    Faça seu login para entrar na solução CoordenaAgora
                </p>
                <div class="mt-5 mb-2">
                    <label>Email</label>
                </div>
                <div>
                    <InputText id="usuario" v-model="email" placeholder="Digite seu usuário..." />
                </div>
                <div class="mt-4 mb-2">
                    <label>Senha</label>
                </div>
                <Password v-model="senha" :feedback="false" toggleMask placeholder="Digite sua senha..." v-on:keyup.enter="entrar" />
                <label class="senha-incorreta" v-if="usuarioSenhaIncorretos">
                    Usuário ou senha incorretos</label>
                <Button class="w-full mt-6 botao-entrar" label="Entrar" @click="entrar" />

                <div>
                    <div class="linha"></div>
                    <router-link class="acoes-senha" to="/cadastro-aluno">Acessar cadastro de aluno</router-link>
                    <router-link class="acoes-senha" to="/redefinir-senha">Redefinir senha</router-link>
                </div>
            </template>
        </Card>
    </div>
    <div class="hidden md:block md:w-1/2">
        <Image src="\imagem-login.png" alt="Image" class="imagem" />
    </div>
</div>
</template>

<script>
import Card from "primevue/card"
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import api from "@/plugins/axios";
import Menubar from 'primevue/menubar';
import { mdiEmail } from "@mdi/js";


export default {
    components: {
        Card,
        Image,
        InputText,
        Password,
        Checkbox,
        Button,
        Menubar
    },
    data() {
        return {
            email: null,
            senha: null,
            lembrarSenha: false,
            usuarioSenhaIncorretos: false
        };
    },
    methods: {
        entrar() {
            api({
                method: "post",
                url: "http://127.0.0.1:8000/login/",
                data: {
                    email: this.email,
                    senha: this.senha,
                },
            }).then(response => {
                const autorizado = response.data.resultado;
                const dadosDoUsuario = response.data.dadosDoUsuario;
                localStorage.setItem('autorizado', autorizado);
                if (!autorizado) {
                    this.usuarioSenhaIncorretos = true;
                } else {
                    this.usuarioSenhaIncorretos = false;
                    localStorage.setItem('nome', dadosDoUsuario.nome);
                    localStorage.setItem('tipoAcesso', dadosDoUsuario.tipoAcesso);
                    localStorage.setItem('email', dadosDoUsuario.email);
                    localStorage.setItem('instituicao', dadosDoUsuario.instituicao);
                    localStorage.setItem('curso', dadosDoUsuario.curso);

                    // Agora, faça a verificação de dadosDoUsuario.tipoAcesso
                    if (dadosDoUsuario.tipoAcesso === 'coordenador') {
                        this.$router.push('/dashboard');
                    } else {
                        this.$router.push('/conversas');
                    }
                }
            }).catch(erro => {
                this.usuarioSenhaIncorretos = true;
            });
        }
    },
    mounted() {
        localStorage.setItem('autorizado', "false");
    },
}
</script>

<style scoped>
.card {
    margin-top: 5rem;
    overflow: hidden;
    padding: 15px;
    width: fit-content;
    margin: 10%;
    margin-left: 10%;
    margin-top: 15%;
}

.imagem {
    max-width: 70%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-content: stretch;
    justify-content: space-evenly;
    align-items: stretch;
    margin-top: 8%;
    margin-left: 5%;
}

#usuario {
    width: 100% !important;
}

.botao-entrar {
    box-shadow: 0px 10px 40px -12px #45A8BF;
    background-color: #45A8BF;
    border-color: #45A8BF;
}

.acoes-senha {
    display: flex !important;
    justify-content: center;
    margin-top: 20px;
    text-decoration: underline;
    color: #4D4D4D;
    font-family: 'Poppins';
}

.senha-incorreta {
    color: red;
    margin-top: 30px;
    justify-content: center;
    display: flex;
}

@media only screen and (max-width: 500px) {
    .card {
        width: auto;
        margin: 10%;
        margin-top: 30%;
        padding: 15px;
    }

    #usuario {
        width: 108% !important;
    }
}

@media only screen and (max-width: 2000) {
    .card {
        margin-top: 5rem;
        overflow: hidden;
        padding: 15px;
        width: fit-content;
        margin: 10%;
        margin-left: 20%;
        margin-top: 20%;
    }

    .imagem {
        max-width: 50%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-content: stretch;
        justify-content: space-evenly;
        align-items: stretch;
        margin-top: 10%;
        margin-left: 15%;
    }

    #usuario {
        padding: 15px;
        width: 80% !important;
        align-content: stretch;
    }

    #app {
        overflow: hidden;
    }

}

@media only screen and (min-width: 2000px) {
    .card {
        margin-top: 5rem;
        overflow: hidden;
        padding: 15px;
        width: fit-content;
        margin: 20%;
        margin-left: 20%;
        margin-top: 15%;
    }

    #usuario {
        width: 68% !important;
    }

    #container {
        overflow: hidden;
    }

}

.linha {

    border: 1px solid #E9EDEF;
    transform: rotate(-0.31deg);
    margin-top: 3rem
}
</style>
