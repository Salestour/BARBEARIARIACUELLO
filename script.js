(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_D465668E_C485_B467_4129_919D8298F0D8], 'cardboardAvailable'); this.syncPlaylists([this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_D4F92038_C49B_ACAB_41E6_96B27D79D9E9].forEach(function(component) { component.set('visible', false); }) }; this.playAudioList([this.audio_C7831857_DE5F_0618_41CE_F3051F982969])",
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.8,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "horizontalAlign": "left",
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  "this.Container_CB661D43_C484_D4DD_41E1_248C85BB2D4F",
  "this.Container_CA6EA08A_C48C_EC6F_41E7_A602ACC8FEDB",
  "this.Container_CBFFFAFF_C4BC_BDA5_41E4_FF9621011F5B",
  "this.Container_DD31D504_C587_B45B_41E3_6DC0ED61C0F5"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "desktopMipmappingEnabled": false,
 "minHeight": 20,
 "scripts": {
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "existsKey": function(key){  return key in window; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "unregisterKey": function(key){  delete window[key]; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "registerKey": function(key, value){  window[key] = value; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getKey": function(key){  return window[key]; }
 },
 "defaultVRPointer": "laser",
 "class": "Player",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "buttonToggleFullscreen": "this.IconButton_D4F92038_C49B_ACAB_41E6_96B27D79D9E9",
 "verticalAlign": "top",
 "gap": 10,
 "height": "100%",
 "paddingBottom": 0,
 "buttonToggleMute": "this.IconButton_CB0917B8_C485_D3AB_41DF_2ADB73C6100A",
 "downloadEnabled": false,
 "shadow": false,
 "paddingTop": 0,
 "borderRadius": 0,
 "overflow": "visible",
 "paddingLeft": 0,
 "definitions": [{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "id": "panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C",
 "thumbnailUrl": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_t.jpg",
 "label": "B5",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_CF9F5892_DDD9_0618_41D8_854FB95CF4F2",
  "this.overlay_CF313E32_DDD9_3A18_41C0_98C3B16A8549",
  "this.panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_tcap0"
 ]
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "id": "panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C",
 "thumbnailUrl": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_t.jpg",
 "label": "B4",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_CC4B56F9_DDA9_0A08_41E5_E2E2337FA79C",
  "this.overlay_CFF89190_DDA9_0618_41C1_D59CC0AFC645",
  "this.panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_tcap0"
 ]
},
{
 "items": [
  {
   "media": "this.panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "camera": "this.panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "camera": "this.panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "camera": "this.panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "camera": "this.panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "camera": "this.panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "camera": "this.panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "camera": "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7D39123_DDA9_0638_41DF_82D20BE60779",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "camera": "this.panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "camera": "this.panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "camera": "this.panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 0)",
   "camera": "this.panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7D39123_DDA9_0638_41DF_82D20BE60779",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "id": "panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1",
 "thumbnailUrl": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_t.jpg",
 "label": "B10",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_C969F6DE_DDE7_0A08_41D0_8F64DC1F9798",
  "this.overlay_C8A21BAE_DDE9_1A08_41C4_C28818102CEA",
  "this.panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_tcap0"
 ]
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "id": "panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D",
 "thumbnailUrl": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_t.jpg",
 "label": "B9",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_C97545CD_DDD9_0E08_41DA_5BC94C41EBD0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 81.73,
  "pitch": -16.53,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C5C1139F_DE59_0A08_41E8_00B936BBCE4B",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 45,
  "pitch": -9.18,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C4D161BA_DE59_0608_41DB_370963D368B7",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -154.29,
  "pitch": -12.86,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C5D123B1_DE59_0A18_41DB_878F91C19127",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 114.8,
  "pitch": -33.06,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C5125283_DE59_0AF8_41D5_120CCADAB29A",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_camera",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist, 0, 1)",
   "camera": "this.panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist, 1, 2)",
   "camera": "this.panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist, 2, 3)",
   "camera": "this.panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist, 3, 4)",
   "camera": "this.panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist, 4, 5)",
   "camera": "this.panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist, 5, 6)",
   "camera": "this.panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist, 6, 7)",
   "camera": "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7D39123_DDA9_0638_41DF_82D20BE60779",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist, 7, 8)",
   "camera": "this.panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist, 8, 9)",
   "camera": "this.panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist, 9, 10)",
   "camera": "this.panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist, 10, 0)",
   "camera": "this.panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_camera",
   "player": "this.MainViewerPanoramaPlayer",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist",
 "class": "PlayList"
},
{
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": "this.IconButton_D465668E_C485_B467_4129_919D8298F0D8",
 "displayPlaybackBar": true,
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_rotation"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "audios": [
  "this.audio_C4E8CB9F_DDAF_1A08_41D6_9B33D1A667E1"
 ],
 "id": "panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97",
 "thumbnailUrl": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_t.jpg",
 "label": "FACHADA BARBEARIA ",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D3A62531_DDA7_0E18_41D3_A778AD52529D",
  "this.panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -60.61,
  "pitch": -10.1,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C548930B_DE59_0A08_4199_017C2394BB21",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -53.27,
  "pitch": -14.69,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C50ED261_DE59_0A38_41D7_24B55CFCF569",
 "class": "PanoramaCamera"
},
{
 "displayOriginPosition": {
  "hfov": 165,
  "yaw": 78.09,
  "stereographicFactor": 1,
  "pitch": -90,
  "class": "RotationalCameraDisplayPosition"
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 78.09,
  "pitch": 3.64,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_camera",
 "displayMovements": [
  {
   "easing": "linear",
   "duration": 1000,
   "class": "TargetRotationalCameraDisplayMovement"
  },
  {
   "targetPitch": 3.64,
   "easing": "cubic_in_out",
   "duration": 3000,
   "targetStereographicFactor": 0,
   "class": "TargetRotationalCameraDisplayMovement"
  }
 ],
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -139.59,
  "pitch": -22.96,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C5A3C37A_DE59_0A08_41E2_95E805A5E292",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 45,
  "pitch": -9.18,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C4DBC1DC_DE59_0608_41E5_CC4C17C55BE2",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -53.27,
  "pitch": -14.69,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C526F2A5_DE59_0A38_41BC_B6D6DB124CE0",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "audio": "this.audioresource_C7EFE023_DDA9_0603_41E4_6037413F2637",
 "id": "audio_C4E8CB9F_DDAF_1A08_41D6_9B33D1A667E1",
 "data": {
  "label": "Audio1"
 },
 "class": "PanoramaAudio"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "id": "panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F",
 "thumbnailUrl": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_t.jpg",
 "label": "B1",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_CD0D8FBC_DDBF_7A08_41B3_B1C9D67A6E7A",
  "this.overlay_D24AED31_DDB9_1E18_4192_4E29F6BCB572",
  "this.panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 37.65,
  "pitch": -9.18,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C4ECD200_DE59_05F8_41C1_FBFA4F5F4326",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 114.8,
  "pitch": -33.06,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C4F9423F_DE59_0A08_41E7_63CD5A400B30",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 37.65,
  "pitch": -9.18,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C4F7C222_DE59_0A38_41B7_EC4D2FFC984F",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 101.02,
  "pitch": 1.84,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C5B3938C_DE59_0A08_41D1_B110EACFF8F2",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 153.37,
  "pitch": -26.63,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C57E2343_DE59_0A78_41E7_86E1195BA35A",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C200E3E9_DE59_0A0B_41A0_DA012B17A69F",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7D39123_DDA9_0638_41DF_82D20BE60779",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "id": "panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7",
 "thumbnailUrl": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_t.jpg",
 "label": "B6",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_CE929BDC_DDD9_1A08_41D4_67926D9CD4C0",
  "this.overlay_CE67E461_DDD9_0E38_41DE_60E463DDEC67",
  "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 73.47,
  "pitch": -2.76,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C21613FC_DE59_0A08_41B2_23D70ABEB374",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "id": "panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3",
 "thumbnailUrl": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_t.jpg",
 "label": "B3",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_CC855F80_DDAB_1AF8_41C8_D365F173E916",
  "this.overlay_CDAE0316_DDA9_0A18_41E9_91F7BE3CADFD",
  "this.panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 9.18,
  "pitch": -1.84,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C52B82CA_DE59_0A08_41EB_B73F36FCFAA8",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "id": "panorama_D7D39123_DDA9_0638_41DF_82D20BE60779",
 "thumbnailUrl": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_t.jpg",
 "label": "B7",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_CE817724_DDDF_0A38_41D9_BAE7CC487316",
  "this.overlay_CE4B0B2E_DDDF_1A08_41C9_E891E01CEEAB",
  "this.panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -60.61,
  "pitch": -10.1,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C55EF31E_DE59_0A08_41EA_48C2B14A2C24",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "id": "panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5",
 "thumbnailUrl": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_t.jpg",
 "label": "B2",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_CD6C06F2_DDBB_0A18_41C0_6630251531F7",
  "this.overlay_D2A06CC6_DDB9_1E78_41D1_F5E58FD7AF1D",
  "this.panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 101.02,
  "pitch": 1.84,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C59C5369_DE59_0A09_41E6_AFA62D37AA7A",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 82.65,
  "pitch": -6.43,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C5E1D3C4_DE59_0A78_4167_8C94ED0FB75E",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0.92,
  "pitch": -21.12,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C5F703D7_DE59_0A18_41E7_31E6B7EB9921",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_C7831857_DE5F_0618_41CE_F3051F982969.mp3",
  "oggUrl": "media/audio_C7831857_DE5F_0618_41CE_F3051F982969.ogg",
  "class": "AudioResource"
 },
 "id": "audio_C7831857_DE5F_0618_41CE_F3051F982969",
 "data": {
  "label": "Imagine Dragons - Believer (Official Music Video) (320 kbps)"
 },
 "class": "MediaAudio"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 82.65,
  "pitch": -3.67,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C58C7356_DE59_0A18_41E0_75EC5373BCFA",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C538B2F0_DE59_0A18_41A8_F5BD272E9056",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D7D39123_DDA9_0638_41DF_82D20BE60779",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "id": "panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106",
 "thumbnailUrl": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_t.jpg",
 "label": "B8",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_CE7EB0C9_DDD9_0608_41DF_03E46D3DCDE9",
  "this.overlay_C9966ADA_DDDB_3A08_41EB_5776B29380B6",
  "this.panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_tcap0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -157.04,
  "pitch": -18.37,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_C56ED330_DE59_0A18_41E3_2B05B8D2AFDB",
 "class": "PanoramaCamera"
},
{
 "paddingLeft": 0,
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 50,
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "class": "ViewerArea",
 "paddingRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "bottom": "0%",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "playbackBarHeadHeight": 15
},
{
 "propagateClick": false,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "id": "Container_CB661D43_C484_D4DD_41E1_248C85BB2D4F",
 "left": "0%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container Inferior"
 },
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_CA21D85B_C48D_DCED_41D6_77206EB84DFA"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "class": "Container",
 "paddingRight": 0,
 "bottom": "0%",
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "scrollBarMargin": 2,
 "height": "14.973%",
 "gap": 10,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingTop": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll"
},
{
 "propagateClick": false,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_CA6EA08A_C48C_EC6F_41E7_A602ACC8FEDB",
 "left": "0%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container Esquerdo"
 },
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_CAD4F683_C484_745D_41E2_2AF0B2B1E4DC",
  "this.Container_CAF562F9_C484_ADAD_4196_2F50A1BAADD1"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "top": "0%",
 "width": "29.493%",
 "class": "Container",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "height": "90.055%",
 "gap": 30,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingTop": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll"
},
{
 "propagateClick": false,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "id": "Container_CBFFFAFF_C4BC_BDA5_41E4_FF9621011F5B",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container Direito"
 },
 "horizontalAlign": "right",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_D465668E_C485_B467_4129_919D8298F0D8",
  "this.IconButton_CB0917B8_C485_D3AB_41DF_2ADB73C6100A",
  "this.IconButton_D4F92038_C49B_ACAB_41E6_96B27D79D9E9"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "5.127%",
 "class": "Container",
 "paddingRight": 10,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "height": "90.055%",
 "top": "0%",
 "gap": 10,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingTop": 10,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll"
},
{
 "propagateClick": false,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "id": "Container_DD31D504_C587_B45B_41E3_6DC0ED61C0F5",
 "left": "82.51%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container28024"
 },
 "horizontalAlign": "left",
 "right": "7.24%",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "class": "Container",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "height": "13.88%",
 "top": "0.1%",
 "gap": 10,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingTop": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "overflow": "scroll"
},
{
 "maxHeight": 128,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_D4F92038_C49B_ACAB_41E6_96B27D79D9E9",
 "toolTipShadowSpread": 0,
 "horizontalAlign": "right",
 "toolTipBorderColor": "#767676",
 "iconURL": "skin/IconButton_D4F92038_C49B_ACAB_41E6_96B27D79D9E9.png",
 "borderSize": 0,
 "transparencyActive": true,
 "minHeight": 30,
 "toolTip": "Fullscreen",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "width": "70%",
 "class": "IconButton",
 "paddingRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "toggle",
 "verticalAlign": "middle",
 "minWidth": 30,
 "height": "5%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "backgroundOpacity": 0,
 "toolTipPaddingTop": 4,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "paddingTop": 0,
 "toolTipFontStyle": "normal",
 "paddingLeft": 0,
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 128,
 "data": {
  "name": "IconButton1493"
 },
 "toolTipTextShadowOpacity": 0
},
{
 "propagateClick": false,
 "id": "IconButton_CB0917B8_C485_D3AB_41DF_2ADB73C6100A",
 "horizontalAlign": "right",
 "iconURL": "skin/IconButton_CB0917B8_C485_D3AB_41DF_2ADB73C6100A.png",
 "borderSize": 0,
 "transparencyActive": true,
 "minHeight": 30,
 "width": "70%",
 "class": "IconButton",
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_CB0917B8_C485_D3AB_41DF_2ADB73C6100A_pressed_rollover.png",
 "mode": "toggle",
 "verticalAlign": "middle",
 "minWidth": 30,
 "height": "5%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_CB0917B8_C485_D3AB_41DF_2ADB73C6100A_pressed.png",
 "paddingTop": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "cursor": "hand",
 "data": {
  "name": "Button37509"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7, this.camera_C57E2343_DE59_0A78_41E7_86E1195BA35A); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 21.59,
   "yaw": 79.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.59,
   "image": "this.AnimatedImageResource_CB1356A4_DDEB_0A38_41D8_3D65C4D42C74",
   "pitch": -16.36,
   "yaw": 79.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CF9F5892_DDD9_0618_41D8_854FB95CF4F2",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C, this.camera_C56ED330_DE59_0A18_41E3_2B05B8D2AFDB); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 20.91,
   "yaw": -69.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0_HS_1_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.91,
   "image": "this.AnimatedImageResource_CB1286A4_DDEB_0A38_41E7_5C13B606224F",
   "pitch": -21.68,
   "yaw": -69.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CF313E32_DDD9_3A18_41C0_98C3B16A8549",
 "class": "HotspotPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_tcap0.png",
    "width": 250,
    "height": 250,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 33,
 "id": "panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C, this.camera_C5C1139F_DE59_0A08_41E8_00B936BBCE4B); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01b"
 },
 "maps": [
  {
   "hfov": 19.75,
   "yaw": 94.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.64,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.75,
   "image": "this.AnimatedImageResource_C88B54E5_DDAB_0E38_41E5_DA00E5EE15B9",
   "pitch": -28.64,
   "yaw": 94.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CC4B56F9_DDA9_0A08_41E5_E2E2337FA79C",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3, this.camera_C5D123B1_DE59_0A18_41DB_878F91C19127); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01b"
 },
 "maps": [
  {
   "hfov": 19.27,
   "yaw": -94.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0_HS_1_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.09,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.27,
   "image": "this.AnimatedImageResource_C88A94E5_DDAB_0E38_41EB_305FD9905511",
   "pitch": -31.09,
   "yaw": -94.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CFF89190_DDA9_0618_41C1_D59CC0AFC645",
 "class": "HotspotPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_tcap0.png",
    "width": 250,
    "height": 250,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 33,
 "id": "panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C, this.camera_C5A3C37A_DE59_0A08_41E2_95E805A5E292); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 02 Left-Up"
 },
 "maps": [
  {
   "hfov": 12.18,
   "yaw": -6.55,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.18,
   "image": "this.AnimatedImageResource_CB17E6A7_DDEB_0A38_41D7_BF70C69D9A9D",
   "pitch": -6.95,
   "yaw": -6.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_C969F6DE_DDE7_0A08_41D0_8F64DC1F9798",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D39123_DDA9_0638_41DF_82D20BE60779, this.camera_C5B3938C_DE59_0A08_41D1_B110EACFF8F2); this.mainPlayList.set('selectedIndex', 6); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 21.8,
   "yaw": -162.61,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0_HS_1_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.8,
   "image": "this.AnimatedImageResource_CB1706A8_DDEB_0A08_41DA_25C5BCEC9C68",
   "pitch": -14.32,
   "yaw": -162.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C8A21BAE_DDE9_1A08_41C4_C28818102CEA",
 "class": "HotspotPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_tcap0.png",
    "width": 250,
    "height": 250,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 33,
 "id": "panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7, this.camera_C55EF31E_DE59_0A08_41EA_48C2B14A2C24); this.mainPlayList.set('selectedIndex', 6); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 18.93,
   "yaw": 115.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -32.73,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.93,
   "image": "this.AnimatedImageResource_CB1476A7_DDEB_0A38_41D5_E938088B2ED6",
   "pitch": -32.73,
   "yaw": 115.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C97545CD_DDD9_0E08_41DA_5BC94C41EBD0",
 "class": "HotspotPanoramaOverlay"
},
{
 "maxHeight": 56,
 "propagateClick": false,
 "id": "IconButton_D465668E_C485_B467_4129_919D8298F0D8",
 "horizontalAlign": "right",
 "iconURL": "skin/IconButton_D465668E_C485_B467_4129_919D8298F0D8.png",
 "borderSize": 0,
 "transparencyActive": false,
 "minHeight": 30,
 "width": "70%",
 "class": "IconButton",
 "paddingRight": 0,
 "mode": "push",
 "verticalAlign": "middle",
 "minWidth": 30,
 "height": "5%",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingLeft": 0,
 "cursor": "hand",
 "maxWidth": 56,
 "data": {
  "name": "IconButton14318"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F, this.camera_C5E1D3C4_DE59_0A78_4167_8C94ED0FB75E); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01a"
 },
 "maps": [
  {
   "hfov": 22.31,
   "yaw": 101.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.31,
   "image": "this.AnimatedImageResource_CA207F69_DDE7_1A08_41D8_9B926347D5A5",
   "pitch": -7.36,
   "yaw": 101.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D3A62531_DDA7_0E18_41D3_A778AD52529D",
 "class": "HotspotPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_tcap0.png",
    "width": 250,
    "height": 250,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 33,
 "id": "panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "mp3Url": "media/audio_C4E8CB9F_DDAF_1A08_41D6_9B33D1A667E1.mp3",
 "id": "audioresource_C7EFE023_DDA9_0603_41E4_6037413F2637",
 "oggUrl": "media/audio_C4E8CB9F_DDAF_1A08_41D6_9B33D1A667E1.ogg",
 "class": "AudioResource"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5, this.camera_C5F703D7_DE59_0A18_41E7_31E6B7EB9921); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01a"
 },
 "maps": [
  {
   "hfov": 16.02,
   "yaw": 75.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_1_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.02,
   "image": "this.AnimatedImageResource_CCB973AB_DDA9_0A08_41E7_A83B3F2FA022",
   "pitch": -44.59,
   "yaw": 75.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CD0D8FBC_DDBF_7A08_41B3_B1C9D67A6E7A",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01a"
 },
 "maps": [
  {
   "hfov": 10.21,
   "yaw": -86.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_1_HS_1_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.21,
   "image": "this.AnimatedImageResource_CCB923AC_DDA9_0A08_418B_296F6B74332A",
   "pitch": -63,
   "yaw": -86.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D24AED31_DDB9_1E18_4192_4E29F6BCB572",
 "class": "HotspotPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_tcap0.png",
    "width": 250,
    "height": 250,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 33,
 "id": "panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D39123_DDA9_0638_41DF_82D20BE60779, this.camera_C538B2F0_DE59_0A18_41A8_F5BD272E9056); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01b"
 },
 "maps": [
  {
   "hfov": 15.33,
   "yaw": 160.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -47.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.33,
   "image": "this.AnimatedImageResource_CB1236A5_DDEB_0A38_41E2_979369B517AB",
   "pitch": -47.05,
   "yaw": 160.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CE929BDC_DDD9_1A08_41D4_67926D9CD4C0",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C, this.camera_C52B82CA_DE59_0A08_41EB_B73F36FCFAA8); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 16.68,
   "yaw": -39.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0_HS_1_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -42.14,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.68,
   "image": "this.AnimatedImageResource_CB1276A5_DDEB_0A38_41C8_0CF7ADE09DD8",
   "pitch": -42.14,
   "yaw": -39.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CE67E461_DDD9_0E38_41DE_60E463DDEC67",
 "class": "HotspotPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_tcap0.png",
    "width": 250,
    "height": 250,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 33,
 "id": "panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C, this.camera_C58C7356_DE59_0A18_41E0_75EC5373BCFA); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 21.54,
   "yaw": 53.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.77,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.54,
   "image": "this.AnimatedImageResource_C88B84E4_DDAB_0E38_41E3_74F2D11EBB31",
   "pitch": -16.77,
   "yaw": 53.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CC855F80_DDAB_1AF8_41C8_D365F173E916",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 14.61,
   "yaw": -142.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0_HS_1_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -49.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.61,
   "image": "this.AnimatedImageResource_C88BE4E4_DDAB_0E38_41D8_CCFF0930FEAD",
   "pitch": -49.5,
   "yaw": -142.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CDAE0316_DDA9_0A18_41E9_91F7BE3CADFD",
 "class": "HotspotPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_tcap0.png",
    "width": 250,
    "height": 250,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 33,
 "id": "panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7, this.camera_C4DBC1DC_DE59_0608_41E5_CC4C17C55BE2); this.mainPlayList.set('selectedIndex', 6); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 22.5,
   "yaw": 83.25,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.5,
   "image": "this.AnimatedImageResource_CB15E6A6_DDEB_0A38_41C1_9CC55D3FDD48",
   "pitch": 0,
   "yaw": 83.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CE817724_DDDF_0A38_41D9_BAE7CC487316",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7, this.camera_C4F7C222_DE59_0A38_41B7_EC4D2FFC984F); this.mainPlayList.set('selectedIndex', 6); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 22.5,
   "yaw": -75.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0_HS_1_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.5,
   "image": "this.AnimatedImageResource_CB1536A6_DDEB_0A38_41E2_408DCC520A4F",
   "pitch": 0.82,
   "yaw": -75.07,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CE4B0B2E_DDDF_1A08_41C9_E891E01CEEAB",
 "class": "HotspotPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_tcap0.png",
    "width": 250,
    "height": 250,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 70.5,
 "id": "panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97, this.camera_C200E3E9_DE59_0A0B_41A0_DA012B17A69F); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01a"
 },
 "maps": [
  {
   "hfov": 20.6,
   "yaw": 88.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_1_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.73,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.6,
   "image": "this.AnimatedImageResource_CCB9B3AD_DDA9_0A08_41B0_1A4F660D3483",
   "pitch": -23.73,
   "yaw": 88.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CD6C06F2_DDBB_0A18_41C0_6630251531F7",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3, this.camera_C21613FC_DE59_0A08_41B2_23D70ABEB374); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01a"
 },
 "maps": [
  {
   "hfov": 21.59,
   "yaw": -46.43,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_1_HS_1_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.36,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.59,
   "image": "this.AnimatedImageResource_CCBA73AD_DDA9_0A08_41EA_C140C9084EAF",
   "pitch": -16.36,
   "yaw": -46.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D2A06CC6_DDB9_1E78_41D1_F5E58FD7AF1D",
 "class": "HotspotPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_tcap0.png",
    "width": 250,
    "height": 250,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 33,
 "id": "panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D, this.camera_C5125283_DE59_0AF8_41D5_120CCADAB29A); this.mainPlayList.set('selectedIndex', 6); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 17.32,
   "yaw": 170.39,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0_HS_0_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -39.68,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.32,
   "image": "this.AnimatedImageResource_CB14A6A6_DDEB_0A38_41B7_726506AC2AA8",
   "pitch": -39.68,
   "yaw": 170.39,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_CE7EB0C9_DDD9_0608_41DF_03E46D3DCDE9",
 "class": "HotspotPanoramaOverlay"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D7D39123_DDA9_0638_41DF_82D20BE60779, this.camera_C526F2A5_DE59_0A38_41BC_B6D6DB124CE0); this.mainPlayList.set('selectedIndex', 6); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Arrow 01c"
 },
 "maps": [
  {
   "hfov": 20.66,
   "yaw": 32.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0_HS_1_0_0_map.gif",
      "width": 29,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.66,
   "image": "this.AnimatedImageResource_CB14D6A7_DDEB_0A38_41D5_FFFABEE99D14",
   "pitch": -23.32,
   "yaw": 32.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C9966ADA_DDDB_3A08_41EB_5776B29380B6",
 "class": "HotspotPanoramaOverlay"
},
{
 "rotate": false,
 "angle": 0,
 "image": {
  "levels": [
   {
    "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_tcap0.png",
    "width": 250,
    "height": 250,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "hfov": 33,
 "id": "panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_tcap0",
 "distance": 50,
 "inertia": false,
 "class": "TripodCapPanoramaOverlay"
},
{
 "propagateClick": false,
 "layout": "horizontal",
 "children": [
  "this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE"
 ],
 "id": "Container_CA21D85B_C48D_DCED_41D6_77206EB84DFA",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container2302"
 },
 "horizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "class": "Container",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "verticalAlign": "bottom",
 "minWidth": 1,
 "height": "100%",
 "gap": 10,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingTop": 0,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "overflow": "scroll"
},
{
 "propagateClick": false,
 "layout": "absolute",
 "children": [
  "this.Image_CA9924F3_C484_B5BD_41A6_F1E4B6101F01"
 ],
 "id": "Container_CAD4F683_C484_745D_41E2_2AF0B2B1E4DC",
 "scrollBarColor": "#000000",
 "data": {
  "name": "LOGO CLIENTE"
 },
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "class": "Container",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "height": "40%",
 "gap": 10,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingTop": 10,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "overflow": "scroll"
},
{
 "propagateClick": false,
 "layout": "vertical",
 "children": [
  "this.IconButton_CB43F41B_C484_546D_41E7_25753E48123C",
  "this.IconButton_CB49F62E_C48B_B4A7_41D8_7652E8A2DBAC",
  "this.IconButton_D4C5BC86_C484_D467_41D7_FA32751F1CC5",
  "this.IconButton_CB4C696C_C48B_DCAB_41E1_A783E0EC40DB"
 ],
 "id": "Container_CAF562F9_C484_ADAD_4196_2F50A1BAADD1",
 "scrollBarColor": "#000000",
 "data": {
  "name": "REDES SOCIAIS"
 },
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "class": "Container",
 "paddingRight": 0,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "height": "50%",
 "gap": 10,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingTop": 0,
 "borderRadius": 0,
 "scrollBarWidth": 10,
 "paddingLeft": 10,
 "overflow": "scroll"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CB1356A4_DDEB_0A38_41D8_3D65C4D42C74",
 "levels": [
  {
   "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CB1286A4_DDEB_0A38_41E7_5C13B606224F",
 "levels": [
  {
   "url": "media/panorama_D7D6AD5D_DDA9_FE08_41EB_058753C0FC5C_0_HS_1_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_C88B54E5_DDAB_0E38_41E5_DA00E5EE15B9",
 "levels": [
  {
   "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_C88A94E5_DDAB_0E38_41EB_305FD9905511",
 "levels": [
  {
   "url": "media/panorama_D728AB8D_DDA9_1A08_41D7_286E3DA57A0C_0_HS_1_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_CB17E6A7_DDEB_0A38_41D7_BF70C69D9A9D",
 "levels": [
  {
   "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0_HS_0_0.png",
   "width": 380,
   "height": 570,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CB1706A8_DDEB_0A08_41DA_25C5BCEC9C68",
 "levels": [
  {
   "url": "media/panorama_D7DD19E2_DDA9_0638_41E6_068D5CEA21A1_0_HS_1_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CB1476A7_DDEB_0A38_41D5_E938088B2ED6",
 "levels": [
  {
   "url": "media/panorama_D7D103FE_DDA9_0A08_41E5_D0C7CEB1480D_0_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CA207F69_DDE7_1A08_41D8_9B926347D5A5",
 "levels": [
  {
   "url": "media/panorama_D7D62D43_DDA9_1E78_41CE_392C9FC6AD97_0_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CCB973AB_DDA9_0A08_41E7_A83B3F2FA022",
 "levels": [
  {
   "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_1_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CCB923AC_DDA9_0A08_418B_296F6B74332A",
 "levels": [
  {
   "url": "media/panorama_D6EEB963_DDA9_0638_41CD_57F8E08B9F2F_1_HS_1_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CB1236A5_DDEB_0A38_41E2_979369B517AB",
 "levels": [
  {
   "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CB1276A5_DDEB_0A38_41C8_0CF7ADE09DD8",
 "levels": [
  {
   "url": "media/panorama_D7D60FB4_DDA9_1A18_41DE_FD4EFE86D5B7_0_HS_1_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_C88B84E4_DDAB_0E38_41E3_74F2D11EBB31",
 "levels": [
  {
   "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_C88BE4E4_DDAB_0E38_41D8_CCFF0930FEAD",
 "levels": [
  {
   "url": "media/panorama_D7D58957_DDA9_0618_41DA_C03C2E726BC3_0_HS_1_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CB15E6A6_DDEB_0A38_41C1_9CC55D3FDD48",
 "levels": [
  {
   "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CB1536A6_DDEB_0A38_41E2_408DCC520A4F",
 "levels": [
  {
   "url": "media/panorama_D7D39123_DDA9_0638_41DF_82D20BE60779_0_HS_1_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CCB9B3AD_DDA9_0A08_41B0_1A4F660D3483",
 "levels": [
  {
   "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_1_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CCBA73AD_DDA9_0A08_41EA_C140C9084EAF",
 "levels": [
  {
   "url": "media/panorama_D7C5475C_DDA9_0A08_41E4_4637BC30D6E5_1_HS_1_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CB14A6A6_DDEB_0A38_41B7_726506AC2AA8",
 "levels": [
  {
   "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0_HS_0_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "rowCount": 3,
 "frameCount": 9,
 "frameDuration": 62,
 "colCount": 3,
 "id": "AnimatedImageResource_CB14D6A7_DDEB_0A38_41D5_FFFABEE99D14",
 "levels": [
  {
   "url": "media/panorama_D7D28253_DDA9_0A18_41C3_7DFD3C8A1106_0_HS_1_0.png",
   "width": 330,
   "height": 180,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "paddingLeft": 20,
 "itemThumbnailShadowColor": "#000000",
 "id": "ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE",
 "itemLabelFontStyle": "normal",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#FFFFFF",
 "itemThumbnailWidth": 151,
 "horizontalAlign": "center",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "itemLabelHorizontalAlign": "center",
 "borderSize": 0,
 "itemThumbnailOpacity": 1,
 "itemPaddingRight": 3,
 "itemMode": "normal",
 "itemLabelFontWeight": "normal",
 "minHeight": 1,
 "itemLabelTextDecoration": "none",
 "itemBorderRadius": 0,
 "itemLabelFontFamily": "Arial",
 "itemThumbnailShadowVerticalLength": 3,
 "class": "ThumbnailList",
 "paddingRight": 20,
 "playList": "this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE_playlist",
 "verticalAlign": "top",
 "itemLabelFontSize": 14,
 "minWidth": 1,
 "itemThumbnailShadowOpacity": 0.8,
 "selectedItemLabelFontWeight": "bold",
 "scrollBarMargin": 2,
 "height": "100%",
 "itemVerticalAlign": "middle",
 "itemLabelFontColor": "#FFFFFF",
 "itemThumbnailScaleMode": "fit_outside",
 "itemThumbnailShadowBlurRadius": 4,
 "itemLabelPosition": "bottom",
 "itemPaddingLeft": 3,
 "itemOpacity": 1,
 "gap": 1,
 "itemThumbnailHeight": 100,
 "itemThumbnailShadowSpread": 1,
 "itemBackgroundColorDirection": "vertical",
 "paddingBottom": 1,
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0,
 "click": "this.setComponentVisibility(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE, true, 0, null, null, false); this.setComponentVisibility(this.ThumbnailList_D68BACD6_C48D_F5E7_41BE_BAE86D7ADCFE, false, 0, null, null, false)",
 "shadow": false,
 "itemThumbnailShadow": true,
 "itemThumbnailBorderRadius": 10,
 "paddingTop": 10,
 "data": {
  "name": "ThumbnailList1355"
 },
 "itemLabelGap": 0,
 "itemBackgroundColor": [],
 "itemPaddingBottom": 3,
 "itemHorizontalAlign": "center",
 "borderRadius": 5,
 "scrollBarWidth": 10,
 "itemThumbnailShadowHorizontalLength": 3,
 "itemBackgroundColorRatios": [],
 "itemPaddingTop": 3,
 "propagateClick": false,
 "layout": "horizontal"
},
{
 "maxHeight": 1000,
 "propagateClick": false,
 "id": "Image_CA9924F3_C484_B5BD_41A6_F1E4B6101F01",
 "left": "0%",
 "horizontalAlign": "left",
 "width": "59.177%",
 "borderSize": 0,
 "url": "skin/Image_CA9924F3_C484_B5BD_41A6_F1E4B6101F01.jpeg",
 "minHeight": 1,
 "class": "Image",
 "paddingRight": 0,
 "bottom": "0%",
 "verticalAlign": "top",
 "minWidth": 1,
 "height": "88.739%",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingLeft": 0,
 "cursor": "hand",
 "maxWidth": 1000,
 "data": {
  "name": "Image3400"
 }
},
{
 "maxHeight": 608,
 "propagateClick": false,
 "id": "IconButton_CB43F41B_C484_546D_41E7_25753E48123C",
 "horizontalAlign": "left",
 "iconURL": "skin/IconButton_CB43F41B_C484_546D_41E7_25753E48123C.png",
 "borderSize": 0,
 "transparencyActive": false,
 "minHeight": 30,
 "width": "39.873%",
 "class": "IconButton",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 30,
 "click": "this.openLink('https://www.instagram.com/barber_riachuello/', '_blank')",
 "height": "24.221%",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingLeft": 0,
 "cursor": "hand",
 "maxWidth": 605,
 "data": {
  "name": "INSTAGRAM"
 }
},
{
 "maxHeight": 600,
 "propagateClick": false,
 "id": "IconButton_CB49F62E_C48B_B4A7_41D8_7652E8A2DBAC",
 "horizontalAlign": "left",
 "iconURL": "skin/IconButton_CB49F62E_C48B_B4A7_41D8_7652E8A2DBAC.png",
 "borderSize": 0,
 "transparencyActive": false,
 "minHeight": 30,
 "width": "46.835%",
 "class": "IconButton",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 30,
 "height": "23.183%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingTop": 0,
 "borderRadius": 0,
 "paddingLeft": 0,
 "cursor": "hand",
 "maxWidth": 600,
 "data": {
  "name": "WHATSAPP"
 }
},
{
 "visible": false,
 "maxHeight": 590,
 "propagateClick": false,
 "id": "IconButton_D4C5BC86_C484_D467_41D7_FA32751F1CC5",
 "horizontalAlign": "left",
 "iconURL": "skin/IconButton_D4C5BC86_C484_D467_41D7_FA32751F1CC5.png",
 "borderSize": 0,
 "transparencyActive": false,
 "minHeight": 30,
 "width": "20%",
 "class": "IconButton",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 30,
 "click": "this.openLink('https://goo.gl/maps/aLbxXJHCeNeLdr7GA', '_blank')",
 "height": "17%",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingLeft": 0,
 "cursor": "hand",
 "maxWidth": 588,
 "data": {
  "name": "MAPS"
 }
},
{
 "visible": false,
 "maxHeight": 505,
 "propagateClick": false,
 "id": "IconButton_CB4C696C_C48B_DCAB_41E1_A783E0EC40DB",
 "horizontalAlign": "left",
 "iconURL": "skin/IconButton_CB4C696C_C48B_DCAB_41E1_A783E0EC40DB.png",
 "borderSize": 0,
 "transparencyActive": false,
 "minHeight": 30,
 "width": "20%",
 "class": "IconButton",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "mode": "push",
 "minWidth": 30,
 "click": "this.openLink('http://https://upinfinitus.com/', '_blank')",
 "height": "17%",
 "paddingBottom": 0,
 "shadow": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingLeft": 0,
 "cursor": "hand",
 "maxWidth": 523,
 "data": {
  "name": "SITE"
 }
}],
 "width": "100%",
 "data": {
  "name": "Player1834"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
