<template>
    <Menubar>
        <template #start>
            <img src="/logo-e-nome.png" height="80px" style="margin-left: 15px;" alt="">
        </template>
    </Menubar>

    <div class="flex justify-content-center">
        <div id="container">
            <Card class="card">
                <template #title>Bem vindo!</template>
                <template #content>
                    <h2 class="flex justify-content-center mb-2">Cadastro do aluno</h2>

                    <div class="formgrid grid">
                        <div class="field col">
                            <div class="field col">
                                <label>Email</label>
                                <div>
                                    <input type="text" style="width: 25rem; height: 2.5rem;" v-model="email"
                                        class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary "
                                        placeholder="Digite o email...">
                                </div>
                                <small v-if="!email && enviado" style="color: red">O campo é obrigatório</small><br>
                                <small v-if="emailInvalido" style="color: red">Email inválido</small>
                            </div>

                        </div>

                        <div class="field col">
                            <label>Senha</label>
                            <div>
                                <Password v-model="senha" inputId="senha" id="senha"
                                    inputStyle="width: 25rem; height: 2.5rem;" :feedback="false" toggleMask
                                    placeholder="Digite a senha..." />
                            </div>
                            <small v-if="!senha && enviado" style="color: red">O campo é obrigatório</small>
                        </div>

                    </div>

                    <div class="formgrid grid" style="margin-left: 0.05rem">
                        <div class="field col">
                            <label for="lastname2">Instituição</label>
                            <div>
                                <AutoComplete v-model="instituicao" inputStyle="width: 25rem; height: 2.5rem;"
                                    optionLabel="nome" :suggestions="instituicoes" @complete="buscarInstituicoesPorNome"
                                    completeOnFocus inputId="autocomplete" placeholder="Selecione a Instituição..." />
                            </div>
                            <small v-if="!instituicao && enviado" style="color: red">O campo é obrigatório</small>
                        </div>

                        <div class="field col">
                            <label for="lastname2">Curso</label>
                            <div>
                                <AutoComplete v-model="curso" style="height: 42px;" optionLabel="nome"
                                    :suggestions="cursos" @complete="buscarCursosPorNome" completeOnFocus
                                    inputStyle="width: 25rem; height: 2.5rem;" placeholder="Selecione o curso..." :disabled="!instituicao" />
                            </div>
                            <small v-if="!curso && enviado" style="color: red">O campo é obrigatório</small>
                        </div>

                    </div>

                    <div class="formgrid grid" style="margin-left: 0.05rem">
                        <div class="field col">
                            <label>Nome</label>
                            <div>
                                <InputText v-model="nome" placeholder="Digite o nome completo do aluno..."
                                    style="width: 25rem; height: 2.5rem;" />
                            </div>
                            <small v-if="!nome && enviado" style="color: red">O campo é obrigatório</small>
                        </div>

                    </div>

                    <Button class="w-full mt-4 botao-entrar" label="Cadastrar" @click="cadastrarAluno" />
                    <router-link to="/">
                        <Button class="w-full mt-4 botao-voltar" label="Voltar" />
                    </router-link>

                </template>
            </Card>
        </div>

    </div>
    <Toast />
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
import AutoComplete from 'primevue/autocomplete';
import Toast from 'primevue/toast';
import { computed } from "vue";

export default {
    components: {
        Card,
        Image,
        InputText,
        Password,
        Checkbox,
        Button,
        Menubar,
        AutoComplete,
        Toast
    },
    data() {
        return {
            nome: null,
            instituicao: null,
            senha: null,
            curso: null,
            email: null,
            instituicoes: null,
            cursos: null,
            invalido: false,
            enviado: false,
            emailInvalido: false
        };
    },
    methods: {
        cadastrarAluno() {
            this.validateEmail();
            if (!this.nome || !this.curso || !this.instituicao || !this.senha || !this.email) {
                this.enviado = true;
                return
            }
            if(this.emailInvalido){
                return;
            }
            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/cadastrar-aluno",
                data: {
                    nome: this.nome,
                    instituicao: this.instituicao.id,
                    senha: this.senha,
                    curso: this.curso.id,
                    email: this.email
                },
            }).then(response => {
                this.$router.push('/')

            }).catch(erro => {
                this.$toast.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: erro.response.data.email,
                    life: 3000
                });
            });
        },
        validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.email)) {
                this.emailInvalido = true;
            } else {
                this.emailInvalido = false;
            }
        },
        buscarInstituicoesPorNome(filtro) {
            this.curso = null;
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/instituicoes-por-nome",
                data: {
                    instituicao: filtro.query
                },
            }).then(response => {
                this.instituicoes = response.data

            }).catch(erro => { });
        },
        buscarCursosPorNome(filtro) {
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/cursos-por-nome",
                params: {
                    curso: filtro.query,
                    instituicao: this.instituicao.id
                },
            }).then(response => {
                this.cursos = response.data

            }).catch(erro => { });
        }
    },
    mounted() { },
    computed: {
        

    },
}
</script>

<style scoped>
#container {
    width: 100%;

}

.card {
    justify-content: center;
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

#usuario {
    width: 100% !important;
}

.botao-entrar {
    box-shadow: 0px 10px 40px -12px #45A8BF;
    background-color: #45A8BF;
    border-color: #45A8BF;
}

.botao-voltar {
    box-shadow: 0px 10px 40px -12px #455c6154;
    background-color: #455c6154;
    border-color: #455c6154;
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

#senha {
    height: 2.5rem;
}

#autocomplete {
    height: 2.5rem;
    width: 25rem;
}

.tamanho-campo {
    width: 25rem;
    height: 2.5rem;
}

.invalido {
    border-color: red
}

/**
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
            width: 50%;
            margin: 10%;
            margin-left: 20%;
            margin-top: 20%;
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
            width: 50%;
            margin-left: 20%;
        }

        #usuario {
            width: 68% !important;
        }

        #container {
            overflow: hidden;
        }

    }
    **/
</style>
