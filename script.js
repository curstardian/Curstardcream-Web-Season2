// 모달 열기/닫기
const modal = document.getElementById("loginModal");
const btn = document.getElementById("loginBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if(event.target == modal) modal.style.display = "none"; }

// 로그인 처리 (테스트용, 실제 서버 필요)
document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // 예시 계정
  if(username === "admin" && password === "1234"){
    document.getElementById("loginMsg").innerText = "로그인 성공!";
    modal.style.display = "none";
    alert("환영합니다, " + username + "님!");
  } else {
    document.getElementById("loginMsg").innerText = "아이디 또는 비밀번호가 올바르지 않습니다.";
  }
});
