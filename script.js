const toggle=document.querySelector(".menu-toggle");const nav=document.querySelector(".nav");toggle.addEventListener("click",()=>nav.classList.toggle("open"));document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));document.getElementById("year").textContent=new Date().getFullYear();const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
 
// Visitor comments -> Google Apps Script
const commentForm=document.getElementById("comment-form");
const commentInput=document.getElementById("comment-message");
const commentCount=document.getElementById("comment-count");
const commentStatus=document.getElementById("comment-status");
const commentSubmit=document.getElementById("comment-submit");
const commentFrame=document.getElementById("comment-response-frame");
let commentPending=false;
let commentTimer=null;
if(commentInput&&commentCount){
  commentInput.addEventListener("input",()=>{commentCount.textContent=String(commentInput.value.length);});
}
if(commentForm&&commentInput&&commentStatus&&commentSubmit&&commentFrame){
  commentForm.addEventListener("submit",event=>{
    const message=commentInput.value.trim();
    if(!message){
      event.preventDefault();
      commentStatus.textContent="댓글 내용을 입력해주세요.";
      commentStatus.className="comment-status error";
      commentInput.focus();
      return;
    }
    if(message.length>500){
      event.preventDefault();
      commentStatus.textContent="댓글은 500자 이내로 작성해주세요.";
      commentStatus.className="comment-status error";
      return;
    }
    if(commentPending){event.preventDefault();return;}
    commentPending=true;
    commentSubmit.disabled=true;
    commentSubmit.textContent="등록 중...";
    commentStatus.textContent="댓글을 전송하고 있습니다.";
    commentStatus.className="comment-status";
    commentTimer=window.setTimeout(()=>{
      if(!commentPending)return;
      commentPending=false;
      commentSubmit.disabled=false;
      commentSubmit.textContent="댓글 등록하기 →";
      commentStatus.textContent="응답이 지연되고 있습니다. Google 스프레드시트의 문의 시트에서 저장 여부를 확인해주세요.";
      commentStatus.className="comment-status error";
    },15000);
  });
  commentFrame.addEventListener("load",()=>{
    if(!commentPending)return;
    commentPending=false;
    if(commentTimer)window.clearTimeout(commentTimer);
    commentSubmit.disabled=false;
    commentSubmit.textContent="댓글 등록하기 →";
    commentStatus.textContent="서버 응답을 받았습니다. Google 스프레드시트의 문의 시트에서 저장 여부를 확인해주세요.";
    commentStatus.className="comment-status success";
    commentInput.value="";
    commentCount.textContent="0";
  });
}
