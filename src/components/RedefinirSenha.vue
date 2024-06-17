<template>
    <div class="flex justify-content-center">
        <img src="/logo-e-nome.png" alt="Logo">
    </div>

    <div v-if="inputEmail" class="flex flex-column justify-content-center m-6">
        <label class="titulo">Redefinir senha</label>
        <label class="subtitulo" for="">Informe seu email cadastrado e enviaremos um código de 8 dígitos para
            alterar sua senha</label>
        <InputText class="email" v-model="email" placeholder="Digite seu e-mail..." v-on:keyup.enter="enviar" />
        <small v-if="!email && enviadoEmail" style="color: red" class="email">O campo é obrigatório</small>
        <Button class="botao-enviar" label="Enviar" @click="enviar" />
        <router-link to="/">
            <Button class="voltar" label="Voltar"  />
        </router-link>
    </div>

    <div v-if="inputCodigo" class="flex flex-column justify-content-center m-6">
        <label class="titulo">Redefinir senha</label>
        <label class="subtitulo" for="">Digite o código recebido através do e-mail</label>
        <InputText class="email" v-model="codigoDigitado" placeholder="Digite o código..." v-on:keyup.enter="verificar" />
        <small v-if="!codigoDigitado && enviadoCodigo" style="color: red" class="email">O campo é obrigatório</small>
        <label class="flex justify-content-center p-error mt-1" v-if="codigoIncorreto">Código incorreto</label>
        <Button class="botao-enviar" label="Verificar" @click="verificar" />
    </div>

    <div v-if="inputNovaSenha" class="m-6">
        <label class="titulo">Digite sua nova senha</label>
        <div style="margin-left: 35%; ">
            <div class="field">
                <label for="firstname1">Nova senha</label>
                <div>
                    <Password v-model="senha" :feedback="false" toggleMask placeholder="Digite a nova senha..."  inputStyle="width: 25rem; height: 2.5rem;" />
                </div>
                <small v-if="!senha && enviadoSenha" style="color: red" >O campo é obrigatório</small>
            </div>
            <div class="field">
                <label for="lastname1">Confirmar senha</label>
                <div>
                    <Password v-model="confirmarSenha" :feedback="false" toggleMask placeholder="Confirme sua senha..."  inputStyle="width: 25rem; height: 2.5rem;" v-on:keyup.enter="alterarSenha"/>
                </div>
                <small v-if="!confirmarSenha && enviadoSenha" style="color: red">O campo é obrigatório</small>
            </div>
            
        </div>
        <label class="flex justify-content-center p-error mt-1" v-if="!validarSenhasIguais">As senhas não conferem</label>

        <Button class="botao-enviar" label="Alterar senha" @click="alterarSenha" />
    </div>
    <Toast />

    <Dialog v-model:visible="visivel" modal header="Enviando código" :style="{ width: '25rem' }" :closable="false">
        <span class="p-text-secondary block mb-5">Aguarde, o código está sendo enviado.</span>
    </Dialog>
</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import api from "@/plugins/axios";
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';


export default {
    components: {
        Button,
        InputText,
        Password,
        Toast,
        Dialog
    },
    props: [],
    data() {
        return {
            inputEmail: true,
            inputCodigo: false,
            inputNovaSenha: false,
            senha: null,
            email: null,
            codigoVerificacao: null,
            codigoDigitado: null,
            confirmarSenha: null,
            codigoIncorreto: false,
            visivel: false,
            enviadoEmail: false,
            enviadoCodigo: false,
            enviadoSenha: false


        };
    },
    methods: {
        enviar() {
            this.enviadoEmail = true;
            if(!this.email){
                return;
            }
            this.visivel = true;
            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/redefinir-senha",
                data: {
                    email: this.email,
                },
            }).then(response => {
                this.codigoVerificacao = response.data;
                this.inputEmail = false;
                this.inputCodigo = true;
                this.visivel = false;
            }).catch(erro => {
                this.visivel = false;
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data,
                    life: 3000
                });
            });
        },
        verificar() {
            this.enviadoCodigo = true
            if(!this.codigoDigitado){
                return
            }
            if (this.codigoDigitado === this.codigoVerificacao) {
                this.inputCodigo = false;
                this.inputNovaSenha = true;
                this.codigoIncorreto = false;
            } else {
                this.codigoIncorreto = true;
            }
        },
        alterarSenha() {
            this.enviadoSenha = true
            if(!this.senha || !this.confirmarSenha){
                return
            }
            if (this.validarSenhasIguais) {
                api({
                    method: "put",
                    url: "http://127.0.0.1:8000/api/alterar-senha",
                    data: {
                        email: this.email,
                        senha: this.senha
                    },
                }).then(response => {
                    this.$router.push('/')


                }).catch(erro => {
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: erro.response.data,
                        life: 3000
                    });
                });
            }

        }

    },
    computed: {
        validarSenhasIguais() {
            return this.senha === this.confirmarSenha;
        }

    },
    mounted() {

    }

}
</script>

<style scoped>
.botao-enviar {
    box-shadow: 0px 10px 40px -12px #45A8BF;
    background-color: #45A8BF;
    border-color: #45A8BF;
    width: 50%;
    display: flex;
    justify-content: center;
    margin-left: 25%;
    margin-top: 2rem;
}

.voltar {
    box-shadow: 0px 10px 40px -12px #455c6154;
    background-color: #455c6154;
    border-color: #455c6154;
    width: 50%;
    justify-content: center;
    margin-left: 25%;
    margin-top: 2rem;
    text-decoration: none;
    text-decoration-line: none;
}

.titulo {
    font-size: 48px;
    font: 'Poppins';
    display: flex;
    justify-content: center;
    color: #292F47;
    margin: 2rem;

}

.subtitulo {
    font-size: 16px;
    display: flex;
    justify-content: center;
    color: #292F47;
    margin-bottom: 2rem;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #292F47;
    opacity: 0.7;
    width: 40%;
    margin-left: 30%;

}

.email {
    width: 50%;
    display: flex;
    justify-content: center;
    margin-left: 25%;
}

.senha {
    width: 50%;
    display: flex;
    justify-content: center;
    margin-left: 25%;
}

.campo {
    margin-top: 2rem;
    display: flex;
    justify-content: start;
    width: 50%;
    margin-left: 38.5%;

}
</style>
