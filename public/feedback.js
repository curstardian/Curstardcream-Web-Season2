document.getElementById("submitFeedback").addEventListener("click", async () => {
  const content = document.getElementById("feedback-input").value;

  if (!content.trim()) {
    alert("피드백을 입력하세요");
    return;
  }

  const res = await fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  });

  const result = await res.json();

  if (result.success) {
    alert("피드백이 저장되었습니다!");
    document.getElementById("feedback-input").value = "";
  }
});
