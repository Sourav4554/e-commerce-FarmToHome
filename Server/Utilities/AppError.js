
class AppError extends Error{
constructor(message,statuscode){
super(message)
this.statuscode=statuscode || 500
this.success=false
}
}

export default AppError