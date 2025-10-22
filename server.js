import express, { request, response } from 'express'
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

/* Criar nossa API de usuários
1. Criar um usuário
2. Listar todos os usuários
3. Editar usuários
4. Deletar usuários
*/

const app = express()
app.use(express.json())

app.post('/usuarios', async (request, response) => {
    await prisma.user.create({
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }

    })

    response.status(201).json(request.body)

})

app.get('/usuarios', async (request, response) => {

    let users = []


    if(request.query){
        users = await prisma.user.findMany({
            where: {
                name: request.query.name,
                age: request.query.age,
                email: request.query.email
            }
        })

    } else {
        users = await prisma.user.findMany
    }

    response.status(200).json(users)

})

app.put('/usuarios/:id', async (request, response) => {
    await prisma.user.update({
        where: {
            id: request.params.id
        },
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }

    })

    response.status(201).json(request.body)

})

app.delete('/usuarios/:id', async (request, response) => {
    await prisma.user.delete({
        where: {
            id: request.params.id
        }
    })

    response.status(200).json({message: 'Usuário deletado com Sucesso!'})
})

app.listen(3000)

/*
Tipo de rota / Método HTTP (get, post, put, patch ou delete)
Endereço (/alguma coisa)

*/