using System.ComponentModel.DataAnnotations;

namespace NewsAPI.Models
{
    public class PartialAnnouncement
    {
        [Required(ErrorMessage = "Title is required.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        public string Description { get; set; }
    }
}
