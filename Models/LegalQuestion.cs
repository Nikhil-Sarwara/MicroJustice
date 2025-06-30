namespace MicroJustice.Models;

public class LegalQuestion {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string Category { get; set; }
    public DateTime CreatedAt { get; set; }

    public string UserId { get; set; }
    public virtual ApplicationUser User { get; set; }
}