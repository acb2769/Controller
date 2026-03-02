import { NavLink } from "react-router-dom";
import { MdPets, MdEventAvailable, MdAssignment } from "react-icons/md";

export function Home() {

    return (
        <>
<div className="container mx-auto p-4">
    {/* Container Pai: Define 1 coluna por padrão e 3 colunas em telas 'lg' */}
    <h1 className="mt-10 text-4xl font-bold mb-4 text-center">Bem-vindo ao 
        <span className="font-serif text-4xl font-bold mb-4 text-green-500"> PetHealth Lite!</span>
    </h1>
    <p className="text-center text-lg text-gray-400 mb-1">Gerencie seus pacientes e consultas veterinárias de forma simples,</p>
    <p className="text-center text-lg text-gray-400 mb-6">rápida e organizada.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center mt-20">
        
        {/* Card 1 */}
        <div className="max-w-xs ml-20 p-6 bg-white shadow-lg border border-zinc-100 rounded-xl">
            <MdPets className="mx-auto bg-zinc-100 p-4 text-7xl text-5xl text-green-400 mb-4 rounded-full" />
            <h2 className="font-bold text-xl text-center">Cadastrar Pets</h2>
            <div className="border-b border-gray-300 my-4 mx-auto"></div>
            <p className="text-center mt-6 text-zinc-400">Registre novos pets e seus tutores</p>
            <p className="text-center text-zinc-400"> no sistema.</p>
        </div>

        {/* Card 2 */}
        <div className="max-w-xs p-6 bg-white shadow-lg border border-zinc-100 rounded-xl">
            <MdEventAvailable className="mx-auto bg-zinc-100 p-4 text-7xl text-5xl text-green-400 mb-4 rounded-full" />
            <h2 className="font-bold text-xl text-center">Agendar Consultas</h2>
            <div className="border-b border-gray-300 my-4 mx-auto"></div>
            <p className="text-center mt-6 text-zinc-400">Marque consultas veterinárias para</p>
            <p className="text-center text-zinc-400"> seus pacientes.</p>
        </div>

        {/* Card 3 */}
        <div className="max-w-xs p-6 mr-20 bg-white shadow-lg border border-zinc-100 rounded-xl">
            <MdAssignment className="mx-auto bg-zinc-100 p-4 text-7xl text-5xl text-green-400 mb-4 rounded-full" />
            <h2 className="font-bold text-xl text-center">Ver Pacientes</h2>
            <div className="border-b border-gray-300 my-4 mx-auto"></div>
            <p className="text-center mt-6 text-zinc-400">Visualize os pacientes cadastrados</p>
            <p className="text-center text-zinc-400"> no sistema.</p>
        </div>

    </div>
</div>
        </>
    )
}