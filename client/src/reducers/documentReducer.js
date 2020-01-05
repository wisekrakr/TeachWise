import {
  GET_DOC,
  GET_DOCS,
  GET_DOCUMENTS_BY_CHAPTER,
  GET_CHAPTERS_BY_ITEM,
  ADD_DOC,
  DELETE_DOC,
  ADD_CHAPTER,
  DELETE_CHAPTER,
  DOC_ERROR,
  CHAPTER_ERROR,
  GET_CHAPTERS,
  GET_CHAPTER,
  LOADING_CHAPTERS,
  LOADING_DOCS
} from "../actions/types";

const initialState = {
  documents: [],
  chapters: [],
  document: null,
  chapter: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCS:
    case GET_DOCUMENTS_BY_CHAPTER:
      return {
        ...state,
        documents: action.payload,
        loading: false
      };

    case GET_CHAPTERS:
    case GET_CHAPTERS_BY_ITEM:
      return {
        ...state,
        chapters: action.payload,
        loading: false
      };

    case GET_DOC:
      return {
        ...state,
        document: action.payload,
        loading: false
      };
    case GET_CHAPTER:
      return {
        ...state,
        chapter: action.payload,
        loading: false
      };
    case ADD_DOC:
      return {
        ...state,
        documents: [action.payload, ...state.documents],
        loading: false
      };
    case ADD_CHAPTER:
      return {
        ...state,
        chapters: [action.payload, ...state.chapters],
        loading: false
      };
    case DELETE_DOC:
      return {
        ...state,
        documents: state.documents.filter(doc => doc._id !== action.payload),
        loading: false
      };
    case DELETE_CHAPTER:
      return {
        ...state,
        chapters: state.chapters.filter(
          chapter => chapter._id !== action.payload
        ),
        loading: false
      };

    case DOC_ERROR:
    case CHAPTER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case LOADING_DOCS:
    case LOADING_CHAPTERS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
