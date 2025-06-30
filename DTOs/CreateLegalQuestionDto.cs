namespace MicroJustice.DTOs;

public class CreateLegalQuestionDto
{
    public string Title { get; set; }
    public string Category { get; set; }
    public string? Content { get; set; }
}