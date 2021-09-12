const conexao = require('../infraestrutura/conexao');
const moment = require('moment');


class Atendimento{

    adcionar(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS'); 
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS'); 
        const atendimentoDatado = {...atendimento, dataCriacao, data};
        const sql = 'Insert INTO atendimentos SET ?';
        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 5;
         
        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem:'Data deve ser igual ou maior que data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem:'Cliente tem que ter pelomenos 5 caracteres'
            }

        ]
        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros);
        }else{
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro);
    
                }else{
                    res.status(201).json(atendimento);
                }
            })
        }
        
    }
    lista(res){
        const sql = 'SELECT * FROM  Atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        })
    }
    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        conexao.query(sql, (erro, resultados)=>{
            const atendimento = resultados[0];
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(atendimento);
            }
        })

    }
    alterar(id, valores ,res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS'); 
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        conexao.query(sql, [valores, id], (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({...valores, id});
            }
        })
    }
    deletar(id, res){
        const sql = 'DELETE FROM Atendimentos where id=?';

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({id});
            }
        })
    }

}

module.exports = new Atendimento;