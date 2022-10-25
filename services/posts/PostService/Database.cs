using Npgsql;

namespace PostService
{
    public class Database
    {
        public Server server;
        private string sql;
        public NpgsqlDataReader data;

        public Database(string sql, IConfiguration server)
        {
            this.sql = sql;
            this.server = new Server(server);
            NpgsqlCommand query = new NpgsqlCommand(sql, this.server.conn);

            data = query.ExecuteReader();
        }

        public void Close()
        {
            this.server.conn.Close();
        }
    }

    public class Server
    {
        public NpgsqlConnection conn;

        public Server(IConfiguration server)
        {
            string connstring = String.Format(server.GetSection("ConnectionStrings").GetSection("DB").Value);

            conn = new NpgsqlConnection(connstring);
            conn.Open();
        }
    }
}
