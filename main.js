const poppaClassList = {
  overlay: "poppa__overlay",
  aligner: "poppa__aligner",
  alignerScrollable: "poppa__aligner--scrollable",
  opened: "poppa__opened",
};

function Poppa() {
  const data = {
    getPopups: () => {
      return document.querySelectorAll(".poppa__popup");
    },
    getButtons: () => {
      return document.querySelectorAll(".poppa__button");
    },
  };

  function createPopupOverlay(popup) {
    const overlay = document.createElement("div");
    overlay;
    overlay.classList.add(poppaClassList.overlay);
    document.querySelector("body").appendChild(overlay);

    const aligner = document.createElement("div");
    aligner;
    aligner.classList.add(poppaClassList.aligner);
    overlay.appendChild(aligner);

    const closer = document.createElement("button");
    closer;
    closer.classList.add("poppa__closer");
    overlay.appendChild(closer);

    closer.addEventListener("click", function () {
      closePop(popup);
    });

    aligner.appendChild(popup);
    overlay.appendChild(aligner);
  }

  data.getPopups().forEach((popup) => {
    const popupId = popup.id;
    createPopupOverlay(popup);
  });

  function movePopupsIntoAligner() {
    const popups = document.querySelectorAll(".poppa__popup");
    popups.forEach((popup) => {
      // document.querySelector(`.${poppaClassList.aligner}`).appendChild(popup)
      // const openTime = popup.getAttribute('data-open-time');
      // if (+openTime) {
      // 	const overlay = document.createElement('div');
      // 	overlay;
      // 	overlay.classList.add(poppaClassList.overlay);
      // 	overlay.classList.add('timeout');
      // 	document.querySelector('body').appendChild(overlay);
      // 	const aligner = document.createElement('div');
      // 	aligner;
      // 	aligner.classList.add(poppaClassList.aligner);
      // 	document.querySelector(`.timeout.${poppaClassList.overlay}`).appendChild(aligner);
      // 	document.querySelector(`.timeout .${poppaClassList.aligner}`).appendChild(popup)
      // 	setTimeout(openPop, +openTime * 1000, popup);
      // } else if (openTime != undefined) {
      // 	console.warn(popup,'has provided non-number value of data-open-time')
      // }
    });
  }
  // movePopupsIntoAligner();

  function checkPopType($popup) {
    let popup = null;
    if (typeof $popup == "object") popup = $popup;
    if (typeof $popup == "string") popup = document.querySelector($popup);
    if (!popup) {
      console.error("Incorrect type of $popup in openPop() or closePop()");
      return;
    }
    return popup;
  }

  function openPop($popup) {
    const popup = checkPopType($popup);

    if (popup && !popup.classList.contains(poppaClassList.opened)) {
      popup.classList.add(poppaClassList.opened);
      popup.parentElement.parentElement.classList.add(poppaClassList.opened);
      popup.parentElement.parentElement.classList.add(poppaClassList.opened);
      console.log(popup.parentElement.parentElement);
    }
    const openEvent = new Event("poppa-open");
    popup.dispatchEvent(openEvent);
    fixScrollablePopups(popup);
  }
  data.openPop = openPop;

  function closePop($popup) {
    const popup = checkPopType($popup);
    console.log(popup);
    if (popup && popup.classList.contains(poppaClassList.opened)) {
      popup.classList.remove(poppaClassList.opened);
      popup.parentElement.parentElement.classList.remove(poppaClassList.opened);
    }
    const closeEvent = new Event("poppa-close");
    $popup.dispatchEvent(closeEvent);
  }
  data.closePop = closePop;

  function fixScrollablePopups(popup) {
    const pageHeight = window.innerHeight;
    const popupHeight = popup.clientHeight;

    if (!(pageHeight < popupHeight - 100)) {
      return;
    }
    if (
      !popup.parentElement.classList.contains(poppaClassList.alignerScrollable)
    ) {
      popup.parentElement.classList.add(poppaClassList.alignerScrollable);
    } else {
      popup.parentElement.classList.remove(poppaClassList.alignerScrollable);
    }

    console.log(pageHeight, popupHeight);
  }

  // Adds a click trigger open pop to all .poppa__button
  data.getButtons().forEach((button) => {
    const popupId = button.getAttribute("href");

    if (!popupId) console.error(button, "has no href on pop");

    button.addEventListener("click", function (event) {
      if (!popupId.includes("#")) event.preventDefault();
      openPop(popupId);
    });
  });

  return data;
}

const popups = new Poppa();
