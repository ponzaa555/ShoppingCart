namespace API.Dtos
{
    public class RedisDto<T>
    {
        public List<string> ContentTypes { get; set; }
        public string DeclaredType { get; set; }
        public List<string> Formatters { get; set; }
        public int StatusCode { get; set; }
        public T Value { get; set; }
    }
    public class TagDto
    {
        public string Name { get; set; }
        public int Id { get; set; }
    }
}