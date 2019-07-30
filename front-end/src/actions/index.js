import axios from 'axios';

import {
    ADD_USER,
    DELETE_USER,
    EDIT_USER,
    GET_USERS,
    GET_USER_BY_ID,
    GET_USER_TOKEN,
    SAVE_AVATAR,
    LOGOUT_USER,
    ADD_ARTICLE,
    DELETE_ARTICLE,
    EDIT_ARTICLE,
    GET_ARTICLES,
    GET_THREADS,
    ADD_THREAD,
    EDIT_THREAD,
    DELETE_THREAD
} from './../constants';

export const addUser = user => async dispatch => {
    let response = await axios.post('http://localhost:5000/api/token/register', user);
    dispatch({ type: ADD_USER, payload: response.data })
}

export const deleteUser = id => async dispatch => {
    let response = await axios.delete(`http://localhost:5000/api/users/${id}`);
    dispatch({ type: DELETE_USER, payload: response.data })
}

export const editUser = (id, user) => async dispatch => {
    let response = await axios.put(`http://localhost:5000/api/users/${id}`, user);
    dispatch({ type: EDIT_USER, payload: response.data });
}

export const getUserById = (token, id) => async dispatch => {
    var config = { header: {'Authorization': "bearer " + token} };
    let response = await axios.get(`http://localhost:5000/api/users/${id}`, config);
    dispatch({ type: GET_USER_BY_ID, payload: response.data })
}

export const getUserToken = (user) => async dispatch => {
    try {
        let response = await axios.post('http://localhost:5000/api/token/loginUser', user);
        dispatch({ type: GET_USER_TOKEN, token: response.data.token });
        dispatch({ type: GET_USER_BY_ID, payload: response.data.user });
    } catch (err) {
        alert("Username and/or password is incorrect. Try again.");
    }
}

export const getUsers = () => async dispatch => {
    let response = await axios.get('http://localhost:5000/api/users');
    dispatch({ type: GET_USERS, payload: response.data })
}

export const saveAvatar = ({ avatar }) => async dispatch => {
    dispatch({ type: SAVE_AVATAR, avatar })
}

export const addArticle = article => async dispatch => {
    let response = await axios.post('http://localhost:5000/api/articles', article);
    dispatch({ type: ADD_ARTICLE, payload: response.data })
}

export const logoutUser = (user, id) => async dispatch => {
    axios.put(`http://localhost:5000/api/users/${id}`, user);
    dispatch({ type: LOGOUT_USER })
}

export const deleteArticle = id => async dispatch => {
    let response = await axios.delete(`http://localhost:5000/api/articles/${id}`);
    dispatch({ type: DELETE_ARTICLE, payload: response.data })
}

export const editArticle = (id, article) => async dispatch => {
    let response = await axios.put(`http://localhost:5000/api/articles/${id}`, article);
    dispatch({ type: EDIT_ARTICLE, payload: response.data })
}

export const getArticles = () => async dispatch => {
    let response = await axios.get('http://localhost:5000/api/articles');
    dispatch({ type: GET_ARTICLES, payload: response.data })
}

export const getLinkedInToken = (code) => async dispatch => {
    let strngyCode = JSON.stringify(code, null, 0);
    let headers = { "Content-Type" : "application/json" };
    let response = await axios.post('http://localhost:5000/api/linkedin', strngyCode, {headers: headers});
    console.log(response);
    // window.localStorage.setItem('access token', response.access_token);
}

export const addThread = thread => async dispatch => {
    let response = await axios.post('http://localhost:5000/api/forum', thread);
    dispatch({ type: ADD_THREAD, payload: response.data })
}

export const getThreads = () => async dispatch => {
    let response = await axios.get('http://localhost:5000/api/forum');
    dispatch({ type: GET_THREADS, payload: response.data })
}