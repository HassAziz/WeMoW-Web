window.addEventListener("scroll", function () {
    const scrollDown = document.querySelector(".scroll-down");
    if (window.scrollY > 100) {
      scrollDown.classList.add("hide");
    } else {
      scrollDown.classList.remove("hide");
    }
  });

  
const scrollImage = document.getElementById('scroll-image');
  window.addEventListener('scroll', () => {
      const offsetY = window.scrollY * 0.5;
      scrollImage.style.transform = `translate(-50%, ${offsetY}px) scale(1.2)`;
  });

  
  const track = document.getElementById("image-track");

  const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

  const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";  
      track.dataset.prevPercentage = track.dataset.percentage;
  }

  const handleOnMove = e => {
      if(track.dataset.mouseDownAt === "0") return;
      
      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;
      
      const percentage = (mouseDelta / maxDelta) * -50,
          nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
      
      track.dataset.percentage = nextPercentage;
      
      track.animate({
          transform: `translate(${nextPercentage}%, -50%)`
      }, { duration: 1200, fill: "forwards" });
      
      for(const image of track.getElementsByClassName("image")) {
          image.animate({
              objectPosition: `${100 + nextPercentage}% center`
          }, { duration: 1200, fill: "forwards" });
      }
  }

  window.onmousedown = e => handleOnDown(e);
  window.ontouchstart = e => handleOnDown(e.touches[0]);
  window.onmouseup = e => handleOnUp(e);
  window.ontouchend = e => handleOnUp(e.touches[0]);
  window.onmousemove = e => handleOnMove(e);
  window.ontouchmove = e => handleOnMove(e.touches[0]);
  
  // Set initial position
  window.onload = () => {
      track.dataset.percentage = -50;
      track.dataset.prevPercentage = -50;
      
      track.style.transform = `translate(-50%, -50%)`;
      for(const image of track.getElementsByClassName("image")) {
          image.style.objectPosition = `50% center`;
      }
  }