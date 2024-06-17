<template>
    <div id="estrutura">
        <MenuLateral></MenuLateral>
        <BarraNavegacao></BarraNavegacao>

        <div id="container">
            <label id="subtitulo">Informações</label>
            <div class="flex flex-wrap gap-3">
                <div id="card" v-for="(item, index) in informacoes" :key="index">
                    <label>{{ item.titulo }}</label>
                    <label id="categoria">{{ item.categoria }}</label>
                    <label id="corpo">{{ item.corpo }}</label>
                </div>
            </div>

            <div class="flex justify-content-between">
                <label id="subtitulo" class="mt-6">Setores</label>
                <RouterLink id="ver-todos" to="/setores">Ver todos</RouterLink>
                <!-- <label id="ver-todos">Ver todos (as)</label> -->
            </div>
            <div class="flex flex-wrap gap-3">
                <div id="card" v-for="(item, index) in setores" :key="index">
                    <div class="flex align-items-center ">
                        <svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse opacity="0.6" cx="19" cy="19.5" rx="19" ry="19.5" fill="black"
                                fill-opacity="0.2" />
                            <mask id="mask0_0_1" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="10" y="9"
                                width="19" height="19">
                                <rect x="10" y="9" width="19" height="19" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_0_1)">
                                <path
                                    d="M19.3333 19.8083C18.4625 19.8083 17.717 19.475 17.0969 18.8084C16.4767 18.1417 16.1667 17.3403 16.1667 16.4042C16.1667 15.468 16.4767 14.6666 17.0969 14C17.717 13.3333 18.4625 13 19.3333 13C20.2042 13 20.9497 13.3333 21.5698 14C22.1899 14.6666 22.5 15.468 22.5 16.4042C22.5 17.3403 22.1899 18.1417 21.5698 18.8084C20.9497 19.475 20.2042 19.8083 19.3333 19.8083ZM13 26.6167V24.2337C13 23.7515 13.1155 23.3082 13.3464 22.904C13.5773 22.4998 13.884 22.1912 14.2667 21.9785C15.0847 21.5388 15.916 21.209 16.7604 20.9892C17.6049 20.7693 18.4625 20.6594 19.3333 20.6594C20.2042 20.6594 21.0618 20.7693 21.9062 20.9892C22.7507 21.209 23.5819 21.5388 24.4 21.9785C24.7826 22.1912 25.0894 22.4998 25.3203 22.904C25.5512 23.3082 25.6667 23.7515 25.6667 24.2337V26.6167H13Z"
                                    fill="white" />
                            </g>
                        </svg>

                        <div class="flex flex-column ml-2">
                            <label>{{ item.nome }}</label>
                        </div>
                    </div>

                </div>
            </div>

            <div class="flex justify-content-between">
                <label id="subtitulo" class="mt-6">Pessoas</label>
                <RouterLink id="ver-todos" to="/pessoas">Ver todos</RouterLink>
            </div>

            <div class="flex flex-wrap gap-3 mb-6">
                <div id="card" v-for="(item, index) in pessoas" :key="index">
                    <div class="flex align-items-center ">
                        <svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse opacity="0.6" cx="19" cy="19.5" rx="19" ry="19.5" fill="black"
                                fill-opacity="0.2" />
                            <mask id="mask0_0_1" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="10" y="9"
                                width="19" height="19">
                                <rect x="10" y="9" width="19" height="19" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_0_1)">
                                <path
                                    d="M19.3333 19.8083C18.4625 19.8083 17.717 19.475 17.0969 18.8084C16.4767 18.1417 16.1667 17.3403 16.1667 16.4042C16.1667 15.468 16.4767 14.6666 17.0969 14C17.717 13.3333 18.4625 13 19.3333 13C20.2042 13 20.9497 13.3333 21.5698 14C22.1899 14.6666 22.5 15.468 22.5 16.4042C22.5 17.3403 22.1899 18.1417 21.5698 18.8084C20.9497 19.475 20.2042 19.8083 19.3333 19.8083ZM13 26.6167V24.2337C13 23.7515 13.1155 23.3082 13.3464 22.904C13.5773 22.4998 13.884 22.1912 14.2667 21.9785C15.0847 21.5388 15.916 21.209 16.7604 20.9892C17.6049 20.7693 18.4625 20.6594 19.3333 20.6594C20.2042 20.6594 21.0618 20.7693 21.9062 20.9892C22.7507 21.209 23.5819 21.5388 24.4 21.9785C24.7826 22.1912 25.0894 22.4998 25.3203 22.904C25.5512 23.3082 25.6667 23.7515 25.6667 24.2337V26.6167H13Z"
                                    fill="white" />
                            </g>
                        </svg>

                        <div class="flex flex-column ml-2">
                            <label>{{ item.nome }}</label>
                            <label>{{ item.email }}</label>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    </div>
</template>



<script>

import Card from 'primevue/card';
import MenuLateral from '@/components/MenuLateral.vue'
import BarraNavegacao from '@/components/BarraNavegacao.vue'
import api from "@/plugins/axios";


export default {
    components: {
        Card,
        MenuLateral,
        BarraNavegacao

    },
    props: [],
    data() {
        return {
            informacoes: [


            ],
            setores: [],
            pessoas: []

        };
    },
    methods: {
        listarPessoas() {
            const idCoordenador = localStorage.getItem('id');

            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/pessoas",
                params: {
                    id_coordenador: idCoordenador
                },

            }).then(response => {
                this.pessoas = response.data;
                this.pessoas = this.pessoas.slice(0, 5);
            }).catch(erro => { });
        },
        listarSetores() {
            const idCoordenador = localStorage.getItem('id');

            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/visualizar-setores/",
                params: {
                    id_coordenador: idCoordenador
                },

            }).then(response => {
                this.setores = response.data;
                this.setores = this.setores.slice(0, 5);
            }).catch(erro => { });
        },
        listarInformacoes() {
            const idCoordenador = localStorage.getItem('id');
            const idCurso = localStorage.getItem('curso');
            const idInstituicao = localStorage.getItem('instituicao');
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/dashboard",
                params: {
                    id_coordenador: idCoordenador,
                    curso: idCurso,
                    instituicao: idInstituicao
                },

            }).then(response => {
                if (response.data.maior_indicador.count) {
                    this.informacoes = [
                        {
                            titulo: "Número de conversas",
                            corpo: response.data.qtde_conversas
                        },
                        {
                            titulo: "Número de setores cadastrados",
                            corpo: response.data.qtde_setores
                        },
                        {
                            titulo: "Número de alunos cadastradas",
                            corpo: response.data.qtde_alunos
                        },
                        {
                            titulo: "Alunos vieram falar mais sobre:",
                            categoria: response.data.maior_indicador.nome_indicador ? response.data.maior_indicador.nome_indicador : "Sem informação",
                            corpo: response.data.maior_indicador.count ? response.data.maior_indicador.count : 0
                        }
                    ]
                } else {
                    this.informacoes = [
                        {
                            titulo: "Número de conversas",
                            corpo: response.data.qtde_conversas
                        },
                        {
                            titulo: "Número de setores cadastrados",
                            corpo: response.data.qtde_setores
                        },
                        {
                            titulo: "Número de alunos cadastradas",
                            corpo: response.data.qtde_alunos
                        },
                    ]
                }

            }).catch(erro => { });
        }



    },
    computed: {

    },
    mounted() {
        // document.getElementById('sidebar').classList.toggle('open-sidebar');
        document.getElementById('inicio').classList.toggle('active');
        this.listarPessoas();
        this.listarSetores();
        this.listarInformacoes();
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

#subtitulo {
    margin-top: 15px;
    margin-left: 6px;
    margin-bottom: 5px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: flex-end;
    letter-spacing: 0.13px;
    color: #474F58;
    opacity: 0.4;

}



#container {
    padding-left: calc(82px + 40px);
    overflow: auto;
}

#card {
    background-color: white;
    border-radius: 5%;
    padding: 15px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    font-family: 'Poppins';

}

#corpo {
    color: #45A8BF;
    font-weight: 700;
    font-family: 'Poppins';
    font-size: 1.25rem;
}

#categoria {
    color: #45A8BF;
    font-family: 'Poppins';
}

#ver-todos {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 900;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.13px;
    text-decoration-line: underline;
    margin-top: 3rem;
    margin-right: 10px;
    color: #858585;
    cursor: pointer;
}
</style>
