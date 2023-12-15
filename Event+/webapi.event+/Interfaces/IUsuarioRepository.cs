using webapi.event_.Domains;

namespace webapi.event_.Interfaces
{
    public interface IUsuarioRepository
    {
        void Cadastrar(Usuario usuario);

        List<Usuario> Listar();

        Usuario BuscarPorId(Guid id);

        Usuario BuscarPorEmailESenha(string email, string senha);
    }
}