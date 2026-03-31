import {conexao} from '../../src/config/database.ts'
import {UserRepository} from '../../src/repositories/user_repo.ts'

describe("Teste de integração de usuario", ()=>
{
    const repo = new UserRepository()
    beforeAll(async () => 
    {
        await conexao.execute('CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE);')
    })

    beforeEach(async() => 
    {
        await conexao.execute('DELETE FROM users')
    })

    test("Deve criar um usuário", async() => 
    {
        const user = await repo.inserir("jian", "teste@test.com")
        expect(user).not.toBeUndefined()
        expect(user.id).not.toBeNull()
        expect(user.nome).toBe("jian")
        expect(user.email).toBe("teste@test.com")

    })

    test("Deve criar dois usuários e exibir todos", async () => {
        const user1 = await repo.inserir("Rodorlfo", "rodorfo@norespira.com")
        const user2 = await repo.inserir("Jô Soares", "beijo@gordo.com")

        expect(user1).not.toBeUndefined()
        expect(user1.id).not.toBeNull()
        expect(user1.nome).toBe("Rodorlfo")
        expect(user1.email).toBe("rodorfo@norespira.com")

        expect(user2).not.toBeUndefined()
        expect(user2.id).not.toBeNull()
        expect(user2.nome).toBe("Jô Soares")
        expect(user2.email).toBe("beijo@gordo.com")      

        expect((await repo.mostrarTodos()).length).toBe(2)

        const users = await repo.mostrarTodos()

        expect(users[0].nome).toBe("Rodorlfo")
        expect(users[1].nome).toBe("Jô Soares")

    })

    afterAll(async () => {
        await conexao.end()
    })


    
})