const API_URL = "http://127.0.0.1:8000";

export async function uploadFile(
  file: File
) {
  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await fetch(
      `${API_URL}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

  return response.json();
}

export async function askQuestion(
  question: string,
  filename: string
) {
  const response =
    await fetch(
      `${API_URL}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          question,
          filename,
        }),
      }
    );

  return response.json();
}

export async function getFiles() {
  const response =
    await fetch(
      `${API_URL}/files`
    );

  return response.json();
}

export async function getSummary(
  filename: string
) {
  const response =
    await fetch(
      `${API_URL}/summary/${filename}`
    );

  return response.json();
}

export async function deleteFile(
  filename: string
) {
  const response =
    await fetch(
      `${API_URL}/delete/${filename}`,
      {
        method: "DELETE",
      }
    );

  return response.json();
}

export async function getDashboard() {
  const response =
    await fetch(
      `${API_URL}/dashboard`
    );

  return response.json();
}

export async function generateRoadmap(
  goal: string
) {
  const response =
    await fetch(
      `${API_URL}/roadmap`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          goal,
        }),
      }
    );

  return response.json();
}

export async function getRecommendations(
  goal: string
) {
  const response =
    await fetch(
      `${API_URL}/recommendations`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          goal,
        }),
      }
    );

  return response.json();
}

export async function generateQuiz(
  filename: string
) {
  const response =
    await fetch(
      `${API_URL}/quiz`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          filename,
        }),
      }
    );

  return response.json();
}

export async function generateFlashcards(
  filename: string
) {
  const response =
    await fetch(
      `${API_URL}/flashcards`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          filename,
        }),
      }
    );

  return response.json();
}

export async function generateTasks(
  goal: string
) {
  const response =
    await fetch(
      `${API_URL}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          goal,
        }),
      }
    );

  return response.json();
}

export async function generateGraph(
  filename: string
) {
  const response =
    await fetch(
      `${API_URL}/graph`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          filename,
        }),
      }
    );

  return response.json();
}