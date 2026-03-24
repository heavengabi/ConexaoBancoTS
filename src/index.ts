import { User } from "./models/user";
import { UserRepository } from "./repositories/user_repo";

async function main()
{
    const UserRepo = new UserRepository()

    console.log(await UserRepo.inserir("Gabriela", "123@teste.com"))
    console.log(await UserRepo.inserir("Miguel", "miguelvargas@miguel.com"))
    console.log(await UserRepo.inserir("Eduardo", "jesus@eduardo.com"))
    console.log("===========================================")
    UserRepo.mostrarTodos();

}
main()