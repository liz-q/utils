import {
	REG_EMAIL
} from '@config/constants'
// const REG_EMAIL = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
/**
 * @description
 * */
function isEmail (email:string):boolean {
	return REG_EMAIL.test(email)
}
export default isEmail
