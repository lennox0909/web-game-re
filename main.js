// QQPlay window need to be inited first
if (false) {
    BK.Script.loadlib('GameRes://libs/qqplay-adapter.js');
}

var loadingBool = true;
var loadingNum = 0;
window.boot = function () {
	
    var settings = window._CCSettings;
    window._CCSettings = undefined;

    if ( !settings.debug ) {
        var uuids = settings.uuids;

        var rawAssets = settings.rawAssets;
        var assetTypes = settings.assetTypes;
        var realRawAssets = settings.rawAssets = {};
        for (var mount in rawAssets) {
            var entries = rawAssets[mount];
            var realEntries = realRawAssets[mount] = {};
            for (var id in entries) {
                var entry = entries[id];
                var type = entry[1];
                // retrieve minified raw asset
                if (typeof type === 'number') {
                    entry[1] = assetTypes[type];
                }
                // retrieve uuid
                realEntries[uuids[id] || id] = entry;
            }
        }

        var scenes = settings.scenes;
        for (var i = 0; i < scenes.length; ++i) {
            var scene = scenes[i];
            if (typeof scene.uuid === 'number') {
                scene.uuid = uuids[scene.uuid];
            }
        }

        var packedAssets = settings.packedAssets;
        for (var packId in packedAssets) {
            var packedIds = packedAssets[packId];
            for (var j = 0; j < packedIds.length; ++j) {
                if (typeof packedIds[j] === 'number') {
                    packedIds[j] = uuids[packedIds[j]];
                }
            }
        }

        var subpackages = settings.subpackages;
        for (var subId in subpackages) {
            var uuidArray = subpackages[subId].uuids;
            if (uuidArray) {
                for (var k = 0, l = uuidArray.length; k < l; k++) {
                    if (typeof uuidArray[k] === 'number') {
                        uuidArray[k] = uuids[uuidArray[k]];
                    }
                }
            }
        }
    }

    function setLoadingDisplay () {
        var splash = document.getElementById('splash');
		
        cc.loader.onProgress = function (completedCount, totalCount, item) {
            loadData.completedCount = completedCount;
            loadData.totalCount = totalCount;
			
			if(loadingBool){
				var loadintT = document.getElementById("loadingText");
			}
			var percent = 100 * completedCount / totalCount;
			if(loadingBool && loadingNum >= 1 && totalCount > 1){
				if(percent.toFixed(0) >= 100){
                    if(loadintT) loadintT.innerHTML = 'loading......100' + '%';
                    setTimeout(function(){
                        loadingBool = false;
                        if(loadintT) loadintT.remove();
                    }, 100);
                    if(typeof timer !== 'undefined' && timer) clearInterval(timer); 
				}
			}
            loadingNum++;
        };
        if(splash) splash.style.display = 'block';

        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
            if(splash) splash.style.display = 'none';
        });
    }

    var onStart = function () {
        cc.loader.downloader._subpackages = settings.subpackages;

        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        if (cc.sys.isBrowser) {
            setLoadingDisplay();
        }

        if (cc.sys.isMobile) {
            if (settings.orientation === 'landscape') {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            }
            else if (settings.orientation === 'portrait') {
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            }
            cc.view.enableAutoFullScreen(false);
        }

        if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
            cc.macro.DOWNLOAD_MAX_CONCURRENT = 2;
        }

        var canvas;
        if (cc.sys.isBrowser) {
            canvas = document.getElementById('GameCanvas');
        }
        var launchScene = settings.launchScene;
        console.log("launchScene,", launchScene);
        
        // 確保 MainManage 存在時正常初始化
        if (typeof __require !== 'undefined') {
            try {
                var MainManger = __require("MainManage");
                if (MainManger && MainManger.init) {
                    MainManger.init(launchScene, cc.sys.isBrowser, canvas ? canvas.style.visibility : '');
                }
            } catch (e) {
                console.log("MainManage init skipped or not required in offline mode");
            }
        }
    };

    var jsList = settings.jsList;
    var bundledScript = settings.debug ? 'src/project.dev.js' : 'src/project.js';
    if (jsList) {
        jsList = jsList.map(function (x) {
            return 'src/' + x;
        });
        jsList.push(bundledScript);
    }
    else {
        jsList = [bundledScript];
    }
    
    var option = {
        id: 'GameCanvas',
        scenes: settings.scenes,
        debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: !false && settings.debug,
        frameRate: 60,
        jsList: jsList,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
    };

    // 初始化本地資源庫路徑
    cc.AssetLibrary.init({
        libraryPath: 'res/import',
        rawAssetsBase: 'res/raw-',
        rawAssets: settings.rawAssets,
        packedAssets: settings.packedAssets,
        md5AssetsMap: settings.md5AssetsMap,
        subpackages: settings.subpackages
    });

    cc.game.run(option, onStart);
};