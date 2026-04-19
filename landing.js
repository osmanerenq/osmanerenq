document.addEventListener('DOMContentLoaded', () => {

  const introScreen = document.getElementById('intro-screen');
  const bootText = document.getElementById('boot-text');
  const bootSequence = document.getElementById('boot-sequence');
  const introLogoWrap = document.getElementById('intro-logo-wrap');
  const randomNumber = Math.floor(Math.random() * 1000000);
  if (introScreen && bootText) {
    const bootLines = [
      "INITIALIZING SPONIXX'S SYSTEM...",
      "LOADING KERNEL V4.2...",
      "ESTABLISHING SECURE CONNECTION...",
      "ACCESS GRANTED.",
      `WELCOME, Guest${randomNumber}.`
    ];

    let lineIndex = 0;
// the function that makes the cool boot animation :d
    const typeBootLine = () => {
      if (lineIndex < bootLines.length) {
        bootText.innerHTML += bootLines[lineIndex] + "<br>";
        lineIndex++;

        setTimeout(typeBootLine, 200 + Math.random() * 300);
      } else {

        setTimeout(() => {
          bootSequence.classList.add('hidden');
          introLogoWrap.classList.remove('hidden');

          setTimeout(() => {
            introScreen.classList.add('hidden');

            setTimeout(startMainTypingEffect, 500);
          }, 2000);
        }, 600);
      }
    };

    setTimeout(typeBootLine, 500);
  } else {

    setTimeout(startMainTypingEffect, 500);
  }

  function startMainTypingEffect() {
    const titleElement = document.getElementById('typing-title');
    if (titleElement) {
      const phrases = ["I wear many hats", "Computer Engineer"];
      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      titleElement.innerHTML = '<span id="type-text"></span><span class="cursor">_</span>';
      const textSpan = document.getElementById('type-text');

      const typeWriter = () => {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
          textSpan.textContent = currentPhrase.substring(0, charIndex - 1);
          charIndex--;
        } else {
          textSpan.textContent = currentPhrase.substring(0, charIndex + 1);
          charIndex++;
        }

        let typeSpeed = isDeleting ? 30 : 70;

        if (!isDeleting && charIndex === currentPhrase.length) {
          typeSpeed = 1000;
          if (phraseIndex === 0) {
             isDeleting = true; 
          }
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          phraseIndex++;
          typeSpeed = 400; 
        }

        if (phraseIndex === 1 && charIndex === currentPhrase.length && !isDeleting) {
          return; 
        }

        setTimeout(typeWriter, typeSpeed + Math.random() * 30);
      };

      typeWriter();
    }
  }

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  const blobPath = document.getElementById('blob-path');

  if (cursor && follower) {
    if (blobPath) {
      let time = 0;
      function animateBlob() {
        time += 0.015;
        const numPoints = 12;
        const points = [];
        const centerX = 50;
        const centerY = 50;
        const baseRadius = 30;
        
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          const wave1 = Math.sin(angle * 3 + time) * 5;
          const wave2 = Math.sin(angle * 5 - time * 0.6) * 3;
          const wave3 = Math.cos(angle * 2 + time * 1.1) * 4;
          const r = baseRadius + wave1 + wave2 + wave3;
          
          points.push({
            x: centerX + Math.cos(angle) * r,
            y: centerY + Math.sin(angle) * r
          });
        }
        
        let d = "";
        for (let i = 0; i < numPoints; i++) {
          const nextI = (i + 1) % numPoints;
          const nextNextI = (i + 2) % numPoints;
          
          const p1 = points[i];
          const p2 = points[nextI];
          const p3 = points[nextNextI];
          
          const mid1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
          const mid2 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };
          
          if (i === 0) {
            d += `M ${mid1.x} ${mid1.y} `;
          }
          d += `Q ${p2.x} ${p2.y} ${mid2.x} ${mid2.y} `;
        }
        blobPath.setAttribute('d', d);
        requestAnimationFrame(animateBlob);
      }
      animateBlob();
    }

    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;
    let lastAngle = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function updateFollowerPhysics() {
      const dx = mouseX - followerX;
      const dy = mouseY - followerY;
      
      followerX += dx * 0.15;
      followerY += dy * 0.15;
      
      const velX = dx * 0.15;
      const velY = dy * 0.15;
      const velocity = Math.sqrt(velX * velX + velY * velY);
      
      if (velocity > 1.5) {
        lastAngle = Math.atan2(velY, velX) * 180 / Math.PI;
      }
      
      const scaleX = Math.min(1 + velocity * 0.015, 1.3);
      const scaleY = Math.max(1 - velocity * 0.01, 0.75);

      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      
      follower.style.transform = `translate(-50%, -50%) rotate(${lastAngle}deg) scale(${scaleX}, ${scaleY}) rotate(${-lastAngle}deg)`;

      requestAnimationFrame(updateFollowerPhysics);
    }
    updateFollowerPhysics();

    const interactiveElements = document.querySelectorAll('a, button, .premium-project-card, .terminal-card, .card');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }
});

const style = document.createElement('style');
style.textContent = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .cursor {
    animation: blink 1s step-end infinite;
    color: var(--accent);
  }
`;
document.head.appendChild(style);
