import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import RedefinirSenha from '@/components/RedefinirSenha.vue'
import Dashboard from '@/paginas/Dashboard.vue'
import Configuracoes from '@/paginas/script/Configuracoes.vue'
import PessoasESetores from '@/paginas/PessoasESetores.vue'
import Indicadores from '@/paginas/indicador/Indicadores.vue'
import AdicionarIndicador from '@/paginas/indicador/AdicionarIndicador.vue'
import Conversas from '@/paginas/Conversas.vue'
import Relatorios from '@/paginas/Relatorios.vue'
import AdicionarScript from '@/paginas/script/AdicionarScript.vue'
import EditarScript from '@/paginas/script/EditarScript.vue'
import AdicionarPessoa from '@/paginas/pessoa/AdicionarPessoa.vue'
import AdicionarSetor from '@/paginas/setor/AdicionarSetor.vue'
import GerenciarPessoas from '@/paginas/pessoa/GerenciarPessoas.vue'
import GerenciarSetores from '@/paginas/setor/GerenciarSetores.vue'
import EditarSetor from '@/paginas/setor/EditarSetor.vue'
import EditarPessoa from '@/paginas/pessoa/EditarPessoa.vue'
import EditarIndicador from '@/paginas/indicador/EditarIndicador.vue'
import CadastroAluno from '@/components/CadastroAluno.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/cadastro-aluno',
      name: 'cadastro-aluno',
      component: CadastroAluno
    },
    {
      path: '/redefinir-senha',
      name: 'redefinir-senha',
      component: RedefinirSenha
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/configuracoes',
      name: 'configuracoes',
      component: Configuracoes
    },
    {
      path: '/adicionar-script',
      name: 'adicionarScript',
      component: AdicionarScript,
    },
    {
      path: '/editar-script/:id/:nome/:descricao',
      name: 'editarScript',
      component: EditarScript
    },
    {
      path: '/pessoas-setores',
      name: 'pessoas-setores',
      component: PessoasESetores
    },
    {
      path: '/pessoas',
      name: 'pessoas',
      component: GerenciarPessoas
    },
    {
      path: '/adicionar-pessoa',
      name: 'adicionar-pessoa',
      component: AdicionarPessoa
    },
    {
      path: '/editar-pessoa/:id/:nome/:email',
      name: 'editarPessoa',
      component: EditarPessoa
    },
    {
      path: '/setores',
      name: 'setores',
      component: GerenciarSetores
    },
    {
      path: '/adicionar-setor',
      name: 'adicionar-setor',
      component: AdicionarSetor
    },
    {
      path: '/editar-setor/:id/:nome/:pessoas',
      name: 'editarSetor',
      component: EditarSetor
    },
    {
      path: '/indicadores',
      name: 'indicadores',
      component: Indicadores
    },
    {
      path: '/adicionar-indicador',
      name: 'adicionar-indicador',
      component: AdicionarIndicador
    },
    {
      path: '/editar-indicador/:id/:nome/:descricao',
      name: 'editarIndicador',
      component: EditarIndicador
    },
    {
      path: '/conversas',
      name: 'conversas',
      component: Conversas
    },
    {
      path: '/relatorios',
      name: 'relatorios',
      component: Relatorios
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path != "/" && to.path != "/redefinir-senha" && to.path != "/cadastro-aluno"){
    const autenticado = isAuthenticated() 
    const coordenador = isCoordenador();
    if (!autenticado) {
      next('/');
    } else if (to.path !== "/conversas" && !coordenador){
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

function isAuthenticated() {
  return localStorage.getItem('autorizado');
}

function isCoordenador() {
  return localStorage.getItem('tipoAcesso') === 'coordenador';
}



export default router
