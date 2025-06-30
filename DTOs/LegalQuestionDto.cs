namespace MicroJustice.DTOs;

public class LegalQuestionDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public string? Content { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }
    public DateTime CreatedAt { get; set; }

    public List<LegalAnswerDto> Answers { get; set; } = new();
}