namespace else_backend.Data.Entities
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;

        public bool IsCompleted { get; set; } = false;
        public double Order { get; set; }
    }
}
