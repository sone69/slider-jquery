let $slides = $('.slide');
let $indicators = $('.indicators');
let $indicator = $('.indicator');
let currentSlide = 0;
let interval = 2000;
const Space = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
const FA_PLAY = '<i class="far fa-play-circle"></i>';

let goToNth = (n) => {
  $($slides[currentSlide]).toggleClass('active');
  $($indicator[currentSlide]).toggleClass('active');
  currentSlide = (n + $slides.length) % $slides.length;
  $($slides[currentSlide]).toggleClass('active');
  $($indicator[currentSlide]).toggleClass('active');
};

let goToPrev = () => goToNth(currentSlide - 1);

let goToNext = () => goToNth(currentSlide + 1);

let isPlaying = true;
let $pausePlay = $('.pause-play');
let $NEXT = $('.next');
let $PREV = $('.prev');
let slideInterval = setInterval(goToNext, interval);

let pause = () => {
  if (isPlaying) {
    $pausePlay.html(FA_PAUSE);
    isPlaying = !isPlaying;
    clearInterval(slideInterval);
  }
};
let play = () => {
  $pausePlay.html(FA_PLAY);
  isPlaying = !isPlaying;
  slideInterval = setInterval(goToNext, interval);
};
let clickPausePlay = () => (isPlaying ? pause() : play());
let clickGoToNext = () => {
  pause();
  goToNext();
};
let clickGoToPrev = () => {
  pause();
  goToPrev();
};
$pausePlay.on('click', clickPausePlay);
$NEXT.on('click', clickGoToNext);
$PREV.on('click', clickGoToPrev);
let clickIndicate = (e) => {
  pause();
  goToNth(+e.target.getAttribute('data-slide-to'));
};
$indicators.on('click', '.indicators', clickIndicate);
let pressKey = (e) => {
  if (e.key === LEFT_ARROW) clickGoToPrev();
  if (e.key === RIGHT_ARROW) clickGoToNext();
  if (e.key === Space) clickPausePlay();
};
$(document).on('keydown', pressKey);
