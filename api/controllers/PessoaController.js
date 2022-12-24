// const database = require('../models')
// const Sequelize = require('sequelize')

const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()

class PessoaController {
    static async pegaPessoasAtivas(req, res){
        try{
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
            return res.status(200).json(pessoasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params
        try {                       
            const umaPessoa = await database.Pessoas.findOne({
                where: { 
                    id: Number(id) // coluna id igual id declarado acima
                } 
            })
            return res.status(200).json(umaPessoa)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res) {
        const novasInfos = req.body
        const { id } = req.params
        try {
            await database.Pessoas.update(novasInfos, { where: { id: Number(id) }})
            const pessoaAtualizada =  await database.Pessoas.findOne({ where: { id: Number(id) }})
            return res.status(200).json(pessoaAtualizada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) }})
            return res.status(200).json({mensagem:`id ${id} deletado`})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.restore( { where: { id: Number(id) } } )
            return res.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
 
    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params
        try {
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
            return res.status(200).json({message: `matriculas ref estudante ${estudanteId} canceladas`})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
}



module.exports = PessoaController