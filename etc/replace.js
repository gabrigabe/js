const Bolo = "abacate";

const BoloChocolate = Bolo.replace(/a/g, 'b');


console.log(BoloChocolate);

const cpf = '12345679810'

const cpfFormatado = cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, function(matchDaRegex, grupo1, grupo2, grupo3, grupo4) {
  console.log(arguments) // é uma forma de visualizar todos os parâmetros que essa função está recebendo, o numero de grupos pode variar e assim fica fácil de debugar.
  return `${grupo1}.${grupo2}.${grupo3}-${grupo4}`;
})

console.log(cpfFormatado) // O retorno seria 256.846.770-37


const frasesemespaco = 'umafrasesemespaços';

const frasecomespaco = frasesemespaco.replace(/(\w{3})?(\w{5})?(\w{3})?(\w{7})?/, '$1 $2 $3 $4');

console.log(frasecomespaco);

const frasesemespaco2 = 'uma frase';

const frasecomespaco2 = frasesemespaco2.replace(/(\w{3})?(\w{5})/,'$1 $2');
console.log(frasecomespaco2);
