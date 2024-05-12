<template>
    <Menubar style="height: 80px;">
        <template #start>
            <img src="/logo-e-nome.png" height="70px" style="margin-left: 15px;" alt="">
        </template>
    </Menubar>
    <div class="flex">
            <Card class="card">
                <template #title style="margin-bottom: 0px;">Bem vindo!</template>
                <template #content>
                    <h2>Login</h2>
                    <p class="m-0">
                        Faça seu login para entrar na solução CoordenaAgora
                    </p>
                    <div class="mt-3 mb-2">
                        <label>Email</label>
                    </div>
                    <div>
                        <InputText id="usuario" v-model="email" placeholder="Digite seu email..."   />
                    </div>
                    <div class="mt-3 mb-2">
                        <label>Senha</label>
                    </div>
                    <Password v-model="senha" :feedback="false" toggleMask placeholder="Digite sua senha..."
                        v-on:keyup.enter="entrar" inputId="senha" id="senha" inputStyle="width: 25rem; height: 2.5rem;"/>
                    <label class="senha-incorreta" v-if="usuarioSenhaIncorretos">
                        Usuário ou senha incorretos</label>
                    <Button class="w-full mt-4 botao-entrar" label="Entrar" @click="entrar" />

                    <div>
                        <div class="linha"></div>
                        <router-link class="acoes-senha" to="/cadastro-aluno">Acessar cadastro de aluno</router-link>
                        <router-link class="acoes-senha" to="/redefinir-senha">Redefinir senha</router-link>
                    </div>
                </template>
            </Card>
                <img src="\imagem-login.png" alt="imagem" class="imagem" id="img">



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
                    localStorage.setItem('id', dadosDoUsuario.id);

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

.botao-entrar {
    box-shadow: 0px 10px 40px -12px #45A8BF;
    background-color: #45A8BF;
    border-color: #45A8BF;
}

.acoes-senha {
    display: flex !important;
    justify-content: center;
    margin-top: 5px;
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

@media all and (max-width: 500px) {
    #img{
        display: none;
    }

    #usuario {
        width: 100% !important;
        height: 2.5rem
    }

    #senha{
        height: 2.5rem;
    }  
}

@media all and (max-width: 2000px) {
    
    .card {
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        height: 50%;
    }

    .imagem {
        max-width: 50%;
        height: 50%;
    }

    #usuario {
        width: 100% !important;
        height: 2.5rem
    }

    #senha{
        height: 2.5rem;
    }
}

@media only screen and (min-width: 2000px) {
    .card {
        margin-top: 10rem;
        overflow: hidden;
        height: fit-content;
        margin-left: 5%;
        margin-right: 15%; 
        padding: 10px;       
    }

    #img {
        height: 50rem;
    }

    #usuario {
        width: 100% !important;
    }


}

.linha {
    border: 1px solid #E9EDEF;
    transform: rotate(-0.31deg);
    margin-top: 1.5rem
}
</style>
