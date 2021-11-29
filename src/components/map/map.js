const init = () => {
  const myMap = new ymaps.Map("mapy", {
    center: [55.768,37.635],
    zoom: 16,
  });

  const myPlacemark = new ymaps.Placemark([55.769505,37.638454], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'images/placemark.webp',
    iconImageSize: [12, 12],
    iconImageOffset: [0, 0]
  });

  myMap.geoObjects.add(myPlacemark);

  myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  myMap.controls.remove('searchControl'); // удаляем поиск
  myMap.controls.remove('trafficControl'); // удаляем контроль трафика
  myMap.controls.remove('typeSelector'); // удаляем тип
  myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
  myMap.controls.remove('rulerControl'); // удаляем контрол правил
  // myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально) 
};

ymaps.ready(init);