const poppaClassList = {
  overlay: 'poppa__overlay',
  aligner: 'poppa__aligner',
  opened: 'poppa__opened'
}

function Poppa() {

  const data = {
    getPopups: () => {
      return document.querySelectorAll('.poppa__popup');
    },
    getButtons: () => {
      return document.querySelectorAll('.poppa__button');
    },
		openedPops: [],
  };

  function createPopupOverlay(popup) {
    const overlay = document.createElement('div');
    overlay;
    overlay.classList.add(poppaClassList.overlay);
    document.querySelector('body').appendChild(overlay);

    const closer = document.createElement('button');
    closer;
    closer.classList.add('poppa__closer');
    document.querySelector(`.${poppaClassList.overlay}`).appendChild(closer);
		closer.addEventListener('click', function() {
			closePop(data.openedPops.at(-1));
		})

    const aligner = document.createElement('div');
    aligner;
    aligner.classList.add(poppaClassList.aligner);
    document.querySelector(`.${poppaClassList.overlay}`).appendChild(aligner);

		aligner.appendChild(popup)
  }

	data.getPopups().forEach(popup => {
		const popupId = popup.id;
		createPopupOverlay(popup)
	});

 	function movePopupsIntoAligner() {
    const popups = document.querySelectorAll('.poppa__popup');
    popups.forEach(popup => {
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
  };
	// movePopupsIntoAligner();

	function checkPopType($popup) {
    let popup = null;
		if (typeof($popup) == 'object') popup = $popup;
		if (typeof($popup) == 'string') popup = document.querySelector($popup);
		if (!popup) {
			console.error('Incorrect type of $popup in openPop() or closePop()');
			return;
		}
		return popup;
	}

	function openPop($popup) {
		const popup = checkPopType($popup);

		if (popup && !popup.classList.contains(poppaClassList.opened)) {
			popup.classList.add(poppaClassList.opened);
			document.querySelector(`.${poppaClassList.overlay}`).classList.add(poppaClassList.opened);
			popup.parentElement.parentElement.classList.add(poppaClassList.opened);
			console.log(popup.parentElement.parentElement)
		}
		data.openedPops.push(popup)
		const openEvent = new Event('poppa-open');
		popup.dispatchEvent(openEvent);
	}
	data.openPop = openPop;

	function closePop($popup) {
		const popup = checkPopType($popup);
		if (popup && popup.classList.contains(poppaClassList.opened)) {
			popup.classList.remove(poppaClassList.opened);
			document.querySelector(`.${poppaClassList.overlay}`).classList.remove(poppaClassList.opened);
		}
		data.openedPops.pop();
		const closeEvent = new Event('poppa-close');
		$popup.dispatchEvent(closeEvent);
	}
	data.closePop = closePop;

	// Adds a click trigger open pop to all .poppa__button
  data.getButtons().forEach(button => {
    const popupId = button.getAttribute('href');
		if (!popupId) console.error(button, 'has no href on pop');
    button.addEventListener('click', function(event) {
			if (!popupId.includes('#')) event.preventDefault()
			openPop(popupId)
    })
  })

  return data;
}

const popups = new Poppa();
