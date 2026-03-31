import { exit } from "process"
import { UserRepository } from "./repositories/user_repo"
 
const rl = require('readline-sync')

async function main() {
    const userRepo = new UserRepository()

    let option: number = -1

    while (option !== 0) {
        console.log("\n=== MENU ===")
        console.log("1 - Listar usuários")
        console.log("2 - Inserir usuário")
        console.log("0 - Sair")

        option = Number(rl.question("Escolha uma opcao: "))

        switch (option) {
            case 1:
                const usuarios = await userRepo.mostrarTodos()

                console.log("\n--- Usuarios ---")
                usuarios.forEach((u) => {
                    console.log(`ID: ${u.id} | Nome: ${u.nome} | Email: ${u.email}`)
                })
                break

            case 2:
                const nome = rl.question("Nome: ")
                const email = rl.question("Email: ")

                const novoUsuario = await userRepo.inserir(nome, email)

                console.log("\nUsuario inserido com sucesso!")
                console.log(`ID: ${novoUsuario.id}`)
                break

            case 0:
                console.log("Saindo...")
                break

            default:
                console.log("Opcao invalida, tente novamente!")
                exit()
        }
    }
}

main()