//  ***Projeto Vue.js (Obrigatório)
// Crie um projeto de Relógio Ponto Web utilizando Vue.js (https://vuejs.org)
// que permita o cadastro de pessoas e seus registros de entrada e saída (ponto) diários para,
// após um período, calcular a carga horária trabalhada.
// Sua aplicação deve contemplar o CRUD de pessoas e registros de entrada e saída. Além disso,
//  possibilitar a visualização de uma tabela de ponto com a carga horária trabalhada no período registrado.

// Não se preocupe com banco de dados ou backend, salve tudo localmente.
// Não se preocupe em persistir os dados da aplicação. Sua aplicação não precisa ser responsiva

// Caso você não conheça Vue.js não se assuste, ele é super fácil e os tutoriais
// que tem na internet são bem tranquilos de acompanhar. Um dos melhores manuais é do próprio vue.
// https://vuejs.org/v2/guide/

// Seu projeto deve conter um README.md explicando os passos necessários para rodar sua aplicação.

// Para enviar seu projeto faça um zip dele, remova as pastas node_modules e nos envie por email.

const usuarios = [];

const registrarUsuario = () => {
  const nome = document.getElementById("nome");
  usuarios.push({
    id: usuarios.length + 1,
    nome: nome.value,
    horarios: [],
    cargaHoraria: 0,
    uniq: [`entrada${usuarios.length + 1}`, `saida${usuarios.length + 1}`]
  });
  nome.value = "";
};

const adicionarHorario = usuario => {
  const entrada = document.getElementById("entrada" + usuario.id);
  const saida = document.getElementById("saida" + usuario.id);

  const user = usuarios.findIndex(e => e.id === usuario.id);
  const horario = usuarios[user].horarios;

  horario.push({
    dia: new Date().toLocaleString(),
    entrada: entrada.value,
    saida: saida.value
  });

  entrada.value = "";
  saida.value = "";
};

const calcularCargaHoraria = usuario => {
  let total = 0;

  usuario.horarios.forEach(e => {
    const saidaHours = e.saida.split(":");
    const entradaHours = e.entrada.split(":");

    if (saidaHours[1] * 1 < entradaHours[1] * 1) {
      saidaHours[1] = saidaHours[1] * 1 + 60;
      saidaHours[0] = saidaHours[0] * 1 - 1;
    }

    let horas = saidaHours[0] - entradaHours[0] * 1;

    let minutos = saidaHours[1] - entradaHours[1] * 1;

    total += horas + minutos / 60;
  });

  usuario.cargaHoraria = Math.round(total);
};

const deletarHorario = (usuario, horario) => {
  const timeIndex = usuario.horarios.findIndex(e => e === horario);

  usuario.horarios.splice(timeIndex, 1);
};

const deletarUsuario = usuario => {
  const userIndex = usuarios.findIndex(e => e === usuario);

  usuarios.splice(userIndex, 1);
};

// const verifyUsers = () => {
//   console.log(usuarios);

//   console.log(usuarios[0]);
// };

const app = new Vue({
  el: "#app",
  data: {
    msg: "Relógio Ponto Web",
    usuarios: usuarios
  },
  methods: {
    registrarUsuario,
    adicionarHorario,
    deletarHorario,
    deletarUsuario,
    calcularCargaHoraria
    //verifyUsers
  }
});
