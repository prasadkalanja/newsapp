import React from "react"

 function Error({ error }: any) {
    return (
        <div>ERROR : {error.message || 'Something went wrong...'}</div>
    )
}
export default Error