using System.ComponentModel.DataAnnotations;
using MicroJustice.Models;

public class LegalAnswer
{
    public int Id { get; set; }

    [Required]
    public string Content { get; set; }

    public DateTime CreatedAt { get; set; }

    // FK to Question
    [Required]
    public int QuestionId { get; set; }
    public LegalQuestion Question { get; set; }

    // FK to User
    [Required]
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }

    public List<Comment> Comments { get; set; } = new();
}