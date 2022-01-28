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
  };

  (function createPopupsOverlay() {

    const overlay = document.createElement('div');
    overlay;
    overlay.classList.add(poppaClassList.overlay);
    document.querySelector('body').appendChild(overlay);

    const closer = document.createElement('button');
    closer;
    closer.classList.add('poppa__closer');

    const aligner = document.createElement('div');
    aligner;
    aligner.classList.add(poppaClassList.aligner);
    document.querySelector(`.${poppaClassList.overlay}`).appendChild(aligner);

  })();

  (function movePopupsIntoAligner() {
    const popups = document.querySelectorAll('.poppa__popup');
    popups.forEach(popup => {
      document.querySelector(`.${poppaClassList.aligner}`).appendChild(popup)
    });
  })();


  data.getButtons().forEach(button => {
    const popupId = button.getAttribute('href');
    const popup = document.querySelector(popupId);

    button.addEventListener('click', function() {
      if (!popup.classList.contains(poppaClassList.opened)) {
        popup.classList.add(poppaClassList.opened);
        document.querySelector(`.${poppaClassList.overlay}`).classList.add(poppaClassList.opened);
      }
    })
  })


  return data;
}

const popups = new Poppa();
