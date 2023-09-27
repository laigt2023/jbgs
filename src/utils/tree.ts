/*
 * @Description: 树型结构数组工机具
 * @Author: laigt
 * @Date: 2023-04-06
*/

// 获取树节点的父级所有节点   parentKey=父级节点key
export function getParentNodeToArray(node, parentKey = 'parentNode') {
  let result = new Array<any>()
  if (node) {
    result.push(node)
  }
  if (node && node.parentNode) {
    result = result.concat(getParentNodeToArray(node.parentNode, parentKey))
  }
  return result
}

//  tree:树结构数组   key:查询键值   value:值
/**
 * 递归查询树中符合条件的节点
 * @param tree   树结构数组
 * @param key    查询键名
 * @param value  查询值
 * @param parent 父节点，可为空
 * @returns 自定义将父节点信息保存到item[parentNode]上
 */
export function recursiveFindItem(tree, key, value, parent = null) {
  let result = new Array<any>()

  tree.forEach((item) => {
    if (item && item[key] === value) {
      // 记录父级节点信息
      // item.parentNode = parent
      result.push({ ...item, parentNode: parent })
    }
    if (item.children && item.children.length) {
      const childrenItems = recursiveFindItem(item.children, key, value, item)
      result = result.concat(childrenItems)
    }
  })
  return result
}
/**
 * 数组转树
 * @param array 原数据列表
 * @param rootId 根节点ID
 * @param idKey ID字段
 * @param parentKey 父节点ID字段
 * @param labelName 标签字段名称（labelKey数据赋值到labelName中）
 * @param labelKey 显示标签字段
 * @param childrenKey 子节点数组字段
 * @returns
 */
export function array2tree (array, rootId, idKey = 'id', parentKey = 'parentId', labelName = 'label', labelKey = 'label', childrenKey = 'children') {
  const result:Array<any> = []

  for (let i = array.length - 1; i >= 0; i--) {
    const a = array[i]
    if (a && a[parentKey] === rootId) {
      result.unshift(a)
      array.splice(i, 1)
      result[0][labelName] = result[0][labelKey]
      result[0][childrenKey] = array2tree(array, result[0][idKey])
    }
  }

  return result
}
export default { getParentNodeToArray, recursiveFindItem, array2tree }
