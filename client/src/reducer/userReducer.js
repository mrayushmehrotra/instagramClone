export const initialState = null

export const reducer = (state, action)=>{
    if(action.time=="USER"){
        return action.payload
    } else {
        return state
    }
}