window.UnitedEvents = {
  SIDEBAR_STATE_CHANGE: 'UnitedEvents.SidebarStateChange',
  SET_STORY: 'UnitedEvents.SetStory',
  ZOOM_IN: 'UnitedEvents.ZoomIn',
  ZOOM_OUT: 'UnitedEvents.ZoomOut',
  ZOOM_RESET: 'UnitedEvents.ZoomReset',
  SET_LOCATION: 'UnitedEvents.SetLocation',
  FILTER_CHANGED: 'UnitedEvents.FilterChanged',
  WINDOW_RESIZE: 'UnitedEvents.WindowResize',
  MOBILE_META_TOGGLED: 'UnitedEvents.MobileMetaToggled',
  SHOW_SUBMIT: 'UnitedEvents.ShowSubmit',
  HIDE_SUBMIT: 'UnitedEvents.HideSubmit',
  SET_SUBMIT: 'UnitedEvents.SetSubmit',
  TOUR_START: 'UnitedEvents.TourStart',
  TOUR_CANCEL: 'UnitedEvents.TourCancel',
  TOUR_COMPLETE: 'UnitedEvents.TourComplete',
  TOUR_ZOOM_IN: 'UnitedEvents.TourZoomIn',
  TOUR_ZOOM_OUT: 'UnitedEvents.TourZoomOut',
  TOUR_SKIP: 'UnitedEvents.TourSkip',
  TOUR_START_OUTSIDE: 'UnitedEvents.TourStartOutside'
}

function initialize()
{
  if(!smallScreen)
  {
    $('#content').addClass('sidebar-open');
  }
  var dispatcher = _.extend({}, Backbone.Events);
  var stories = new Stories()
  var nearbyStories = new NearbyStories()
  var searchResults = new SearchResults()

  var options = {dispatcher: dispatcher, stories: stories, nearby: nearbyStories, search:searchResults, smallScreen: smallScreen, touchDevice: touchDevice, ie10: (ie10 || ie9), ie9: ie9};
  
  var map = new MapView(options);
  var sidebar = new SidebarView(options);
  var submission = new SubmissionView(options);
  var controls = new MapControls(options)
  var mobileControls = new MapControlsMobile(options);
  var router = new SimpleRouter(options);
  var search = new SearchView(options);
  var donation = new DonationView(options);
  var tour = new Tour(options);

  $window = $(window);
  var debouncedResize = _.debounce(function()
  { 
    dispatcher.trigger(UnitedEvents.WINDOW_RESIZE, {
      width: $window.width(), 
      height: $window.height()
    });
    adjustInitialHeight();
  }, 300);
  $window.resize(debouncedResize);
  $('#hamburger').bind('click', function(event)
  {
    event.preventDefault();
    $('body').toggleClass('with-meta');
    dispatcher.trigger(UnitedEvents.MOBILE_META_TOGGLED, null);
  });


  var $initial = $('#initial-overlay');
  if($initial.length > 0)
  {
    adjustInitialHeight();
    $initial.find('.cta').bind('click', function(event)
    {
      event.preventDefault();
      $initial.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() { $initial.remove(); $initial = null; });
      $initial.addClass('dismissed');
      setTimeout(function(){ 
        if(!touchDevice)
        {
          dispatcher.trigger(UnitedEvents.TOUR_START_OUTSIDE, {});
        } 
       }, 600);
    }).removeClass('hidden');
  }
}

loadAsnyc = function (url, callback) {
  var script = document.createElement('script');
  script.async = true; 
  script.src = url;
  if(callback && typeof(callback === 'function')) {
    script.onload = function() { callback(); script.onload = script.onreadystatechange = undefined; };
    script.onreadystatechange = function() { if(script.readyState === 'loaded' || script.readyState === 'complete') { script.onload(); } };
  }
  document.body.appendChild(script);
};

var mapsURL = 'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyAztEgwZgBiVSL0eXDcJ_tJSg6qYGXijE4&callback=loadCluster';
var clusterURL = 'markerclusterer_packed.js';
var infoBoxURL = 'infobox_packed.js';

function loadInfoBox() { loadAsnyc(infoBoxURL, initialize); }
function loadCluster() { loadAsnyc(clusterURL, loadInfoBox); }
function loadMaps() { loadAsnyc(mapsURL); }

function adjustInitialHeight()
{
  var $initial = $('#initial-overlay')
  if($initial.length > 0)
  {
    var h = $initial.find('.initial-wrapper').outerHeight();
    var ih = $initial.outerHeight();
    if(h > ih) { 
      $initial.addClass('scroll'); 
      $initial.css('padding-top', '0px');
    } 
    else {
      $initial.css('padding-top', Math.ceil((ih - h) / 2)+'px');
    }
  }
};

//Rocking small screen?
var smallScreen = window.screen.width < 768;
//Touchy device?
var touchDevice = ('ontouchstart' in window || 'onmsgesturechange' in window || navigator.msMaxTouchPoints) ? true : false;

var ie10 = (navigator.appVersion.indexOf("MSIE 10") !== -1);
var ie8 = (navigator.appVersion.indexOf("MSIE 8") !== -1);
var ie9 = (navigator.appVersion.indexOf("MSIE 9") !== -1);

$(document).ready(function()
{
  if(touchDevice)
  {
    $('body').removeClass('no-touch').addClass('touch-device');
  }
  if(ie10)
  {
    $('html').addClass('ie10');
  }
  else if(ie9)
  {
    $('html').addClass('ie9');
  }
  if(ie8)
  {
    $('html').addClass('ie8');
    return;
  }
  loadMaps();

  // $.ajax({
  //   type: 'GET',
  //   url: '/api/location/find_region',
  //   data: {
  //     query: 'VA'
  //   }
  // }).done(function(response) {
  //   console.log('find region results: ')
  //   console.log(response);
  // });

  // $.ajax({
  //   type: 'GET',
  //   url: '/api/stories/created_after',
  //   data: {
  //     timestamp: '2014-12-11 16:16:05'
  //   }
  // }).done(function(response) {
  //   console.log('stories created after results: ')
  //   console.log(response);
  // });

  // $.ajax({
  //   type: 'GET',
  //   url: '/api/stories/get_latitude_and_longitude',
  //   data: {
  //     address: 'Sankt Annæ Gade 15',
  //     city: 'København',
  //     state: '',
  //     zip: '1416',
  //     country: 'Denmark'
  //   }
  // }).done(function(response) {
  //   console.log('get latitude and longitude results: ')
  //   console.log(response);
  // });

  // $.ajax({
  //   type: 'GET',
  //   url: '/api/chapters/donate_search',
  //   data: {zip: '12086'}
  // }).done(function(response) {
  //   console.log('donate chapter search results: ')
  //   console.log(response);
  // });

  //$.ajax({
  //  type: 'GET',
  //  url: '/api/chapters/donate_search',
  //  data: {zip: '12086'}
  //}).done(function(response) {
  //  console.log('donate chapter search results: ')
  //  console.log(response);
  //});

  // $.ajax({
  //   type: 'GET',
  //   url: '/api/stories/filter',
  //   data: {
  //     northeast_latitude: 48.46358393426629, 
  //     northeast_longitude: -54.59228515625, 
  //     southwest_latitude: 15.926660728191251, 
  //     southwest_longitude: -125.56396484375,
  //     category_id: 41,
  //     year: 2014
  //   }
  // }).done(function(response) {
  //   console.log('filter results: ')
  //   console.log(response);
  // });

});
