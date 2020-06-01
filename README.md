# Install/ Run

```js
npm i 
```
```js
npm start
```
# Test

```js
npm test
```
I added some tests (Functional, Integration, and Database Unit Testing) 

# Routes

| Type | Route  | 'Authorization' Header required | Body
| :---: | :-: | :-: | :-: | 
| Post | localhost:8080/aut/signin | N | { email:’example@mail , password:'password'}
| Post | localhost:8080/aut/signup | N | { email:'example@mail' , password:'password', name: ’name’}
| Post | localhost:8080/aut/signout | Y | Empty
| Get |  localhost:8080/v1/establishments/lat=value&lon=value&city=value | Y | Empty
| Get | localhost:8080/v1/transactions | Y | Empty
