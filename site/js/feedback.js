document.addEventListener('DOMContentLoaded', function() {
  // 获取当前页面路径作为唯一标识（用于独立存储）
  const pageId = window.location.pathname.replace(/\//g, '-').replace(/\.html$/, '') || 'homepage';
  
  // 尝试从 localStorage 获取当前页面的反馈数据
  const savedFeedback = JSON.parse(localStorage.getItem(`feedback-${pageId}`)) || {
    likes: 0,
    dislikes: 0,
    userVote: null // 记录用户投票状态：null | 'like' | 'dislike'
  };
  
  // 创建按钮容器
  createFeedbackButtons(savedFeedback, pageId);
});

// 创建反馈按钮
function createFeedbackButtons(feedbackData, pageId) {
  const container = document.createElement('div');
  container.className = 'feedback-container';
  container.innerHTML = `
    <div class="feedback-title">这篇文章有帮助吗？</div>
    <div class="feedback-buttons">
      <button id="like-btn" class="md-button feedback-button ${feedbackData.userVote === 'like' ? 'voted' : ''}">
        👍 <span id="like-count">${feedbackData.likes}</span>
      </button>
      <button id="dislike-btn" class="md-button feedback-button ${feedbackData.userVote === 'dislike' ? 'voted' : ''}">
        👎 <span id="dislike-count">${feedbackData.dislikes}</span>
      </button>
    </div>
    <div class="feedback-message" id="feedback-message"></div>
  `;
  
  // 插入到文章末尾
  const article = document.querySelector('.md-content__inner') || document.querySelector('article');
  if (article) {
    article.appendChild(container);
    
    // 添加事件监听
    document.getElementById('like-btn').addEventListener('click', () => handleFeedback('like', pageId));
    document.getElementById('dislike-btn').addEventListener('click', () => handleFeedback('dislike', pageId));
  }
}

// 处理用户反馈
function handleFeedback(type, pageId) {
  const feedbackData = JSON.parse(localStorage.getItem(`feedback-${pageId}`)) || {
    likes: 0,
    dislikes: 0,
    userVote: null
  };
  
  // 检查用户是否已经投票
  const messageEl = document.getElementById('feedback-message');
  if (feedbackData.userVote) {
    messageEl.textContent = '您已经投过票了';
    messageEl.style.display = 'block';
    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 3000);
    return;
  }
  
  // 更新计数
  feedbackData.userVote = type;
  if (type === 'like') feedbackData.likes++;
  else feedbackData.dislikes++;
  
  // 保存更新后的数据
  localStorage.setItem(`feedback-${pageId}`, JSON.stringify(feedbackData));
  
  // 更新UI显示
  document.getElementById('like-count').textContent = feedbackData.likes;
  document.getElementById('dislike-count').textContent = feedbackData.dislikes;
  
  // 添加投票状态样式
  document.getElementById('like-btn').classList[type === 'like' ? 'add' : 'remove']('voted');
  document.getElementById('dislike-btn').classList[type === 'dislike' ? 'add' : 'remove']('voted');
  
  // 显示感谢消息
  messageEl.textContent = type === 'like' ? '感谢您的支持！' : '感谢您的反馈，我们会努力改进！';
  messageEl.style.display = 'block';
  setTimeout(() => {
    messageEl.style.display = 'none';
  }, 3000);
  
  // （可选）将数据发送到后端
  // sendFeedbackToServer(pageId, type);
}