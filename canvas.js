const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#e84e66', '#67c69e', '#edf1f4', '#80acc9', '#73a8b0', '#fe817f', '#68d2a4', '#1d203f', '#c9a30d'];

  function draw(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.random() * 10 - 5, y + Math.random() * 10 - 5); // Create a line with random deviation
    ctx.stroke();
  }

  document.addEventListener('mousemove', (e) => {
    draw(e.clientX, e.clientY);
  });

  // Resize canvas when window is resized
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });