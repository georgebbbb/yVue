import { parse } from '../../experiment/vue/src/compiler/parser/index'

export function compile(template){
  const ast = parse(template.trim(), {})
  console.log(ast)

}
