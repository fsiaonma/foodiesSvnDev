var config = config || {
    unpackProjects: ['foodies']      // 配置需要打包的项目名，若配置 unpackProjects: 'all', 则打包所有项目。
};

/**
 *  config.projects 为一个对象数组，一个对象是一个项目。
 *
 *  每个项目有对应的：
 *      projectName: 项目名称
 *      rootPath: 项目路径
 *      buildPath: 项目打包路径
 *      resources: 资源打包配置项 
 *      images: 图片打包配置项
 *      js: js 文件打包配置项
 *      css: css 文件打包配置项
 *  
 *   config.projects 数组中可配置多个承载多个对象，配置多个项目。
 *   使 N-Builder 能支持同时打包多个项目。
 *   注：若路径配置为文件夹路径时，N-Builder 会递归处理该文件夹下所有合法文件。
 */
config.projects = [{
    projectName: 'foodies',        // 项目名称。（必填，项目的唯一标识，不能与其他项目重复）
    rootPath: '../',           // 项目的相对路径。（必填。必须以 '/' 结尾）
    buildPath: '../../client-pro/',          // 项目打包的目标路径。（必填。必须以 '/' 结尾）
    js: {                   // javascript 压缩打包配置项
        compression: [{         // javascript 压缩配置项。（数组中可配置多个对象）
            dir: [
                "eventDelegate.js",

                "router.js",

                "libs/mvc/model.js",
                "libs/mvc/controller.js",
                "libs/mvc/view.js",

                "libs/cookie/cookie.min.js",

                "libs/socket/build.js",
                "libs/socket/socket.io.js",
                "libs/socket/pomeloclient.js",
                "libs/socket/p_socket.js",

                "libs/ajax/ajax.js",

                "libs/createjs/easeljs-0.5.0.min.js",
                "libs/createjs/preloadjs-0.2.0.min.js",
                "libs/createjs/soundjs-0.3.0.min.js",
                "libs/createjs/tweenjs-0.3.0.min.js",

                "libs/flash/playing.js",
                "libs/flash/finding.js",
                "libs/flash/matching.js",
                "libs/flash/singleConclusion.js",
                "libs/flash/battleConclusion.js",

                "libs/loader/Assets.js",
                "libs/loader/DataLoader.js",
                "libs/loader/Load.js",

                "modules/game/zx.js",
                
                "modules/game/util/util.js",
                "modules/game/util/viewporter-2.0.js",
                "modules/game/util/ddjsutils.js",
                "modules/game/util/Persistence.js",
                "modules/game/util/Utils.js",

                "modules/game/scenes/scenesRouter.js",
                "modules/game/scenes/sessionScene.js",
                "modules/game/scenes/scoreScene.js",
                "modules/game/scenes/battleResultScene.js",
                "modules/game/core/Game.js",
                "modules/game/core/Powerup.js",
                "modules/game/core/Gem.js",
                "modules/game/core/GemGrid.js",
                "modules/game/core/GridSolver.js",
                "modules/game/core/Main.js",
                "modules/game/model.js",
                "modules/game/view.js",

                "modules/user/msgBox.js",
                "modules/user/friendListItem.js",
                "modules/user/friendsList.js",
                "modules/user/choosePage.js",
                "modules/user/matchPage.js",
                "modules/user/model.js",
                "modules/user/view.js"
            ],                // 需要压缩的 js 文件路径，相对于 rootPath。（必填。接受文件路径或文件夹路径，若配置文件夹路径必须以 '/' 结尾）
            outputFile: 'min.js'          // 压缩合并后的 js 文件名。 （选填。默认为 min.js）
        }],
        copyOnly: [
            "config/game/config.js",
            "config/game/powerup.js",
            "config/game/level.js",
            "config/game/networkgem.js",
            "config/interface/mockResponse/mockData.js",
            "config/interface/HttpInterface.js",
            "config/interface/SocketInterface.js",
            "config/config.js",
            "config/res.js"
        ]
    },
    css: {                  // css 打包压缩配置项
        compression: [{     // css 压缩配置项。（数组中可配置多个对象）
            dir: [
                "style/main.css",
                "style/game.css"
            ],    // 需要压缩的 css 文件路径，相对于 rootPath。（必填。接受文件路径路径或文件夹路径，若配置文件夹路径必须以 '/' 结尾）
            outputFile: 'style/min.css'   // 压缩合并后的 css 文件名。（选填。默认为 min.css）
        }]
    }
}];

module.exports = config;