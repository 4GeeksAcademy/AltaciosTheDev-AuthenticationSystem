const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: sessionStorage.getItem("token") || null, //when app loads, will try to look for token in browser, if not found will default to null 
			loggedUserData: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			login: async (user) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/login",{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(user)
					})
					const data = await resp.json()
					if(!resp.ok){
						throw new Error(data.msg)
					}
					alert(data.access_token)
					setStore({token: data.access_token}) //store token in flux token var 
					sessionStorage.setItem("token", data.access_token) //store token in sesssionStorage
					// don't forget to return something, that is how the async resolves
					return true;
				}catch(error){
					console.error("Error loading message from backend", error)
				}
			},
			getLoggedUserData: async () => {
				const store = getStore()
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/protected",{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						}
					})
					const data = await resp.json()
					if(!resp.ok){
						throw new Error(data.msg)
					}
					alert("Going into profile:" + data.email)
					console.log(data)
					setStore({loggedUserData: data}) //store logged user data in loggedUserData 
					// don't forget to return something, that is how the async resolves
					return true;
				}catch(error){
					console.error("Error loading message from backend", error)
				}
			},
			
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
