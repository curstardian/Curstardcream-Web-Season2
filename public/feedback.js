const input = document.getElementById("feedback-input");
const preview = document.getElementById("preview");
const submitBtn = document.getElementById("submitFeedback");

/* 실시간 미리보기 */
input.addEventListener("input", () => {
  const markdown = input.value;
  preview.innerHTML = marked.parse(markdown);
});

/* 파일 저장 */
submitBtn.addEventListener("click", async () => {
  const content = input.value;

  if (!content.trim()) {
    alert("피드백을 입력해주세요");
    return;
  }

  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });

    const result = await res.json();

    if (result.success) {
      alert("✅ 피드백이 저장되었습니다!");
      input.value = "";
      preview.innerHTML = "<p>여기에 미리보기가 표시됩니다.</p>";
    }
  } catch (err) {
    alert("서버 연결 실패");
    console.error(err);
  }
});
