namespace MicroJustice.Models;

public class Comment {
    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }

    public int AnswerId { get; set; }
    public virtual LegalAnswer Answer { get; set; }

    public string UserId { get; set; }
    public virtual ApplicationUser User { get; set; }
}