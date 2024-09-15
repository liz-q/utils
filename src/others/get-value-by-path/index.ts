interface anyObject {
    [index: string]: any
}

/**
 * @description 根据属性字符串从对象中取值
 * @param object 对象数据
 * @param prop 属性路径字符串
 * */
function getValueByPath (object:anyObject, prop:string) {
    prop = prop || '';
    const paths = prop.split('.');
    let current = object;
    let result = null;
    for (let i = 0, j = paths.length; i < j; i++) {
        const path = paths[i];
        if (!current) break;

        if (i === j - 1) {
            result = current[path];
            break;
        }
        current = current[path];
    }
    return result;
}
export default getValueByPath
