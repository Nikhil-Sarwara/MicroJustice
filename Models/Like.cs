namespace MicroJustice.Models;

public class Like {
    public int Id { get; set; }

    public string UserId { get; set; }
    public virtual ApplicationUser User { get; set; }

    public int AnswerId { get; set; }
    public virtual LegalAnswer Answer { get; set; }
}