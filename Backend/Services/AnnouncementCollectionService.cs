using MongoDB.Driver;
using NewsAPI.Models;
using NewsAPI.Settings;

namespace NewsAPI.Services
{
    public class AnnouncementCollectionService : IAnnouncementCollectionService
    {
        private readonly IMongoCollection<Announcement> _announcements;

        public AnnouncementCollectionService(IMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _announcements = database.GetCollection<Announcement>(settings.AnnouncementsCollectionName);
        }
        //    public bool Create(Announcement model)
        //    {
        //        model.Id = Guid.NewGuid();
        //        _announcements.Add(model);
        //        if (_announcements.Contains(model))
        //        {
        //            return true;
        //        }
        //        return false;
        //    }

        //    public bool Delete(Guid id)
        //    {
        //        var existingAnnouncement = _announcements.FirstOrDefault(a => a.Id == id);
        //        if (existingAnnouncement == null)
        //        {
        //            return false;
        //        }
        //        _announcements.Remove(existingAnnouncement);
        //        return true;
        //    }

        //    public Announcement Get(Guid id)
        //    {
        //        return _announcements.FirstOrDefault(a => a.Id == id);
        //    }
        public async Task<List<Announcement>> GetAll()
        {
            var result = await _announcements.FindAsync(announcement => true);
            return result.ToList();
        }
        public async Task<bool> Create(Announcement announcement)
        {
            if (announcement.Id == Guid.Empty)
            {
                announcement.Id = Guid.NewGuid();
            }

            await _announcements.InsertOneAsync(announcement);
            return true;
        }

        public async Task<bool> Delete(Guid id)
        {
            var result = await _announcements.DeleteOneAsync(announcement => announcement.Id == id);
            if (!result.IsAcknowledged && result.DeletedCount == 0)
            {
                return false;
            }
            return true;
        }

        public async Task<Announcement> Get(Guid id)
        {
            return (await _announcements.FindAsync(announcement => announcement.Id == id)).FirstOrDefault();
        }

        public async Task<bool> Update(Guid id, Announcement announcement)
        {
            announcement.Id = id;
            var result = await _announcements.ReplaceOneAsync(announcement => announcement.Id == id, announcement);
            if (!result.IsAcknowledged && result.ModifiedCount == 0)
            {
                await _announcements.InsertOneAsync(announcement);
                return false;
            }

            return true;
        }

        public async Task<List<Announcement>> GetAnnouncementsByCategoryId(string categoryId)
        {
            return (await _announcements.FindAsync(announcement => announcement.CategoryId == categoryId)).ToList();
        }
        public async Task<bool> UpdateByTitleAndDescription(Guid id, string title, string description)
        {
            var result = await _announcements.UpdateOneAsync(announcement => announcement.Id == id, Builders<Announcement>.Update.Set("Title", title).Set("Description", description));
            if (!result.IsAcknowledged && result.ModifiedCount == 0)
            {
                return false;
            }
            return true;
        }
        //    public List<Announcement> GetAnnouncementsByCategoryId(string categoryId)
        //    {             
        //        return _announcements.Where(a => a.CategoryId == categoryId).ToList();
        //    }

        //    public bool Update(Guid id, Announcement model)
        //    {
        //        var existingAnnouncement = _announcements.FirstOrDefault(a => a.Id == id);
        //        if (existingAnnouncement == null)
        //        {
        //            return false;
        //        }
        //        int index = _announcements.IndexOf(existingAnnouncement);
        //        existingAnnouncement.Title = model.Title;
        //        existingAnnouncement.Description = model.Description;
        //        existingAnnouncement.CategoryId = model.CategoryId;
        //        existingAnnouncement.Author = model.Author;
        //        _announcements[index]=existingAnnouncement;
        //        return true;
        //    }

        //    public bool UpdateByTitleAndDescription(Guid id, string title, string description)
        //    {
        //        if (title == null || description == null)
        //        {
        //            return false;
        //        }
        //        var existingAnnouncement = _announcements.FirstOrDefault(a => a.Id == id);
        //        if (existingAnnouncement == null)
        //        {
        //            return false;
        //        }
        //        int index = _announcements.IndexOf(existingAnnouncement);
        //        existingAnnouncement.Title = title;
        //        existingAnnouncement.Description = description;
        //        _announcements[index] = existingAnnouncement;
        //        return true;
        //    }

    }
}
