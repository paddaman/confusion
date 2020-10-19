import {COMMENTS} from "../shared/comments";
import * as ActionTypes from "./ActionTypes";

export const Comments = (state = { errorMessage: null, comments:[]}, action) => {
    switch (action.type) {
        case (ActionTypes.ADD_COMMENTS): {
            return {...state, errorMessage: null, comments: action.payload};
        }
        case (ActionTypes.COMMENTS_FAILED): {
            return {...state, errorMessage: null, comments: action.payload};
        }
        case (ActionTypes.ADD_COMMENT): {
            let comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.concat(comment)
        }
        default:
            return state;
    }
}