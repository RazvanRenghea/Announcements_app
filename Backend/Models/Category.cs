using System.ComponentModel.DataAnnotations;

namespace NewsAPI.Models
{
    public class Category
    {
        [Required(ErrorMessage = "Id is required.")]
        public string Id { get; set; }
        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }
    }
}
