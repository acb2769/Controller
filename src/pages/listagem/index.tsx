import { useEffect, useState } from 'react'
import { LuClipboardList } from "react-icons/lu"; // Ícone similar ao da imagem

export function Listagem() {
  // Estado para armazenar os pets recuperados do localStorage
  const [pets, setPets] = useState<any[]>([]);

  useEffect(() => {
    // Busca os dados salvos pelo primeiro formulário (Paciente)
    const dadosSalvos = localStorage.getItem('enderecos');
    if (dadosSalvos) {
      setPets(JSON.parse(dadosSalvos));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-100">
      
      {/* Cabeçalho da Listagem */}
      <div className="flex flex-col items-center mb-8">
        <div>
          <LuClipboardList className="mx-auto bg-zinc-100 p-4 text-7xl text-5xl text-green-400 mb-4 rounded-full" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">Pacientes Cadastrados</h1>
      </div>

      {/* Tabela de Dados */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-400 text-sm uppercase tracking-wider">
              <th className="py-3 px-4 font-medium">Nome</th>
              <th className="py-3 px-4 font-medium">Espécie</th>
              <th className="py-3 px-4 font-medium">Tutor</th>
              <th className="py-3 px-4 font-right text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {pets.length > 0 ? (
              pets.map((pet, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">{pet.nome}</td>
                  <td className="py-4 px-4">{pet.especie}</td>
                  <td className="py-4 px-4">{pet.tutor}</td>
                  <td className="py-4 px-4 text-center">
                    <button 
                      onClick={() => alert(`Detalhes de ${pet.nome}`)}
                      className="px-4 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-white hover:shadow-sm"
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-400 italic">
                  Nenhum paciente encontrado no sistema.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
