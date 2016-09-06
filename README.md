# redux-dependency-injection
Redux Middleware that simulates what angular does for dependency injection. 

## Basic Usage

### Store configuration
```sh
import ajaxService from  "some/file/path/where/service/is";
createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    Inject({ajaxService})
  )
);
```

###Action Setup
```sh
export function login (user){
  return function(dispatch, ajaxService){
    ajaxService.get("authenticate", user)
    .then((response)=>{
      dispatch(loginSuccess(response));
    })
    .catch((response)=>{
       dispatch(loginFailure(response));
    });
  }
}
```

### Service Setup
```sh
export default class AjaxService {
  constructor(dispatch){
      this.dispatch = dispatch;
  }
  ...
}

```

you can also use just objects or arrays as something you want to inject, as long as the function argument matches the name, it will pass it.
