using System.ComponentModel.DataAnnotations;

namespace NewsAPI.Models
{
    public class AnnouncementBody
    {

        [Required(ErrorMessage = "Title is required.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "CategoryId is required.")]
        public string CategoryId { get; set; }

        [Required(ErrorMessage = "Author is required.")]
        public string Author { get; set; }
    }
}
