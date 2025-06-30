namespace MicroJustice.Models;

public class LegalAnswer {
    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }

    public int QuestionId { get; set; }
    public virtual LegalQuestion Question { get; set; }

    public string UserId { get; set; }
    public virtual ApplicationUser User { get; set; }
}