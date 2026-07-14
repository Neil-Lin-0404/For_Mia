(function () {
  const BIRTHDAY_MONTH = 7; // July
  const BIRTHDAY_DAY = 16;

  const labelEl = document.getElementById("countdown-label");
  const gridEl = document.getElementById("countdown-grid");
  const celebrateEl = document.getElementById("celebrate");
  const countdownSection = document.querySelector(".countdown");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minsEl = document.getElementById("mins");
  const secsEl = document.getElementById("secs");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function isBirthdayToday(now) {
    return now.getMonth() + 1 === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY;
  }

  function nextBirthdayStart(now) {
    const year = now.getFullYear();
    let target = new Date(year, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 0, 0, 0, 0);

    // After birthday day ends, count toward next year
    if (
      now.getMonth() + 1 > BIRTHDAY_MONTH ||
      (now.getMonth() + 1 === BIRTHDAY_MONTH && now.getDate() > BIRTHDAY_DAY)
    ) {
      target = new Date(year + 1, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 0, 0, 0, 0);
    }

    return target;
  }

  function updateCountdown() {
    const now = new Date();

    if (isBirthdayToday(now)) {
      countdownSection.classList.add("is-today");
      labelEl.textContent = "今天就是好日子";
      celebrateEl.hidden = false;
      gridEl.setAttribute("aria-hidden", "true");
      return;
    }

    countdownSection.classList.remove("is-today");
    celebrateEl.hidden = true;
    gridEl.removeAttribute("aria-hidden");
    labelEl.textContent = "距離生日還有";

    const target = nextBirthdayStart(now);
    let diff = target.getTime() - now.getTime();
    if (diff < 0) diff = 0;

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
