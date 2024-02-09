using Microsoft.AspNetCore.Mvc;
using NewsAPI.Models;
using NewsAPI.Services;

namespace NewsAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnnouncementController : ControllerBase
    {

        IAnnouncementCollectionService _announcementCollectionService;
        public AnnouncementController(IAnnouncementCollectionService announcementCollectionService)
        {
            _announcementCollectionService = announcementCollectionService ?? throw new ArgumentNullException(nameof(AnnouncementCollectionService));
        }

        /// <summary>
        /// Retrieves all announcements.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAnnouncements()
        {
            List<Announcement> announcements = await _announcementCollectionService.GetAll();
            return Ok(announcements);
        }
        /// <summary>
        /// Retrieves an announcement.
        /// </summary>
        /// <param name="id">The ID of the announcement to get.</param>
        [HttpGet("{id}")]
        public async Task<IActionResult>GetAnncouncement(Guid id)
        {
            var announcement = await _announcementCollectionService.Get(id);
            if (announcement == null)
            {
                return NotFound();
            }
            return Ok(announcement);
        }

        /// <summary>
        /// Creates a new announcement using Announcement object.
        /// </summary>
        [HttpPost("Announcement")]
        public async Task<IActionResult> CreateAnnouncement([FromBody] Announcement model)
        {
            if (model == null)
            {
                return BadRequest("Announcement data cannot be null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (await _announcementCollectionService.Create(model))
            {
                return Ok(model);
            }
            return BadRequest("Failed to create the announcement.");
        }
        /// <summary>
        /// Creates a new announcement using AnnouncementBody object.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateAnnouncementbody([FromBody] AnnouncementBody model)
        {
            if (model == null)
            {
                return BadRequest("Announcement data cannot be null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var announcement = new Announcement
            {
                Id = Guid.NewGuid(),
                Title = model.Title,
                Description = model.Description,
                CategoryId = model.CategoryId,
                Author = model.Author
            };
            if (await _announcementCollectionService.Create(announcement))
            {
                return Ok(model);
            }
            return BadRequest("Failed to create the announcement.");
        }

        /// <summary>
        /// Updates an existing announcement.
        /// </summary>
        /// <param name="id">The ID of the announcement to update.</param>
        /// <param name="model">The updated announcement data.</param>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAnnouncement(Guid id, [FromBody] AnnouncementBody model)
        {
            if (model == null)
            {
                return BadRequest("Announcement data cannot be null");
            }
            var announcement = new Announcement
            {
                Id = id,
                Title = model.Title,
                Description = model.Description,
                CategoryId = model.CategoryId,
                Author = model.Author
            };
            if (await _announcementCollectionService.Update(id, announcement))
            {
                return Ok(announcement);
            }
            return BadRequest("Failed to update the announcement.");
        }

        /// <summary>
        /// Deletes an announcement.
        /// </summary>
        /// <param name="id">The ID of the announcement to delete.</param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnnouncement(Guid id)
        {
            if (await _announcementCollectionService.Delete(id))
            {
                return Ok();
            }
            return BadRequest("Failed to delete the announcement.");
        }
        /// <summary>
        /// Updates the title and description for an existing announcement.
        /// </summary>
        /// <param name="id">The ID of the announcement to update.</param>
        /// <param name="model">The updated announcement data.</param>
        [HttpPatch("{id}")]
        public async Task<IActionResult> PartialUpdateAnnouncement(Guid id, [FromBody] PartialAnnouncement model)
        {
            if(await _announcementCollectionService.UpdateByTitleAndDescription(id, model.Title, model.Description))
            {
                return Ok("Announcement updated successfully");
            }
            return BadRequest("Failed to update the announcement.");
        }
    }
}
