using Microsoft.AspNetCore.Mvc;
using NewsAPI.Models;

namespace NewsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private static readonly List<Category> Categories = new List<Category>
        {
            new Category { Id = "1", Name = "General" },
            new Category { Id = "2", Name = "Labs" },
            new Category { Id = "3", Name = "Courses" }
        };

        /// <summary>
        /// Retrieves all categories.
        /// </summary>
        [HttpGet]
        public IActionResult GetAllCategories()
        {
            return Ok(Categories);
        }

        /// <summary>
        /// Retrieves a category by its ID.
        /// </summary>
        /// <param name="id">The ID of the category to retrieve.</param>
        [HttpGet("{id}")]
        public IActionResult GetCategoryById(string id)
        {
            var category = Categories.FirstOrDefault(c => c.Id == id);
            if (category == null)
                return NotFound();

            return Ok(category);
        }

        /// <summary>
        /// Deletes a category by its ID.
        /// </summary>
        /// <param name="id">The ID of the category to delete.</param>
        [HttpDelete("{id}")]
        public IActionResult DeleteCategoryById(string id)
        {
            var category = Categories.FirstOrDefault(c => c.Id == id);
            if (category == null)
                return NotFound();

            Categories.Remove(category);
            return Ok("Category deleted successfully.");
        }

        /// <summary>
        /// Adds a new category.
        /// </summary>
        /// <param name="category">The category object to add.</param>
        [HttpPost]
        public IActionResult AddCategory([FromBody] Category category)
        {
            if (category == null)
                return BadRequest("Invalid category data.");

            category.Id = Categories.Max(c => c.Id) + 1;
            Categories.Add(category);

            return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
        }
    }
}
