type FunctionVoid = (...args: any[]) => void
type FunctionBoolean = (...args: any[]) => boolean

interface ObjectAny {
	[key:string]: any
}

export {
	FunctionVoid,
	FunctionBoolean,
	ObjectAny
}
