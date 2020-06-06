const fs = require('fs')

/**
 * 复制文件
 */
const copy = (source, target) => {
    let paths = fs.readdirSync(source) // 同步读取当前目录
    isExist(target)
    paths.forEach(path => {
        const _source = source + '/' + path
        const _target = target + '/' + path
        fs.stat(_source, function (err, stats) {
            if (err) throw err
            // 为文件则拷贝
            if (stats.isFile()) {
                fs.copyFile(_source, _target, e => {
                    if (e) console.log('复制失败')
                })
            }
            // 为目录则递归
            else if (stats.isDirectory()) {
                copy(_source, _target)
            }
        })
    })
}
/**
 * 检测目标目录是否存在 不存在就创建
 */
const isExist = target => {
    fs.access(target, fs.constants.F_OK, e => {
        if (e) fs.mkdirSync(target)

    })
}

export {copy, isExist}

// const source = 'source/_posts' // 源目录
// const target = 'public' // 目标目录
// copy(source, target)
