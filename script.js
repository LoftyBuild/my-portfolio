const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:0.15});
revealEls.forEach(el => io.observe(el));

const introOverlay = document.getElementById('introOverlay');
const introImg = introOverlay.querySelector('img');
const introTitle = document.getElementById('introTitle');
const whitePane = document.getElementById('whitePane');
const heroRevealEls = document.querySelectorAll('.hero .reveal');

const fadeDistance = () => window.innerHeight * 0.7;
const whiteThreshold = 0.35;
const revealThreshold = 0.65;

 paypal.Buttons({
    style: {
      shape: 'pill',
      color: 'gold',
      layout: 'vertical',
      label: 'subscribe'
    },

    createSubscription: function(data, actions) {
      return actions.subscription.create({
        plan_id: 'P-0XS09722AV520240JNJ5DIKY'
      });
    },

    onApprove: function(data, actions) {
      // Hide the PayPal button
      document.getElementById('paypal-button-wrapper').style.display = 'none';

      // Show success message
      const successMessage = document.getElementById('paypal-success-message');
      successMessage.style.display = 'block';

      // Optional: show the subscription ID
      console.log("Subscription ID:", data.subscriptionID);
    }

  }).render('#paypal-button-container');

  

function clamp(v, a=0, b=1){ return Math.min(Math.max(v,a),b); }

function updateIntro(){
  const progress = clamp(window.scrollY / fadeDistance(), 0, 1);

  // Smooth fade transition for the scroll hint/arrow
  const introHint = introOverlay.querySelector('.intro-hint');
  if (introHint) {
    introHint.style.transition = 'opacity 0.4s ease'; // Smooth fade duration
    const arrowFade = clamp(1 - (window.scrollY / 100), 0, 1); // Fades out over the first 100px of scroll
    introHint.style.opacity = String(arrowFade);
  }

  introOverlay.style.opacity = String(1 - progress);
  introImg.style.transform = `scale(${1 + progress * 0.18})`;

  const titleFade = clamp(progress * 1.4, 0, 1);
  introTitle.style.opacity = String(1 - titleFade);
  introTitle.style.transform = `translate(-50%, ${-progress * 18}px)`;

  introOverlay.style.pointerEvents = (progress >= 0.5) ? 'none' : 'auto';

  if (progress <= whiteThreshold) {
    whitePane.style.opacity = '0';
  } else {
    const local = clamp((progress - whiteThreshold) / (1 - whiteThreshold));
    whitePane.style.opacity = String(local);
  }

  if (progress >= revealThreshold) {
    document.documentElement.classList.add('light-mode');
    heroRevealEls.forEach(el => el.classList.add('in'));
  } else {
    document.documentElement.classList.remove('light-mode');
    heroRevealEls.forEach(el => el.classList.remove('in'));
  }
}
updateIntro();
window.addEventListener('scroll', updateIntro, {passive:true});
window.addEventListener('resize', updateIntro);