const COMMUNICATION_EVENT = '_MULTI_STORE_EVENT_';
const GET_STATE = COMMUNICATION_EVENT + 'GET_STATE_';
const SET_STATE = COMMUNICATION_EVENT + 'SET_STATE_';
const SET_EVENT = COMMUNICATION_EVENT + 'SET_';
export class Store {
	constructor(options) {
		if (!Store._instance) {
			this.initSync = false;
			this.initListener();
			// 初始化数据
			this.initState(options.state);
			Store._instance = this;
		}
		return Store._instance;
	}
	initState(state) {
		// console.log('发送同步数据请求')
		Store.getState();
		this.state = state;
	}
	initListener() {
		window.addEventListener('storage', (e) => {
			const { newValue, key } = e;
			//console.log(e)
			if (newValue === null) return;
			if (key === GET_STATE) {
				console.log('被请求state')
				const data = this.getState();
				Store.sendData(JSON.stringify(data), SET_STATE);
			}
			else if (key === SET_STATE) {
				//console.log('初始化state')
				if (!this.initSync) {
					this.initSync = true;
					const data = JSON.parse(newValue);
					this.state = data;
				}
			}
			else if (key === SET_EVENT) {
				const { key, value } = JSON.parse(newValue);
				// console.log('同步数据', key, value)
				this.state[key] = value;
			}
		})
	}
	setItem(key, value) {
		this.state[key] = value;
		Store.sendData(JSON.stringify({ key, value }));
	}
	getItem(key) {
		return this.state[key];
	}

	getState() {
		return this.state;
	}

	static sendData(data, eventName = SET_EVENT) {
		window.localStorage.setItem(eventName, data);
		window.localStorage.removeItem(eventName);
	}

	static getState() {
		window.localStorage.setItem(GET_STATE, Date.now() + '');
		window.localStorage.removeItem(GET_STATE);
	}
}