import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Dashboard from '@/paginas/Dashboard.vue'
import Configuracoes from '@/paginas/Configuracoes.vue'
import Pessoas from '@/paginas/Pessoas.vue'
import Conversas from '@/paginas/Conversas.vue'
import Relatorios from '@/paginas/Relatorios.vue'
import AdicionarScript from '@/paginas/AdicionarScript.vue'
import AdicionarPessoa from '@/paginas/AdicionarPessoa.vue'
import AdicionarSetor from '@/paginas/AdicionarSetor.vue'
import GerenciarPessoas from '@/paginas/GerenciarPessoas.vue'
import GerenciarSetores from '@/paginas/GerenciarSetores.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
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
      component: AdicionarScript
    },
    {
      path: '/pessoas-setores',
      name: 'pessoas-setores',
      component: Pessoas
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
      path: '/conversas',
      name: 'conversas',
      component: Conversas
    },
    {
      path: '/relatorios',
      name: 'relatorios',
      component: Relatorios
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
