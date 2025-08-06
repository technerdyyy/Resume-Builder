const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateResumeContent = async (resumeData) => {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing in environment variables");
  }

  try {
    // Generate Professional Summary
    const summaryPrompt = `Generate a professional summary for a resume based on the following information:
    Name: ${resumeData.name}
    Job Title: ${resumeData.jobTitle}
    Company: ${resumeData.company}
    Education: ${resumeData.degree} from ${resumeData.university}
    Technical Skills: ${resumeData.technicalSkills}
    Soft Skills: ${resumeData.softSkills}
    Job Description: ${resumeData.jobDescription}
    
    Create a compelling 2-3 sentence professional summary that highlights their strengths, experience, and value proposition. Make it ATS-friendly and impactful.`;

    // Generate Enhanced Project Description
    const projectPrompt = `Enhance this project description to make it more professional and detailed:
    Project Name: ${resumeData.projectName}
    Current Description: ${resumeData.projectDescription}
    Technologies Used: ${resumeData.technologies}
    
    Rewrite this project description to be more detailed, professional, and impressive. Include specific technical details, impact, and achievements. Keep it concise but comprehensive (3-4 sentences maximum).`;

    // Make API calls sequentially to avoid rate limiting
    const summaryResponse = await callGeminiAPI(summaryPrompt);
    const projectResponse = await callGeminiAPI(projectPrompt);

    return {
      aiSummary: summaryResponse,
      aiProjectDescription: projectResponse,
    };
  } catch (error) {
    console.error("Error generating resume content:", error);
    throw new Error(`Failed to generate AI content: ${error.message}`);
  }
};

const callGeminiAPI = async (prompt) => {
  const API_ENDPOINT =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

  try {
    const response = await fetch(`${API_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(
        errorData.error?.message ||
          `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text.trim();
    } else {
      console.error("Unexpected API response structure:", data);
      throw new Error("Invalid response structure from Gemini API");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
