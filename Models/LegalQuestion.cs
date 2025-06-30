using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MicroJustice.Models;

public class LegalQuestion
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Category { get; set; }

    public string? Content { get; set; }

    [Required]
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }

    public DateTime CreatedAt { get; set; }
    
    public List<LegalAnswer> Answers { get; set; } = new();
}